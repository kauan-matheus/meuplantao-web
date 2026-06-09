interface UrgentItem {
  title: string;
  subtitle: string;
  badge: string;
}

interface AttentionListProps {
  items: UrgentItem[];
}

export function AttentionList({ items }: AttentionListProps) {
  return (
    <article className="rounded-none border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-950">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Exigem acao imediata</h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Itens priorizados para o plantao atual.</p>

      <div className="mt-4 space-y-3">
        {items.length === 0 ? (
          <div className="text-sm text-slate-500 py-4 text-center border border-dashed border-slate-200 dark:border-white/10">
            Nenhuma ação pendente no momento.
          </div>
        ) : (
          items.map((item, i) => (
            <div
              key={i}
              className="rounded-none border border-slate-200 bg-slate-50 p-3 dark:border-white/10 dark:bg-slate-900"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.title}</p>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{item.subtitle}</p>
                </div>
                <span className="inline-flex rounded-none border border-slate-300 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 dark:border-white/20 dark:bg-slate-800 dark:text-slate-200">
                  {item.badge}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </article>
  );
}
