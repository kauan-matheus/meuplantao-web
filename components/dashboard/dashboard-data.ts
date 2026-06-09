import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export const toneStyles = {
  amber: {
    card: "border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950",
    chip:
      "border-amber-300/70 bg-amber-100/80 text-amber-800 dark:border-amber-300/30 dark:bg-amber-400/10 dark:text-amber-200",
    iconBg:
      "border-amber-300/60 bg-amber-100 text-amber-700 dark:border-amber-300/30 dark:bg-amber-400/10 dark:text-amber-100",
    label: "text-amber-900 dark:text-amber-100",
    progress: "bg-amber-500 dark:bg-amber-300",
  },
  emerald: {
    card: "border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950",
    chip:
      "border-emerald-300/70 bg-emerald-100/80 text-emerald-800 dark:border-emerald-300/30 dark:bg-emerald-400/10 dark:text-emerald-200",
    iconBg:
      "border-emerald-300/60 bg-emerald-100 text-emerald-700 dark:border-emerald-300/30 dark:bg-emerald-400/10 dark:text-emerald-100",
    label: "text-emerald-900 dark:text-emerald-100",
    progress: "bg-emerald-500 dark:bg-emerald-300",
  },
  rose: {
    card: "border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950",
    chip:
      "border-rose-300/70 bg-rose-100/80 text-rose-800 dark:border-rose-300/30 dark:bg-rose-400/10 dark:text-rose-200",
    iconBg:
      "border-rose-300/60 bg-rose-100 text-rose-700 dark:border-rose-300/30 dark:bg-rose-400/10 dark:text-rose-100",
    label: "text-rose-900 dark:text-rose-100",
    progress: "bg-rose-500 dark:bg-rose-300",
  },
  blue: {
    card: "border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950",
    chip:
      "border-sky-300/70 bg-sky-100/80 text-sky-800 dark:border-sky-300/30 dark:bg-sky-400/10 dark:text-sky-200",
    iconBg:
      "border-sky-300/60 bg-sky-100 text-sky-700 dark:border-sky-300/30 dark:bg-sky-400/10 dark:text-sky-100",
    label: "text-sky-900 dark:text-sky-100",
    progress: "bg-sky-500 dark:bg-sky-300",
  },
  orange: {
    card: "border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950",
    chip:
      "border-orange-300/70 bg-orange-100/80 text-orange-800 dark:border-orange-300/30 dark:bg-orange-400/10 dark:text-orange-200",
    iconBg:
      "border-orange-300/60 bg-orange-100 text-orange-700 dark:border-orange-300/30 dark:bg-orange-400/10 dark:text-orange-100",
    label: "text-orange-900 dark:text-orange-100",
    progress: "bg-orange-500 dark:bg-orange-300",
  },
  slate: {
    card: "border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950",
    chip:
      "border-slate-300/70 bg-slate-200/80 text-slate-700 dark:border-slate-300/30 dark:bg-white/10 dark:text-slate-200",
    iconBg:
      "border-slate-300/60 bg-white text-slate-700 dark:border-slate-300/30 dark:bg-white/10 dark:text-slate-100",
    label: "text-slate-900 dark:text-slate-50",
    progress: "bg-slate-700 dark:bg-slate-200",
  },
} as const;

export type ToneName = keyof typeof toneStyles;

export type SummaryItem = {
  label: string;
  value: number;
  tone: ToneName;
  icon: IconDefinition;
  description: string;
  comparison: string;
  comparisonTone: "positive" | "negative" | "neutral";
};


