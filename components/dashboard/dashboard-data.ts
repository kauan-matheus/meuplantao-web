import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleCheck,
  faCircleXmark,
  faHourglassHalf,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";

export const toneStyles = {
  amber: {
    card: "border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950",
    chip:
      "border-amber-300/70 bg-amber-100/80 text-amber-800 dark:border-amber-300/30 dark:bg-amber-400/10 dark:text-amber-200",
    iconBg:
      "border-amber-300/60 bg-amber-100 text-amber-700 dark:border-amber-300/30 dark:bg-amber-400/10 dark:text-amber-100",
    label: "text-amber-900 dark:text-amber-100",
    progress: "bg-amber-500 dark:bg-amber-300",
  },
  emerald: {
    card: "border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950",
    chip:
      "border-emerald-300/70 bg-emerald-100/80 text-emerald-800 dark:border-emerald-300/30 dark:bg-emerald-400/10 dark:text-emerald-200",
    iconBg:
      "border-emerald-300/60 bg-emerald-100 text-emerald-700 dark:border-emerald-300/30 dark:bg-emerald-400/10 dark:text-emerald-100",
    label: "text-emerald-900 dark:text-emerald-100",
    progress: "bg-emerald-500 dark:bg-emerald-300",
  },
  rose: {
    card: "border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950",
    chip:
      "border-rose-300/70 bg-rose-100/80 text-rose-800 dark:border-rose-300/30 dark:bg-rose-400/10 dark:text-rose-200",
    iconBg:
      "border-rose-300/60 bg-rose-100 text-rose-700 dark:border-rose-300/30 dark:bg-rose-400/10 dark:text-rose-100",
    label: "text-rose-900 dark:text-rose-100",
    progress: "bg-rose-500 dark:bg-rose-300",
  },
  blue: {
    card: "border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950",
    chip:
      "border-sky-300/70 bg-sky-100/80 text-sky-800 dark:border-sky-300/30 dark:bg-sky-400/10 dark:text-sky-200",
    iconBg:
      "border-sky-300/60 bg-sky-100 text-sky-700 dark:border-sky-300/30 dark:bg-sky-400/10 dark:text-sky-100",
    label: "text-sky-900 dark:text-sky-100",
    progress: "bg-sky-500 dark:bg-sky-300",
  },
  orange: {
    card: "border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950",
    chip:
      "border-orange-300/70 bg-orange-100/80 text-orange-800 dark:border-orange-300/30 dark:bg-orange-400/10 dark:text-orange-200",
    iconBg:
      "border-orange-300/60 bg-orange-100 text-orange-700 dark:border-orange-300/30 dark:bg-orange-400/10 dark:text-orange-100",
    label: "text-orange-900 dark:text-orange-100",
    progress: "bg-orange-500 dark:bg-orange-300",
  },
  slate: {
    card: "border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950",
    chip:
      "border-slate-300/70 bg-slate-200/80 text-slate-700 dark:border-slate-300/30 dark:bg-white/10 dark:text-slate-200",
    iconBg:
      "border-slate-300/60 bg-white text-slate-700 dark:border-slate-300/30 dark:bg-white/10 dark:text-slate-100",
    label: "text-slate-900 dark:text-slate-50",
    progress: "bg-slate-700 dark:bg-slate-200",
  },
} as const;

export type ToneName = keyof typeof toneStyles;

export type SummaryItem = {
  label: string;
  value: number;
  tone: ToneName;
  icon: IconDefinition;
  description: string;
  comparison: string;
  comparisonTone: "positive" | "negative" | "neutral";
};

export const shiftSummary: SummaryItem[] = [
  {
    label: "Aprovados",
    value: 24,
    tone: "emerald",
    icon: faCircleCheck,
    description: "Solicitações liberadas e prontas para acontecer.",
    comparison: "+8% vs semana passada",
    comparisonTone: "positive",
  },
  {
    label: "Recusados",
    value: 3,
    tone: "rose",
    icon: faCircleXmark,
    description: "Pedidos que não passaram na análise final.",
    comparison: "-2 casos nos últimos 7 dias",
    comparisonTone: "positive",
  },
  {
    label: "Pendentes",
    value: 5,
    tone: "orange",
    icon: faHourglassHalf,
    description: "Itens em aberto que ainda precisam de ação.",
    comparison: "+1 caso desde ontem",
    comparisonTone: "negative",
  },
  {
    label: "Total de plantões",
    value: 73,
    tone: "slate",
    icon: faLayerGroup,
    description: "Total de plantões registrados no sistema, incluindo todos os status.",
    comparison: "+12 no acumulado do mês",
    comparisonTone: "neutral",
  },
];

export const weeklyVolume = [
  { day: "Seg", value: 12 },
  { day: "Ter", value: 17 },
  { day: "Qua", value: 9 },
  { day: "Qui", value: 21 },
  { day: "Sex", value: 16 },
  { day: "Sab", value: 8 },
  { day: "Dom", value: 6 },
];

export const urgentItems = [
  {
    title: "Pendente há mais de 48h",
    subtitle: "UPA Norte - Clinica Medica",
    badge: "Urgente",
  },
  {
    title: "Recusa sem justificativa",
    subtitle: "Hospital Central - Pediatria",
    badge: "Revisar",
  },
  {
    title: "Cobertura incompleta",
    subtitle: "PA Sul - Noturno",
    badge: "Atencao",
  },
  {
    title: "Conflito de escala",
    subtitle: "Maternidade Leste",
    badge: "Verificar",
  },
];

export const recentShifts = [
  {
    id: "1234",
    unidade: "Hospital Central",
    profissional: "Dr. Lucas Nunes",
    periodo: "21 Mai, 07:00 - 19:00",
    status: "Aprovado",
  },
  {
    id: "4321",
    unidade: "UPA Norte",
    profissional: "Dra. Camila Rosa",
    periodo: "21 Mai, 19:00 - 07:00",
    status: "Pendente",
  },
  {
    id: "1245",
    unidade: "PA Sul",
    profissional: "Dr. Bruno Ferraz",
    periodo: "20 Mai, 07:00 - 13:00",
    status: "Recusado",
  },
  {
    id: "1032",
    unidade: "Maternidade Leste",
    profissional: "Dra. Helena Costa",
    periodo: "19 Mai, 13:00 - 19:00",
    status: "Aprovado",
  },
];
