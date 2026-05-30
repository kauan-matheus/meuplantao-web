"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarCheck,
    faCircleCheck,
    faCircleXmark,
    faTriangleExclamation,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";

import Sidebar from "@/components/sidebar/sidebar";
import Particles from "@/components/ui/particles";

import { PlantoesFilters } from "./plantoes-filters";
import { plantaoRows, type PlantaoItem, type PlantaoStatus } from "./plantoes-data";
import { PlantoesModal } from "./plantoes-modal";
import { PlantoesTable } from "./plantoes-table";

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

function PlantoesConfirmModal({
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

export default function Plantoes() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<PlantaoStatus | "Todos">("Todos");
    const [items, setItems] = useState<PlantaoItem[]>(plantaoRows);
    const [selectedPlantao, setSelectedPlantao] = useState<PlantaoItem | null>(null);
    const [draftPlantao, setDraftPlantao] = useState<PlantaoItem | null>(null);
    const [pendingAction, setPendingAction] = useState<{
        item: PlantaoItem;
        nextStatus: PlantaoStatus;
    } | null>(null);

    const filteredItems = items.filter((item) => {
        const query = search.trim().toLowerCase();
        const matchesSearch =
            query.length === 0 ||
            [item.id, item.unidade, item.profissional, item.especialidade, item.periodo, item.solicitante]
                .join(" ")
                .toLowerCase()
                .includes(query);
        const matchesStatus = status === "Todos" || item.status === status;

        return matchesSearch && matchesStatus;
    });

    function openPlantaoModal(item: PlantaoItem) {
        setSelectedPlantao(item);
        setDraftPlantao({ ...item });
    }

    function closePlantaoModal() {
        setSelectedPlantao(null);
        setDraftPlantao(null);
    }

    function updateStatus(targetId: string, nextStatus: PlantaoStatus) {
        setItems((currentItems) =>
            currentItems.map((item) =>
                item.id === targetId ? { ...item, status: nextStatus } : item
            )
        );
    }

    function askConfirmStatus(item: PlantaoItem, nextStatus: PlantaoStatus) {
        setPendingAction({ item, nextStatus });
    }

    function closeConfirmStatus() {
        setPendingAction(null);
    }

    function confirmStatusChange() {
        if (!pendingAction) {
            return;
        }

        updateStatus(pendingAction.item.id, pendingAction.nextStatus);
        setPendingAction(null);
    }

    function updateDraftField<K extends keyof PlantaoItem>(field: K, value: PlantaoItem[K]) {
        setDraftPlantao((currentDraft) => (currentDraft ? { ...currentDraft, [field]: value } : currentDraft));
    }

    function savePlantaoChanges() {
        if (!draftPlantao) {
            return;
        }

        setItems((currentItems) =>
            currentItems.map((item) => (item.id === draftPlantao.id ? draftPlantao : item))
        );
        setSelectedPlantao(draftPlantao);
    }

    function deletePlantao() {
        if (!selectedPlantao) {
            return;
        }

        setItems((currentItems) => currentItems.filter((item) => item.id !== selectedPlantao.id));
        closePlantaoModal();
    }

    return (
        <div className="relative isolate min-h-screen overflow-x-hidden bg-background md:pl-72">
            <Particles
                particleColors={["#000000", "#111827", "#374151"]}
                particleCount={350}
                particleSpread={18}
                speed={0.1}
                particleBaseSize={90}
                moveParticlesOnHover
                alphaParticles={false}
                disableRotation={false}
                pixelRatio={1}
                className="fixed inset-0 z-0 opacity-45"
            />
            <Sidebar />

            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.08),transparent_32%),radial-gradient(circle_at_top_right,rgba(0,0,0,0.06),transparent_28%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_32%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_28%)]" />

            <main className="relative z-10 px-4 py-10 sm:px-6 lg:px-8">
                <div className="max-w-3xl space-y-3">
                    <div className="inline-flex items-center gap-2 border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-slate-950 dark:text-slate-300">
                        <FontAwesomeIcon icon={faCalendarCheck} className="h-3.5 w-3.5" />
                        Gestão de plantões
                    </div>
                    <h1 className="text-3xl font-semibold text-slate-950 dark:text-slate-50 sm:text-4xl">
                        Aprove, recuse e gerencie plantões.
                    </h1>
                    <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                        A tela abaixo concentra todas as solicitações, com busca rápida, filtro por status e
                        ações diretas para liberar ou negar cada registro.
                    </p>
                </div>

                <div className="mt-8 space-y-6">
                    <PlantoesFilters
                        search={search}
                        status={status}
                        onSearchChange={setSearch}
                        onStatusChange={setStatus}
                    />

                    <div id="plantao-lista">
                        <PlantoesTable
                            items={filteredItems}
                            onApprove={(id) => {
                                const item = items.find((currentItem) => currentItem.id === id);

                                if (item) {
                                    askConfirmStatus(item, "Aprovado");
                                }
                            }}
                            onReject={(id) => {
                                const item = items.find((currentItem) => currentItem.id === id);

                                if (item) {
                                    askConfirmStatus(item, "Recusado");
                                }
                            }}
                            onView={openPlantaoModal}
                        />
                    </div>
                </div>

                <PlantoesModal
                    open={Boolean(selectedPlantao && draftPlantao)}
                    item={selectedPlantao}
                    draft={draftPlantao}
                    onClose={closePlantaoModal}
                    onChange={updateDraftField}
                    onSave={savePlantaoChanges}
                    onDelete={deletePlantao}
                />

                <PlantoesConfirmModal
                    open={Boolean(pendingAction)}
                    item={pendingAction?.item ?? null}
                    nextStatus={pendingAction?.nextStatus ?? null}
                    onClose={closeConfirmStatus}
                    onConfirm={confirmStatusChange}
                />
            </main>
        </div>
    );
}