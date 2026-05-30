import { Input } from "@/components/ui/input";

import type { PlantaoStatus } from "./plantoes-data";

type PlantoesFiltersProps = {
  search: string;
  status: PlantaoStatus | "Todos";
  onSearchChange: (value: string) => void;
  onStatusChange: (value: PlantaoStatus | "Todos") => void;
};

const statusOptions: Array<PlantaoStatus | "Todos"> = ["Todos", "Pendente", "Aprovado", "Recusado"];

export function PlantoesFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: PlantoesFiltersProps) {
  return (
    <section className="border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-950">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_240px]">
        <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
          <span>Buscar plantão</span>
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Código, unidade, profissional ou especialidade"
            className="h-11 rounded-none border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-50"
          />
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
          <span>Status</span>
          <select
            value={status}
            onChange={(event) => onStatusChange(event.target.value as PlantaoStatus | "Todos")}
            className="h-11 w-full rounded-none border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-50"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}