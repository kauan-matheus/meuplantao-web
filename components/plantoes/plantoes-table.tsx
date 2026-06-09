import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark, faEye, faTrash, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { plantaoStatusStyles, type PlantaoItem } from "./plantoes-data";

type PlantoesTableProps = {
  items: PlantaoItem[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (item: PlantaoItem) => void;
};

function actionButtonClass(variant: "approve" | "reject") {
  return variant === "approve"
    ? "border-emerald-300/60 bg-emerald-50 text-emerald-800 shadow-[0_1px_0_rgba(16,185,129,0.08)] hover:-translate-y-px hover:bg-emerald-100 dark:border-emerald-300/30 dark:bg-emerald-400/10 dark:text-emerald-100 dark:hover:bg-emerald-400/20"
    : "border-rose-300/60 bg-rose-50 text-rose-800 shadow-[0_1px_0_rgba(244,63,94,0.08)] hover:-translate-y-px hover:bg-rose-100 dark:border-rose-300/30 dark:bg-rose-400/10 dark:text-rose-100 dark:hover:bg-rose-400/20";
}

function viewButtonClass() {
  return "border-slate-300 bg-white text-slate-700 shadow-[0_1px_0_rgba(15,23,42,0.06)] hover:-translate-y-px hover:border-slate-400 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-white/5";
}

const ITEMS_PER_PAGE = 6;

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

export function PlantoesTable({ items, onApprove, onReject, onDelete, onView }: PlantoesTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Garantir que não fique numa página vazia se o filtro mudar
  if (currentPage > totalPages) {
    setCurrentPage(totalPages);
  }

  const paginationItems = getPaginationItems(currentPage, totalPages);

  return (
    <article className="border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-950">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Todos os plantões</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Analise as solicitações e valide cada turno manualmente.
          </p>
        </div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {items.length} registros
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-270 border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 dark:border-white/10">
              <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 dark:text-slate-300">
                Código
              </th>
              <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 dark:text-slate-300">
                Unidade
              </th>
              <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 dark:text-slate-300">
                Profissional
              </th>
              <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 dark:text-slate-300">
                Período
              </th>
              <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 dark:text-slate-300">
                Status
              </th>
              <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 dark:text-slate-300">
                Solicitante
              </th>
              <th className="pb-3 text-xs font-semibold text-slate-500 dark:text-slate-300">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleItems.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                  Nenhum plantão encontrado.
                </td>
              </tr>
            ) : (
              visibleItems.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 align-top dark:border-white/5">
                  <td className="py-4 pr-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {item.id}
                  </td>
                  <td className="py-4 pr-4 text-sm text-slate-700 dark:text-slate-200">{item.unidade}</td>
                  <td className="py-4 pr-4 text-sm text-slate-700 dark:text-slate-200">
                    <div className="font-medium text-slate-900 dark:text-slate-50">{item.profissional}</div>
                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{item.especialidade}</div>
                  </td>
                  <td className="py-4 pr-4 text-sm text-slate-700 dark:text-slate-200">{item.periodo}</td>
                  <td className="py-4 pr-4 text-sm">
                    <span
                      className={`inline-flex rounded-none border px-2.5 py-1 text-xs font-semibold ${plantaoStatusStyles[item.status]}`}
                    >
                      {item.status}
                    </span>
                    <p className="mt-2 max-w-60 text-xs leading-5 text-slate-500 dark:text-slate-400">
                      {item.observacao}
                    </p>
                  </td>
                  <td className="py-4 pr-4 text-sm text-slate-700 dark:text-slate-200">{item.solicitante}</td>
                  <td className="py-4 text-sm">
                    <div className="flex flex-nowrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onView(item)}
                        className={`inline-flex h-9 items-center gap-1.5 border px-2.5 text-xs font-medium whitespace-nowrap transition ${viewButtonClass()}`}
                      >
                        <FontAwesomeIcon icon={faEye} className="h-3.5 w-3.5" />
                        Ver
                      </button>
                      <button
                        type="button"
                        onClick={() => onApprove(item.id)}
                        className={`inline-flex h-9 items-center gap-1.5 border px-2.5 text-xs font-medium whitespace-nowrap transition ${actionButtonClass("approve")}`}
                      >
                        <FontAwesomeIcon icon={faCircleCheck} className="h-3.5 w-3.5" />
                        Aprovar
                      </button>
                      <button
                        type="button"
                        onClick={() => onReject(item.id)}
                        className={`inline-flex h-9 items-center gap-1.5 border px-2.5 text-xs font-medium whitespace-nowrap transition ${actionButtonClass("reject")}`}
                      >
                        <FontAwesomeIcon icon={faCircleXmark} className="h-3.5 w-3.5" />
                        Recusar
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(item.id)}
                        className="inline-flex h-9 items-center gap-1.5 border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-500 hover:-translate-y-px hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 whitespace-nowrap transition dark:border-white/10 dark:bg-slate-950 dark:text-slate-400 dark:hover:border-rose-500/30 dark:hover:bg-rose-500/10 dark:hover:text-rose-400"
                      >
                        <FontAwesomeIcon icon={faTrash} className="h-3.5 w-3.5" />
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {items.length > ITEMS_PER_PAGE && (
        <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-white/10">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Mostrando <span className="font-medium text-slate-900 dark:text-slate-50">{startIndex + 1}</span> a{" "}
            <span className="font-medium text-slate-900 dark:text-slate-50">
              {Math.min(startIndex + ITEMS_PER_PAGE, items.length)}
            </span>{" "}
            de <span className="font-medium text-slate-900 dark:text-slate-50">{items.length}</span> resultados
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