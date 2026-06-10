/**
 * Serviço para o domínio de Usuário (Equipe).
 *
 * Consome a API .NET /api/User/usuarios.
 */

import { httpClient } from "@/lib/api/http-client";
import { USER_ENDPOINTS } from "@/lib/api/endpoints";

export interface ApiUser {
  id: number;
  fotoPerfilUrl: string | null;
  email: string;
  passwordHash: string;
  role: number; // 0 = Admin, 1 = Gestor, 2 = Profissional
  active: boolean;
}

export interface CreateUserPayload {
  email: string;
  password: string;
  role: number;
  active: boolean;
}

export interface UpdateUserPayload {
  id: number;
  email: string;
  password: string;
  role: number;
  active: boolean;
}

/**
 * Busca todos os usuários.
 */
export async function getUsuarios(): Promise<ApiUser[]> {
  const response = await httpClient.get<ApiUser[] | Record<string, unknown>>(USER_ENDPOINTS.BASE);

  if (Array.isArray(response)) {
    return response;
  }

  if (response && Array.isArray((response as Record<string, unknown>).data)) {
    return (response as Record<string, unknown>).data as ApiUser[];
  }

  return [];
}

/**
 * Busca um usuário pelo ID.
 */
export async function getUsuarioById(id: number): Promise<ApiUser> {
  return httpClient.get<ApiUser>(USER_ENDPOINTS.BY_ID(id));
}

/**
 * Cria um novo usuário.
 */
export async function criarUsuario(payload: CreateUserPayload): Promise<void> {
  await httpClient.post<unknown>(USER_ENDPOINTS.BASE, payload);
}

/**
 * Edita um usuário existente.
 */
export async function editarUsuario(payload: UpdateUserPayload): Promise<void> {
  await httpClient.put<unknown>(USER_ENDPOINTS.BASE, payload);
}

/**
 * Exclui um usuário pelo ID.
 */
export async function deletarUsuario(id: number): Promise<void> {
  await httpClient.delete<unknown>(USER_ENDPOINTS.BY_ID(id));
}
