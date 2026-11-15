import React from 'react';
import type { CompatibilityReport, PartCategory } from '../types/watch';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, Wrench, PlusCircle } from 'lucide-react';

interface CompatibilityPanelProps {
  report: CompatibilityReport;
  onAddRequiredItem?: (category: PartCategory, itemName: string) => void;
}

export const CompatibilityPanel: React.FC<CompatibilityPanelProps> = ({
  report,
  onAddRequiredItem
}) => {
  const { isAssembled, isValid, errorCount, warningCount, infoCount, issues } = report;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
      {/* Header Summary Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          {isValid ? (
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          ) : (
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <AlertCircle className="w-5 h-5" />
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-100 text-sm sm:text-base">
                Compatibility Status:
              </h3>
              {isValid ? (
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  {isAssembled ? 'Assembly Verified' : 'Parts Compatible'}
                </span>
              ) : (
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30">
                  {errorCount} Incompatibilit{errorCount === 1 ? 'y' : 'ies'} Found
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              Dimensional tolerance & pinion arbor clearance analysis
            </p>
          </div>
        </div>

        {/* Counts summary pills */}
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <span className={`px-2 py-1 rounded-md border ${
            errorCount > 0 ? 'bg-rose-950/40 text-rose-300 border-rose-800/60' : 'bg-slate-800 text-slate-500 border-slate-700/50'
          }`}>
            {errorCount} Errors
          </span>
          <span className={`px-2 py-1 rounded-md border ${
            warningCount > 0 ? 'bg-amber-950/40 text-amber-300 border-amber-800/60' : 'bg-slate-800 text-slate-500 border-slate-700/50'
          }`}>
            {warningCount} Warnings
          </span>
          <span className={`px-2 py-1 rounded-md border ${
            infoCount > 0 ? 'bg-sky-950/40 text-sky-300 border-sky-800/60' : 'bg-slate-800 text-slate-500 border-slate-700/50'
          }`}>
            {infoCount} Notes
          </span>
        </div>
      </div>

      {/* Issues list */}
      <div className="mt-4 space-y-3">
        {issues.length === 0 ? (
          <div className="py-6 text-center text-slate-400 text-xs">
            <CheckCircle2 className="w-8 h-8 text-emerald-500/40 mx-auto mb-2" />
            Select components from the picker. The compatibility engine automatically checks hand hole sizes, stem alignment, dial feet angles, and crystal clearances.
          </div>
        ) : (
          issues.map(issue => {
            const isError = issue.severity === 'error';
            const isWarning = issue.severity === 'warning';

            return (
              <div
                key={issue.id}
                className={`p-3.5 rounded-xl border transition text-xs ${
                  isError
                    ? 'bg-rose-950/25 border-rose-800/50 text-rose-200'
                    : isWarning
                    ? 'bg-amber-950/20 border-amber-800/50 text-amber-200'
                    : 'bg-sky-950/20 border-sky-800/50 text-sky-200'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  {isError ? (
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  ) : isWarning ? (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  ) : (
                    <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  )}

                  <div className="flex-1 space-y-1">
                    <div className="font-semibold text-slate-100 flex items-center justify-between">
                      <span>{issue.title}</span>
                      <span className="text-[10px] uppercase tracking-wider font-mono px-1.5 py-0.5 rounded bg-slate-900/60 text-slate-300 border border-slate-700/50">
                        {issue.affectedComponents.join(' + ')}
                      </span>
                    </div>

                    <p className="text-slate-300 text-xs leading-relaxed">
                      {issue.description}
                    </p>

                    {issue.suggestedFix && (
                      <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 text-brass-300 font-medium">
                          <Wrench className="w-3.5 h-3.5 text-brass-400" />
                          Fix: {issue.suggestedFix}
                        </span>

                        {issue.requiresItem && onAddRequiredItem && (
                          <button
                            onClick={() => onAddRequiredItem(issue.requiresItem!.category, issue.requiresItem!.name)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-brass-600 hover:bg-brass-500 text-slate-950 font-semibold transition text-xs"
                          >
                            <PlusCircle className="w-3 h-3" />
                            Add {issue.requiresItem.name.split(' ')[0]}
                          </button>
                        )}
                      </div>
                    )}
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
