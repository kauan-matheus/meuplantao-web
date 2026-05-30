"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartColumn } from "@fortawesome/free-solid-svg-icons";

import { shiftSummary } from "./dashboard-data";
import { AttentionList } from "./attention-list";
import { FilterBar } from "./filter-bar";
import { RecentShiftsTable } from "./recent-shifts-table";
import { SummaryCard } from "./summary-card";
import { WeeklyChart } from "./weekly-chart";

export default function ResumoPlantoes() {
  const maxValue = Math.max(...shiftSummary.map((item) => item.value), 1);

  return (
    <section className="space-y-6">
      <FilterBar />

      <div>
        <div className="mb-3 flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-slate-950 dark:text-slate-300">
            <FontAwesomeIcon icon={faChartColumn} className="h-3.5 w-3.5" />
            Resumo rápido
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {shiftSummary.map((item) => (
            <SummaryCard key={item.label} item={item} maxValue={maxValue} />
          ))}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <WeeklyChart />
        </div>
        <div>
          <AttentionList />
        </div>
      </div>

      <RecentShiftsTable />
    </section>
  );
}
