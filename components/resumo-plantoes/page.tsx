"use client";

import { Search } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCalendarDays,
  faCircleCheck,
  faCircleXmark,
  faClock,
  faHourglassHalf,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";

import { Input } from "@/components/ui/input";

const toneStyles = {
  amber: {
    container:
      "border-amber-200 bg-linear-to-br from-amber-50 via-white to-amber-100/70 text-amber-950 dark:border-amber-500/20 dark:from-amber-500/15 dark:via-white/5 dark:to-amber-500/5 dark:text-amber-50",
    label: "text-amber-700/80 dark:text-amber-200/80",
    iconBg: "bg-amber-100 dark:bg-amber-500/20",
    icon: "text-amber-700 dark:text-amber-100",
  },
  emerald: {
    container:
      "border-emerald-200 bg-linear-to-br from-emerald-50 via-white to-emerald-100/70 text-emerald-950 dark:border-emerald-500/20 dark:from-emerald-500/15 dark:via-white/5 dark:to-emerald-500/5 dark:text-emerald-50",
    label: "text-emerald-700/80 dark:text-emerald-200/80",
    iconBg: "bg-emerald-100 dark:bg-emerald-500/20",
    icon: "text-emerald-700 dark:text-emerald-100",
  },
  rose: {
    container:
      "border-rose-200 bg-linear-to-br from-rose-50 via-white to-rose-100/70 text-rose-950 dark:border-rose-500/20 dark:from-rose-500/15 dark:via-white/5 dark:to-rose-500/5 dark:text-rose-50",
    label: "text-rose-700/80 dark:text-rose-200/80",
    iconBg: "bg-rose-100 dark:bg-rose-500/20",
    icon: "text-rose-700 dark:text-rose-100",
  },
  blue: {
    container:
      "border-sky-200 bg-linear-to-br from-sky-50 via-white to-sky-100/70 text-sky-950 dark:border-sky-500/20 dark:from-sky-500/15 dark:via-white/5 dark:to-sky-500/5 dark:text-sky-50",
    label: "text-sky-700/80 dark:text-sky-200/80",
    iconBg: "bg-sky-100 dark:bg-sky-500/20",
    icon: "text-sky-700 dark:text-sky-100",
  },
  orange: {
    container:
      "border-orange-200 bg-linear-to-br from-orange-50 via-white to-orange-100/70 text-orange-950 dark:border-orange-500/20 dark:from-orange-500/15 dark:via-white/5 dark:to-orange-500/5 dark:text-orange-50",
    label: "text-orange-700/80 dark:text-orange-200/80",
    iconBg: "bg-orange-100 dark:bg-orange-500/20",
    icon: "text-orange-700 dark:text-orange-100",
  },
  slate: {
    container:
      "border-slate-900 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white dark:border-white/10 dark:from-white/10 dark:via-white/5 dark:to-transparent dark:text-white",
    label: "text-white/70",
    iconBg: "bg-white/10",
    icon: "text-white",
  },
} as const;

type ToneName = keyof typeof toneStyles;

type SummaryItem = {
  label: string;
  value: number;
  tone: ToneName;
  icon: IconDefinition;
  description: string;
};

const shiftSummary: SummaryItem[] = [
  {
    label: "Para aprovação",
    value: 8,
    tone: "amber",
    icon: faClock,
    description: "Plantões enviados que ainda aguardam validação.",
  },
  {
    label: "Aprovados",
    value: 24,
    tone: "emerald",
    icon: faCircleCheck,
    description: "Solicitações liberadas e prontas para acontecer.",
  },
  {
    label: "Recusados",
    value: 3,
    tone: "rose",
    icon: faCircleXmark,
    description: "Pedidos que não passaram na análise final.",
  },
  {
    label: "Pendentes",
    value: 5,
    tone: "orange",
    icon: faHourglassHalf,
    description: "Itens em aberto que ainda precisam de ação.",
  },
  {
    label: "Todos os plantões disponíveis",
    value: 40,
    tone: "blue",
    icon: faCalendarDays,
    description: "Soma dos plantões ativos exibidos nesta visão.",
  },
  {
    label: "Total",
    value: 73,
    tone: "slate",
    icon: faLayerGroup,
    description: "Volume geral monitorado nesta visão do painel.",
  },
];

function SummaryCard({ item }: { item: SummaryItem }) {
  const styles = toneStyles[item.tone];
  const isTotal = item.label === "Total";

  return (
    <article
      className={`flex items-stretch gap-4 overflow-hidden rounded-none border px-5 py-5 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl ${styles.container}`}
    >
      <div className="flex min-w-0 flex-1 items-start gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-none ${styles.iconBg}`}
        >
          <FontAwesomeIcon
            icon={item.icon}
            className={`h-4 w-4 ${styles.icon}`}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className={`text-sm font-medium ${styles.label}`}>{item.label}</p>
          <p className="mt-2 text-4xl font-semibold leading-none sm:text-5xl">
            {item.value}
          </p>
          <p
            className={`mt-4 max-w-sm text-sm leading-6 ${
              isTotal ? "text-white/75" : "text-black/65 dark:text-white/75"
            }`}
          >
            {item.description}
          </p>
        </div>
      </div>

      <div className="w-px shrink-0 self-stretch rounded-full bg-white/80 dark:bg-white/60" />
    </article>
  );
}

function SearchBar() {
  return (
    <div className="mt-8">
      <div className="relative mx-auto w-full max-w-3xl">
        <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-black/35 dark:text-white/35">
          <Search className="h-4 w-4" />
        </span>
        <Input
          type="search"
          placeholder="Pesquisar plantões rápido"
          className="h-12 rounded-none border-black/10 bg-white/90 pl-11 text-sm shadow-sm dark:bg-black/20"
        />
      </div>
    </div>
  );
}

export default function ResumoPlantoes() {
  return (
    <section className="space-y-7">
      <div className="rounded-none bg-linear-to-br from-white via-slate-50 to-slate-100/80 px-5 py-5 dark:from-white/5 dark:via-white/10 dark:to-transparent">
        <div className="mb- flex items-center justify-between gap-4">
          <div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {shiftSummary.map((item) => (
            <SummaryCard key={item.label} item={item} />
          ))}
        </div>
      </div>

      <SearchBar />
    </section>
  );
}
