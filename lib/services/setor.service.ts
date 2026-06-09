import { httpClient } from "@/lib/api/http-client";
import { SETOR_ENDPOINTS } from "@/lib/api/endpoints";
import type { Setor } from "@/lib/types/plantao.types";

export async function getSetores(): Promise<Setor[]> {
  const response = await httpClient.get<Setor[] | Record<string, unknown>>(SETOR_ENDPOINTS.BASE);
  if (Array.isArray(response)) return response;
  if (response && Array.isArray(response.data)) return response.data;
  return [];
}
