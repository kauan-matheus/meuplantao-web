import { httpClient } from "@/lib/api/http-client";
import { PROFISSIONAIS_ENDPOINTS } from "@/lib/api/endpoints";
import type { Profissional } from "@/lib/types/plantao.types";

export async function getProfissionais(): Promise<Profissional[]> {
  const response = await httpClient.get<Profissional[] | Record<string, unknown>>(PROFISSIONAIS_ENDPOINTS.BASE);
  if (Array.isArray(response)) return response;
  if (response && Array.isArray(response.data)) return response.data;
  return [];
}
