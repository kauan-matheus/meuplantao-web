/**
 * AuthService — camada de serviço para autenticação.
 *
 * Responsabilidades:
 *  - Chamar o endpoint de login
 *  - Validar se a role retornada é permitida no painel
 *  - Persistir / recuperar / limpar token e dados do usuário
 *  - Verificar expiração do JWT
 */

import { httpClient } from "@/lib/api/http-client";
import { AUTH_ENDPOINTS } from "@/lib/api/endpoints";
import { ApiError } from "@/lib/types/api.types";
import {
  type RequestAuthLoginJson,
  type ResponseAuthLoginJson,
  type ResponseAuthUserJson,
} from "@/lib/types/auth.types";

// ---------------------------------------------------------------------------
// Storage keys
// ---------------------------------------------------------------------------

export const TOKEN_STORAGE_KEY = "meuplantao.token";
export const USER_STORAGE_KEY = "meuplantao.user";

// ---------------------------------------------------------------------------
// Service
// ---------------------------------------------------------------------------

/**
 * Realiza login na API e valida permissões.
 *
 * @throws {ApiError} se as credenciais forem inválidas ou a role não for permitida.
 */
export async function login(
  credentials: RequestAuthLoginJson,
): Promise<ResponseAuthLoginJson> {
  const data = await httpClient.post<ResponseAuthLoginJson>(
    AUTH_ENDPOINTS.LOGIN,
    credentials,
    { skipAuth: true },
  );

  // Validar se a resposta possui token
  if (!data.token) {
    throw new ApiError("Resposta de login inválida: token ausente.", 400);
  }

  // Persistir sessão
  persistSession(data.token, data.usuario);

  return data;
}

/** Remove todos os dados de sessão do storage. */
export function logout(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
}

/** Recupera o token armazenado. */
export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

/** Recupera os dados do usuário armazenados. */
export function getStoredUser(): ResponseAuthUserJson | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(USER_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as ResponseAuthUserJson;
  } catch {
    return null;
  }
}

/**
 * Verifica se o JWT armazenado está expirado.
 * Decodifica o payload para ler o campo `exp`.
 */
export function isTokenExpired(): boolean {
  const token = getStoredToken();
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expMs = payload.exp * 1000;
    return Date.now() >= expMs;
  } catch {
    return true;
  }
}

/** Verifica se existe uma sessão válida. */
export function hasValidSession(): boolean {
  return !!getStoredToken() && !isTokenExpired() && !!getStoredUser();
}

// ---------------------------------------------------------------------------
// Helpers internos
// ---------------------------------------------------------------------------

function persistSession(token: string, user: ResponseAuthUserJson): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(TOKEN_STORAGE_KEY, token);
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}
