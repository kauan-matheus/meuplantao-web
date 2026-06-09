/**
 * Constantes de endpoints da API MeuPlantão.
 *
 * A base URL vem de `NEXT_PUBLIC_API_URL` (.env.local).
 * Cada domínio de negócio agrupa suas rotas.
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://meuplantao.eu1.netbird.services";

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------
export const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER_MEDICO: "/auth/register-medico",
  REGISTER_ENFERMEIRO: "/auth/register-enfermeiro",
  REGISTER_ADMIN: "/auth/register-admin",
  REGISTER_GESTOR: "/auth/register-gestor",
} as const;

// ---------------------------------------------------------------------------
// Plantão
// ---------------------------------------------------------------------------
export const PLANTAO_ENDPOINTS = {
  BASE: "/api/Plantao/plantoes",
  BY_ID: (id: number) => `/api/Plantao/plantoes/${id}`,
  SOLICITACOES: (id: number) => `/api/Plantao/plantoes/${id}/solicitacoes`,
  SOLICITAR: (id: number) => `/api/Plantao/plantoes/${id}/solicitar`,
  ACEITAR: (id: number) => `/api/Plantao/plantoes/${id}/aceitar`,
  RECUSAR: (id: number) => `/api/Plantao/plantoes/${id}/recusar`,
} as const;

// ---------------------------------------------------------------------------
// Profissionais
// ---------------------------------------------------------------------------
export const PROFISSIONAIS_ENDPOINTS = {
  BASE: "/api/Profissionais/profissionais",
  BY_ID: (id: number) => `/api/Profissionais/profissionais/${id}`,
  BY_USER_ID: (id: number) => `/api/Profissionais/profissionais/user${id}`,
  PLANTOES: "/api/Profissionais/profissionais/plantoes",
  PLANTOES_SOLICITADOS: "/api/Profissionais/profissionais/plantoes/solicitados",
} as const;

// ---------------------------------------------------------------------------
// Setor
// ---------------------------------------------------------------------------
export const SETOR_ENDPOINTS = {
  BASE: "/api/Setor/setores",
  BY_ID: (id: number) => `/api/Setor/setores/${id}`,
} as const;

// ---------------------------------------------------------------------------
// Trocas
// ---------------------------------------------------------------------------
export const TROCAS_ENDPOINTS = {
  BASE: "/api/Trocas/trocas",
  BY_ID: (id: number) => `/api/Trocas/trocas/${id}`,
  ACEITAR: (id: number) => `/api/Trocas/trocas/${id}/aceitar`,
  RECUSAR: (id: number) => `/api/Trocas/trocas/${id}/recusar`,
  ENVIAR_APROVACAO: (id: number) => `/api/Trocas/trocas/${id}/enviar-aprovacao`,
  APROVAR: (id: number) => `/api/Trocas/trocas/${id}/aprovar`,
  REPROVAR: (id: number) => `/api/Trocas/trocas/${id}/reprovar`,
} as const;

// ---------------------------------------------------------------------------
// Histórico
// ---------------------------------------------------------------------------
export const HISTORICO_ENDPOINTS = {
  PLANTOES: "/api/HistoricoPlantao/plantoesHistorico",
  TROCAS: "/api/HistoricoTrocas/trocasHistorico",
} as const;

// ---------------------------------------------------------------------------
// User
// ---------------------------------------------------------------------------
export const USER_ENDPOINTS = {
  BASE: "/api/User/usuarios",
  BY_ID: (id: number) => `/api/User/usuarios/${id}`,
  FOTO: "/api/User/usuarios/foto",
} as const;
