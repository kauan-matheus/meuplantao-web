/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare, faTrash, faSpinner, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { equipeRoleStyles, type EquipeMember } from "./equipe-data";

type EquipeTableProps = {
    members: EquipeMember[];
    isLoading?: boolean;
    isProcessing?: boolean;
    onView: (member: EquipeMember) => void;
    onEdit: (member: EquipeMember) => void;
    onDelete: (memberId: string) => void;
};

function actionButtonClass(kind: "view" | "edit" | "delete") {
    if (kind === "edit") {
        return "border-amber-300/60 bg-amber-50 text-amber-800 hover:bg-amber-100 dark:border-amber-300/30 dark:bg-amber-400/10 dark:text-amber-100 dark:hover:bg-amber-400/20";
    }

    if (kind === "delete") {
        return "border-rose-300/60 bg-rose-50 text-rose-800 hover:bg-rose-100 dark:border-rose-300/30 dark:bg-rose-400/10 dark:text-rose-100 dark:hover:bg-rose-400/20";
    }

    return "border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-white/5";
}

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

export function EquipeTable({ members, isLoading, isProcessing, onView, onEdit, onDelete }: EquipeTableProps) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(members.length / ITEMS_PER_PAGE) || 1;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const visibleItems = members.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    if (currentPage > totalPages) {
        setCurrentPage(totalPages);
    }

    const paginationItems = getPaginationItems(currentPage, totalPages);

    return (
        <article className="border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-950">
            <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Todos os usuários</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                        Controle contas, acesso e informações cadastrais do sistema.
                    </p>
                </div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{members.length} registros</p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-270 border-collapse text-left">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-white/10">
                            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 dark:text-slate-300">ID</th>
                            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 dark:text-slate-300">Usuário</th>
                            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 dark:text-slate-300">Perfil</th>
                            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 dark:text-slate-300">Status</th>
                            <th className="pb-3 text-xs font-semibold text-slate-500 dark:text-slate-300">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} className="py-12 text-center">
                                    <FontAwesomeIcon icon={faSpinner} className="h-6 w-6 animate-spin text-slate-400" />
                                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Carregando usuários...</p>
                                </td>
                            </tr>
                        ) : members.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
                                    Nenhum usuário encontrado.
                                </td>
                            </tr>
                        ) : (
                            visibleItems.map((member) => (
                                <tr key={member.id} className="border-b border-slate-100 align-top dark:border-white/5">
                                    <td className="py-4 pr-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                                        #{member.id}
                                    </td>
                                    <td className="py-4 pr-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 overflow-hidden rounded-full border border-slate-200 bg-slate-100 shrink-0 dark:border-white/10 dark:bg-white/5">
                                                {member.photoUrl ? (
                                                    <img src={member.photoUrl} alt={member.name} className="h-full w-full object-cover" />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-slate-500 dark:text-slate-400">
                                                        {member.name.charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{member.name}</div>
                                                <div className="text-xs text-slate-500 dark:text-slate-400">{member.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 pr-4 text-sm">
                                        <span className={`inline-flex rounded-none border px-2.5 py-1 text-xs font-semibold ${equipeRoleStyles[member.role]}`}>
                                            {member.role}
                                        </span>
                                    </td>
                                    <td className="py-4 pr-4 text-sm text-slate-700 dark:text-slate-200">
                                        <span className={`inline-flex rounded-none border px-2.5 py-1 text-xs font-semibold ${member.status === "Ativo" ? "border-emerald-300/70 bg-emerald-100/70 text-emerald-800 dark:border-emerald-300/30 dark:bg-emerald-400/10 dark:text-emerald-200" : "border-slate-300/70 bg-slate-100/70 text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-200"}`}>
                                            {member.status}
                                        </span>
                                    </td>
                                    <td className="py-4 text-sm">
                                        <div className="flex flex-nowrap items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => onView(member)}
                                                disabled={isProcessing}
                                                className={`inline-flex h-9 items-center gap-1.5 border px-2.5 text-xs font-medium whitespace-nowrap transition disabled:opacity-50 ${actionButtonClass("view")}`}
                                            >
                                                <FontAwesomeIcon icon={faEye} className="h-3.5 w-3.5" />
                                                Ver
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => onEdit(member)}
                                                disabled={isProcessing}
                                                className={`inline-flex h-9 items-center gap-1.5 border px-2.5 text-xs font-medium whitespace-nowrap transition disabled:opacity-50 ${actionButtonClass("edit")}`}
                                            >
                                                <FontAwesomeIcon icon={faPenToSquare} className="h-3.5 w-3.5" />
                                                Editar
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => onDelete(member.id)}
                                                disabled={isProcessing}
                                                className={`inline-flex h-9 items-center gap-1.5 border px-2.5 text-xs font-medium whitespace-nowrap transition disabled:opacity-50 ${actionButtonClass("delete")}`}
                                            >
                                                {isProcessing ? (
                                                    <FontAwesomeIcon icon={faSpinner} className="h-3.5 w-3.5 animate-spin" />
                                                ) : (
                                                    <FontAwesomeIcon icon={faTrash} className="h-3.5 w-3.5" />
                                                )}
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

            {members.length > ITEMS_PER_PAGE && (
                <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-white/10">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Mostrando <span className="font-medium text-slate-900 dark:text-slate-50">{startIndex + 1}</span> a{" "}
                        <span className="font-medium text-slate-900 dark:text-slate-50">
                            {Math.min(startIndex + ITEMS_PER_PAGE, members.length)}
                        </span>{" "}
                        de <span className="font-medium text-slate-900 dark:text-slate-50">{members.length}</span> resultados
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