/**
 * Tipos do módulo de autenticação — alinhados com os schemas do Swagger.
 */

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

/** Roles de usuário retornadas pela API como string. */
export enum UserRole {
  Admin = "Admin",
  Gestor = "Gestor",
  Profissional = "Profissional", // Role retornada pela API (Representante)
  Medico = "Medico",
  Enfermeiro = "Enfermeiro",
}

/** Roles autorizadas a acessar o painel web. */
export const ALLOWED_ROLES: ReadonlySet<string> = new Set([
  UserRole.Admin,
  UserRole.Gestor,
  UserRole.Profissional,
]);

// ---------------------------------------------------------------------------
// Request DTOs
// ---------------------------------------------------------------------------

export interface RequestAuthLoginJson {
  email: string;
  password: string;
}

// ---------------------------------------------------------------------------
// Response DTOs
// ---------------------------------------------------------------------------

export interface ResponseAuthUserJson {
  id: number;
  email: string | null;
  fotoPerfilUrl: string | null;
  role: string | null;
}

export interface ResponseAuthLoginJson {
  token: string | null;
  expiresIn: string | null;
  usuario: ResponseAuthUserJson;
}

// ---------------------------------------------------------------------------
// Client-side auth state
// ---------------------------------------------------------------------------

export interface AuthState {
  user: ResponseAuthUserJson | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
