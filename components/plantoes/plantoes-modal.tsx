"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";

import type { PlantaoItem, PlantaoStatus } from "./plantoes-data";

type PlantoesModalProps = {
  open: boolean;
  item: PlantaoItem | null;
  draft: PlantaoItem | null;
  onClose: () => void;
  onChange: <K extends keyof PlantaoItem>(field: K, value: PlantaoItem[K]) => void;
  onSave: () => void;
  onDelete: () => void;
};

const statusOptions: PlantaoStatus[] = ["Pendente", "Aprovado", "Recusado"];

function fieldClass() {
  return "h-11 rounded-none border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-50";
}

export function PlantoesModal({ open, item, draft, onClose, onChange, onSave, onDelete }: PlantoesModalProps) {
  if (!open || !item || !draft) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-3xl border border-slate-200 bg-white shadow-[0_24px_80px_-24px_rgba(15,23,42,0.6)] dark:border-white/10 dark:bg-slate-950">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 dark:border-white/10">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Detalhes do plantão</p>
            <h3 className="mt-1 text-xl font-semibold text-slate-950 dark:text-slate-50">{item.id}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center border border-slate-200 text-slate-600 transition hover:border-slate-400 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
            aria-label="Fechar modal"
          >
            <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-6 px-5 py-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                <span>Unidade</span>
                <input
                  value={draft.unidade}
                  onChange={(event) => onChange("unidade", event.target.value)}
                  className={fieldClass()}
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                <span>Profissional</span>
                <input
                  value={draft.profissional}
                  onChange={(event) => onChange("profissional", event.target.value)}
                  className={fieldClass()}
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                <span>Especialidade</span>
                <input
                  value={draft.especialidade}
                  onChange={(event) => onChange("especialidade", event.target.value)}
                  className={fieldClass()}
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                <span>Período</span>
                <input
                  value={draft.periodo}
                  onChange={(event) => onChange("periodo", event.target.value)}
                  className={fieldClass()}
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                <span>Solicitante</span>
                <input
                  value={draft.solicitante}
                  onChange={(event) => onChange("solicitante", event.target.value)}
                  className={fieldClass()}
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                <span>Status</span>
                <select
                  value={draft.status}
                  onChange={(event) => onChange("status", event.target.value as PlantaoStatus)}
                  className={fieldClass()}
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
              <span>Observação</span>
              <textarea
                value={draft.observacao}
                onChange={(event) => onChange("observacao", event.target.value)}
                rows={4}
                className="min-h-28 w-full rounded-none border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-50"
              />
            </label>
          </div>

          <div className="space-y-4 border-t border-slate-200 pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0 dark:border-white/10">
            <div className="space-y-3 border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Resumo</p>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Código</p>
                <p className="text-sm font-medium text-slate-950 dark:text-slate-50">{draft.id}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Status atual</p>
                <p className="text-sm font-medium text-slate-950 dark:text-slate-50">{draft.status}</p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={onSave}
                className="inline-flex h-11 w-full items-center justify-center gap-2 border border-slate-950 bg-slate-950 px-4 text-sm font-medium text-white transition hover:bg-slate-800 dark:border-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                <FontAwesomeIcon icon={faFloppyDisk} className="h-4 w-4" />
                Salvar alterações
              </button>
              <button
                type="button"
                onClick={onDelete}
                className="inline-flex h-11 w-full items-center justify-center gap-2 border border-rose-300/60 bg-rose-50 px-4 text-sm font-medium text-rose-800 transition hover:bg-rose-100 dark:border-rose-300/30 dark:bg-rose-400/10 dark:text-rose-100 dark:hover:bg-rose-400/20"
              >
                <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                Excluir plantão
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 w-full items-center justify-center gap-2 border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-white/5"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
                Voltar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}