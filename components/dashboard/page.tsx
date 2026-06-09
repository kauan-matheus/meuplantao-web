"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartColumn, faCircleCheck, faCircleXmark, faHourglassHalf, faLayerGroup } from "@fortawesome/free-solid-svg-icons";

import { AttentionList } from "./attention-list";
import { FilterBar } from "./filter-bar";
import { RecentShiftsTable } from "./recent-shifts-table";
import { SummaryCard } from "./summary-card";
import { WeeklyChart } from "./weekly-chart";
import { useDashboard } from "@/lib/hooks/use-dashboard";
import { SummaryItem } from "./dashboard-data";

export default function ResumoPlantoes() {
  const {
    isLoading,
    error,
    filters,
    setFilters,
    metrics,
    weeklyVolume,
    recentShifts,
    urgentItems,
    refresh
  } = useDashboard();

  // Mapear os dados recebidos do hook para os SummaryItems necessários para os cards
  const shiftSummary: SummaryItem[] = [
    {
      label: "Aprovados",
      value: metrics.aprovados,
      tone: "emerald",
      icon: faCircleCheck,
      description: "Solicitações liberadas e prontas para acontecer.",
      comparison: "-", // Na falta de dados passados, colocamos "-"
      comparisonTone: "neutral",
    },
    {
      label: "Recusados",
      value: metrics.recusados,
      tone: "rose",
      icon: faCircleXmark,
      description: "Pedidos que não passaram na análise final.",
      comparison: "-",
      comparisonTone: "neutral",
    },
    {
      label: "Pendentes",
      value: metrics.pendentes,
      tone: "orange",
      icon: faHourglassHalf,
      description: "Itens em aberto que ainda precisam de ação.",
      comparison: "-",
      comparisonTone: "neutral",
    },
    {
      label: "Total de plantões",
      value: metrics.total,
      tone: "slate",
      icon: faLayerGroup,
      description: "Total de plantões registrados no sistema, incluindo todos os status.",
      comparison: "-",
      comparisonTone: "neutral",
    },
  ];

  const maxValue = Math.max(...shiftSummary.map((item) => item.value), 1);

  return (
    <section className="space-y-6">
      <FilterBar filters={filters} onChange={setFilters} onRefresh={refresh} />

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 text-sm">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64 text-slate-500">
          Carregando dados...
        </div>
      ) : (
        <>
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
              <WeeklyChart data={weeklyVolume} />
            </div>
            <div>
              <AttentionList items={urgentItems} />
            </div>
          </div>

          <RecentShiftsTable shifts={recentShifts} />
        </>
      )}
    </section>
  );
}
