/**
 * Cliente HTTP genérico para a API MeuPlantão.
 *
 * Usa fetch nativo, sem dependências externas.
 *
 * No client-side (browser), as requests passam pelo proxy do Next.js
 * (/api/proxy/...) para contornar CORS. No server-side, bate direto
 * na API.
 *
 * Responsabilidades:
 *  - Montar a URL correta (proxy no browser, direta no server)
 *  - Injetar headers de auth via interceptors
 *  - Tratar erros de rede e de API de forma uniforme
 */

import { API_BASE_URL } from "@/lib/api/endpoints";
import { buildAuthHeaders, isUnauthorized, parseErrorResponse } from "@/lib/api/interceptors";
import { ApiError } from "@/lib/types/api.types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RequestOptions {
  headers?: Record<string, string>;
  /** Se `true`, não injeta o header Authorization. */
  skipAuth?: boolean;
}

// ---------------------------------------------------------------------------
// URL Resolution
// ---------------------------------------------------------------------------

/**
 * No browser, roteia via proxy Next.js para evitar CORS.
 * No server (SSR), bate direto na API.
 */
function resolveUrl(path: string): string {
  if (typeof window !== "undefined") {
    // Client-side: usa proxy do Next.js
    return `/api/proxy${path}`;
  }

  // Server-side: bate direto
  return `${API_BASE_URL}${path}`;
}

// ---------------------------------------------------------------------------
// HttpClient
// ---------------------------------------------------------------------------

class HttpClient {
  // ---- Public methods ----------------------------------------------------

  async get<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("GET", path, undefined, options);
  }

  async post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>("POST", path, body, options);
  }


  async put<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>("PUT", path, body, options);
  }

  async delete<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("DELETE", path, undefined, options);
  }

  // ---- Core request ------------------------------------------------------

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    const url = resolveUrl(path);

    const headers = options?.skipAuth
      ? { "Content-Type": "application/json", ...options?.headers }
      : { ...buildAuthHeaders(), ...options?.headers };

    const config: globalThis.RequestInit = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    };

    try {
      const response = await fetch(url, config);

      // --- 401: token expirado / inválido ---
      // Se skipAuth é true (ex: login), 401 significa credenciais inválidas,
      // NÃO sessão expirada — não deve redirecionar.
      if (isUnauthorized(response.status) && !options?.skipAuth) {
        this.handleUnauthorized();
        throw new ApiError("Sessão expirada. Faça login novamente.", 401);
      }

      // --- Outros erros HTTP ---
      if (!response.ok) {
        throw await parseErrorResponse(response);
      }

      // --- Sem conteúdo (204, ou body vazio) ---
      const text = await response.text();

      if (!text) {
        return undefined as T;
      }

      return JSON.parse(text) as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(
        "Erro de conexão. Verifique sua rede e tente novamente.",
        0,
        (error as Error).message,
      );
    }
  }

  // ---- Unauthorized handler -----------------------------------------------

  private handleUnauthorized(): void {
    if (typeof window === "undefined") return;

    localStorage.removeItem("meuplantao.token");
    localStorage.removeItem("meuplantao.user");
    window.location.href = "/pages/login";
  }
}

// ---------------------------------------------------------------------------
// Singleton export
// ---------------------------------------------------------------------------

export const httpClient = new HttpClient();
