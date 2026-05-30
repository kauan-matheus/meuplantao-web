"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark, faTriangleExclamation, faXmark } from "@fortawesome/free-solid-svg-icons";

import type { PlantaoItem, PlantaoStatus } from "./plantoes-data";

type PlantoesConfirmModalProps = {
  open: boolean;
  item: PlantaoItem | null;
  nextStatus: PlantaoStatus | null;
  onClose: () => void;
  onConfirm: () => void;
};

function confirmButtonClass(nextStatus: PlantaoStatus | null) {
  if (nextStatus === "Aprovado") {
    return "border-emerald-300/60 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:border-emerald-300/30 dark:bg-emerald-400/10 dark:text-emerald-100 dark:hover:bg-emerald-400/20";
  }

  return "border-rose-300/60 bg-rose-50 text-rose-800 hover:bg-rose-100 dark:border-rose-300/30 dark:bg-rose-400/10 dark:text-rose-100 dark:hover:bg-rose-400/20";
}

function confirmIcon(nextStatus: PlantaoStatus | null) {
  return nextStatus === "Aprovado" ? faCircleCheck : faCircleXmark;
}

export function PlantoesConfirmModal({
  open,
  item,
  nextStatus,
  onClose,
  onConfirm,
}: PlantoesConfirmModalProps) {
  if (!open || !item || !nextStatus) {
    return null;
  }

  const actionLabel = nextStatus === "Aprovado" ? "aprovar" : "recusar";

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-xl border border-slate-200 bg-white shadow-[0_24px_80px_-24px_rgba(15,23,42,0.6)] dark:border-white/10 dark:bg-slate-950">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 dark:border-white/10">
          <div className="flex items-start gap-3">
            <div className={`flex h-10 w-10 items-center justify-center border ${confirmButtonClass(nextStatus)}`}>
              <FontAwesomeIcon icon={faTriangleExclamation} className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Confirmação</p>
              <h3 className="mt-1 text-xl font-semibold text-slate-950 dark:text-slate-50">
                {nextStatus === "Aprovado" ? "Aprovar plantão" : "Recusar plantão"}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center border border-slate-200 text-slate-600 transition hover:border-slate-400 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
            aria-label="Fechar confirmação"
          >
            <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
          </button>
        </div>

        <div className="px-5 py-5">
          <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
            Tem certeza que deseja {actionLabel} o plantão <span className="font-semibold text-slate-950 dark:text-slate-50">{item.id}</span> de <span className="font-semibold text-slate-950 dark:text-slate-50">{item.profissional}</span> na unidade <span className="font-semibold text-slate-950 dark:text-slate-50">{item.unidade}</span>?
          </p>

          <div className="mt-6 flex flex-nowrap items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 items-center justify-center border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-white/5"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className={`inline-flex h-10 items-center justify-center gap-2 border px-3.5 text-sm font-medium transition ${confirmButtonClass(nextStatus)}`}
            >
              <FontAwesomeIcon icon={confirmIcon(nextStatus)} className="h-4 w-4" />
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}