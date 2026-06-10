"use client";

/**
 * AuthContext — gerencia estado de autenticação de forma reativa.
 *
 * Responsabilidades:
 *  - Manter `user`, `token`, `isAuthenticated`, `isLoading` em um único lugar
 *  - Restaurar sessão automaticamente no mount (hydration-safe)
 *  - Expor `login` e `logout` como ações
 */

import * as React from "react";
import type { ResponseAuthUserJson } from "@/lib/types/auth.types";
import type { RequestAuthLoginJson, AuthState } from "@/lib/types/auth.types";
import * as authService from "@/lib/services/auth.service";

// ---------------------------------------------------------------------------
// Context value
// ---------------------------------------------------------------------------

interface AuthContextValue extends AuthState {
  login: (credentials: RequestAuthLoginJson) => Promise<void>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<ResponseAuthUserJson | null>(null);
  const [token, setToken] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  function restoreSession() {
    const storedToken = authService.getStoredToken();
    const storedUser = authService.getStoredUser();

    if (storedToken && storedUser && !authService.isTokenExpired()) {
      setToken(storedToken);
      setUser(storedUser);
    } else {
      // Sessão inválida ou expirada — limpar
      authService.logout();
      setToken(null);
      setUser(null);
    }

    setIsLoading(false);
  }

  // Restaurar sessão no mount
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    restoreSession();
  }, []);

  async function login(credentials: RequestAuthLoginJson): Promise<void> {
    const response = await authService.login(credentials);
    setToken(response.token);
    setUser(response.usuario);
  }

  function logout() {
    authService.logout();
    setToken(null);
    setUser(null);
  }

  const value: AuthContextValue = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Consumer hook (internal)
// ---------------------------------------------------------------------------

export function useAuthContext(): AuthContextValue {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext deve ser usado dentro de um AuthProvider.");
  }

  return context;
}
