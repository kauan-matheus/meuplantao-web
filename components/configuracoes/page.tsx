"use client";

import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders, faFloppyDisk, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "next-themes";

import Sidebar from "@/components/sidebar/sidebar";
import Particles from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";

import { ConfiguracoesSection } from "./configuracoes-section";
import { configuracoesIniciais, type ConfiguracoesState } from "./configuracoes-data";

export default function ConfiguracoesPage() {
    const { setTheme, theme, resolvedTheme } = useTheme();
    const { language, setLanguage } = useLanguage();
    const [settings, setSettings] = useState<ConfiguracoesState>(configuracoesIniciais);
    const [savedSettings, setSavedSettings] = useState<ConfiguracoesState>(configuracoesIniciais);

    const changedCount = useMemo(() => {
        return Object.entries(settings).filter(([key, value]) => value !== savedSettings[key as keyof ConfiguracoesState]).length;
    }, [savedSettings, settings]);

    function updateField<K extends keyof ConfiguracoesState>(field: K, value: ConfiguracoesState[K]) {
        setSettings((currentSettings) => ({ ...currentSettings, [field]: value }));

        // Aplicar o tema imediatamente ao clicar no switch
        if (field === "darkMode") {
            setTheme(value ? "dark" : "light");
        }
    }

    function saveSettings() {
        setSavedSettings(settings);
        setLanguage(settings.idioma === "English" ? "en" : "pt-BR");
        // O tema já foi aplicado no updateField, mas podemos forçar aqui caso necessário
        setTheme(settings.darkMode ? "dark" : "light");
    }

    function resetSettings() {
        setSettings(configuracoesIniciais);
    }

    useEffect(() => {
        const nextIdioma = language === "en" ? "English" : "Português (Brasil)";
        const isDark = resolvedTheme === "dark" || theme === "dark";

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSettings((currentSettings) => ({
            ...currentSettings,
            idioma: nextIdioma,
            darkMode: isDark,
        }));
        
        setSavedSettings((currentSettings) => ({
            ...currentSettings,
            idioma: nextIdioma,
            darkMode: isDark,
        }));
    }, [language, theme, resolvedTheme]);

    const copy = language === "en"
        ? {
            sectionTag: "System settings",
            title: "Customize how the system works for each profile.",
            subtitle: "Adjust account and interface in one place.",
            restore: "Restore defaults",
            save: "Save changes",
            pending: "Pending changes",
        }
        : {
            sectionTag: "Configurações do sistema",
            title: "Personalize como o sistema funciona para cada perfil.",
            subtitle: "Ajuste conta e interface em um único lugar.",
            restore: "Restaurar padrão",
            save: "Salvar alterações",
            pending: "Alterações pendentes",
        };

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
                <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                    <div className="max-w-3xl space-y-3">
                        <div className="inline-flex items-center gap-2 border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-slate-950 dark:text-slate-300">
                            <FontAwesomeIcon icon={faSliders} className="h-3.5 w-3.5" />
                            {copy.sectionTag}
                        </div>
                        <h1 className="text-3xl font-semibold text-slate-950 dark:text-slate-50 sm:text-4xl">
                            {copy.title}
                        </h1>
                        <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                            {copy.subtitle}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Button
                            type="button"
                            onClick={resetSettings}
                            variant="outline"
                            size="sm"
                            className="h-11 rounded-none border-slate-200 bg-white px-4 text-slate-900 shadow-none hover:bg-slate-50 dark:border-white/10 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-white/5"
                        >
                            <FontAwesomeIcon icon={faRotateLeft} className="h-4 w-4" />
                            {copy.restore}
                        </Button>
                        <Button
                            type="button"
                            onClick={saveSettings}
                            size="sm"
                            className="h-11 rounded-none border border-slate-950 bg-slate-950 px-4 text-white shadow-none hover:bg-slate-800 dark:border-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                        >
                            <FontAwesomeIcon icon={faFloppyDisk} className="h-4 w-4" />
                            {copy.save}
                        </Button>
                    </div>
                </div>

                <div className="mt-8 space-y-6">
                    <div className="border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-950">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{copy.pending}</p>
                        <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-slate-50">{changedCount}</p>
                    </div>

                    <ConfiguracoesSection settings={settings} onFieldChange={updateField} />
                </div>
            </main>
        </div>
    );
}