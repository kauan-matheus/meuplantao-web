"use client";

import * as React from "react";

type AppLanguage = "pt-BR" | "en";

type LanguageContextValue = {
    language: AppLanguage;
    setLanguage: (language: AppLanguage) => void;
};

const LanguageContext = React.createContext<LanguageContextValue | null>(null);
const storageKey = "meuplantao.language";

function getInitialLanguage(): AppLanguage {
    if (typeof window === "undefined") {
        return "pt-BR";
    }

    const stored = window.localStorage.getItem(storageKey);

    if (stored === "en" || stored === "pt-BR") {
        return stored;
    }

    return "pt-BR";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = React.useState<AppLanguage>("pt-BR");

    React.useEffect(() => {
        setLanguageState(getInitialLanguage());
    }, []);

    React.useEffect(() => {
        document.documentElement.lang = language;
        window.localStorage.setItem(storageKey, language);
    }, [language]);

    function setLanguage(nextLanguage: AppLanguage) {
        setLanguageState(nextLanguage);
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = React.useContext(LanguageContext);

    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }

    return context;
}
