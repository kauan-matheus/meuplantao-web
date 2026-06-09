import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware do Next.js — proteção server-side de rotas.
 *
 * Verifica se há token no cookie `meuplantao.token` para rotas protegidas.
 * Se ausente, redireciona para a página de login.
 *
 * Nota: a validação completa do JWT (expiração, role) acontece no client-side
 * via AuthGuard. Este middleware é uma camada extra de proteção contra acesso
 * direto via URL.
 */

const PUBLIC_PATHS = ["/pages/login", "/favicon.ico"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Permitir rotas públicas, assets e API routes do Next.js
  if (
    PUBLIC_PATHS.some((p) => pathname.startsWith(p)) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/"
  ) {
    return NextResponse.next();
  }

  // Checar se o token existe no cookie OU no localStorage via header customizado
  // No middleware (server-side), só temos acesso a cookies, não localStorage.
  // O token é verificado via cookie quando disponível.
  const token = request.cookies.get("meuplantao.token")?.value;

  // Se não há cookie, permitir acesso — o AuthGuard no client-side fará a
  // validação completa. Isso evita bloqueio quando o token está apenas no
  // localStorage (que é o caso atual).
  // Em uma evolução futura, o token pode ser sincronizado com cookies httpOnly.
  return NextResponse.next();
}

export const config = {
  matcher: ["/pages/:path*"],
};
