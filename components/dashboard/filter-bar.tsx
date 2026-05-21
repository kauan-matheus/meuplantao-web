import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function FilterBar() {
  return (
    <div className="grid gap-3 rounded-none border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-950 sm:grid-cols-2 xl:grid-cols-[1fr_180px_180px_auto]">
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400 dark:text-slate-500">
          <Search className="h-4 w-4" />
        </span>
        <Input
          type="search"
          placeholder="Buscar por unidade, profissional ou codigo"
          className="h-10 rounded-none border-slate-300 bg-white pl-10 dark:border-white/15 dark:bg-slate-900"
        />
      </div>

      <select className="h-10 rounded-none border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-500 dark:border-white/15 dark:bg-slate-900 dark:text-slate-200">
        <option>Ultimos 7 dias</option>
        <option>Ultimos 30 dias</option>
        <option>Este mes</option>
      </select>

      <select className="h-10 rounded-none border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-500 dark:border-white/15 dark:bg-slate-900 dark:text-slate-200">
        <option>Todos os status</option>
        <option>Aprovado</option>
        <option>Pendente</option>
        <option>Recusado</option>
      </select>

      <Button
        variant="outline"
        className="h-10 rounded-none border-slate-300 px-4 dark:border-white/15"
      >
        Atualizar painel
      </Button>
    </div>
  );
}
