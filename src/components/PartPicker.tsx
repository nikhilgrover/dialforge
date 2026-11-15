import React, { useState } from 'react';
import type {
  WatchBuild,
  PartCategory,
  BaseComponent,
  Movement,
  Case,
  Dial,
  Hands,
  Strap,
  VendorTier
} from '../types/watch';
import {
  SEED_MOVEMENTS,
  SEED_CASES,
  SEED_DIALS,
  SEED_HANDS,
  SEED_SECONDS_ACCENTS,
  SEED_BEZEL_INSERTS,
  SEED_ROTORS,
  SEED_SPACERS,
  SEED_STRAPS,
  SEED_TOOLS
} from '../data/seedParts';
import {
  Cpu,
  Watch,
  CircleDot,
  Clock,
  Sparkles,
  ShieldCheck,
  Star,
  Wrench,
  ExternalLink,
  Flame,
  Check,
  Filter,
  Info
} from 'lucide-react';

interface PartPickerProps {
  build: WatchBuild;
  onSelectComponent: (category: PartCategory, component: BaseComponent | undefined) => void;
  onSelectVendor: (componentId: string, vendorId: string) => void;
}

const CATEGORIES: { id: PartCategory; label: string; icon: React.ElementType }[] = [
  { id: 'movement', label: '1. Movement', icon: Cpu },
  { id: 'case', label: '2. Case', icon: Watch },
  { id: 'dial', label: '3. Dial', icon: CircleDot },
  { id: 'hands', label: '4. Hands', icon: Clock },
  { id: 'seconds-accent', label: 'Custom Seconds', icon: Sparkles },
  { id: 'bezel-insert', label: 'Bezel Insert', icon: CircleDot },
  { id: 'rotor', label: 'Custom Rotor', icon: Sparkles },
  { id: 'spacer', label: 'Movement Spacer', icon: Wrench },
  { id: 'strap', label: 'Strap / Bracelet', icon: Watch },
  { id: 'tools', label: 'Tools & Consumables', icon: Wrench }
];

