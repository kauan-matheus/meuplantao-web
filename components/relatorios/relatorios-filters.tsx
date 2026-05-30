import { Input } from "@/components/ui/input";

import type { RelatorioStatus } from "./relatorios-data";

type RelatoriosFiltersProps = {
    search: string;
    status: RelatorioStatus | "Todos";
    onSearchChange: (value: string) => void;
    onStatusChange: (value: RelatorioStatus | "Todos") => void;
};

const statusOptions: Array<RelatorioStatus | "Todos"> = ["Todos", "Completo", "Em aberto", "Cancelado"];

export function RelatoriosFilters({
    search,
    status,
    onSearchChange,
    onStatusChange,
}: RelatoriosFiltersProps) {
    return (
        <section className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-end">
            <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                <span>Buscar relatório</span>
                <Input
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder="Código, unidade, profissional ou responsável"
                    className="h-12 rounded-none border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 shadow-none placeholder:text-slate-400 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-50 dark:focus:bg-slate-950"
                />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                <span>Status</span>
                <select
                    value={status}
                    onChange={(event) => onStatusChange(event.target.value as RelatorioStatus | "Todos")}
                    className="h-12 w-full rounded-none border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-50 dark:focus:bg-slate-950"
                >
                    {statusOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </label>
        </section>
    );
}