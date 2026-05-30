type ConfiguracoesToggleProps = {
    label: string;
    description: string;
    checked: boolean;
    onChange: (value: boolean) => void;
};

export function ConfiguracoesToggle({ label, description, checked, onChange }: ConfiguracoesToggleProps) {
    return (
        <div className="flex items-center justify-between gap-4 border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-950">
            <div className="space-y-1">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{label}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{description}</p>
            </div>

            <button
                type="button"
                onClick={() => onChange(!checked)}
                aria-pressed={checked}
                className={`relative inline-flex h-8 w-14 items-center rounded-full border transition ${
                    checked
                        ? "border-emerald-500 bg-emerald-500"
                        : "border-slate-300 bg-slate-200 dark:border-white/15 dark:bg-white/10"
                }`}
            >
                <span
                    className={`inline-block h-6 w-6 translate-x-1 rounded-full bg-white shadow transition ${
                        checked ? "translate-x-7" : "translate-x-1"
                    }`}
                />
            </button>
        </div>
    );
}