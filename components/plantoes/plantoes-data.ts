import { faCircleCheck, faCircleXmark, faHourglassHalf } from "@fortawesome/free-solid-svg-icons";

export type PlantaoStatus = "Pendente" | "Aprovado" | "Recusado";

export type PlantaoItem = {
  id: string;
  unidade: string;
  profissional: string;
  especialidade: string;
  periodo: string;
  solicitante: string;
  status: PlantaoStatus;
  observacao: string;
};

export const plantaoStatusStyles: Record<PlantaoStatus, string> = {
  Aprovado:
    "border-emerald-300/70 bg-emerald-100/70 text-emerald-800 dark:border-emerald-300/30 dark:bg-emerald-400/10 dark:text-emerald-200",
  Pendente:
    "border-amber-300/70 bg-amber-100/70 text-amber-800 dark:border-amber-300/30 dark:bg-amber-400/10 dark:text-amber-200",
  Recusado:
    "border-rose-300/70 bg-rose-100/70 text-rose-800 dark:border-rose-300/30 dark:bg-rose-400/10 dark:text-rose-200",
};

export const plantaoSummaryIcons = {
  Aprovado: faCircleCheck,
  Pendente: faHourglassHalf,
  Recusado: faCircleXmark,
} as const;

export const plantaoRows: PlantaoItem[] = [
  {
    id: "PL-2048",
    unidade: "Hospital Central",
    profissional: "Dra. Camila Rocha",
    especialidade: "Clínica Médica",
    periodo: "Hoje, 07:00 - 19:00",
    solicitante: "Central de Escalas",
    status: "Pendente",
    observacao: "Aguardando validação da coordenação.",
  },
  {
    id: "PL-2049",
    unidade: "UPA Norte",
    profissional: "Dr. Lucas Nunes",
    especialidade: "Urgência",
    periodo: "Hoje, 19:00 - 07:00",
    solicitante: "Coordenação Norte",
    status: "Aprovado",
    observacao: "Cobertura confirmada para o turno noturno.",
  },
  {
    id: "PL-2050",
    unidade: "PA Sul",
    profissional: "Dra. Helena Costa",
    especialidade: "Pediatria",
    periodo: "Amanhã, 07:00 - 13:00",
    solicitante: "Gestão Operacional",
    status: "Pendente",
    observacao: "Pendente de checagem documental.",
  },
  {
    id: "PL-2051",
    unidade: "Maternidade Leste",
    profissional: "Dr. Bruno Ferraz",
    especialidade: "Obstetrícia",
    periodo: "Amanhã, 13:00 - 19:00",
    solicitante: "Central de Regulação",
    status: "Recusado",
    observacao: "Sem disponibilidade no período solicitado.",
  },
  {
    id: "PL-2052",
    unidade: "Hospital Central",
    profissional: "Dra. Beatriz Lima",
    especialidade: "Anestesiologia",
    periodo: "24 Mai, 07:00 - 19:00",
    solicitante: "Coordenação Centro",
    status: "Pendente",
    observacao: "Aguardando retorno do profissional.",
  },
  {
    id: "PL-2053",
    unidade: "UPA Sul",
    profissional: "Dr. Rafael Alves",
    especialidade: "Clínica Geral",
    periodo: "24 Mai, 19:00 - 07:00",
    solicitante: "Central de Escalas",
    status: "Aprovado",
    observacao: "Plantão validado e publicado na escala.",
  },
];