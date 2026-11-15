import React, { useState, useMemo, useCallback } from 'react';
import type {
  WatchBuild,
  BuildStep,
  BaseComponent
} from '../types/watch';
import { partsDb } from '../db/partsDatabase';
import {
  Cpu,
  Watch,
  CircleDot,
  Clock,
  Sparkles,
  Wrench,
  Check,
  ArrowRight,
  ArrowLeft,
  Info,
  CheckCircle2,
  Search,
  X,
  Flame
} from 'lucide-react';

interface PartPickerProps {
  build: WatchBuild;
  currentStep: BuildStep;
  onSelectComponent: (category: string, component: BaseComponent | undefined) => void;
  onNavigateStep: (step: BuildStep) => void;
}

export const PartPicker: React.FC<PartPickerProps> = ({
  build,
  currentStep,
  onSelectComponent,
  onNavigateStep
}) => {
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [styleFilter, setStyleFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'deals'>('featured');

  // Step definitions
  const steps: { id: BuildStep; label: string; icon: React.ElementType }[] = [
    { id: 'movement', label: '1. Movement', icon: Cpu },
    { id: 'case', label: '2. Case', icon: Watch },
    { id: 'dial', label: '3. Dial', icon: CircleDot },
    { id: 'hands', label: '4. Hands', icon: Clock },
    { id: 'accessories', label: '5. Accessories', icon: Sparkles }
  ];

  // Helper to determine step availability
  const isStepUnlocked = (stepId: BuildStep): boolean => {
    switch (stepId) {
      case 'movement': return true;
      case 'case': return !!build.movement;
      case 'dial': return !!build.movement && !!build.case;
      case 'hands': return !!build.movement && !!build.case && !!build.dial;
      case 'accessories': return !!build.movement && !!build.case && !!build.dial && !!build.hands;
      case 'sourcing': return !!build.movement && !!build.case && !!build.dial && !!build.hands;
      default: return false;
    }
  };

  // Helper: check if component has an active special deal
  const hasActiveDeal = (comp: BaseComponent): boolean => {
    return comp.vendors.some(v => v.isSpecialDeal);
  };

  // Helper: sort components
  const sortComponents = useCallback(<T extends BaseComponent>(items: T[]): T[] => {
    return [...items].sort((a, b) => {
      if (sortBy === 'deals') {
        const aDeal = hasActiveDeal(a) ? 1 : 0;
        const bDeal = hasActiveDeal(b) ? 1 : 0;
        if (aDeal !== bDeal) return bDeal - aDeal;
      }
      if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
      if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
      return 0; // featured default
    });
  }, [sortBy]);

  // -------------------------------------------------------------
  // STEP 1: MOVEMENTS
  // -------------------------------------------------------------
  const allMovements = partsDb.getMovements();
  const filteredMovements = useMemo(() => {
    let list = allMovements;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(m => m.name.toLowerCase().includes(q) || m.caliber.toLowerCase().includes(q) || m.description.toLowerCase().includes(q));
    }
    if (styleFilter !== 'all') {
      if (styleFilter === 'automatic') list = list.filter(m => m.movementType === 'automatic');
      else if (styleFilter === 'quartz') list = list.filter(m => m.movementType.includes('quartz'));
      else if (styleFilter === 'gmt') list = list.filter(m => m.hasGmt);
    }
    return sortComponents(list);
  }, [allMovements, searchQuery, styleFilter, sortComponents]);

  const renderMovementStep = () => (
    <div className="space-y-4">
      {/* Category Header & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-semibold text-slate-400 mr-1">Filter:</span>
          {['all', 'automatic', 'quartz', 'gmt'].map(flt => (
            <button
              key={flt}
              onClick={() => setStyleFilter(flt)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize transition ${
                styleFilter === flt
                  ? 'bg-brass-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {flt === 'all' ? 'All Movements' : flt}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search caliber..."
              className="bg-slate-900 border border-slate-700/80 rounded-lg pl-8 pr-7 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brass-500 w-36 sm:w-48"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1 text-xs text-slate-300 focus:outline-none focus:border-brass-500"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="deals">🔥 Deals First</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMovements.map(mov => {
          const isSelected = build.movement?.id === mov.id;
          const isDeal = hasActiveDeal(mov);

          return (
            <div
              key={mov.id}
              className={`p-4 rounded-xl border transition flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-850 border-brass-500 shadow-lg shadow-brass-500/10 ring-1 ring-brass-500/40'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-brass-500/15 text-brass-300 border border-brass-500/30">
                        {mov.caliber}
                      </span>
                      {mov.movementType === 'quartz-sweeping' && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-sky-500/15 text-sky-300 border border-sky-500/30">
                          ⚡ 4 bps Sweep
                        </span>
                      )}
                      {mov.caliber === 'NH34A' && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          GMT 24H
                        </span>
                      )}
                      {isDeal && (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                          <Flame className="w-3 h-3 text-rose-400" /> Deal
                        </span>
                      )}
                    </div>
                    <h4 className="font-semibold text-slate-100 text-sm mt-1.5">{mov.name}</h4>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {mov.description}
                </p>

                {/* Specs */}
                <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-slate-800/80 text-[11px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {mov.beatsPerHour.toLocaleString()} BPH ({mov.beatsPerSecond} Hz)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {mov.diameterMm}mm × {mov.thicknessMm}mm
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-brass-300">
                    Holes: {mov.handHoleSizes.hour}/{mov.handHoleSizes.minute}/{mov.handHoleSizes.second}mm
                  </span>
                  {mov.batteryModel && (
                    <span className="px-2 py-0.5 rounded bg-sky-950/60 text-sky-300 border border-sky-800/40">
                      Battery: {mov.batteryModel}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">From</span>
                  <span className="text-sm font-bold font-mono text-slate-100">${mov.basePrice.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => onSelectComponent('movement', mov)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition ${
                    isSelected
                      ? 'bg-brass-500 text-slate-950 font-bold shadow'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  {isSelected ? '✓ Selected' : 'Select Caliber'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // -------------------------------------------------------------
  // STEP 2: CASES (Filtered strictly to movement)
  // -------------------------------------------------------------
  const allCases = partsDb.getCases();
  const compatibleCases = useMemo(() => {
    const mov = build.movement;
    if (!mov) return [];

    let list = allCases.filter(c => {
      // If NH34 GMT: Must have double-domed sapphire (clearance >= 1.8mm)
      if (mov.caliber === 'NH34A') {
        return c.crystalType === 'double-domed-sapphire' || c.crystalClearanceMm >= 1.8;
      }
      // For NH automatic calibers (NH35, NH36, NH38)
      if (mov.family === 'NH') {
        return c.nativeMovementFamily === 'NH';
      }
      // For VH31 sweeping quartz: Fits inside 28.5mm NH cavity cases via casing adapter spacer
      if (mov.caliber === 'VH31') {
        return c.nativeMovementFamily === 'NH' && c.dialDiameterFitMm >= 28.5;
      }
      return true;
    });

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(c => c.name.toLowerCase().includes(q) || c.caseStyle.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
    }

    if (styleFilter !== 'all') {
      list = list.filter(c => c.caseStyle === styleFilter);
    }

    return sortComponents(list);
  }, [allCases, build.movement, searchQuery, styleFilter, sortComponents]);

  const renderCaseStep = () => {
    const mov = build.movement;
    if (!mov) return null;

    return (
      <div className="space-y-4">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-semibold text-slate-400 mr-1">Style:</span>
            {['all', 'diver', 'explorer', 'field', 'pilot', 'datejust'].map(flt => (
              <button
                key={flt}
                onClick={() => setStyleFilter(flt)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize transition ${
                  styleFilter === flt
                    ? 'bg-brass-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {flt === 'all' ? 'All Styles' : flt}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search case..."
                className="bg-slate-900 border border-slate-700/80 rounded-lg pl-8 pr-7 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brass-500 w-36 sm:w-48"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1 text-xs text-slate-300 focus:outline-none focus:border-brass-500"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="deals">🔥 Deals First</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {compatibleCases.map(c => {
            const isSelected = build.case?.id === c.id;
            const isDeal = hasActiveDeal(c);

            return (
              <div
                key={c.id}
                className={`p-4 rounded-xl border transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-850 border-brass-500 shadow-lg shadow-brass-500/10 ring-1 ring-brass-500/40'
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700 uppercase">
                          {c.caseStyle} • {c.outerDiameterMm}mm
                        </span>
                        {c.crystalType === 'double-domed-sapphire' && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                            Double-Domed Sapphire
                          </span>
                        )}
                        {isDeal && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                            <Flame className="w-3 h-3 text-rose-400" /> Deal
                          </span>
                        )}
                      </div>
                      <h4 className="font-semibold text-slate-100 text-sm mt-1.5">{c.name}</h4>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {c.description}
                  </p>

                  {/* Specs */}
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-slate-800/80 text-[11px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      Lug: {c.lugWidthMm}mm
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      Crown: {c.crownPosition}:00
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      WR: {c.waterResistanceM}M
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      Back: {c.casebackType}
                    </span>
                    {mov.caliber === 'VH31' && (
                      <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                        ✓ Fits via Spacer
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">From</span>
                    <span className="text-sm font-bold font-mono text-slate-100">${c.basePrice.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={() => onSelectComponent('case', c)}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition ${
                      isSelected
                        ? 'bg-brass-500 text-slate-950 font-bold shadow'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    {isSelected ? '✓ Selected' : 'Select Case'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // -------------------------------------------------------------
  // STEP 3: DIALS (Filtered to Movement Complication & Case)
  // -------------------------------------------------------------
  const allDials = partsDb.getDials();
  const compatibleDials = useMemo(() => {
    const mov = build.movement;
    const watchCase = build.case;
    if (!mov || !watchCase) return [];

    let list = allDials.filter(d => {
      // Must match case cavity diameter (28.5mm)
      if (Math.abs(d.diameterMm - watchCase.dialDiameterFitMm) > 0.5) return false;

      // If movement is no-date (NH38 or VH31), only show sterile dials
      if (!mov.hasDate) {
        return d.dateWindow === 'none';
      }

      return true;
    });

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(d => d.name.toLowerCase().includes(q) || d.dialStyle.toLowerCase().includes(q) || d.colorName.toLowerCase().includes(q));
    }

    if (styleFilter !== 'all') {
      list = list.filter(d => d.dialStyle === styleFilter);
    }

    return sortComponents(list);
  }, [allDials, build.movement, build.case, searchQuery, styleFilter, sortComponents]);

  const renderDialStep = () => {
    const mov = build.movement;
    const watchCase = build.case;
    if (!mov || !watchCase) return null;

    return (
      <div className="space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-semibold text-slate-400 mr-1">Style:</span>
            {['all', 'diver', 'explorer', 'field', 'dress', 'flieger', 'minimalist'].map(flt => (
              <button
                key={flt}
                onClick={() => setStyleFilter(flt)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize transition ${
                  styleFilter === flt
                    ? 'bg-brass-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {flt === 'all' ? 'All Dials' : flt}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search dial..."
                className="bg-slate-900 border border-slate-700/80 rounded-lg pl-8 pr-7 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brass-500 w-36 sm:w-48"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1 text-xs text-slate-300 focus:outline-none focus:border-brass-500"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="deals">🔥 Deals First</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {compatibleDials.map(d => {
            const isSelected = build.dial?.id === d.id;
            const isDeal = hasActiveDeal(d);

            return (
              <div
                key={d.id}
                className={`p-4 rounded-xl border transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-850 border-brass-500 shadow-lg shadow-brass-500/10 ring-1 ring-brass-500/40'
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-full border border-slate-700 inline-block shrink-0" style={{ backgroundColor: d.colorHex }} />
                        <span className="font-semibold text-slate-100 text-sm">{d.name}</span>
                        {isDeal && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                            <Flame className="w-3 h-3 text-rose-400" /> Deal
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {d.colorName} • {d.texture} texture
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {d.description}
                  </p>

                  {/* Specs */}
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-slate-800/80 text-[11px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      Dia: {d.diameterMm}mm
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      Lume: {d.lume}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      Date: {d.dateWindow === 'none' ? 'Sterile' : `${d.dateWindow}:00 Window`}
                    </span>
                    {mov.movementType.includes('quartz') ? (
                      <span className="px-2 py-0.5 rounded bg-sky-950/60 text-sky-300 border border-sky-800/40">
                        Dial Dots Mount
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                        Factory Feet: {d.dialFeetPositions.join(', ')}:00
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">From</span>
                    <span className="text-sm font-bold font-mono text-slate-100">${d.basePrice.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={() => onSelectComponent('dial', d)}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition ${
                      isSelected
                        ? 'bg-brass-500 text-slate-950 font-bold shadow'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    {isSelected ? '✓ Selected' : 'Select Dial'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // -------------------------------------------------------------
  // STEP 4: HANDS (Filtered to exact pinion hole sizes)
  // -------------------------------------------------------------
  const allHands = partsDb.getHands();
  const compatibleHands = useMemo(() => {
    const mov = build.movement;
    if (!mov) return [];

    let list = allHands.filter(h => {
      if (!h.compatibleMovementFamilies.includes(mov.family)) return false;
      if (mov.caliber === 'NH34A') return !!h.handHoleSizes.gmt;
      return !h.handHoleSizes.gmt;
    });

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(h => h.name.toLowerCase().includes(q) || h.handsStyle.toLowerCase().includes(q) || h.finish.toLowerCase().includes(q));
    }

    if (styleFilter !== 'all') {
      list = list.filter(h => h.handsStyle === styleFilter);
    }

    return sortComponents(list);
  }, [allHands, build.movement, searchQuery, styleFilter, sortComponents]);

  const renderHandsStep = () => {
    const mov = build.movement;
    if (!mov) return null;

    return (
      <div className="space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-semibold text-slate-400 mr-1">Style:</span>
            {['all', 'mercedes', 'snowflake', 'sword', 'baton', 'dauphine', 'flieger'].map(flt => (
              <button
                key={flt}
                onClick={() => setStyleFilter(flt)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize transition ${
                  styleFilter === flt
                    ? 'bg-brass-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {flt === 'all' ? 'All Hand Sets' : flt}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search hands..."
                className="bg-slate-900 border border-slate-700/80 rounded-lg pl-8 pr-7 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brass-500 w-36 sm:w-48"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1 text-xs text-slate-300 focus:outline-none focus:border-brass-500"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="deals">🔥 Deals First</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {compatibleHands.map(h => {
            const isSelected = build.hands?.id === h.id;
            const isDeal = hasActiveDeal(h);

            return (
              <div
                key={h.id}
                className={`p-4 rounded-xl border transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-850 border-brass-500 shadow-lg shadow-brass-500/10 ring-1 ring-brass-500/40'
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700 uppercase">
                          {h.handsStyle} style
                        </span>
                        {h.handHoleSizes.gmt && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                            4-Piece GMT
                          </span>
                        )}
                        {isDeal && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                            <Flame className="w-3 h-3 text-rose-400" /> Deal
                          </span>
                        )}
                      </div>
                      <h4 className="font-semibold text-slate-100 text-sm mt-1.5">{h.name}</h4>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {h.description}
                  </p>

                  {/* Specs */}
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-slate-800/80 text-[11px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-brass-300">
                      Holes: {h.handHoleSizes.hour}/{h.handHoleSizes.minute}/{h.handHoleSizes.second}mm
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      Lume: {h.lume}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      Finish: {h.finish}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">From</span>
                    <span className="text-sm font-bold font-mono text-slate-100">${h.basePrice.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={() => onSelectComponent('hands', h)}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition ${
                      isSelected
                        ? 'bg-brass-500 text-slate-950 font-bold shadow'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    {isSelected ? '✓ Selected' : 'Select Hands'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // -------------------------------------------------------------
  // STEP 5: ACCESSORIES (Context-Aware Finishes & Straps)
  // -------------------------------------------------------------
  const renderAccessoriesStep = () => {
    const mov = build.movement;
    const watchCase = build.case;
    if (!mov || !watchCase) return null;

    // Filter Bezel Inserts
    const compatibleInserts = watchCase.hasRotatingBezel
      ? partsDb.getBezelInserts().filter(b => {
          if (mov.caliber === 'NH34A') return b.style === 'gmt-24hr';
          return b.style !== 'gmt-24hr';
        })
      : [];

    // Filter Straps by Case Lug Width
    const compatibleStraps = partsDb.getStraps().filter(st => st.lugWidthMm === watchCase.lugWidthMm);

    // Filter Seconds Accents
    const compatibleAccents = partsDb.getSecondsAccents().filter(s =>
      s.compatibleMovementFamilies.includes(mov.family)
    );

    // Rotors: Only if automatic movement AND exhibition caseback
    const canHaveRotor = mov.movementType === 'automatic' && watchCase.casebackType === 'exhibition';

    // Spacer: If VH31, auto-selected!
    const isVh31 = mov.caliber === 'VH31';

    return (
      <div className="space-y-6">
        {/* Section 1: Bezel Insert (If rotating bezel) */}
        {watchCase.hasRotatingBezel ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                1. Bezel Insert ({watchCase.bezelInsertSize?.outerMm}mm Diver Size)
              </h5>
              {build.bezelInsert && (
                <button
                  onClick={() => onSelectComponent('bezel-insert', undefined)}
                  className="text-[11px] text-rose-400 hover:underline"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {compatibleInserts.map(b => {
                const isSelected = build.bezelInsert?.id === b.id;

                return (
                  <div
                    key={b.id}
                    onClick={() => onSelectComponent('bezel-insert', isSelected ? undefined : b)}
                    className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-slate-850 border-brass-500 shadow ring-1 ring-brass-500/30'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded-full border border-slate-700 flex overflow-hidden shrink-0">
                        <div className="w-1/2 h-full" style={{ backgroundColor: b.color1Hex }} />
                        <div className="w-1/2 h-full" style={{ backgroundColor: b.color2Hex || b.color1Hex }} />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-200 text-xs">{b.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {b.material} • from ${b.basePrice}
                        </div>
                      </div>
                    </div>

                    <button
                      className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg ${
                        isSelected ? 'bg-brass-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {isSelected ? '✓' : 'Select'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Case has a fixed smooth mirror-polished bezel (no bezel insert required).</span>
          </div>
        )}

        {/* Section 2: Movement Spacer (Auto-handled for VH31) */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            2. Movement Casing Spacer
          </h5>
          {isVh31 ? (
            <div className="p-3.5 bg-emerald-950/20 border border-emerald-800/40 rounded-xl text-xs text-emerald-300 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Wrench className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-100">VH31-to-NH Casing Adapter Ring (Auto-Included)</div>
                  <div className="text-[11px] text-emerald-400/80">
                    Precision 28.5mm Delrin ring aligns the 23.7mm VH31 movement securely inside the NH case cavity.
                  </div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                Active
              </span>
            </div>
          ) : (
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs text-slate-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Standard Seiko factory gray movement spacer ring is pre-installed on this {mov.caliber} caliber.</span>
            </div>
          )}
        </div>

        {/* Section 3: Custom Rotor */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            3. Custom Decorated Rotor
          </h5>
          {canHaveRotor ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {partsDb.getRotors().map(r => {
                const isSelected = build.rotor?.id === r.id;

                return (
                  <div
                    key={r.id}
                    onClick={() => onSelectComponent('rotor', isSelected ? undefined : r)}
                    className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-slate-850 border-brass-500 shadow ring-1 ring-brass-500/30'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-slate-200 text-xs">{r.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {r.finish.replace(/-/g, ' ')} • from ${r.basePrice}
                      </div>
                    </div>

                    <button
                      className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg ${
                        isSelected ? 'bg-brass-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {isSelected ? '✓' : 'Select'}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs text-slate-400 flex items-center gap-2">
              <Info className="w-4 h-4 text-slate-500 shrink-0" />
              <span>
                {mov.movementType.includes('quartz')
                  ? 'Quartz movements do not use mechanical oscillating winding rotors.'
                  : 'Solid caseback selected (custom rotors are only visible on exhibition casebacks).'}
              </span>
            </div>
          )}
        </div>

        {/* Section 4: Strap / Bracelet */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              4. Strap / Bracelet ({watchCase.lugWidthMm}mm Lug Width)
            </h5>
            {build.strap && (
              <button
                onClick={() => onSelectComponent('strap', undefined)}
                className="text-[11px] text-rose-400 hover:underline"
              >
                Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {compatibleStraps.map(st => {
              const isSelected = build.strap?.id === st.id;

              return (
                <div
                  key={st.id}
                  onClick={() => onSelectComponent('strap', isSelected ? undefined : st)}
                  className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-slate-850 border-brass-500 shadow ring-1 ring-brass-500/30'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-slate-200 text-xs">{st.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {st.strapType.replace(/-/g, ' ')} • {st.lugWidthMm}mm • from ${st.basePrice}
                    </div>
                  </div>

                  <button
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg ${
                      isSelected ? 'bg-brass-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {isSelected ? '✓' : 'Select'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 5: Custom Seconds Accent Hand (Optional) */}
        {compatibleAccents.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                5. Custom Seconds Hand Accent (Optional)
              </h5>
              {build.secondsAccent && (
                <button
                  onClick={() => onSelectComponent('seconds-accent', undefined)}
                  className="text-[11px] text-rose-400 hover:underline"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {compatibleAccents.map(sec => {
                const isSelected = build.secondsAccent?.id === sec.id;

                return (
                  <div
                    key={sec.id}
                    onClick={() => onSelectComponent('seconds-accent', isSelected ? undefined : sec)}
                    className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-slate-850 border-brass-500 shadow ring-1 ring-brass-500/30'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: sec.colorHex }} />
                      <div>
                        <div className="font-semibold text-slate-200 text-xs">{sec.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {sec.accentStyle} • from ${sec.basePrice}
                        </div>
                      </div>
                    </div>

                    <button
                      className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg ${
                        isSelected ? 'bg-brass-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {isSelected ? '✓' : 'Select'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Determine current step index and navigation targets
  const stepOrder: BuildStep[] = ['movement', 'case', 'dial', 'hands', 'accessories', 'sourcing'];
  const currentIndex = stepOrder.indexOf(currentStep);
  const prevStep = currentIndex > 0 ? stepOrder[currentIndex - 1] : null;
  const nextStep = currentIndex < stepOrder.length - 1 ? stepOrder[currentIndex + 1] : null;

  // Check if current step has satisfied required choice
  const isCurrentStepComplete = (): boolean => {
    switch (currentStep) {
      case 'movement': return !!build.movement;
      case 'case': return !!build.case;
      case 'dial': return !!build.dial;
      case 'hands': return !!build.hands;
      case 'accessories': return true;
      default: return true;
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl flex flex-col h-[700px] overflow-hidden shadow-2xl">
      {/* Guided Stepper Header */}
      <div className="p-3 bg-slate-950/90 border-b border-slate-800 shrink-0">
        <div className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            const isCurrent = currentStep === st.id;
            const isUnlocked = isStepUnlocked(st.id);

            let isConfigured = false;
            if (st.id === 'movement') isConfigured = !!build.movement;
            else if (st.id === 'case') isConfigured = !!build.case;
            else if (st.id === 'dial') isConfigured = !!build.dial;
            else if (st.id === 'hands') isConfigured = !!build.hands;
            else if (st.id === 'accessories') isConfigured = !!build.bezelInsert || !!build.strap || !!build.rotor || !!build.spacer;

            return (
              <button
                key={st.id}
                disabled={!isUnlocked}
                onClick={() => {
                  setSearchQuery('');
                  setStyleFilter('all');
                  onNavigateStep(st.id);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition shrink-0 ${
                  isCurrent
                    ? 'bg-brass-500 text-slate-950 font-bold shadow-md shadow-brass-500/20'
                    : isUnlocked
                    ? 'bg-slate-900 text-slate-300 hover:text-slate-100 hover:bg-slate-800'
                    : 'bg-slate-950 text-slate-600 cursor-not-allowed opacity-60'
                }`}
              >
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isConfigured && !isCurrent
                    ? 'bg-emerald-500 text-slate-950'
                    : isCurrent
                    ? 'bg-slate-950 text-brass-400'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {isConfigured && !isCurrent ? <Check className="w-2.5 h-2.5" /> : idx + 1}
                </span>
                <Icon className="w-3.5 h-3.5" />
                <span>{st.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Step Content Area */}
      <div className="flex-1 overflow-y-auto p-5">
        {currentStep === 'movement' && renderMovementStep()}
        {currentStep === 'case' && renderCaseStep()}
        {currentStep === 'dial' && renderDialStep()}
        {currentStep === 'hands' && renderHandsStep()}
        {currentStep === 'accessories' && renderAccessoriesStep()}
      </div>

      {/* Bottom Step Flow Navigation Bar */}
      <div className="px-5 py-3.5 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between shrink-0">
        {prevStep ? (
          <button
            onClick={() => {
              setSearchQuery('');
              setStyleFilter('all');
              onNavigateStep(prevStep);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-3">
          {nextStep ? (
            <button
              disabled={!isCurrentStepComplete()}
              onClick={() => {
                setSearchQuery('');
                setStyleFilter('all');
                onNavigateStep(nextStep);
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition shadow ${
                isCurrentStepComplete()
                  ? 'bg-brass-500 hover:bg-brass-400 text-slate-950'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>{nextStep === 'sourcing' ? 'Review & Sourcing BOM' : `Next: ${nextStep.toUpperCase()}`}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => onNavigateStep('sourcing')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brass-500 hover:bg-brass-400 text-slate-950 text-xs font-bold transition shadow"
            >
              <span>Proceed to Sourcing & BOM</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
