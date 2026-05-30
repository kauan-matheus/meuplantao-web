export type EquipeRole = "Admin" | "Profissional" | "Gestor";

export type EquipeMember = {
    id: string;
    name: string;
    email: string;
    role: EquipeRole;
    department: string;
    status: "Ativo" | "Inativo";
    notes: string;
};

export const equipeRoles: Array<EquipeRole | "Todos"> = ["Todos", "Admin", "Profissional", "Gestor"];

export const equipeRoleStyles: Record<EquipeRole, string> = {
    Admin: "border-sky-300/70 bg-sky-100/70 text-sky-800 dark:border-sky-300/30 dark:bg-sky-400/10 dark:text-sky-200",
    Profissional: "border-emerald-300/70 bg-emerald-100/70 text-emerald-800 dark:border-emerald-300/30 dark:bg-emerald-400/10 dark:text-emerald-200",
    Gestor: "border-amber-300/70 bg-amber-100/70 text-amber-800 dark:border-amber-300/30 dark:bg-amber-400/10 dark:text-amber-200",
};

export const equipeSeed: EquipeMember[] = [
    {
        id: "USR-001",
        name: "Camila Rocha",
        email: "camila.rocha@meuplantao.com",
        role: "Profissional",
        department: "Clínica Médica",
        status: "Ativo",
        notes: "Plantões noturnos e cobertura de fim de semana.",
    },
    {
        id: "USR-002",
        name: "Lucas Martins",
        email: "lucas.martins@meuplantao.com",
        role: "Gestor",
        department: "Coordenação Operacional",
        status: "Ativo",
        notes: "Responsável por aprovações e alocação de equipe.",
    },
    {
        id: "USR-003",
        name: "Marina Alves",
        email: "marina.alves@meuplantao.com",
        role: "Admin",
        department: "TI e Segurança",
        status: "Ativo",
        notes: "Acesso total ao sistema e configuração de perfis.",
    },
    {
        id: "USR-004",
        name: "Bruno Ferraz",
        email: "bruno.ferraz@meuplantao.com",
        role: "Profissional",
        department: "Pediatria",
        status: "Inativo",
        notes: "Usuário suspenso aguardando validação cadastral.",
    },
    {
        id: "USR-005",
        name: "Helena Costa",
        email: "helena.costa@meuplantao.com",
        role: "Gestor",
        department: "Regulação",
        status: "Ativo",
        notes: "Acompanha solicitações e revisa conflitos de escala.",
    },
];