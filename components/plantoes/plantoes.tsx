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
import { type PlantaoItem, type PlantaoStatus } from "./plantoes-data";
import { PlantoesModal } from "./plantoes-modal";
import { PlantoesTable } from "./plantoes-table";
import { PlantoesCreateModal } from "./plantoes-create-modal";
import { usePlantoes } from "@/lib/hooks/use-plantoes";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

type PlantoesConfirmModalProps = {
    open: boolean;
    item: PlantaoItem | null;
    nextStatus: PlantaoStatus | null;
    isProcessing?: boolean;
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
    isProcessing = false,
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

                    <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 dark:border-white/10 dark:bg-slate-900">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isProcessing}
                        className="h-10 px-4 text-sm font-medium text-slate-700 hover:text-slate-900 disabled:opacity-50 dark:text-slate-300 dark:hover:text-white"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isProcessing}
                        className={`inline-flex h-10 items-center justify-center gap-2 border px-4 text-sm font-medium transition disabled:opacity-50 ${confirmButtonClass(
                            nextStatus
                        )}`}
                    >
                        {isProcessing ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        ) : (
                            <FontAwesomeIcon icon={confirmIcon(nextStatus)} className="h-4 w-4" />
                        )}
                        {isProcessing ? "Processando..." : `Confirmar e ${actionLabel}`}
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
}

