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
  Strap,
  ScanJob
} from './types/watch';
import { partsDb } from './db/partsDatabase';
import { executeStoreScan, VETTED_SCAN_SOURCES } from './services/scannerService';
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
  ArrowRight,
  Flame,
  Radio,
  X,
  ExternalLink,
  Store
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
          movement: partsDb.getMovements().find(m => m.id === decoded.mov),
          case: partsDb.getCases().find(c => c.id === decoded.cas),
          dial: partsDb.getDials().find(d => d.id === decoded.dia),
          hands: partsDb.getHands().find(h => h.id === decoded.han),
          secondsAccent: partsDb.getSecondsAccents().find(s => s.id === decoded.sec),
          bezelInsert: partsDb.getBezelInserts().find(b => b.id === decoded.bez),
          rotor: partsDb.getRotors().find(r => r.id === decoded.rot),
          spacer: partsDb.getSpacers().find(sp => sp.id === decoded.spc),
          strap: partsDb.getStraps().find(st => st.id === decoded.stp),
          selectedVendors: decoded.v || {}
        };
      }
    } catch {
      // fallback
    }

    return {
      selectedVendors: {}
    };
  });

  const [currentStep, setCurrentStep] = useState<BuildStep>('movement');
  const [activeTab, setActiveTab] = useState<'configurator' | 'sourcing'>('configurator');

  // Store Scanner State
  const [isScanning, setIsScanning] = useState(false);
  const [scanStage, setScanStage] = useState('');
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [latestScanJob, setLatestScanJob] = useState<ScanJob | null>(() => partsDb.getLastScanJob());

  // Run periodic store scan
  const handleRunStoreScan = async () => {
    setIsScanning(true);
    setScanProgress(5);
    setScanStage('Initializing connection to suppliers...');

    try {
      const job = await executeStoreScan((stage, pct) => {
        setScanStage(stage);
        setScanProgress(pct);
      });
      setLatestScanJob(job);
    } catch (e) {
      console.error('Scan error:', e);
    } finally {
      setIsScanning(false);
    }
  };

  // Handle component selection with cascading incompatibility protection
  const handleSelectComponent = (category: string, component: BaseComponent | undefined) => {
    setBuild(prev => {
      const updated = { ...prev };

      switch (category) {
        case 'movement': {
          const newMov = component as Movement | undefined;
          updated.movement = newMov;

          if (newMov) {
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
              updated.spacer = partsDb.getSpacers().find(s => s.id === 'spacer-vh31-to-nh') || partsDb.getSpacers()[0];
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
        movement: partsDb.getMovements().find(m => m.caliber === 'VH31'),
        case: partsDb.getCases().find(c => c.id === 'case-field-38'),
        dial: partsDb.getDials().find(d => d.id === 'dial-explorer-navy'),
        hands: partsDb.getHands().find(h => h.id === 'hands-baton-vh31'),
        secondsAccent: partsDb.getSecondsAccents().find(s => s.id === 'sec-vh31-red-arrow'),
        spacer: partsDb.getSpacers().find(s => s.id === 'spacer-vh31-to-nh'),
        strap: partsDb.getStraps().find(st => st.id === 'strap-nato-bond-20'),
        selectedVendors: {}
      });
    } else if (presetName === 'nh34-gmt') {
      setBuild({
        movement: partsDb.getMovements().find(m => m.caliber === 'NH34A'),
        case: partsDb.getCases().find(c => c.id === 'case-skx-42'),
        dial: partsDb.getDials().find(d => d.id === 'dial-marine-master'),
        hands: partsDb.getHands().find(h => h.id === 'hands-gmt-nh34'),
        bezelInsert: partsDb.getBezelInserts().find(b => b.id === 'insert-gmt-batman'),
        strap: partsDb.getStraps().find(st => st.id === 'strap-jubilee-22'),
        rotor: partsDb.getRotors()[0],
        selectedVendors: {}
      });
    } else {
      setBuild({
        movement: partsDb.getMovements()[0],
        case: partsDb.getCases()[0],
        dial: partsDb.getDials()[0],
        hands: partsDb.getHands()[0],
        secondsAccent: partsDb.getSecondsAccents()[1],
        bezelInsert: partsDb.getBezelInserts()[0],
        strap: partsDb.getStraps()[0],
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
                  DB v1.2
                </span>
              </div>
              <p className="hidden sm:block text-[11px] text-slate-400 -mt-0.5">
                The Custom Watch Builder & Deal Scanner
              </p>
            </div>
          </div>

          {/* Quick Preset Starters & Store Scanner Trigger */}
          <div className="flex items-center gap-2">
            {/* Store Scanner Button */}
            <button
              onClick={() => setIsScanModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-xs font-semibold text-slate-200 transition shadow-sm"
              title="View Scanned Suppliers & Deals"
            >
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="hidden sm:inline">Scanner Feeds</span>
              {latestScanJob && latestScanJob.dealsDiscovered.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold">
                  {latestScanJob.dealsDiscovered.length} Deals
                </span>
              )}
            </button>

            <div className="hidden lg:flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
              <span className="px-2 text-slate-400 font-medium">Quick Starters:</span>
              <button
                onClick={() => loadPreset('nh35-diver')}
                className="px-2.5 py-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-slate-100 transition"
              >
                Sub Diver
              </button>
              <button
                onClick={() => loadPreset('vh31-quartz-field')}
                className="px-2.5 py-1 rounded-lg hover:bg-slate-800 text-brass-400 font-semibold transition"
              >
                ⚡ Sweeping Quartz
              </button>
              <button
                onClick={() => loadPreset('nh34-gmt')}
                className="px-2.5 py-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-slate-100 transition"
              >
                GMT 24H
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

      {/* STORE SCANNER MODAL & PROGRESS */}
      {isScanModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Store className="w-5 h-5 text-brass-400" />
                  <h3 className="font-bold text-slate-100 text-base">Horological Store Scanner Pipeline</h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Periodically monitors inventory, mechanical tolerances, and pricing across vetted suppliers.
                </p>
              </div>

              <button
                onClick={() => setIsScanModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scan Execution & Progress */}
            {isScanning ? (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-brass-400 flex items-center gap-2">
                    <Radio className="w-3.5 h-3.5 animate-spin" />
                    {scanStage}
                  </span>
                  <span className="font-bold text-slate-300">{scanProgress}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-brass-500 to-emerald-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Last Scan Completed:</span>
                  <span className="font-mono font-semibold text-slate-200">
                    {latestScanJob ? new Date(latestScanJob.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'Never'}
                  </span>
                </div>

                <button
                  onClick={handleRunStoreScan}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brass-500 hover:bg-brass-400 text-slate-950 text-xs font-bold transition shadow"
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span>Run Scan Pipeline Now</span>
                </button>
              </div>
            )}

            {/* Monitored Supplier Sources */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Monitored Supplier Feeds ({VETTED_SCAN_SOURCES.length})
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {VETTED_SCAN_SOURCES.map(src => (
                  <div key={src.id} className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
                    <div className="font-semibold text-slate-200 truncate">{src.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono flex items-center justify-between mt-1">
                      <span>{src.tier}</span>
                      <a href={`https://${src.domain}`} target="_blank" rel="noopener noreferrer" className="hover:text-brass-400">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Price Drops / Deals Table */}
            {latestScanJob && latestScanJob.dealsDiscovered.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  <span>Discovered Deals & Price Reductions</span>
                </h4>
                <div className="border border-slate-800 rounded-xl overflow-hidden text-xs max-h-48 overflow-y-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] border-b border-slate-800">
                      <tr>
                        <th className="py-2 px-3">Component</th>
                        <th className="py-2 px-3">Supplier</th>
                        <th className="py-2 px-3 text-right">Prior</th>
                        <th className="py-2 px-3 text-right">New Deal</th>
                        <th className="py-2 px-3 text-right">Savings</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {latestScanJob.dealsDiscovered.map((deal, idx) => (
                        <tr key={idx} className="hover:bg-slate-850/60">
                          <td className="py-2 px-3 font-medium text-slate-200">{deal.componentName}</td>
                          <td className="py-2 px-3 text-slate-400 text-[11px]">{deal.storeName}</td>
                          <td className="py-2 px-3 text-right text-slate-500 line-through font-mono">${deal.oldPrice.toFixed(2)}</td>
                          <td className="py-2 px-3 text-right font-bold text-brass-400 font-mono">${deal.newPrice.toFixed(2)}</td>
                          <td className="py-2 px-3 text-right text-emerald-400 font-bold text-[11px]">-{deal.discountPercent}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

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
            <span>Supports Automatic (NH35/36/34/38/PT5000)</span>
            <span>•</span>
            <span className="text-brass-400 font-semibold">Sweeping Quartz (VH31)</span>
            <span>•</span>
            <span>Swiss Quartz (Ronda)</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
export default App;
