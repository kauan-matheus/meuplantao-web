"use client";

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
          <h2 className="text-sm font-semibold text-slate-600 dark:text-slate-300">Resumo rapido</h2>
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
