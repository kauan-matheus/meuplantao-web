import { weeklyVolume } from "./dashboard-data";

export function WeeklyChart() {
  const maxValue = Math.max(...weeklyVolume.map((item) => item.value), 1);

  return (
    <article className="flex h-full flex-col rounded-none border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-950">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Volume por dia</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">Plantões processados na semana atual.</p>
        </div>
      </div>

      <div className="grid min-h-60 flex-1 grid-cols-7 items-end gap-3">
        {weeklyVolume.map((item) => {
          const height = `${Math.max(12, Math.round((item.value / maxValue) * 100))}%`;

          return (
            <div key={item.day} className="flex h-full flex-col justify-end gap-2">
              <div className="relative flex-1 rounded-none border border-slate-200 bg-slate-50 p-1 dark:border-white/10 dark:bg-slate-900">
                <div
                  className="absolute inset-x-1 bottom-1 rounded-none bg-slate-900 transition-all duration-500 dark:bg-slate-100"
                  style={{ height }}
                />
              </div>
              <div className="text-center text-xs font-medium text-slate-600 dark:text-slate-300">
                {item.day}
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}
