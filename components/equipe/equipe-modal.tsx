"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk, faPenToSquare, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";

import type { EquipeMember, EquipeRole } from "./equipe-data";

type ModalMode = "view" | "create" | "edit";

type DraftMember = Omit<EquipeMember, "id"> & { id?: string };

type EquipeMemberModalProps = {
    open: boolean;
    mode: ModalMode;
    member: EquipeMember | null;
    draft: DraftMember | null;
    onClose: () => void;
    onChange: <K extends keyof DraftMember>(field: K, value: DraftMember[K]) => void;
    onSave: () => void;
    onEditRequest: () => void;
    onDelete: (memberId?: string) => void;
};

const roleOptions: EquipeRole[] = ["Admin", "Profissional", "Gestor"];

function inputClass() {
    return "h-11 w-full rounded-none border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-50";
}

export function EquipeMemberModal({
    open,
    mode,
    member,
    draft,
    onClose,
    onChange,
    onSave,
    onEditRequest,
    onDelete,
}: EquipeMemberModalProps) {
    if (!open || !draft) {
        return null;
    }

    const isView = mode === "view";
    const title = mode === "create" ? "Novo usuário" : mode === "edit" ? "Editar usuário" : "Visualizar usuário";

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">
            <div className="w-full max-w-3xl border border-slate-200 bg-white shadow-[0_24px_80px_-24px_rgba(15,23,42,0.6)] dark:border-white/10 dark:bg-slate-950">
                <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 dark:border-white/10">
                    <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Gestão de usuários</p>
                        <h3 className="mt-1 text-xl font-semibold text-slate-950 dark:text-slate-50">{title}</h3>
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
                                <span>Nome</span>
                                <input
                                    value={draft.name}
                                    disabled={isView}
                                    onChange={(event) => onChange("name", event.target.value)}
                                    className={inputClass()}
                                />
                            </label>
                            <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                                <span>E-mail</span>
                                <input
                                    value={draft.email}
                                    disabled={isView}
                                    onChange={(event) => onChange("email", event.target.value)}
                                    className={inputClass()}
                                />
                            </label>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                                <span>Perfil</span>
                                <select
                                    value={draft.role}
                                    disabled={isView}
                                    onChange={(event) => onChange("role", event.target.value as EquipeRole)}
                                    className={inputClass()}
                                >
                                    {roleOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                                <span>Status</span>
                                <select
                                    value={draft.status}
                                    disabled={isView}
                                    onChange={(event) => onChange("status", event.target.value as EquipeMember["status"])}
                                    className={inputClass()}
                                >
                                    <option value="Ativo">Ativo</option>
                                    <option value="Inativo">Inativo</option>
                                </select>
                            </label>
                        </div>

                        <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                            <span>Departamento</span>
                            <input
                                value={draft.department}
                                disabled={isView}
                                onChange={(event) => onChange("department", event.target.value)}
                                className={inputClass()}
                            />
                        </label>

                        <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                            <span>Observações</span>
                            <textarea
                                value={draft.notes}
                                disabled={isView}
                                onChange={(event) => onChange("notes", event.target.value)}
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
                                <p className="text-sm font-medium text-slate-950 dark:text-slate-50">
                                    {member?.id ?? "Novo usuário"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Perfil</p>
                                <p className="text-sm font-medium text-slate-950 dark:text-slate-50">{draft.role}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {!isView ? (
                                <button
                                    type="button"
                                    onClick={onSave}
                                    className="inline-flex h-11 w-full items-center justify-center gap-2 border border-slate-950 bg-slate-950 px-4 text-sm font-medium text-white transition hover:bg-slate-800 dark:border-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                                >
                                    <FontAwesomeIcon icon={faFloppyDisk} className="h-4 w-4" />
                                    Salvar usuário
                                </button>
                            ) : null}

                            {!isView ? (
                                <button
                                    type="button"
                                    onClick={() => onDelete(member?.id)}
                                    className="inline-flex h-11 w-full items-center justify-center gap-2 border border-rose-300/60 bg-rose-50 px-4 text-sm font-medium text-rose-800 transition hover:bg-rose-100 dark:border-rose-300/30 dark:bg-rose-400/10 dark:text-rose-100 dark:hover:bg-rose-400/20"
                                >
                                    <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                                    Excluir usuário
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={onEditRequest}
                                    className="inline-flex h-11 w-full items-center justify-center gap-2 border border-slate-950 bg-slate-950 px-4 text-sm font-medium text-white transition hover:bg-slate-800 dark:border-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                                >
                                    <FontAwesomeIcon icon={faPenToSquare} className="h-4 w-4" />
                                    Editar usuário
                                </button>
                            )}

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