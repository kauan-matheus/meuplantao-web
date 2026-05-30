import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

import { equipeRoleStyles, type EquipeMember } from "./equipe-data";

type EquipeTableProps = {
    members: EquipeMember[];
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

export function EquipeTable({ members, onView, onEdit, onDelete }: EquipeTableProps) {
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
                            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 dark:text-slate-300">Nome</th>
                            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 dark:text-slate-300">E-mail</th>
                            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 dark:text-slate-300">Perfil</th>
                            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 dark:text-slate-300">Departamento</th>
                            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 dark:text-slate-300">Status</th>
                            <th className="pb-3 text-xs font-semibold text-slate-500 dark:text-slate-300">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((member) => (
                            <tr key={member.id} className="border-b border-slate-100 align-top dark:border-white/5">
                                <td className="py-4 pr-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                                    <div>{member.name}</div>
                                    <div className="mt-1 text-xs font-normal text-slate-500 dark:text-slate-400">{member.id}</div>
                                </td>
                                <td className="py-4 pr-4 text-sm text-slate-700 dark:text-slate-200">{member.email}</td>
                                <td className="py-4 pr-4 text-sm">
                                    <span className={`inline-flex rounded-none border px-2.5 py-1 text-xs font-semibold ${equipeRoleStyles[member.role]}`}>
                                        {member.role}
                                    </span>
                                </td>
                                <td className="py-4 pr-4 text-sm text-slate-700 dark:text-slate-200">
                                    <div className="font-medium text-slate-900 dark:text-slate-50">{member.department}</div>
                                    <div className="mt-1 max-w-64 text-xs leading-5 text-slate-500 dark:text-slate-400">{member.notes}</div>
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
                                            className={`inline-flex h-9 items-center gap-1.5 border px-2.5 text-xs font-medium whitespace-nowrap transition ${actionButtonClass("view")}`}
                                        >
                                            <FontAwesomeIcon icon={faEye} className="h-3.5 w-3.5" />
                                            Ver
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => onEdit(member)}
                                            className={`inline-flex h-9 items-center gap-1.5 border px-2.5 text-xs font-medium whitespace-nowrap transition ${actionButtonClass("edit")}`}
                                        >
                                            <FontAwesomeIcon icon={faPenToSquare} className="h-3.5 w-3.5" />
                                            Editar
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => onDelete(member.id)}
                                            className={`inline-flex h-9 items-center gap-1.5 border px-2.5 text-xs font-medium whitespace-nowrap transition ${actionButtonClass("delete")}`}
                                        >
                                            <FontAwesomeIcon icon={faTrash} className="h-3.5 w-3.5" />
                                            Excluir
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