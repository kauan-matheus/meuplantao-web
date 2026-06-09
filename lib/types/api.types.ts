/**
 * Tipos genéricos da API .NET — alinhados com o Swagger do MeuPlantão.
 *
 * ProblemDetails segue a RFC 7807 usada pelo ASP.NET Core.
 */

// ---------------------------------------------------------------------------
// Error contract
// ---------------------------------------------------------------------------

export interface ProblemDetails {
  type?: string | null;
  title?: string | null;
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Generic API wrappers
// ---------------------------------------------------------------------------

/** Resultado padronizado de uma chamada à API. */
export type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: ApiError };

/**
 * Erro de domínio da API.
 * Pode ser instanciado a partir de um `ProblemDetails` ou de um erro genérico.
 */
export class ApiError extends Error {
  public readonly status: number;
  public readonly detail: string | null;
  public readonly raw?: ProblemDetails;

  constructor(
    message: string,
    status: number = 0,
    detail: string | null = null,
    raw?: ProblemDetails,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.detail = detail;
    this.raw = raw;
  }

  /** Factory a partir de um ProblemDetails vindo do backend. */
  static fromProblemDetails(problem: ProblemDetails): ApiError {
    return new ApiError(
      problem.title ?? "Erro desconhecido",
      problem.status ?? 0,
      problem.detail ?? null,
      problem,
    );
  }
}