export const PartPicker: React.FC<PartPickerProps> = ({
  build,
  onSelectComponent,
  onSelectVendor
}) => {
  const [activeCategory, setActiveCategory] = useState<PartCategory>('movement');
  const [filterCompatibleOnly, setFilterCompatibleOnly] = useState<boolean>(false);

  // Helper for vendor badges
  const renderVendorBadge = (tier: VendorTier) => {
    switch (tier) {
      case 'premier':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
            <ShieldCheck className="w-3 h-3 text-indigo-400" />
            Premier Mod Shop
          </span>
        );
      case 'vetted-direct':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            <Star className="w-3 h-3 text-emerald-400" />
            Vetted Direct OEM
          </span>
        );
      case 'supply-house':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <Wrench className="w-3 h-3 text-amber-400" />
            Supply House
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-400 border border-slate-700">
            Marketplace
          </span>
        );
    }
  };

  // Get items for current category
  const getCategoryItems = (): BaseComponent[] => {
    switch (activeCategory) {
      case 'movement': return SEED_MOVEMENTS;
      case 'case': return SEED_CASES;
      case 'dial': return SEED_DIALS;
      case 'hands': return SEED_HANDS;
      case 'seconds-accent': return SEED_SECONDS_ACCENTS;
      case 'bezel-insert': return SEED_BEZEL_INSERTS;
      case 'rotor': return SEED_ROTORS;
      case 'spacer': return SEED_SPACERS;
      case 'strap': return SEED_STRAPS;
      case 'tools': return SEED_TOOLS;
      default: return [];
    }
  };

  const rawItems = getCategoryItems();

  // Filter compatible items if toggle is active
  const items = rawItems.filter(item => {
    if (!filterCompatibleOnly) return true;

    // Filter hands by movement family
    if (activeCategory === 'hands' && build.movement) {
      const h = item as Hands;
      return h.compatibleMovementFamilies.includes(build.movement.family);
    }

    // Filter spacers: only relevant if quartz selected
    if (activeCategory === 'spacer') {
      return build.movement?.movementType.includes('quartz');
    }

    // Filter rotors: only automatic movements
    if (activeCategory === 'rotor') {
      return build.movement?.movementType === 'automatic';
    }

    // Filter bezel insert: only if case has rotating bezel
    if (activeCategory === 'bezel-insert') {
      return build.case?.hasRotatingBezel;
    }

    // Filter strap by case lug width
    if (activeCategory === 'strap' && build.case) {
      const s = item as Strap;
      return s.lugWidthMm === build.case.lugWidthMm;
    }

    return true;
  });

  // Current selected item for active category
  const getSelectedId = (): string | undefined => {
    switch (activeCategory) {
      case 'movement': return build.movement?.id;
      case 'case': return build.case?.id;
      case 'dial': return build.dial?.id;
      case 'hands': return build.hands?.id;
      case 'seconds-accent': return build.secondsAccent?.id;
      case 'bezel-insert': return build.bezelInsert?.id;
      case 'rotor': return build.rotor?.id;
      case 'spacer': return build.spacer?.id;
      case 'strap': return build.strap?.id;
      default: return undefined;
    }
  };

  const selectedId = getSelectedId();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl flex flex-col h-[700px] overflow-hidden shadow-2xl">
      {/* Category Navigation Bar */}
      <div className="flex items-center gap-1.5 p-2 bg-slate-950/80 border-b border-slate-800 overflow-x-auto no-scrollbar shrink-0">
        {CATEGORIES.map(cat => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;

          let isConfigured = false;
          if (cat.id === 'movement') isConfigured = !!build.movement;
          else if (cat.id === 'case') isConfigured = !!build.case;
          else if (cat.id === 'dial') isConfigured = !!build.dial;
          else if (cat.id === 'hands') isConfigured = !!build.hands;
          else if (cat.id === 'seconds-accent') isConfigured = !!build.secondsAccent;
          else if (cat.id === 'bezel-insert') isConfigured = !!build.bezelInsert;
          else if (cat.id === 'rotor') isConfigured = !!build.rotor;
          else if (cat.id === 'spacer') isConfigured = !!build.spacer;
          else if (cat.id === 'strap') isConfigured = !!build.strap;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition shrink-0 ${
                isActive
                  ? 'bg-brass-500 text-slate-950 font-bold shadow-md shadow-brass-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
              {isConfigured && !isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Filter and Category Subheader */}
      <div className="px-5 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs shrink-0">
        <div className="text-slate-400">
          Showing <span className="font-semibold text-slate-200">{items.length}</span> components in{' '}
          <span className="text-brass-400 font-semibold uppercase">{activeCategory}</span>
        </div>

        <button
          onClick={() => setFilterCompatibleOnly(!filterCompatibleOnly)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition ${
            filterCompatibleOnly
              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
              : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-750'
          }`}
        >
          <Filter className="w-3 h-3" />
          <span>{filterCompatibleOnly ? 'Filtered by Compatibility' : 'Show All Parts'}</span>
        </button>
      </div>

      {/* Component Cards Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {items.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            <Info className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            No components match your current filter. Try unchecking "Filtered by Compatibility".
          </div>
        ) : (
          items.map(comp => {
            const isSelected = selectedId === comp.id;
            const chosenVendorId = build.selectedVendors[comp.id] || comp.vendors[0]?.id;
            const chosenVendor = comp.vendors.find(v => v.id === chosenVendorId) || comp.vendors[0];

            return (
              <div
                key={comp.id}
                className={`p-4 rounded-xl border transition ${
                  isSelected
                    ? 'bg-slate-850 border-brass-500/80 shadow-lg shadow-brass-500/5 ring-1 ring-brass-500/30'
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-slate-100 text-sm">
                        {comp.name}
                      </h4>
                      {isSelected && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-brass-500 text-slate-950">
                          <Check className="w-3 h-3" /> Selected
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">
                      Brand: <span className="text-slate-300">{comp.brand}</span>
                    </div>
                  </div>

                  {/* Select / Deselect Button */}
                  <button
                    onClick={() => onSelectComponent(activeCategory, isSelected ? undefined : comp)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                      isSelected
                        ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25'
                        : 'bg-brass-600 hover:bg-brass-500 text-slate-950 font-bold shadow-sm'
                    }`}
                  >
                    {isSelected ? 'Remove' : 'Select Part'}
                  </button>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {comp.description}
                </p>

                {/* Technical Specifications Pills */}
                <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-slate-800/80 text-[11px] font-mono">
                  {comp.category === 'movement' && (
                    <>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {(comp as Movement).movementType.toUpperCase()}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {(comp as Movement).beatsPerHour.toLocaleString()} BPH ({(comp as Movement).beatsPerSecond} Hz)
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        Dia: {(comp as Movement).diameterMm}mm
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        Thick: {(comp as Movement).thicknessMm}mm
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-brass-300">
                        Holes: {(comp as Movement).handHoleSizes.hour}/{(comp as Movement).handHoleSizes.minute}/{(comp as Movement).handHoleSizes.second}mm
                      </span>
                      {(comp as Movement).batteryModel && (
                        <span className="px-2 py-0.5 rounded bg-sky-950/60 text-sky-300 border border-sky-800/40">
                          Battery: {(comp as Movement).batteryModel}
                        </span>
                      )}
                    </>
                  )}

                  {comp.category === 'case' && (
                    <>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        Dia: {(comp as Case).outerDiameterMm}mm
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        Lug: {(comp as Case).lugWidthMm}mm
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        Crown: {(comp as Case).crownPosition}:00
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {(comp as Case).crystalType.replace('-', ' ')}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        WR: {(comp as Case).waterResistanceM}M
                      </span>
                    </>
                  )}

                  {comp.category === 'dial' && (
                    <>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        Dia: {(comp as Dial).diameterMm}mm
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        Lume: {(comp as Dial).lume}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        Feet: {(comp as Dial).dialFeetPositions.join(', ')}:00
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        Date: {(comp as Dial).dateWindow}:00
                      </span>
                    </>
                  )}

                  {comp.category === 'hands' && (
                    <>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-brass-300">
                        Holes: {(comp as Hands).handHoleSizes.hour}/{(comp as Hands).handHoleSizes.minute}/{(comp as Hands).handHoleSizes.second}mm
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        Lume: {(comp as Hands).lume}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        Fit: {(comp as Hands).compatibleMovementFamilies.join('/')}
                      </span>
                    </>
                  )}
                </div>

                {/* Sourcing & Multiple Vendor Matrix */}
                <div className="mt-3.5 pt-3 border-t border-slate-800">
                  <div className="text-[11px] font-semibold text-slate-400 mb-2 flex items-center justify-between">
                    <span>Sourcing Options & Reputable Vendors:</span>
                    <span className="text-[10px] text-slate-500">Pick preferred store</span>
                  </div>

                  <div className="space-y-1.5">
                    {comp.vendors.map(vendor => {
                      const isVendorSelected = chosenVendor?.id === vendor.id;

                      return (
                        <div
                          key={vendor.id}
                          onClick={() => onSelectVendor(comp.id, vendor.id)}
                          className={`flex items-center justify-between p-2 rounded-lg text-xs cursor-pointer border transition ${
                            isVendorSelected
                              ? 'bg-slate-800 border-brass-500/50 text-slate-100'
                              : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={`vendor-${comp.id}`}
                              checked={isVendorSelected}
                              onChange={() => onSelectVendor(comp.id, vendor.id)}
                              className="accent-brass-500 cursor-pointer"
                            />
                            <div>
                              <div className="font-medium text-slate-200 flex items-center gap-1.5">
                                <span>{vendor.storeName}</span>
                                {renderVendorBadge(vendor.tier)}
                                {vendor.isSpecialDeal && (
                                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                                    <Flame className="w-3 h-3 text-amber-400" />
                                    Great Deal
                                  </span>
                                )}
                              </div>
                              {vendor.shippingDaysEstimate && (
                                <div className="text-[10px] text-slate-500">
                                  Est. shipping: {vendor.shippingDaysEstimate}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-slate-100 text-sm">
                              ${vendor.price.toFixed(2)}
                            </span>
                            <a
                              href={vendor.productUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition"
                              title="Open store page"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
