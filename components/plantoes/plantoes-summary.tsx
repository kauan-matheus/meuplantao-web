import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { plantaoSummaryIcons, type PlantaoStatus } from "./plantoes-data";

type SummaryItem = {
  label: string;
  value: number;
  tone: PlantaoStatus;
  description: string;
};

type PlantoesSummaryProps = {
  items: SummaryItem[];
};

export function PlantoesSummary({ items }: PlantoesSummaryProps) {
  return (
    <section className="grid gap-3 lg:grid-cols-4">
      {items.map((item) => (
        <article
          key={item.label}
          className="border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-950"
        >
          <div className="mb-3 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {item.label}
              </p>
              <h3 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-50">
                {item.value}
              </h3>
            </div>
            <div
              className={`flex h-11 w-11 items-center justify-center border ${
                item.tone === "Aprovado"
                  ? "border-emerald-300/60 bg-emerald-100 text-emerald-700 dark:border-emerald-300/30 dark:bg-emerald-400/10 dark:text-emerald-100"
                  : item.tone === "Pendente"
                    ? "border-amber-300/60 bg-amber-100 text-amber-700 dark:border-amber-300/30 dark:bg-amber-400/10 dark:text-amber-100"
                    : "border-rose-300/60 bg-rose-100 text-rose-700 dark:border-rose-300/30 dark:bg-rose-400/10 dark:text-rose-100"
              }`}
            >
              <FontAwesomeIcon icon={plantaoSummaryIcons[item.tone]} className="h-4 w-4" />
            </div>
          </div>
          <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{item.description}</p>
        </article>
      ))}
    </section>
  );
}