import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { toneStyles, type SummaryItem } from "./dashboard-data";

function comparisonClass(tone: SummaryItem["comparisonTone"]) {
  if (tone === "positive") {
    return "text-emerald-700 dark:text-emerald-300";
  }

  if (tone === "negative") {
    return "text-rose-700 dark:text-rose-300";
  }

  return "text-slate-600 dark:text-slate-300";
}

export function SummaryCard({ item, maxValue }: { item: SummaryItem; maxValue: number }) {
  const styles = toneStyles[item.tone];
  const relativeShare = Math.max(6, Math.round((item.value / maxValue) * 100));

  return (
    <article
      className={`group relative isolate overflow-hidden rounded-none border p-4 shadow-[0_6px_20px_-12px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_-28px_rgba(0,0,0,0.38)] ${styles.card}`}
    >
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${styles.iconBg}`}
        >
          <FontAwesomeIcon icon={item.icon} className="h-5 w-5" />
        </div>

        <span
          className={`inline-flex h-7 items-center rounded-none border px-2.5 text-xs font-semibold ${styles.chip}`}
        >
          {relativeShare}%
        </span>
      </div>

      <div className="relative z-10 mt-4">
        <h3 className={`mt-1 text-base font-semibold leading-tight ${styles.label}`}>
          {item.label}
        </h3>
        <p className="mt-3 text-3xl font-black leading-none text-slate-900 dark:text-slate-50">
          {item.value}
        </p>
        <p className="mt-3 min-h-12 text-sm leading-5 text-slate-700/90 dark:text-slate-200/90">
          {item.description}
        </p>
        <p className={`mt-2 text-xs font-semibold ${comparisonClass(item.comparisonTone)}`}>
          {item.comparison}
        </p>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
          <div
            className={`h-full rounded-full transition-all duration-500 ${styles.progress}`}
            style={{ width: `${relativeShare}%` }}
          />
        </div>
      </div>
    </article>
  );
}
