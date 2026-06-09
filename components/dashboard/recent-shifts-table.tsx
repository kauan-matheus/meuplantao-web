function statusClass(status: string) {
  const normalized = status.toLowerCase();
  if (normalized === "aprovado") {
    return "border-emerald-300/70 bg-emerald-100/70 text-emerald-800 dark:border-emerald-300/30 dark:bg-emerald-400/10 dark:text-emerald-200";
  }

  if (normalized === "pendente") {
    return "border-amber-300/70 bg-amber-100/70 text-amber-800 dark:border-amber-300/30 dark:bg-amber-400/10 dark:text-amber-200";
  }

  return "border-rose-300/70 bg-rose-100/70 text-rose-800 dark:border-rose-300/30 dark:bg-rose-400/10 dark:text-rose-200";
}

interface RecentShift {
  id: string;
  unidade: string;
  profissional: string;
  periodo: string;
  status: string;
}

interface RecentShiftsTableProps {
  shifts: RecentShift[];
}

export function RecentShiftsTable({ shifts }: RecentShiftsTableProps) {
  return (
    <article className="rounded-none border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-950">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Ultimos plantoes</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">Lista recente com status operacional.</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        {shifts.length === 0 ? (
          <div className="py-8 text-center text-slate-500">Nenhum plantão encontrado.</div>
        ) : (
          <table className="w-full min-w-190 border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10">
                <th className="pb-3 text-xs font-semibold text-slate-500 dark:text-slate-300">Codigo</th>
                <th className="pb-3 text-xs font-semibold text-slate-500 dark:text-slate-300">Unidade</th>
                <th className="pb-3 text-xs font-semibold text-slate-500 dark:text-slate-300">Profissional</th>
                <th className="pb-3 text-xs font-semibold text-slate-500 dark:text-slate-300">Periodo</th>
                <th className="pb-3 text-xs font-semibold text-slate-500 dark:text-slate-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {shifts.map((row) => (
                <tr key={row.id} className="border-b border-slate-100 dark:border-white/5">
                  <td className="py-3 text-sm font-medium text-slate-900 dark:text-slate-100">{row.id}</td>
                  <td className="py-3 text-sm text-slate-700 dark:text-slate-200">{row.unidade}</td>
                  <td className="py-3 text-sm text-slate-700 dark:text-slate-200">{row.profissional}</td>
                  <td className="py-3 text-sm text-slate-700 dark:text-slate-200">{row.periodo}</td>
                  <td className="py-3 text-sm">
                    <span className={`inline-flex rounded-none border px-2 py-1 text-xs font-semibold ${statusClass(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </article>
  );
}
