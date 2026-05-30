"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import type { RelatorioPlantao } from "./relatorios-data";

type RelatoriosExportButtonProps = {
    rows: RelatorioPlantao[];
};

export function RelatoriosExportButton({ rows }: RelatoriosExportButtonProps) {
    function exportPdf() {
        const doc = new jsPDF({ orientation: "landscape" });
        const today = new Date().toLocaleDateString("pt-BR");

        doc.setFontSize(18);
        doc.text("Relatório de plantões", 14, 18);
        doc.setFontSize(10);
        doc.text(`Exportado em ${today}`, 14, 24);

        autoTable(doc, {
            startY: 30,
            head: [["Código", "Unidade", "Profissional", "Concluído por", "Data", "Status", "Valor gerado"]],
            body: rows.map((row) => [
                row.id,
                row.unidade,
                row.profissional,
                row.concluidoPor,
                row.data,
                row.status,
                `R$ ${row.valorGerado.toLocaleString("pt-BR")}`,
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
    }

    return (
        <button
            type="button"
            onClick={exportPdf}
            className="inline-flex h-12 w-full items-center justify-center gap-2 border border-slate-950 bg-slate-950 px-4 text-sm font-medium text-white shadow-[0_10px_30px_-18px_rgba(15,23,42,0.55)] transition hover:-translate-y-px hover:bg-slate-800 dark:border-white dark:bg-white dark:text-slate-950 dark:shadow-[0_10px_30px_-18px_rgba(255,255,255,0.35)] dark:hover:bg-slate-200"
        >
            <FontAwesomeIcon icon={faFileArrowDown} className="h-4 w-4" />
            Exportar PDF
        </button>
    );
}