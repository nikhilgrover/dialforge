import { useState } from 'react';
import type {
  WatchBuild,
  PartCategory,
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
import { checkCompatibility } from './utils/compatibility';
import { WatchCanvas } from './components/WatchCanvas';
import { PartPicker } from './components/PartPicker';
import { CompatibilityPanel } from './components/CompatibilityPanel';
import { BillOfMaterials } from './components/BillOfMaterials';
import {
  Watch,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Layers,
  ShieldCheck,
  FileText
} from 'lucide-react';

export function App() {
  // Preset default build: Classic Diver
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

    return {
      movement: SEED_MOVEMENTS[0], // NH35
      case: SEED_CASES[0],         // 40mm Sub Diver
      dial: SEED_DIALS[0],         // Marine Master Matte Black
      hands: SEED_HANDS[0],        // Mercedes Hands
      secondsAccent: SEED_SECONDS_ACCENTS[1], // Red arrow second
      bezelInsert: SEED_BEZEL_INSERTS[0],     // Ceramic black insert
      strap: SEED_STRAPS[0],       // Oyster Steel 20mm
      selectedVendors: {}
    };
  });

  const [activeTab, setActiveTab] = useState<'picker' | 'compatibility' | 'bom'>('picker');

  // Evaluate compatibility whenever build changes
  const report = checkCompatibility(build);

  // Handle component selection
  const handleSelectComponent = (category: PartCategory, component: BaseComponent | undefined) => {
    setBuild(prev => {
      const updated = { ...prev };
      switch (category) {
        case 'movement': updated.movement = component as Movement | undefined; break;
        case 'case': updated.case = component as Case | undefined; break;
        case 'dial': updated.dial = component as Dial | undefined; break;
        case 'hands': updated.hands = component as Hands | undefined; break;
        case 'seconds-accent': updated.secondsAccent = component as SecondsHandAccent | undefined; break;
        case 'bezel-insert': updated.bezelInsert = component as BezelInsert | undefined; break;
        case 'rotor': updated.rotor = component as Rotor | undefined; break;
        case 'spacer': updated.spacer = component as MovementSpacer | undefined; break;
        case 'strap': updated.strap = component as Strap | undefined; break;
      }
      return updated;
    });
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

  // Quick fix handler: automatically add missing required item (e.g. spacer)
  const handleAddRequiredItem = (category: PartCategory) => {
    if (category === 'spacer') {
      const sp = SEED_SPACERS.find(s => s.name.toLowerCase().includes('vh31')) || SEED_SPACERS[0];
      handleSelectComponent('spacer', sp);
    }
  };

  // Load curated presets
  const loadPreset = (presetName: 'nh35-diver' | 'vh31-quartz-field' | 'nh34-gmt') => {
    if (presetName === 'vh31-quartz-field') {
      setBuild({
        movement: SEED_MOVEMENTS.find(m => m.caliber === 'VH31'),
        case: SEED_CASES.find(c => c.id === 'case-field-38'),
        dial: SEED_DIALS.find(d => d.id === 'dial-field-military'),
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
  };

  // Reset build
  const resetBuild = () => {
    setBuild({
      selectedVendors: {}
    });
  };

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
                  v1.0
                </span>
              </div>
              <p className="hidden sm:block text-[11px] text-slate-400 -mt-0.5">
                The Custom Watch Builder & Compatibility Engine
              </p>
            </div>
          </div>

          {/* Preset Builder Dropdown & Quick Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
              <span className="px-2 text-slate-400 font-medium">Presets:</span>
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
              title="Reset Build"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN APP BODY (TWO-COLUMN RESPONSIVE LAYOUT) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: 2D VISUAL CANVAS & LIVE STATS (Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
            <WatchCanvas build={build} />

            {/* Quick Status / Compatibility Callout */}
            <div className={`p-4 rounded-xl border flex items-center justify-between text-xs transition ${
              report.isValid
                ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                : 'bg-rose-950/20 border-rose-800/40 text-rose-300'
            }`}>
              <div className="flex items-center gap-2">
                {report.isValid ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <div>
                  <div className="font-semibold text-slate-100">
                    {report.isValid ? 'Build is 100% Mechanically Sound' : `${report.errorCount} Dimensional Issue(s)`}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {report.warningCount > 0 && `${report.warningCount} warning(s) • `}
                    Click "Compatibility" tab to view tolerance report
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('compatibility')}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition text-[11px]"
              >
                Inspect
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: CONFIGURATOR TABS & DETAILS */}
          <div className="lg:col-span-7 space-y-4">
            {/* Tab Navigation Pill Bar */}
            <div className="flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-xl">
              <button
                onClick={() => setActiveTab('picker')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'picker'
                    ? 'bg-brass-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Components Configurator</span>
              </button>

              <button
                onClick={() => setActiveTab('compatibility')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'compatibility'
                    ? 'bg-brass-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Compatibility ({report.issues.length})</span>
                {report.errorCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('bom')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'bom'
                    ? 'bg-brass-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Parts & Sourcing List</span>
              </button>
            </div>

            {/* Active Tab View */}
            {activeTab === 'picker' && (
              <PartPicker
                build={build}
                onSelectComponent={handleSelectComponent}
                onSelectVendor={handleSelectVendor}
              />
            )}

            {activeTab === 'compatibility' && (
              <CompatibilityPanel
                report={report}
                onAddRequiredItem={handleAddRequiredItem}
              />
            )}

            {activeTab === 'bom' && (
              <BillOfMaterials
                build={build}
                report={report}
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
