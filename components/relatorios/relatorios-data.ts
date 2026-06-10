export type RelatorioStatus = "Completo" | "Em aberto" | "Cancelado";

export type RelatorioPlantao = {
    id: string;
    unidade: string;
    profissional: string;
    concluidoPor: string;
    fotoProfissional?: string;
    data: string;
    valorGerado: number;
    status: RelatorioStatus;
};

export const relatorioStatusStyles: Record<RelatorioStatus, string> = {
    Completo:
        "border-emerald-300/70 bg-emerald-100/70 text-emerald-800 dark:border-emerald-300/30 dark:bg-emerald-400/10 dark:text-emerald-200",
    "Em aberto":
        "border-amber-300/70 bg-amber-100/70 text-amber-800 dark:border-amber-300/30 dark:bg-amber-400/10 dark:text-amber-200",
    Cancelado:
        "border-rose-300/70 bg-rose-100/70 text-rose-800 dark:border-rose-300/30 dark:bg-rose-400/10 dark:text-rose-200",
};

export const relatoriosSeed: RelatorioPlantao[] = [
    {
        id: "RPT-001",
        unidade: "Hospital Central",
        profissional: "Dra. Camila Rocha",
        concluidoPor: "Lucas Martins",
        data: "28 Mai 2026",
        valorGerado: 1450,
        status: "Completo",
    },
    {
        id: "RPT-002",
        unidade: "UPA Norte",
        profissional: "Dr. Bruno Ferraz",
        concluidoPor: "Helena Costa",
        data: "27 Mai 2026",
        valorGerado: 980,
        status: "Completo",
    },
    {
        id: "RPT-003",
        unidade: "PA Sul",
        profissional: "Dra. Beatriz Lima",
        concluidoPor: "Lucas Martins",
        data: "27 Mai 2026",
        valorGerado: 1120,
        status: "Em aberto",
    },
    {
        id: "RPT-004",
        unidade: "Maternidade Leste",
        profissional: "Dr. Rafael Alves",
        concluidoPor: "Marina Alves",
        data: "26 Mai 2026",
        valorGerado: 1680,
        status: "Completo",
    },
    {
        id: "RPT-005",
        unidade: "Hospital Central",
        profissional: "Dra. Helena Costa",
        concluidoPor: "Lucas Martins",
        data: "25 Mai 2026",
        valorGerado: 760,
        status: "Cancelado",
    },
    {
        id: "RPT-006",
        unidade: "UPA Sul",
        profissional: "Dr. Lucas Nunes",
        concluidoPor: "Camila Rocha",
        data: "24 Mai 2026",
        valorGerado: 1340,
        status: "Completo",
    },
];