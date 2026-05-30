import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faLayerGroup, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

type RelatoriosSummaryProps = {
    total: number;
    completos: number;
    emAberto: number;
    receitaTotal: number;
};

export function RelatoriosSummary({ total, completos, emAberto, receitaTotal }: RelatoriosSummaryProps) {
    const cards = [
        {
            label: "Total de plantões",
            value: total,
            icon: faLayerGroup,
        },
        {
            label: "Plantões completos",
            value: completos,
            icon: faLayerGroup,
        },
        {
            label: "Em aberto",
            value: emAberto,
            icon: faTriangleExclamation,
        },
        {
            label: "Valor gerado",
            value: `R$ ${receitaTotal.toLocaleString("pt-BR")}`,
            icon: faDollarSign,
        },
    ];

    return (
        <section className="grid gap-3 lg:grid-cols-4">
            {cards.map((card) => (
                <article key={card.label} className="border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-950">
                    <div className="mb-3 flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{card.label}</p>
                            <h3 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-slate-50">{card.value}</h3>
                        </div>
                        <div className="flex h-11 w-11 items-center justify-center border border-slate-200 bg-slate-50 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                            <FontAwesomeIcon icon={card.icon} className="h-4 w-4" />
                        </div>
                    </div>
                </article>
            ))}
        </section>
    );
}