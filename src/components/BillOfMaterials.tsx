import React, { useState } from 'react';
import type { WatchBuild, CompatibilityReport, BaseComponent } from '../types/watch';
import { SEED_TOOLS } from '../data/seedParts';
import {
  FileText,
  Share2,
  Check,
  Wrench,
  ExternalLink,
  Copy,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BillOfMaterialsProps {
  build: WatchBuild;
  report: CompatibilityReport;
}

export const BillOfMaterials: React.FC<BillOfMaterialsProps> = ({ build, report }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);

  // Collect all selected parts
  const activeComponents: { category: string; component: BaseComponent }[] = [];
  if (build.movement) activeComponents.push({ category: 'Movement', component: build.movement });
  if (build.case) activeComponents.push({ category: 'Case', component: build.case });
  if (build.dial) activeComponents.push({ category: 'Dial', component: build.dial });
  if (build.hands) activeComponents.push({ category: 'Hands', component: build.hands });
  if (build.secondsAccent) activeComponents.push({ category: 'Seconds Accent', component: build.secondsAccent });
  if (build.bezelInsert) activeComponents.push({ category: 'Bezel Insert', component: build.bezelInsert });
  if (build.rotor) activeComponents.push({ category: 'Rotor', component: build.rotor });
  if (build.spacer) activeComponents.push({ category: 'Movement Spacer', component: build.spacer });
  if (build.strap) activeComponents.push({ category: 'Strap', component: build.strap });

  // Calculate total price using selected vendor prices
  const totalPrice = activeComponents.reduce((sum, item) => {
    const chosenVendorId = build.selectedVendors[item.component.id];
    const vendor = item.component.vendors.find(v => v.id === chosenVendorId) || item.component.vendors[0];
    return sum + (vendor?.price || item.component.basePrice);
  }, 0);

  // Trigger celebration if all core parts are selected and valid!
  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#be9256', '#38bdf8', '#4ade80', '#f8fafc']
    });
  };

  // Generate shareable link
  const handleShareLink = () => {
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
  };

  // Generate Markdown BOM for Reddit / Forums
  const handleCopyMarkdown = () => {
    let md = `### ⌚ Custom Watch Build (via DialForge)\n\n`;
    md += `| Component | Part Name | Vendor | Price |\n`;
    md += `| :--- | :--- | :--- | :--- |\n`;

    activeComponents.forEach(item => {
      const chosenVendorId = build.selectedVendors[item.component.id];
      const vendor = item.component.vendors.find(v => v.id === chosenVendorId) || item.component.vendors[0];
      md += `| **${item.category}** | ${item.component.name} | [${vendor?.storeName || 'Store'}](${vendor?.productUrl || '#'}) | $${vendor?.price.toFixed(2)} |\n`;
    });

    md += `| **TOTAL** | | | **$${totalPrice.toFixed(2)}** |\n\n`;
    md += `**Compatibility:** ${report.isValid ? '✅ Verified 100% Compatible' : `⚠️ ${report.errorCount} Issues Found`}\n`;

    navigator.clipboard.writeText(md);
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2500);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Top Banner & Total Cost */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Estimated Build Cost
          </span>
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
          {report.isValid && report.isAssembled && (
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
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied!' : 'Share Build'}</span>
          </button>

          <button
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            {copiedMarkdown ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedMarkdown ? 'BOM Copied!' : 'Export Reddit/Forum BOM'}</span>
          </button>
        </div>
      </div>

      {/* Bill of Materials Table */}
      <div>
        <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
          <FileText className="w-4 h-4 text-brass-400" />
          <span>Components & Vendor Sourcing Links</span>
        </h4>

        {activeComponents.length === 0 ? (
          <div className="p-6 text-center text-slate-400 text-xs border border-dashed border-slate-800 rounded-xl">
            No components selected yet. Add a movement, case, dial, and hands to generate your parts list.
          </div>
        ) : (
          <div className="border border-slate-800 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3 font-medium">Part Category</th>
                  <th className="py-2.5 px-3 font-medium">Selected Component</th>
                  <th className="py-2.5 px-3 font-medium">Source Store</th>
                  <th className="py-2.5 px-3 font-medium text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {activeComponents.map((item, idx) => {
                  const chosenVendorId = build.selectedVendors[item.component.id];
                  const vendor = item.component.vendors.find(v => v.id === chosenVendorId) || item.component.vendors[0];

                  return (
                    <tr key={idx} className="hover:bg-slate-850 transition">
                      <td className="py-2.5 px-3 font-semibold text-slate-300">
                        {item.category}
                      </td>
                      <td className="py-2.5 px-3 text-slate-100">
                        {item.component.name}
                      </td>
                      <td className="py-2.5 px-3">
                        <a
                          href={vendor?.productUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-brass-400 hover:text-brass-300 hover:underline"
                        >
                          <span>{vendor?.storeName || 'Vendor'}</span>
                          <ExternalLink className="w-3 h-3 text-slate-500" />
                        </a>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-200">
                        ${vendor?.price.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recommended Assembly Tools & Consumables */}
      <div className="pt-2 border-t border-slate-800">
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
