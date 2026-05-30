export type ConfiguracoesToggleKey =
    | "notificacoesEmail"
    | "notificacoesSistema"
    | "darkMode"
    | "exportacaoAutomatica"
    | "seguranca2fa"
    | "auditoriaAtiva";

export type ConfiguracoesState = {
    nomeSistema: string;
    emailAdmin: string;
    idioma: "Português (Brasil)" | "English";
    darkMode: boolean;
};

export const configuracoesIniciais: ConfiguracoesState = {
    nomeSistema: "Meu Plantão",
    emailAdmin: "meuplantao@admin.com",
    idioma: "Português (Brasil)",
    darkMode: false,
};

export const idiomaOptions = ["Português (Brasil)", "English"] as const;
