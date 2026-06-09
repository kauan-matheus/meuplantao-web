"use client";

/**
 * useAuth — hook público de autenticação.
 *
 * Delega para o AuthContext. Este é o único ponto de acesso
 * que os componentes devem usar para ler/alterar estado de auth.
 */

import { useAuthContext } from "@/lib/contexts/auth-context";

export function useAuth() {
  return useAuthContext();
}
