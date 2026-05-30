import { Input } from "@/components/ui/input";

import type { EquipeRole } from "./equipe-data";

type EquipeFiltersProps = {
    search: string;
    role: EquipeRole | "Todos";
    roles: Array<EquipeRole | "Todos">;
    onSearchChange: (value: string) => void;
    onRoleChange: (value: EquipeRole | "Todos") => void;
};

export function EquipeFilters({
    search,
    role,
    roles,
    onSearchChange,
    onRoleChange,
}: EquipeFiltersProps) {
    return (
        <div className="grid flex-1 gap-3 lg:grid-cols-[minmax(0,1fr)_240px]">
            <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                <span>Buscar usuário</span>
                <Input
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder="Nome, e-mail, departamento ou cargo"
                    className="h-11 rounded-none border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-50"
                />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                <span>Filtrar por perfil</span>
                <select
                    value={role}
                    onChange={(event) => onRoleChange(event.target.value as EquipeRole | "Todos")}
                    className="h-11 w-full rounded-none border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-50"
                >
                    {roles.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
}