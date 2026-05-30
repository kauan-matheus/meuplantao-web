import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark, faEye } from "@fortawesome/free-solid-svg-icons";

import { plantaoStatusStyles, type PlantaoItem } from "./plantoes-data";

type PlantoesTableProps = {
  items: PlantaoItem[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
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

export function PlantoesTable({ items, onApprove, onReject, onView }: PlantoesTableProps) {
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
            {items.map((item) => (
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}