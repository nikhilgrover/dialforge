import React, { useState } from 'react';
import type { WatchBuild, BaseComponent, VendorTier, BuildStep } from '../types/watch';
import { SEED_TOOLS } from '../data/seedParts';
import { saveBuildToFirestore } from '../services/firestoreService';
import {
  Share2,
  Check,
  Wrench,
  ExternalLink,
  Copy,
  Sparkles,
  ShieldCheck,
  Star,
  Flame,
  CheckCircle2,
  ShoppingBag,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BillOfMaterialsProps {
  build: WatchBuild;
  onSelectVendor: (componentId: string, vendorId: string) => void;
  onNavigateStep?: (step: BuildStep) => void;
}

export const BillOfMaterials: React.FC<BillOfMaterialsProps> = ({
  build,
  onSelectVendor,
  onNavigateStep
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);

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

  // Collect all selected parts in chronological assembly order
  const activeComponents: { category: string; stepKey: BuildStep; component: BaseComponent }[] = [];
  if (build.movement) activeComponents.push({ category: 'Movement (Caliber)', stepKey: 'movement', component: build.movement });
  if (build.case) activeComponents.push({ category: 'Case & Crystal', stepKey: 'case', component: build.case });
  if (build.dial) activeComponents.push({ category: 'Dial Face', stepKey: 'dial', component: build.dial });
  if (build.hands) activeComponents.push({ category: 'Hand Set', stepKey: 'hands', component: build.hands });
  if (build.secondsAccent) activeComponents.push({ category: 'Seconds Hand Accent', stepKey: 'accessories', component: build.secondsAccent });
  if (build.bezelInsert) activeComponents.push({ category: 'Bezel Insert', stepKey: 'accessories', component: build.bezelInsert });
  if (build.spacer) activeComponents.push({ category: 'Movement Spacer Adapter', stepKey: 'accessories', component: build.spacer });
  if (build.rotor) activeComponents.push({ category: 'Custom Rotor', stepKey: 'accessories', component: build.rotor });
  if (build.strap) activeComponents.push({ category: 'Strap / Bracelet', stepKey: 'accessories', component: build.strap });

  // Calculate total price using selected vendor prices
  const totalPrice = activeComponents.reduce((sum, item) => {
    const chosenVendorId = build.selectedVendors[item.component.id];
    const vendor = item.component.vendors.find(v => v.id === chosenVendorId) || item.component.vendors[0];
    return sum + (vendor?.price || item.component.basePrice);
  }, 0);

  // Trigger celebration
  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#be9256', '#38bdf8', '#4ade80', '#f8fafc']
    });
  };

  // Generate shareable short link (backed by Firestore + local cache)
  const handleShareLink = async () => {
    try {
      const shortId = await saveBuildToFirestore(build);
      const url = `${window.location.origin}${window.location.pathname}?b=${shortId}`;
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // Fallback to base64 URL hash
      const stateObj = {
        mov: build.movement?.id,
        cas: build.case?.id,
        dia: build.dial?.id,
        han: build.hands?.id,
        sec: build.secondsAccent?.id,
        bez: build.bezelInsert?.id,
        rot: build.rotor?.id,
        spc: build.spacer?.id,
        stp: build.strap?.id,
        v: build.selectedVendors
      };
      const encoded = btoa(JSON.stringify(stateObj));
      const url = `${window.location.origin}${window.location.pathname}#build=${encoded}`;
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Generate Markdown BOM for Reddit / Forums
  const handleCopyMarkdown = () => {
    let md = `### ⌚ Custom Watch Build (via DialForge)\n\n`;
    md += `| Component | Part Name | Vendor | Tier | Price |\n`;
    md += `| :--- | :--- | :--- | :--- | :--- |\n`;

    activeComponents.forEach(item => {
      const chosenVendorId = build.selectedVendors[item.component.id];
      const vendor = item.component.vendors.find(v => v.id === chosenVendorId) || item.component.vendors[0];
      md += `| **${item.category}** | ${item.component.name} | [${vendor?.storeName || 'Store'}](${vendor?.productUrl || '#'}) | ${vendor?.tier || 'direct'} | $${vendor?.price.toFixed(2)} |\n`;
    });

    md += `| **TOTAL ESTIMATE** | | | | **$${totalPrice.toFixed(2)}** |\n\n`;
    md += `**Mechanical Integrity:** ✅ 100% Mechanically Compatible (Arbors, Pinion Clearances & Cavities Verified)\n`;

    navigator.clipboard.writeText(md);
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2500);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
      {/* Top Banner & Total Cost */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Total Sourcing Estimate
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              100% Compatible
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold font-mono text-brass-400">
              ${totalPrice.toFixed(2)}
            </span>
            <span className="text-xs text-slate-400">
              ({activeComponents.length} components selected)
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {activeComponents.length >= 4 && (
            <button
              onClick={triggerCelebration}
              className="p-2.5 rounded-xl bg-brass-500/10 text-brass-400 border border-brass-500/30 hover:bg-brass-500/20 transition"
              title="Celebrate build"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={handleShareLink}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition shadow-sm"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied!' : 'Share Build'}</span>
          </button>

          <button
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-brass-600 hover:bg-brass-500 text-slate-950 font-bold transition shadow-sm"
          >
            {copiedMarkdown ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedMarkdown ? 'BOM Copied!' : 'Export Reddit/Forum BOM'}</span>
          </button>
        </div>
      </div>

      {/* Sourcing Options Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-brass-400" />
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Parts Sourcing & Vendor Selection
            </h4>
          </div>
          <span className="text-[11px] text-slate-400">
            Compare premier mod shops vs vetted direct suppliers
          </span>
        </div>

        {activeComponents.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs border border-dashed border-slate-800 rounded-xl space-y-3">
            <p>No components selected yet. Follow the guided builder steps to assemble your watch.</p>
            {onNavigateStep && (
              <button
                onClick={() => onNavigateStep('movement')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brass-500 text-slate-950 font-bold text-xs hover:bg-brass-400 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Start at Step 1: Movement
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {activeComponents.map((item, idx) => {
              const comp = item.component;
              const chosenVendorId = build.selectedVendors[comp.id] || comp.vendors[0]?.id;
              const chosenVendor = comp.vendors.find(v => v.id === chosenVendorId) || comp.vendors[0];

              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-brass-400 font-semibold px-2 py-0.5 rounded bg-brass-500/10 border border-brass-500/20">
                          {item.category}
                        </span>
                        <h5 className="text-sm font-semibold text-slate-100">{comp.name}</h5>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{comp.description}</p>
                    </div>

                    {onNavigateStep && (
                      <button
                        onClick={() => onNavigateStep(item.stepKey)}
                        className="text-[11px] text-slate-400 hover:text-slate-200 underline shrink-0 transition"
                      >
                        Change Part
                      </button>
                    )}
                  </div>

                  {/* Vendor matrix radio list */}
                  <div className="space-y-1.5 pt-1">
                    {comp.vendors.map(vendor => {
                      const isVendorSelected = chosenVendor?.id === vendor.id;

                      return (
                        <div
                          key={vendor.id}
                          onClick={() => onSelectVendor(comp.id, vendor.id)}
                          className={`flex items-center justify-between p-2.5 rounded-lg text-xs cursor-pointer border transition ${
                            isVendorSelected
                              ? 'bg-slate-800/90 border-brass-500/60 text-slate-100 shadow-sm'
                              : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="radio"
                              name={`vendor-${comp.id}`}
                              checked={isVendorSelected}
                              onChange={() => onSelectVendor(comp.id, vendor.id)}
                              className="accent-brass-500 cursor-pointer"
                            />
                            <div>
                              <div className="font-medium text-slate-200 flex items-center gap-2 flex-wrap">
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
                                <div className="text-[10px] text-slate-500 mt-0.5">
                                  Shipping: {vendor.shippingDaysEstimate}
                                  {vendor.notes && ` • ${vendor.notes}`}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <span className="font-mono font-bold text-slate-100 text-sm">
                              ${vendor.price.toFixed(2)}
                            </span>
                            <a
                              href={vendor.productUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition"
                              title="Visit store product page"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Assembly Tools & Consumables */}
      <div className="pt-4 border-t border-slate-800">
        <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
          <Wrench className="w-4 h-4 text-brass-400" />
          <span>Recommended Watchmaker Assembly Tools</span>
        </h4>
        <p className="text-xs text-slate-400 mb-3">
          Essential tools required to press hands, secure dials, and seal casebacks cleanly:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {SEED_TOOLS.map(tool => (
            <div
              key={tool.id}
              className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between"
            >
              <div>
                <div className="font-medium text-slate-200">{tool.name}</div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {tool.isConsumable ? 'Consumable' : 'Reusable Tool'} • from ${tool.basePrice}
                </div>
              </div>
              <a
                href={tool.vendors[0]?.productUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-slate-400 hover:text-brass-400 transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
