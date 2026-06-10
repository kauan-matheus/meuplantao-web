"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faUsers, faTrash, faSpinner } from "@fortawesome/free-solid-svg-icons";

import Sidebar from "@/components/sidebar/sidebar";
import Particles from "@/components/ui/particles";
import { Button } from "@/components/ui/button";

import { equipeRoles, type EquipeMember, type EquipeRole } from "./equipe-data";
import { EquipeFilters } from "./equipe-filters";
import { EquipeMemberModal } from "./equipe-modal";
import { EquipeTable } from "./equipe-table";
import { useEquipe } from "@/lib/hooks/use-equipe";

type ModalMode = "view" | "create" | "edit";

type DraftMember = Omit<EquipeMember, "id"> & { id?: string; password?: string };

export default function EquipePage() {
	const {
		members,
		isLoading,
		search,
		setSearch,
		role,
		setRole,
		handleCreateUser,
		handleEditUser,
		handleDeleteUser,
	} = useEquipe();

	const [modalOpen, setModalOpen] = useState(false);
	const [modalMode, setModalMode] = useState<ModalMode>("view");
	const [selectedMember, setSelectedMember] = useState<EquipeMember | null>(null);
	const [draft, setDraft] = useState<DraftMember | null>(null);
	const [isProcessing, setIsProcessing] = useState(false);
	const [memberToDelete, setMemberToDelete] = useState<string | null>(null);

	function openCreateModal() {
		setModalMode("create");
		setSelectedMember(null);
		setDraft({
			name: "",
			email: "",
			password: "",
			role: "Profissional",
			department: "",
			status: "Ativo",
			notes: "",
		});
		setModalOpen(true);
	}

	function openViewModal(member: EquipeMember) {
		setModalMode("view");
		setSelectedMember(member);
		setDraft({ ...member, password: "" });
		setModalOpen(true);
	}

	function openEditModal(member: EquipeMember) {
		setModalMode("edit");
		setSelectedMember(member);
		setDraft({ ...member, password: "" });
		setModalOpen(true);
	}

	function switchModalToEdit() {
		if (!draft) return;
		setModalMode("edit");
	}

	function closeModal() {
		setModalOpen(false);
		setSelectedMember(null);
		setDraft(null);
	}

	function updateDraftField<K extends keyof DraftMember>(field: K, value: DraftMember[K]) {
		setDraft((currentDraft) => (currentDraft ? { ...currentDraft, [field]: value } : currentDraft));
	}

	async function saveMember() {
		if (!draft) return;
		setIsProcessing(true);

		try {
			if (modalMode === "create") {
				await handleCreateUser({
					email: draft.email,
					password: draft.password || "usuario",
					role: draft.role,
					active: draft.status === "Ativo",
				});
				closeModal();
			} else if (modalMode === "edit" && draft.id) {
				await handleEditUser({
					id: Number(draft.id),
					email: draft.email,
					password: draft.password || "usuario",
					role: draft.role,
					active: draft.status === "Ativo",
				});
				closeModal();
			}
		} catch (_err) {
			// Toast já exibido pelo hook
		} finally {
			setIsProcessing(false);
		}
	}

	function confirmDelete(memberId?: string) {
		const targetId = memberId ?? selectedMember?.id;
		if (!targetId) return;
		setMemberToDelete(targetId);
	}

	function cancelDelete() {
		setMemberToDelete(null);
	}

	async function executeDelete() {
		if (!memberToDelete) return;
		
		setIsProcessing(true);
		try {
			await handleDeleteUser(Number(memberToDelete));
			setMemberToDelete(null);
			if (selectedMember?.id === memberToDelete) {
				closeModal();
			}
		} catch (_err) {
			// Toast já exibido pelo hook
		} finally {
			setIsProcessing(false);
		}
	}

	return (
		<div className="relative isolate min-h-screen overflow-x-hidden bg-background md:pl-72">
			<Particles
				particleColors={["#000000", "#111827", "#374151"]}
				particleCount={320}
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
						<FontAwesomeIcon icon={faUsers} className="h-3.5 w-3.5" />
						Gestão de usuários
					</div>
					<h1 className="text-3xl font-semibold text-slate-950 dark:text-slate-50 sm:text-4xl">
						Gerencie todos os usuários do sistema.
					</h1>
					<p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
						Crie, visualize, edite e exclua usuários com filtros por perfil de acesso para
						admin, profissional e gestor.
					</p>
				</div>

				<div className="mt-8 space-y-6">
					<div className="flex flex-col gap-3 border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-950 sm:flex-row sm:items-end sm:justify-between">
						<EquipeFilters
							search={search}
							role={role}
							roles={equipeRoles}
							onSearchChange={setSearch}
							onRoleChange={setRole}
						/>

						<Button
							type="button"
							onClick={openCreateModal}
							className="h-11 rounded-none border border-slate-950 bg-slate-950 px-4 text-sm font-medium text-white shadow-none transition hover:bg-slate-800 dark:border-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
						>
							<FontAwesomeIcon icon={faCirclePlus} className="h-4 w-4" />
							Novo usuário
						</Button>
					</div>

					<EquipeTable
						members={members}
						isLoading={isLoading}
						isProcessing={isProcessing}
						onView={openViewModal}
						onEdit={openEditModal}
						onDelete={confirmDelete}
					/>
				</div>

				<EquipeMemberModal
					open={modalOpen}
					mode={modalMode}
					member={selectedMember}
					draft={draft}
					isProcessing={isProcessing}
					onClose={closeModal}
					onChange={updateDraftField}
					onSave={saveMember}
					onEditRequest={switchModalToEdit}
					onDelete={confirmDelete}
				/>

				{memberToDelete && (
					<div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">
						<div className="w-full max-w-md border border-slate-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-slate-950">
							<h3 className="text-lg font-semibold text-slate-950 dark:text-slate-50">Excluir usuário</h3>
							<p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
								Tem certeza que deseja excluir o usuário #{memberToDelete}? Esta ação não pode ser desfeita.
							</p>
							<div className="mt-6 flex items-center justify-end gap-3">
								<button
									type="button"
									onClick={cancelDelete}
									disabled={isProcessing}
									className="inline-flex h-10 items-center justify-center border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 disabled:opacity-50 dark:border-white/10 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-white/5"
								>
									Cancelar
								</button>
								<button
									type="button"
									onClick={executeDelete}
									disabled={isProcessing}
									className="inline-flex h-10 items-center justify-center gap-2 border border-rose-300/60 bg-rose-50 px-4 text-sm font-medium text-rose-800 transition hover:bg-rose-100 disabled:opacity-50 dark:border-rose-300/30 dark:bg-rose-400/10 dark:text-rose-100 dark:hover:bg-rose-400/20"
								>
									{isProcessing ? (
										<FontAwesomeIcon icon={faSpinner} className="h-4 w-4 animate-spin" />
									) : (
										<FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
									)}
									Excluir
								</button>
							</div>
						</div>
					</div>
				)}
			</main>
		</div>
	);
}
