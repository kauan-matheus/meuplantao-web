import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import type { PlantaoStatus } from "./plantoes-data";

type PlantoesFiltersProps = {
  search: string;
  status: PlantaoStatus | "Todos";
  onSearchChange: (value: string) => void;
  onStatusChange: (value: PlantaoStatus | "Todos") => void;
  onCreateClick?: () => void;
};

const statusOptions: Array<PlantaoStatus | "Todos"> = ["Todos", "Disponível", "Pendente", "Aprovado", "Recusado", "Inativo"];

export function PlantoesFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
  onCreateClick,
}: PlantoesFiltersProps) {
  return (
    <section className="border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-950">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
        <label className="flex-1 space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
          <span>Buscar plantão</span>
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Código, unidade, profissional ou especialidade"
            className="h-11 rounded-none border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-50"
          />
        </label>

        <label className="w-full lg:w-[240px] space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
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

        {onCreateClick && (
          <button
            onClick={onCreateClick}
            className="inline-flex h-11 items-center justify-center border border-transparent bg-slate-900 px-5 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2 h-4 w-4" />
            Novo Plantão
          </button>
        )}
      </div>
    </section>
  );
}