"use client";

import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCirclePlus,
	faUsers,
} from "@fortawesome/free-solid-svg-icons";

import Sidebar from "@/components/sidebar/sidebar";
import Particles from "@/components/ui/particles";
import { Button } from "@/components/ui/button";

import { equipeRoles, equipeSeed, type EquipeMember, type EquipeRole } from "./equipe-data";
import { EquipeFilters } from "./equipe-filters";
import { EquipeMemberModal } from "./equipe-modal";
import { EquipeTable } from "./equipe-table";

type ModalMode = "view" | "create" | "edit";

type DraftMember = Omit<EquipeMember, "id"> & { id?: string };

export default function EquipePage() {
	const [search, setSearch] = useState("");
	const [role, setRole] = useState<EquipeRole | "Todos">("Todos");
	const [members, setMembers] = useState<EquipeMember[]>(equipeSeed);
	const [modalOpen, setModalOpen] = useState(false);
	const [modalMode, setModalMode] = useState<ModalMode>("view");
	const [selectedMember, setSelectedMember] = useState<EquipeMember | null>(null);
	const [draft, setDraft] = useState<DraftMember | null>(null);

	const filteredMembers = useMemo(() => {
		const query = search.trim().toLowerCase();

		return members.filter((member) => {
			const matchesSearch =
				query.length === 0 ||
				[member.name, member.email, member.department, member.role, member.status]
					.join(" ")
					.toLowerCase()
					.includes(query);

			const matchesRole = role === "Todos" || member.role === role;

			return matchesSearch && matchesRole;
		});
	}, [members, role, search]);

	function openCreateModal() {
		setModalMode("create");
		setSelectedMember(null);
		setDraft({
			name: "",
			email: "",
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
		setDraft({ ...member });
		setModalOpen(true);
	}

	function openEditModal(member: EquipeMember) {
		setModalMode("edit");
		setSelectedMember(member);
		setDraft({ ...member });
		setModalOpen(true);
	}

	function switchModalToEdit() {
		if (!draft) {
			return;
		}

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

	function saveMember() {
		if (!draft) {
			return;
		}

		if (modalMode === "create") {
			const nextMember: EquipeMember = {
				id: `USR-${String(members.length + 1).padStart(3, "0")}`,
				name: draft.name,
				email: draft.email,
				role: draft.role,
				department: draft.department,
				status: draft.status,
				notes: draft.notes,
			};

			setMembers((currentMembers) => [nextMember, ...currentMembers]);
			setSelectedMember(nextMember);
			setDraft(nextMember);
			setModalMode("view");
			return;
		}

		setMembers((currentMembers) =>
			currentMembers.map((member) => (member.id === draft.id ? (draft as EquipeMember) : member))
		);
		setSelectedMember(draft as EquipeMember);
		setModalMode("view");
	}

	function deleteMember(memberId?: string) {
		const targetId = memberId ?? selectedMember?.id;

		if (!targetId) {
			return;
		}

		setMembers((currentMembers) => currentMembers.filter((member) => member.id !== targetId));
		closeModal();
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
						members={filteredMembers}
						onView={openViewModal}
						onEdit={openEditModal}
						onDelete={deleteMember}
					/>
				</div>

				<EquipeMemberModal
					open={modalOpen}
					mode={modalMode}
					member={selectedMember}
					draft={draft}
					onClose={closeModal}
					onChange={updateDraftField}
					onSave={saveMember}
					onEditRequest={switchModalToEdit}
					onDelete={deleteMember}
				/>
			</main>
		</div>
	);
}
