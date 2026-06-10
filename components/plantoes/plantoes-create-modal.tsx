"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { getSetores } from "@/lib/services/setor.service";

interface Setor {
  id: number;
  nome: string;
  estabelecimentoNome?: string;
}

interface PlantoesCreateModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (plantao: { valor: number; setorId: number; inicio: string; fim: string }) => Promise<void>;
}

export function PlantoesCreateModal({ open, onClose, onSave }: PlantoesCreateModalProps) {
  const [setores, setSetores] = useState<Setor[]>([]);
  const [isLoadingSetores, setIsLoadingSetores] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    setorId: "",
    inicio: "",
    fim: "",
    valor: ""
  });

  async function carregarSetores() {
    setIsLoadingSetores(true);
    try {
      const data = await getSetores();
      setSetores(data || []);
      if (data && data.length > 0) {
        setFormData(prev => ({ ...prev, setorId: data[0].id.toString() }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingSetores(false);
    }
  }

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line
      setFormData({ setorId: "", inicio: "", fim: "", valor: "" });
      setError(null);
      carregarSetores();
    }
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const valorNum = parseFloat(formData.valor);
    const setorIdNum = parseInt(formData.setorId, 10);

    if (isNaN(valorNum) || valorNum <= 0) {
      setError("Valor deve ser maior que zero.");
      return;
    }
    if (isNaN(setorIdNum)) {
      setError("Selecione um setor.");
      return;
    }
    if (!formData.inicio || !formData.fim) {
      setError("Informe o início e o fim do plantão.");
      return;
    }
    if (new Date(formData.inicio) >= new Date(formData.fim)) {
      setError("O horário de início deve ser anterior ao de fim.");
      return;
    }

    setIsSaving(true);
    try {
      // Ajustar data/hora para formato ISO que a API aceita (ex: "2023-10-25T08:00:00.000Z")
      // Os inputs type="datetime-local" retornam "YYYY-MM-DDThh:mm" (tempo local).
      // Se a API exigir UTC, usamos toISOString.
      const inicioDate = new Date(formData.inicio);
      const fimDate = new Date(formData.fim);

      await onSave({
        valor: valorNum,
        setorId: setorIdNum,
        inicio: inicioDate.toISOString(),
        fim: fimDate.toISOString(),
      });
      onClose();
    } catch (err: unknown) {
      setError((err as Error).message || "Erro ao criar plantão.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-lg border border-slate-200 bg-white shadow-[0_24px_80px_-24px_rgba(15,23,42,0.6)] dark:border-white/10 dark:bg-slate-950">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-white/10">
          <h2 className="text-lg font-semibold text-slate-950 dark:text-slate-50">Novo Plantão</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5">
          {error && (
             <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-800 p-3 text-sm">
               {error}
             </div>
          )}

          <form id="create-plantao-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Setor / Unidade</label>
              <select
                name="setorId"
                value={formData.setorId}
                onChange={handleChange}
                disabled={isLoadingSetores}
                className="w-full rounded-none border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100"
                required
              >
                {isLoadingSetores && <option>Carregando setores...</option>}
                {!isLoadingSetores && setores.length === 0 && <option value="">Nenhum setor encontrado</option>}
                {!isLoadingSetores && setores.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nome} {s.estabelecimentoNome ? `(${s.estabelecimentoNome})` : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Início</label>
                <input
                  type="datetime-local"
                  name="inicio"
                  value={formData.inicio}
                  onChange={handleChange}
                  className="w-full rounded-none border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Fim</label>
                <input
                  type="datetime-local"
                  name="fim"
                  value={formData.fim}
                  onChange={handleChange}
                  className="w-full rounded-none border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Valor do Plantão (R$)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                name="valor"
                value={formData.valor}
                onChange={handleChange}
                placeholder="Ex: 1200.00"
                className="w-full rounded-none border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100"
                required
              />
            </div>
          </form>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 dark:border-white/10 dark:bg-slate-900">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
            disabled={isSaving}
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="create-plantao-form"
            className="inline-flex items-center gap-2 rounded-none border border-transparent bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            disabled={isSaving}
          >
            {isSaving ? "Salvando..." : (
              <>
                <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                Criar Plantão
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
