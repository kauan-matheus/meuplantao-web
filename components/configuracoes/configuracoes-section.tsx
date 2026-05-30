import { Input } from "@/components/ui/input";

import { idiomaOptions, type ConfiguracoesState } from "./configuracoes-data";
import { ConfiguracoesToggle } from "./configuracoes-toggle";

type ConfiguracoesSectionProps = {
    settings: ConfiguracoesState;
    onFieldChange: <K extends keyof ConfiguracoesState>(field: K, value: ConfiguracoesState[K]) => void;
};

function fieldClass() {
    return "h-11 rounded-none border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 shadow-none placeholder:text-slate-400 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-50 dark:focus:bg-slate-950";
}

function sectionCardClass() {
    return "border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-950";
}

export function ConfiguracoesSection({ settings, onFieldChange }: ConfiguracoesSectionProps) {
    return (
        <div className="space-y-4">
            <section className={sectionCardClass()}>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Conta e sistema</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Ajustes principais do painel administrativo.</p>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                        <span>Nome do sistema</span>
                        <Input
                            value={settings.nomeSistema}
                            onChange={(event) => onFieldChange("nomeSistema", event.target.value)}
                            className={fieldClass()}
                        />
                    </label>
                    <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                        <span>E-mail administrador</span>
                        <Input
                            value={settings.emailAdmin}
                            onChange={(event) => onFieldChange("emailAdmin", event.target.value)}
                            className={fieldClass()}
                        />
                    </label>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                        <span>Idioma</span>
                        <select
                            value={settings.idioma}
                            onChange={(event) => onFieldChange("idioma", event.target.value as ConfiguracoesState["idioma"])}
                            className={fieldClass()}
                        >
                            {idiomaOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            </section>

            <section className={sectionCardClass()}>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Preferências de interface</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Escolha como a aplicação deve se comportar para cada usuário.</p>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <ConfiguracoesToggle
                        label="Modo escuro automático"
                        description="Ativa o tema escuro de acordo com a preferência do sistema."
                        checked={settings.darkMode}
                        onChange={(value) => onFieldChange("darkMode", value)}
                    />
                </div>
            </section>
        </div>
    );
}