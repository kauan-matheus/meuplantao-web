import { relatorioStatusStyles, type RelatorioPlantao } from "./relatorios-data";

type RelatoriosTableProps = {
    rows: RelatorioPlantao[];
};

export function RelatoriosTable({ rows }: RelatoriosTableProps) {
    return (
        <article className="border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-950">
            <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Histórico de plantões</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                        Consulte os registros já concluídos, quem finalizou e o valor gerado em cada plantão.
                    </p>
                </div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{rows.length} registros</p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-270 border-collapse text-left">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-white/10">
                            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 dark:text-slate-300">Código</th>
                            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 dark:text-slate-300">Unidade</th>
                            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 dark:text-slate-300">Profissional</th>
                            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 dark:text-slate-300">Concluído por</th>
                            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 dark:text-slate-300">Data</th>
                            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 dark:text-slate-300">Status</th>
                            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 dark:text-slate-300">Valor gerado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.id} className="border-b border-slate-100 dark:border-white/5">
                                <td className="py-4 pr-4 text-sm font-semibold text-slate-900 dark:text-slate-100">{row.id}</td>
                                <td className="py-4 pr-4 text-sm text-slate-700 dark:text-slate-200">{row.unidade}</td>
                                <td className="py-4 pr-4 text-sm text-slate-700 dark:text-slate-200">{row.profissional}</td>
                                <td className="py-4 pr-4 text-sm text-slate-700 dark:text-slate-200">{row.concluidoPor}</td>
                                <td className="py-4 pr-4 text-sm text-slate-700 dark:text-slate-200">{row.data}</td>
                                <td className="py-4 pr-4 text-sm">
                                    <span className={`inline-flex rounded-none border px-2.5 py-1 text-xs font-semibold ${relatorioStatusStyles[row.status]}`}>
                                        {row.status}
                                    </span>
                                </td>
                                <td className="py-4 pr-4 text-sm font-medium text-slate-900 dark:text-slate-50">
                                    R$ {row.valorGerado.toLocaleString("pt-BR")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </article>
    );
}