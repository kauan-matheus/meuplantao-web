"use client";

import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";

import Sidebar from "@/components/sidebar/sidebar";
import Particles from "@/components/ui/particles";

import { RelatoriosExportButton } from "./relatorios-export-button";
import { relatoriosSeed, type RelatorioPlantao, type RelatorioStatus } from "./relatorios-data";
import { RelatoriosFilters } from "./relatorios-filters";
import { RelatoriosSummary } from "./relatorios-summary";
import { RelatoriosTable } from "./relatorios-table";

export default function RelatoriosPage() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<RelatorioStatus | "Todos">("Todos");

    const filteredRows = useMemo(() => {
        const query = search.trim().toLowerCase();

        return relatoriosSeed.filter((row) => {
            const matchesSearch =
                query.length === 0 ||
                [row.id, row.unidade, row.profissional, row.concluidoPor, row.data]
                    .join(" ")
                    .toLowerCase()
                    .includes(query);

            const matchesStatus = status === "Todos" || row.status === status;

            return matchesSearch && matchesStatus;
        });
    }, [search, status]);

    const summary = useMemo(() => {
        const total = relatoriosSeed.length;
        const completos = relatoriosSeed.filter((row) => row.status === "Completo").length;
        const emAberto = relatoriosSeed.filter((row) => row.status === "Em aberto").length;
        const receitaTotal = relatoriosSeed
            .filter((row) => row.status === "Completo")
            .reduce((sum, row) => sum + row.valorGerado, 0);

        return { total, completos, emAberto, receitaTotal };
    }, []);

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
                        <FontAwesomeIcon icon={faFileLines} className="h-3.5 w-3.5" />
                        Histórico de relatórios
                    </div>
                    <h1 className="text-3xl font-semibold text-slate-950 dark:text-slate-50 sm:text-4xl">
                        Histórico completo dos plantões do sistema.
                    </h1>
                    <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                        Veja todos os plantões registrados, com responsável pela conclusão, data, status e o
                        valor gerado em cada registro.
                    </p>
                </div>

                <div className="mt-8 space-y-6">
                    <RelatoriosSummary
                        total={summary.total}
                        completos={summary.completos}
                        emAberto={summary.emAberto}
                        receitaTotal={summary.receitaTotal}
                    />

                    <div className="grid gap-3 border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-950 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-end">
                        <RelatoriosFilters
                            search={search}
                            status={status}
                            onSearchChange={setSearch}
                            onStatusChange={setStatus}
                        />

                        <div className="lg:pb-0">
                            <RelatoriosExportButton rows={filteredRows} />
                        </div>
                    </div>

                    <RelatoriosTable rows={filteredRows} />
                </div>
            </main>
        </div>
    );
}