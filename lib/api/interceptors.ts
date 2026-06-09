/**
 * Interceptors para o HttpClient.
 *
 * - `authRequestInterceptor`:  injeta o JWT no header Authorization.
 * - `handleResponseError`:     converte erros HTTP em ApiError.
 * - `handleUnauthorized`:      detecta 401 e dispara logout.
 */

import { ApiError, type ProblemDetails } from "@/lib/types/api.types";
import { TOKEN_STORAGE_KEY } from "@/lib/services/auth.service";

// ---------------------------------------------------------------------------
// Request interceptor
// ---------------------------------------------------------------------------

/** Retorna headers com o Bearer token, se existir. */
export function buildAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (typeof window !== "undefined") {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
}

// ---------------------------------------------------------------------------
// Response interceptors
// ---------------------------------------------------------------------------

/**
 * Converte uma Response não-ok em um ApiError.
 * Tenta parsear o body como ProblemDetails; se falhar, gera erro genérico.
 */
export async function parseErrorResponse(response: Response): Promise<ApiError> {
  let problem: ProblemDetails | null = null;

  try {
    const text = await response.text();

    if (text) {
      problem = JSON.parse(text) as ProblemDetails;
    }
  } catch {
    // body não é JSON — ignorar
  }

  if (problem?.title) {
    return ApiError.fromProblemDetails({
      ...problem,
      status: problem.status ?? response.status,
    });
  }

  return new ApiError(
    getDefaultErrorMessage(response.status),
    response.status,
  );
}

/** Verifica se a resposta é 401 (token expirado / inválido). */
export function isUnauthorized(status: number): boolean {
  return status === 401;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getDefaultErrorMessage(status: number): string {
  const messages: Record<number, string> = {
    400: "Dados inválidos. Verifique as informações e tente novamente.",
    401: "Email ou senha incorretos.",
    403: "Você não tem permissão para acessar este recurso.",
    404: "Recurso não encontrado.",
    500: "Erro interno do servidor. Tente novamente mais tarde.",
  };

  return messages[status] ?? `Erro inesperado (${status}).`;
}
