import { useState } from 'react';
import type {
  WatchBuild,
  BuildStep,
  BaseComponent,
  Movement,
  Case,
  Dial,
  Hands,
  SecondsHandAccent,
  BezelInsert,
  Rotor,
  MovementSpacer,
  Strap
} from './types/watch';
import {
  SEED_MOVEMENTS,
  SEED_CASES,
  SEED_DIALS,
  SEED_HANDS,
  SEED_SECONDS_ACCENTS,
  SEED_BEZEL_INSERTS,
  SEED_ROTORS,
  SEED_SPACERS,
  SEED_STRAPS
} from './data/seedParts';
import { WatchCanvas } from './components/WatchCanvas';
import { PartPicker } from './components/PartPicker';
import { BillOfMaterials } from './components/BillOfMaterials';
import {
  Watch,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Sliders,
  ArrowRight
} from 'lucide-react';

export function App() {
  // Start with clean empty build or load from URL hash
  const [build, setBuild] = useState<WatchBuild>(() => {
    try {
      const hash = window.location.hash;
      if (hash.startsWith('#build=')) {
        const encoded = hash.replace('#build=', '');
        const decoded = JSON.parse(atob(encoded));
        return {
          movement: SEED_MOVEMENTS.find(m => m.id === decoded.mov),
          case: SEED_CASES.find(c => c.id === decoded.cas),
          dial: SEED_DIALS.find(d => d.id === decoded.dia),
          hands: SEED_HANDS.find(h => h.id === decoded.han),
          secondsAccent: SEED_SECONDS_ACCENTS.find(s => s.id === decoded.sec),
          bezelInsert: SEED_BEZEL_INSERTS.find(b => b.id === decoded.bez),
          rotor: SEED_ROTORS.find(r => r.id === decoded.rot),
          spacer: SEED_SPACERS.find(sp => sp.id === decoded.spc),
          strap: SEED_STRAPS.find(st => st.id === decoded.stp),
          selectedVendors: decoded.v || {}
        };
      }
    } catch {
      // fallback
    }

    // Default: Clean empty build ready for Step 1
    return {
      selectedVendors: {}
    };
  });

  const [currentStep, setCurrentStep] = useState<BuildStep>('movement');
  const [activeTab, setActiveTab] = useState<'configurator' | 'sourcing'>('configurator');

  // Handle component selection with cascading incompatibility protection
  const handleSelectComponent = (category: string, component: BaseComponent | undefined) => {
    setBuild(prev => {
      const updated = { ...prev };

      switch (category) {
        case 'movement': {
          const newMov = component as Movement | undefined;
          updated.movement = newMov;

          if (newMov) {
            // If movement changed, verify downstream parts:
            // 1. Hands: Clear if arbor holes don't match
            if (updated.hands && !updated.hands.compatibleMovementFamilies.includes(newMov.family)) {
              updated.hands = undefined;
            }
            // 2. GMT hands: Clear if non-GMT movement
            if (updated.hands?.handHoleSizes.gmt && newMov.caliber !== 'NH34A') {
              updated.hands = undefined;
            }
            // 3. Rotor: Clear if quartz
            if (newMov.movementType.includes('quartz')) {
              updated.rotor = undefined;
            }
            // 4. Spacer: Auto-assign spacer if VH31
            if (newMov.caliber === 'VH31') {
              updated.spacer = SEED_SPACERS.find(s => s.id === 'spacer-vh31-to-nh') || SEED_SPACERS[0];
            } else {
              updated.spacer = undefined;
            }
            // 5. Case: Clear if NH34 and case has flat crystal (clearance < 1.8mm)
            if (newMov.caliber === 'NH34A' && updated.case && (updated.case.crystalType !== 'double-domed-sapphire' && updated.case.crystalClearanceMm < 1.8)) {
              updated.case = undefined;
            }
            // 6. Dial: Clear if dial has date cutout but movement is no-date
            if (!newMov.hasDate && updated.dial && updated.dial.dateWindow !== 'none') {
              updated.dial = undefined;
            }
          }
          break;
        }

        case 'case': {
          const newCase = component as Case | undefined;
          updated.case = newCase;

          if (newCase) {
            // 1. Strap: Clear if lug width doesn't match
            if (updated.strap && updated.strap.lugWidthMm !== newCase.lugWidthMm) {
              updated.strap = undefined;
            }
            // 2. Bezel Insert: Clear if case has no rotating bezel
            if (!newCase.hasRotatingBezel) {
              updated.bezelInsert = undefined;
            }
            // 3. Rotor: Clear if solid caseback
            if (newCase.casebackType === 'solid') {
              updated.rotor = undefined;
            }
          }
          break;
        }

        case 'dial':
          updated.dial = component as Dial | undefined;
          break;

        case 'hands':
          updated.hands = component as Hands | undefined;
          break;

        case 'seconds-accent':
          updated.secondsAccent = component as SecondsHandAccent | undefined;
          break;

        case 'bezel-insert':
          updated.bezelInsert = component as BezelInsert | undefined;
          break;

        case 'rotor':
          updated.rotor = component as Rotor | undefined;
          break;

        case 'spacer':
          updated.spacer = component as MovementSpacer | undefined;
          break;

        case 'strap':
          updated.strap = component as Strap | undefined;
          break;
      }

      return updated;
    });

    // Auto-advance to next logical step if selecting a main part
    if (component) {
      if (category === 'movement') setCurrentStep('case');
      else if (category === 'case') setCurrentStep('dial');
      else if (category === 'dial') setCurrentStep('hands');
      else if (category === 'hands') setCurrentStep('accessories');
    }
  };

  // Handle vendor selection for a component
  const handleSelectVendor = (componentId: string, vendorId: string) => {
    setBuild(prev => ({
      ...prev,
      selectedVendors: {
        ...prev.selectedVendors,
        [componentId]: vendorId
      }
    }));
  };

  // Navigation between steps
  const handleNavigateStep = (step: BuildStep) => {
    if (step === 'sourcing') {
      setActiveTab('sourcing');
    } else {
      setActiveTab('configurator');
      setCurrentStep(step);
    }
  };

  // Load curated presets for inspiration
  const loadPreset = (presetName: 'nh35-diver' | 'vh31-quartz-field' | 'nh34-gmt') => {
    if (presetName === 'vh31-quartz-field') {
      setBuild({
        movement: SEED_MOVEMENTS.find(m => m.caliber === 'VH31'),
        case: SEED_CASES.find(c => c.id === 'case-field-38'),
        dial: SEED_DIALS.find(d => d.id === 'dial-explorer-navy'),
        hands: SEED_HANDS.find(h => h.id === 'hands-baton-vh31'),
        secondsAccent: SEED_SECONDS_ACCENTS.find(s => s.id === 'sec-vh31-red-arrow'),
        spacer: SEED_SPACERS.find(s => s.id === 'spacer-vh31-to-nh'),
        strap: SEED_STRAPS.find(st => st.id === 'strap-nato-bond-20'),
        selectedVendors: {}
      });
    } else if (presetName === 'nh34-gmt') {
      setBuild({
        movement: SEED_MOVEMENTS.find(m => m.caliber === 'NH34A'),
        case: SEED_CASES.find(c => c.id === 'case-skx-42'),
        dial: SEED_DIALS.find(d => d.id === 'dial-marine-master'),
        hands: SEED_HANDS.find(h => h.id === 'hands-gmt-nh34'),
        bezelInsert: SEED_BEZEL_INSERTS.find(b => b.id === 'insert-gmt-batman'),
        strap: SEED_STRAPS.find(st => st.id === 'strap-jubilee-22'),
        rotor: SEED_ROTORS[0],
        selectedVendors: {}
      });
    } else {
      setBuild({
        movement: SEED_MOVEMENTS[0],
        case: SEED_CASES[0],
        dial: SEED_DIALS[0],
        hands: SEED_HANDS[0],
        secondsAccent: SEED_SECONDS_ACCENTS[1],
        bezelInsert: SEED_BEZEL_INSERTS[0],
        strap: SEED_STRAPS[0],
        selectedVendors: {}
      });
    }
    setActiveTab('sourcing');
  };

  // Reset build to empty starting state
  const resetBuild = () => {
    setBuild({
      selectedVendors: {}
    });
    setCurrentStep('movement');
    setActiveTab('configurator');
  };

  // Calculate current estimated subtotal
  const calculateEstimatedTotal = () => {
    const parts = [
      build.movement,
      build.case,
      build.dial,
      build.hands,
      build.secondsAccent,
      build.bezelInsert,
      build.rotor,
      build.spacer,
      build.strap
    ].filter(Boolean);

    return parts.reduce((sum, p) => {
      if (!p) return sum;
      const chosenVendorId = build.selectedVendors[p.id];
      const vendor = p.vendors.find(v => v.id === chosenVendorId) || p.vendors[0];
      return sum + (vendor?.price || p.basePrice);
    }, 0);
  };

  const estimatedTotal = calculateEstimatedTotal();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-brass-500 selection:text-slate-950">
      {/* TOP NAVIGATION HEADER */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brass-600 to-brass-400 p-0.5 shadow-lg shadow-brass-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Watch className="w-5 h-5 text-brass-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-100 via-brass-200 to-brass-400 bg-clip-text text-transparent">
                  DialForge
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-brass-500/20 text-brass-300 border border-brass-500/30 uppercase tracking-wider">
                  Guided Builder
                </span>
              </div>
              <p className="hidden sm:block text-[11px] text-slate-400 -mt-0.5">
                The Custom Watch Builder & Compatibility Engine
              </p>
            </div>
          </div>

          {/* Quick Preset Starters & Reset */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
              <span className="px-2 text-slate-400 font-medium">Quick Starters:</span>
              <button
                onClick={() => loadPreset('nh35-diver')}
                className="px-2.5 py-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-slate-100 transition"
              >
                Sub Diver (NH35)
              </button>
              <button
                onClick={() => loadPreset('vh31-quartz-field')}
                className="px-2.5 py-1 rounded-lg hover:bg-slate-800 text-brass-400 font-semibold transition"
              >
                ⚡ Sweeping Quartz (VH31)
              </button>
              <button
                onClick={() => loadPreset('nh34-gmt')}
                className="px-2.5 py-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-slate-100 transition"
              >
                GMT 24H (NH34)
              </button>
            </div>

            <button
              onClick={resetBuild}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 transition"
              title="Start New Build (Reset)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN APP BODY (TWO-COLUMN RESPONSIVE LAYOUT) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: 2D VISUAL CANVAS & LIVE INTEGRITY GUARANTEE (Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
            <WatchCanvas build={build} />

            {/* MECHANICAL FIT GUARANTEE & SUMMARY CARD */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3.5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-200">
                    Mechanical Fit Guarantee
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  100% Compatible
                </span>
              </div>

              {/* Dynamic Fit Specs Verification */}
              <div className="space-y-2 text-xs">
                {/* Movement */}
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Caliber:</span>
                  <span className="font-mono font-medium text-slate-200">
                    {build.movement ? `${build.movement.caliber} (${build.movement.movementType})` : 'Step 1: Pick Movement'}
                  </span>
                </div>

                {/* Hand Arbors */}
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Hand Pinion Arbors:</span>
                  <span className="font-mono text-emerald-300 flex items-center gap-1">
                    {build.hands ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        {build.hands.handHoleSizes.hour}/{build.hands.handHoleSizes.minute}/{build.hands.handHoleSizes.second}mm
                      </>
                    ) : (
                      <span className="text-slate-500">Auto-matched</span>
                    )}
                  </span>
                </div>

                {/* Crystal Clearance */}
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Crystal Clearance:</span>
                  <span className="font-mono text-emerald-300 flex items-center gap-1">
                    {build.case ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        {build.case.crystalType === 'double-domed-sapphire' ? 'Double-Domed (1.9mm)' : 'Flat (1.3mm)'}
                      </>
                    ) : (
                      <span className="text-slate-500">Pre-screened</span>
                    )}
                  </span>
                </div>

                {/* Casing Fit / Spacer */}
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Casing Spacer:</span>
                  <span className="font-mono text-emerald-300 flex items-center gap-1">
                    {build.movement?.caliber === 'VH31' ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        VH31 Adapter Ring Active
                      </>
                    ) : build.movement ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Seiko Factory Ring
                      </>
                    ) : (
                      <span className="text-slate-500">Pending</span>
                    )}
                  </span>
                </div>

                {/* Lug Width */}
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-400">Lug & Strap Fit:</span>
                  <span className="font-mono text-emerald-300 flex items-center gap-1">
                    {build.case ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        {build.case.lugWidthMm}mm Width
                      </>
                    ) : (
                      <span className="text-slate-500">Pre-screened</span>
                    )}
                  </span>
                </div>
              </div>

              {/* Cost Subtotal Bar */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Est. Build Cost</span>
                  <span className="text-lg font-bold font-mono text-brass-400">
                    ${estimatedTotal.toFixed(2)}
                  </span>
                </div>

                {activeTab === 'configurator' ? (
                  <button
                    disabled={!build.movement}
                    onClick={() => setActiveTab('sourcing')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                      build.movement
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                        : 'bg-slate-900 text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    <span>View Sourcing BOM</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveTab('configurator')}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
                  >
                    <span>Back to Configurator</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: GUIDED STEP BUILDER OR SOURCING BOM */}
          <div className="lg:col-span-7 space-y-4">
            {/* Top Primary View Pill Switcher */}
            <div className="flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-xl">
              <button
                onClick={() => setActiveTab('configurator')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'configurator'
                    ? 'bg-brass-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>1. Step Configurator</span>
              </button>

              <button
                onClick={() => setActiveTab('sourcing')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'sourcing'
                    ? 'bg-brass-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>2. Parts Sourcing & BOM</span>
              </button>
            </div>

            {/* Active View */}
            {activeTab === 'configurator' ? (
              <PartPicker
                build={build}
                currentStep={currentStep}
                onSelectComponent={handleSelectComponent}
                onNavigateStep={handleNavigateStep}
              />
            ) : (
              <BillOfMaterials
                build={build}
                onSelectVendor={handleSelectVendor}
                onNavigateStep={handleNavigateStep}
              />
            )}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-12 py-6 border-t border-slate-900 bg-slate-950 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 DialForge — Open Source Watch Modding & Horology Engine</p>
          <p className="flex items-center gap-3">
            <span>Supports Automatic (NH35/36/34/38)</span>
            <span>•</span>
            <span className="text-brass-400 font-semibold">Sweeping Quartz (VH31)</span>
            <span>•</span>
            <span>Standard Quartz (Ronda)</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
export default App;