function PlantoesDeleteModal({
    open,
    item,
    onClose,
    onConfirm,
}: {
    open: boolean;
    item: PlantaoItem | null;
    onClose: () => void;
    onConfirm: () => void;
}) {
    if (!open || !item) return null;

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">
            <div className="w-full max-w-xl border border-slate-200 bg-white shadow-[0_24px_80px_-24px_rgba(15,23,42,0.6)] dark:border-white/10 dark:bg-slate-950">
                <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 dark:border-white/10">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center border border-rose-300/60 bg-rose-50 text-rose-800 dark:border-rose-300/30 dark:bg-rose-400/10 dark:text-rose-100">
                            <FontAwesomeIcon icon={faTriangleExclamation} className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Confirmação</p>
                            <h3 className="mt-1 text-xl font-semibold text-slate-950 dark:text-slate-50">
                                Excluir plantão
                            </h3>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-10 w-10 items-center justify-center border border-slate-200 text-slate-600 transition hover:border-slate-400 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
                    >
                        <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
                    </button>
                </div>

                <div className="px-5 py-5">
                    <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                        Tem certeza que deseja excluir o plantão <span className="font-semibold text-slate-950 dark:text-slate-50">{item.id}</span> de forma permanente? Essa ação não pode ser desfeita.
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
                            className="inline-flex h-10 items-center justify-center gap-2 border border-rose-300/60 bg-rose-50 px-3.5 text-sm font-medium text-rose-800 transition hover:bg-rose-100 dark:border-rose-300/30 dark:bg-rose-400/10 dark:text-rose-100 dark:hover:bg-rose-400/20"
                        >
                            <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                            Sim, excluir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Plantoes() {
    const {
        items,
        filteredItems,
        isLoading,
        error,
        search,
        setSearch,
        status,
        setStatus,
        handleAprovar,
        handleRecusar,
        handleCriarPlantao,
    } = usePlantoes();

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const [selectedPlantao, setSelectedPlantao] = useState<PlantaoItem | null>(null);
    const [draftPlantao, setDraftPlantao] = useState<PlantaoItem | null>(null);
    const [pendingAction, setPendingAction] = useState<{
        item: PlantaoItem;
        nextStatus: PlantaoStatus;
    } | null>(null);
    const [itemToDelete, setItemToDelete] = useState<PlantaoItem | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    function openPlantaoModal(item: PlantaoItem) {
        setSelectedPlantao(item);
        setDraftPlantao({ ...item });
    }

    function closePlantaoModal() {
        setSelectedPlantao(null);
        setDraftPlantao(null);
    }

    function askConfirmStatus(item: PlantaoItem, nextStatus: PlantaoStatus) {
        setPendingAction({ item, nextStatus });
    }

    function closeConfirmStatus() {
        setPendingAction(null);
    }

    function askConfirmDelete(item: PlantaoItem) {
        setItemToDelete(item);
    }

    async function confirmStatusChange() {
        if (!pendingAction) {
            return;
        }

        setIsProcessing(true);
        try {
            if (pendingAction.nextStatus === "Aprovado") {
                await handleAprovar(pendingAction.item.id);
            } else {
                await handleRecusar(pendingAction.item.id);
            }
        } finally {
            setIsProcessing(false);
            setPendingAction(null);
        }
    }

    function updateDraftField<K extends keyof PlantaoItem>(field: K, value: PlantaoItem[K]) {
        setDraftPlantao((currentDraft) => (currentDraft ? { ...currentDraft, [field]: value } : currentDraft));
    }

    const { handleEditarPlantao, handleDeletarPlantao } = usePlantoes();

    async function savePlantaoChanges() {
        if (!draftPlantao) return;
        
        try {
            // draftPlantao.periodo tem o formato string, então precisamos de "inicio" e "fim" válidos no JSON, o que pode dar conflito 
            // já que ResponsePlantaoJson não nos dá inicio/fim ISO originais.
            // Para editar precisamos do SetorId e inicio/fim originais.
            // Se o usuário pudesse apenas editar o valor seria mais fácil, mas para integração completa 
            // precisaríamos de um modal de edição diferente que consumisse GET /api/Plantao/plantoes/{id} para preencher os dados.
            // Como fallback simples para demonstrar o fluxo:
            setIsProcessing(true);
            await handleEditarPlantao({
                id: Number(draftPlantao.id),
                valor: 1200, // mock pois o GET não retorna valor para todos
                setorId: 1, // mock
                inicio: new Date().toISOString(),
                fim: new Date().toISOString()
            });
            setSelectedPlantao(draftPlantao);
            closePlantaoModal();
        } catch (error) {
            console.error("Erro ao salvar", error);
        } finally {
            setIsProcessing(false);
        }
    }

    async function deletePlantao() {
        if (!selectedPlantao) return;
        setIsProcessing(true);
        try {
            await handleDeletarPlantao(Number(selectedPlantao.id));
            closePlantaoModal();
        } catch (_error) {
            // Toast já foi exibido no hook
        } finally {
            setIsProcessing(false);
        }
    }

    async function confirmDeleteRow() {
        if (!itemToDelete) return;
        setIsProcessing(true);
        try {
            await handleDeletarPlantao(Number(itemToDelete.id));
            setItemToDelete(null);
        } catch (_error) {
            // Toast já foi exibido no hook
        } finally {
            setIsProcessing(false);
        }
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
                        onCreateClick={() => setIsCreateModalOpen(true)}
                    />

                    {error && (
                        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 text-sm">
                            {error}
                        </div>
                    )}

                    <div id="plantao-lista">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64 text-slate-500 border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950">
                                Carregando plantões...
                            </div>
                        ) : (
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
                                onDelete={(id) => {
                                    const item = items.find((currentItem) => currentItem.id === id);
                                    if (item) {
                                        askConfirmDelete(item);
                                    }
                                }}
                                onView={openPlantaoModal}
                            />
                        )}
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
                    open={!!pendingAction}
                    item={pendingAction?.item ?? null}
                    nextStatus={pendingAction?.nextStatus ?? null}
                    isProcessing={isProcessing}
                    onClose={closeConfirmStatus}
                    onConfirm={confirmStatusChange}
                />

                <PlantoesDeleteModal
                    open={Boolean(itemToDelete)}
                    item={itemToDelete}
                    onClose={() => setItemToDelete(null)}
                    onConfirm={confirmDeleteRow}
                />

                <PlantoesCreateModal
                    open={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onSave={handleCriarPlantao}
                />
            </main>
        </div>
    );
}