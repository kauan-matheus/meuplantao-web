"use client";

/**
 * AuthGuard — protege rotas que exigem autenticação.
 *
 * - Exibe loading enquanto verifica sessão
 * - Redireciona para /pages/login se não autenticado
 * - Aceita `allowedRoles` para filtrar por role (padrão: Admin e Gestor)
 */

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/use-auth";
import { ALLOWED_ROLES } from "@/lib/types/auth.types";

interface AuthGuardProps {
  children: React.ReactNode;
  /** Roles permitidas (default: Admin e Gestor). */
  allowedRoles?: ReadonlySet<string>;
}

export function AuthGuard({
  children,
  allowedRoles = ALLOWED_ROLES,
}: AuthGuardProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace("/pages/login");
      return;
    }

    // Verificar role
    if (user?.role && !allowedRoles.has(user.role)) {
      router.replace("/pages/login");
    }
  }, [isAuthenticated, isLoading, user, allowedRoles, router]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
          <p className="text-sm text-muted-foreground">Verificando sessão…</p>
        </div>
      </div>
    );
  }

  // Não autenticado — não renderiza nada enquanto redireciona
  if (!isAuthenticated) {
    return null;
  }

  // Role inválida — não renderiza
  if (user?.role && !allowedRoles.has(user.role)) {
    return null;
  }

  return <>{children}</>;
}
