import { faCircleCheck, faCircleXmark, faHourglassHalf } from "@fortawesome/free-solid-svg-icons";

export type PlantaoStatus = "Pendente" | "Aprovado" | "Recusado" | "Disponível" | "Inativo";

export type PlantaoItem = {
  id: string;
  unidade: string;
  profissional: string;
  fotoProfissional?: string;
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
  Disponível:
    "border-blue-300/70 bg-blue-100/70 text-blue-800 dark:border-blue-300/30 dark:bg-blue-400/10 dark:text-blue-200",
  Inativo:
    "border-slate-300/70 bg-slate-100/70 text-slate-800 dark:border-slate-300/30 dark:bg-slate-400/10 dark:text-slate-200",
};

export const plantaoSummaryIcons = {
  Aprovado: faCircleCheck,
  Pendente: faHourglassHalf,
  Recusado: faCircleXmark,
  Disponível: faCircleCheck,
  Inativo: faCircleXmark,
} as const;
