import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "sonner";

import type { RelatorioPlantao } from "./relatorios-data";

type RelatoriosExportButtonProps = {
    rows: RelatorioPlantao[]; // Os dados filtrados da tabela
    allRows: RelatorioPlantao[]; // Todos os dados sem filtro da tabela
};

type ExportOption = "current" | "all" | "completed" | "open" | "canceled";

export function RelatoriosExportButton({ rows, allRows }: RelatoriosExportButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<ExportOption>("current");

    function exportPdf() {
        let dataToExport: RelatorioPlantao[] = [];

        switch (selectedOption) {
            case "current":
                dataToExport = rows;
                break;
            case "all":
                dataToExport = allRows;
                break;
            case "completed":
                dataToExport = allRows.filter((r) => r.status === "Completo");
                break;
            case "open":
                dataToExport = allRows.filter((r) => r.status === "Em aberto");
                break;
            case "canceled":
                dataToExport = allRows.filter((r) => r.status === "Cancelado");
                break;
        }

        const doc = new jsPDF({ orientation: "landscape" });
        const today = new Date().toLocaleDateString("pt-BR");

        doc.setFontSize(18);
        doc.text("Relatório de plantões", 14, 18);
        doc.setFontSize(10);
        doc.text(`Exportado em ${today} - ${dataToExport.length} registros`, 14, 24);

        autoTable(doc, {
            startY: 30,
            head: [["Código", "Unidade", "Profissional", "Concluído por", "Data", "Status", "Valor gerado"]],
            body: dataToExport.map((row) => [
                row.id,
                row.unidade,
                row.profissional,
                row.concluidoPor,
                row.data,
                row.status,
                `R$ ${(row.valorGerado || 0).toLocaleString("pt-BR")}`,
            ]),
            styles: {
                fontSize: 9,
                cellPadding: 3,
                textColor: [15, 23, 42],
                lineColor: [226, 232, 240],
                lineWidth: 0.1,
            },
            headStyles: {
                fillColor: [15, 23, 42],
                textColor: [255, 255, 255],
            },
            alternateRowStyles: {
                fillColor: [248, 250, 252],
            },
        });

        doc.save(`relatorio-plantoes-${today.replaceAll("/", "-")}.pdf`);
        setIsOpen(false);
        toast.success("Relatório gerado com sucesso!", {
            description: `O arquivo PDF com ${dataToExport.length} ${dataToExport.length === 1 ? "registro foi baixado" : "registros foi baixado"}.`,
        });
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="inline-flex h-12 w-full items-center justify-center gap-2 border border-slate-950 bg-slate-950 px-4 text-sm font-medium text-white shadow-[0_10px_30px_-18px_rgba(15,23,42,0.55)] transition hover:-translate-y-px hover:bg-slate-800 dark:border-white dark:bg-white dark:text-slate-950 dark:shadow-[0_10px_30px_-18px_rgba(255,255,255,0.35)] dark:hover:bg-slate-200"
            >
                <FontAwesomeIcon icon={faFileArrowDown} className="h-4 w-4" />
                Exportar PDF
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm">
                    <div className="w-full max-w-md bg-white shadow-2xl dark:bg-slate-950 dark:border dark:border-white/10">
                        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-white/10">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                                Opções de Exportação
                            </h3>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                            >
                                <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="p-5 space-y-4">
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                                Escolha quais dados você deseja incluir no arquivo PDF:
                            </p>

                            <div className="space-y-2">
                                {[
                                    { id: "current", label: "Exportar tabela atual (com os filtros ativos)", count: rows.length },
                                    { id: "all", label: "Exportar todos os registros", count: allRows.length },
                                    { id: "completed", label: "Apenas plantões Completos", count: allRows.filter(r => r.status === "Completo").length },
                                    { id: "open", label: "Apenas plantões Em aberto", count: allRows.filter(r => r.status === "Em aberto").length },
                                    { id: "canceled", label: "Apenas plantões Cancelados", count: allRows.filter(r => r.status === "Cancelado").length },
                                ].map((option) => (
                                    <label
                                        key={option.id}
                                        className={`flex cursor-pointer items-center justify-between border p-3 transition ${
                                            selectedOption === option.id
                                                ? "border-slate-900 bg-slate-50 dark:border-white dark:bg-white/10"
                                                : "border-slate-200 hover:border-slate-300 dark:border-white/10 dark:hover:border-white/20"
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="exportOption"
                                                value={option.id}
                                                checked={selectedOption === option.id}
                                                onChange={() => setSelectedOption(option.id as ExportOption)}
                                                className="sr-only"
                                            />
                                            <div
                                                className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                                                    selectedOption === option.id
                                                        ? "border-slate-900 bg-slate-900 dark:border-white dark:bg-white"
                                                        : "border-slate-300 dark:border-white/30"
                                                }`}
                                            >
                                                {selectedOption === option.id && (
                                                    <div className="h-1.5 w-1.5 rounded-full bg-white dark:bg-slate-950" />
                                                )}
                                            </div>
                                            <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                                {option.label}
                                            </span>
                                        </div>
                                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                            {option.count} {option.count === 1 ? "registro" : "registros"}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 dark:border-white/10 dark:bg-white/5">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={exportPdf}
                                className="inline-flex items-center gap-2 bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                            >
                                <FontAwesomeIcon icon={faFileArrowDown} className="h-3.5 w-3.5" />
                                Gerar PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}