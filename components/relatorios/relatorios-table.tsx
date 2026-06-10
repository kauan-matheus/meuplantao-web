import { useState } from "react";
/* eslint-disable @next/next/no-img-element */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { relatorioStatusStyles, type RelatorioPlantao } from "./relatorios-data";

type RelatoriosTableProps = {
    rows: RelatorioPlantao[];
    isLoading?: boolean;
};

const ITEMS_PER_PAGE = 5;

function getPaginationItems(currentPage: number, totalPages: number) {
    const items: (number | string)[] = [];

    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
            items.push(i);
        }
    } else {
        if (currentPage <= 4) {
            items.push(1, 2, 3, 4, 5, '...', totalPages);
        } else if (currentPage >= totalPages - 3) {
            items.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
            items.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
        }
    }
    return items;
}

export function RelatoriosTable({ rows, isLoading }: RelatoriosTableProps) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(rows.length / ITEMS_PER_PAGE) || 1;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const visibleItems = rows.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    if (currentPage > totalPages) {
        setCurrentPage(totalPages);
    }

    const paginationItems = getPaginationItems(currentPage, totalPages);
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
                        {isLoading ? (
                            <tr>
                                <td colSpan={7} className="py-12 text-center">
                                    <FontAwesomeIcon icon={faSpinner} className="h-6 w-6 animate-spin text-slate-400" />
                                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Carregando relatórios...</p>
                                </td>
                            </tr>
                        ) : rows.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
                                    Nenhum relatório encontrado.
                                </td>
                            </tr>
                        ) : (
                            visibleItems.map((row) => (
                                <tr key={row.id} className="border-b border-slate-100 dark:border-white/5">
                                    <td className="py-4 pr-4 text-sm font-semibold text-slate-900 dark:text-slate-100">{row.id}</td>
                                    <td className="py-4 pr-4 text-sm text-slate-700 dark:text-slate-200">{row.unidade}</td>
                                    <td className="py-4 pr-4 text-sm text-slate-700 dark:text-slate-200">
                                        <div className="flex items-center gap-2">
                                            {row.fotoProfissional ? (
                                                <img src={row.fotoProfissional} alt={row.profissional} className="h-6 w-6 rounded-full object-cover" />
                                            ) : (
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-[10px] font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300">
                                                    {row.profissional !== "Não atribuído" ? row.profissional.charAt(0).toUpperCase() : "-"}
                                                </div>
                                            )}
                                            <span>{row.profissional}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 pr-4 text-sm text-slate-700 dark:text-slate-200">{row.concluidoPor}</td>
                                    <td className="py-4 pr-4 text-sm text-slate-700 dark:text-slate-200">{row.data}</td>
                                    <td className="py-4 pr-4 text-sm">
                                        <span className={`inline-flex rounded-none border px-2.5 py-1 text-xs font-semibold ${relatorioStatusStyles[row.status]}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="py-4 pr-4 text-sm font-medium text-slate-900 dark:text-slate-50">
                                        R$ {(row.valorGerado || 0).toLocaleString("pt-BR")}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {rows.length > ITEMS_PER_PAGE && (
                <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-white/10">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Mostrando <span className="font-medium text-slate-900 dark:text-slate-50">{startIndex + 1}</span> a{" "}
                        <span className="font-medium text-slate-900 dark:text-slate-50">
                            {Math.min(startIndex + ITEMS_PER_PAGE, rows.length)}
                        </span>{" "}
                        de <span className="font-medium text-slate-900 dark:text-slate-50">{rows.length}</span> resultados
                    </p>
                    <div className="flex items-center gap-1.5">
                        <button
                            type="button"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => p - 1)}
                            className="inline-flex h-9 items-center justify-center gap-1 border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-50 dark:border-white/10 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-white/5"
                        >
                            <FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3" />
                        </button>

                        {paginationItems.map((page, index) => {
                            if (page === "...") {
                                return (
                                    <span key={`ellipsis-${index}`} className="flex h-9 w-9 items-center justify-center text-sm font-medium text-slate-500">
                                        ...
                                    </span>
                                );
                            }

                            return (
                                <button
                                    key={page}
                                    type="button"
                                    onClick={() => setCurrentPage(page as number)}
                                    className={`inline-flex h-9 min-w-[36px] items-center justify-center border px-3 text-sm font-medium transition ${
                                        currentPage === page
                                            ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900"
                                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-white/5"
                                    }`}
                                >
                                    {page}
                                </button>
                            );
                        })}

                        <button
                            type="button"
                            disabled={currentPage >= totalPages}
                            onClick={() => setCurrentPage((p) => p + 1)}
                            className="inline-flex h-9 items-center justify-center gap-1 border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-50 dark:border-white/10 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-white/5"
                        >
                            <FontAwesomeIcon icon={faChevronRight} className="h-3 w-3" />
                        </button>
                    </div>
                </div>
            )}
        </article>
    );
}