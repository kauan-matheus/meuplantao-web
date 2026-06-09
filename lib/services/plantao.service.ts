/**
 * Serviço para o domínio de Plantão.
 *
 * Consome a API .NET usando o HttpClient genérico.
 */

import { httpClient } from "@/lib/api/http-client";
import { PLANTAO_ENDPOINTS } from "@/lib/api/endpoints";
import type { Plantao } from "@/lib/types/plantao.types";

/**
 * Busca todos os plantões.
 */
export async function getPlantoes(): Promise<Plantao[]> {
  const response = await httpClient.get<Plantao[] | Record<string, unknown>>(PLANTAO_ENDPOINTS.BASE);
  
  // Como o payload exato da API é desconhecido (o swagger não tipa o response),
  // garantimos que sempre retorne um array.
  if (Array.isArray(response)) {
    return response;
  }
  
  // Se a API retornar dentro de um objeto (ex: { data: [...] })
  if (response && Array.isArray(response.data)) {
    return response.data;
  }
  
  // Fallback
  return [];
}

/**
 * Busca um plantão específico pelo ID.
 */
export async function getPlantaoById(id: number): Promise<Plantao> {
  return httpClient.get<Plantao>(PLANTAO_ENDPOINTS.BY_ID(id));
}

/**
 * Aprova um plantão.
 */
export async function aprovarPlantao(id: number): Promise<void> {
  const response = await httpClient.get<Record<string, unknown>>(PLANTAO_ENDPOINTS.SOLICITACOES(id));
  const solicitacoes = Array.isArray(response) ? response : ((response?.data as unknown[]) || []);

  console.log("DEBUG APROVAR solicitacoes:", solicitacoes);

  if (!solicitacoes || solicitacoes.length === 0) {
    throw new Error("Não há solicitações para este plantão.");
  }
  const reqs = solicitacoes as Record<string, unknown>[];
  const solicitanteId = (reqs[0].profissionalId as number) || (reqs[0].ProfissionalId as number);
  console.log("DEBUG APROVAR solicitanteId:", solicitanteId);

  return httpClient.put<void>(PLANTAO_ENDPOINTS.ACEITAR(id, solicitanteId), {});
}

/**
 * Recusa um plantão.
 */
export async function recusarPlantao(id: number): Promise<void> {
  const response = await httpClient.get<Record<string, unknown>>(PLANTAO_ENDPOINTS.SOLICITACOES(id));
  const solicitacoes = Array.isArray(response) ? response : ((response?.data as unknown[]) || []);

  console.log("DEBUG RECUSAR solicitacoes:", solicitacoes);

  if (!solicitacoes || solicitacoes.length === 0) {
    throw new Error("Não há solicitações para este plantão.");
  }
  const reqs = solicitacoes as Record<string, unknown>[];
  const solicitanteId = (reqs[0].profissionalId as number) || (reqs[0].ProfissionalId as number);
  console.log("DEBUG RECUSAR solicitanteId:", solicitanteId);

  return httpClient.put<void>(PLANTAO_ENDPOINTS.RECUSAR(id, solicitanteId), {});
}

/**
 * Cria um novo plantão.
 */
export async function criarPlantao(plantao: { valor: number; setorId: number; inicio: string; fim: string }): Promise<void> {
  await httpClient.post(PLANTAO_ENDPOINTS.BASE, plantao);
}

/**
 * Edita um plantão existente.
 */
export async function editarPlantao(plantao: { id: number; valor: number; setorId: number; inicio: string; fim: string }): Promise<void> {
  await httpClient.put(PLANTAO_ENDPOINTS.BASE, plantao);
}

export async function deletarPlantao(id: number): Promise<void> {
  await httpClient.delete(PLANTAO_ENDPOINTS.BY_ID(id));
}
