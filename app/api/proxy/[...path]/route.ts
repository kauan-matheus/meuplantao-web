import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { API_BASE_URL } from "@/lib/api/endpoints";

/**
 * Proxy API Route — contorna CORS redirecionando requests do browser
 * para a API .NET no server-side.
 *
 * Rota: /api/proxy/auth/login → https://meuplantao.eu1.netbird.services/auth/login
 * Rota: /api/proxy/api/Plantao/plantoes → https://meuplantao.eu1.netbird.services/api/Plantao/plantoes
 *
 * O [...path] captura qualquer caminho após /api/proxy/.
 */

async function proxyRequest(request: NextRequest, params: { path: string[] }) {
  const { path } = await params;
  const targetPath = path.join("/");
  const targetUrl = `${API_BASE_URL}/${targetPath}`;

  // Copiar headers relevantes do request original
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const authHeader = request.headers.get("Authorization");
  if (authHeader) {
    headers["Authorization"] = authHeader;
  }

  // Ler body se existir
  let body: string | undefined;
  if (request.method !== "GET" && request.method !== "HEAD") {
    try {
      body = await request.text();
    } catch {
      // sem body
    }
  }

  try {
    const apiResponse = await fetch(targetUrl, {
      method: request.method,
      headers,
      body: body || undefined,
    });

    // Ler resposta da API
    const responseText = await apiResponse.text();

    // Retornar resposta com os headers corretos
    return new NextResponse(responseText || null, {
      status: apiResponse.status,
      statusText: apiResponse.statusText,
      headers: {
        "Content-Type": apiResponse.headers.get("Content-Type") ?? "application/json",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        title: "Erro de conexão com a API",
        detail: (error as Error).message,
        status: 502,
      },
      { status: 502 },
    );
  }
}

export async function GET(request: NextRequest, context: { params: { path: string[] } }) {
  return proxyRequest(request, context.params);
}

export async function POST(request: NextRequest, context: { params: { path: string[] } }) {
  return proxyRequest(request, context.params);
}

export async function PUT(request: NextRequest, context: { params: { path: string[] } }) {
  return proxyRequest(request, context.params);
}

export async function DELETE(request: NextRequest, context: { params: { path: string[] } }) {
  return proxyRequest(request, context.params);
}
