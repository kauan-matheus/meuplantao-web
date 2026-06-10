import { getPlantoes } from "@/lib/services/plantao.service";
import { getUsuarios } from "@/lib/services/user.service";
import { getProfissionais } from "@/lib/services/profissional.service";
import { useState, useEffect, useMemo, useCallback } from "react";
import type { RelatorioPlantao, RelatorioStatus } from "@/components/relatorios/relatorios-data";
import { toast } from "sonner";

// Formata data da API (que costuma vir como DD/MM/YYYY) para "28 Mai 2026"
function formatData(dateStr: string): string {
  if (!dateStr) return "Data inválida";
  try {
    // Tenta fazer o parse de DD/MM/YYYY
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      const date = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
      const day = String(date.getDate()).padStart(2, "0");
      const month = date.toLocaleString("pt-BR", { month: "short" }).replace(".", "");
      const year = date.getFullYear();
      return `${day} ${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
    }
    
    // Fallback pra Date direto
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("pt-BR", { month: "short" }).replace(".", "");
    const year = date.getFullYear();
    return `${day} ${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
  } catch {
    return dateStr;
  }
}

// Converte Plantao da API para formato da tabela de relatórios
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function apiPlantaoToRelatorio(p: any, profissionaisPhotoMap: Map<string, string>): RelatorioPlantao {
  let mappedStatus: RelatorioStatus = "Em aberto";
  let professionalName = "Não atribuído";
  let concluido = "-";

  if (p.status === 4) {
    mappedStatus = "Cancelado";
    professionalName = p.requesterName || "Não atribuído";
    concluido = professionalName;
  } else if (p.status === 2 || (p.status !== 0 && p.onDuty && p.onDuty !== "Disponivel")) {
    mappedStatus = "Completo";
    professionalName = (p.onDuty && p.onDuty !== "Disponivel") ? p.onDuty : (p.requesterName || "Não atribuído");
    concluido = professionalName;
  } else if (p.status === 0) {
    if (p.hasSolicitacao) {
      mappedStatus = "Em aberto";
      professionalName = p.requesterName || "Aguardando";
    } else {
      mappedStatus = "Em aberto"; // Plantão disponível ainda está em aberto
    }
  } else if (p.status === 3) {
    mappedStatus = "Cancelado"; // Inativo
  }

  // Tenta encontrar a foto do profissional comparando o nome exato com a tabela de profissionais
  let fotoProfissional: string | undefined = undefined;
  if (professionalName !== "Não atribuído" && professionalName !== "Aguardando") {
    fotoProfissional = profissionaisPhotoMap.get(professionalName.toLowerCase());
  }

  return {
    id: p.id?.toString() || "-",
    unidade: (p.locale as string) || "Não informado",
    profissional: professionalName,
    concluidoPor: concluido,
    fotoProfissional,
    data: formatData(p.date),
    valorGerado: Number(p.valor || p.value || 0), // Tenta pegar valor ou value
    status: mappedStatus,
  };
}

export function useRelatorios() {
  const [rawPlantoes, setRawPlantoes] = useState<RelatorioPlantao[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<RelatorioStatus | "Todos">("Todos");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [plantoesData, usersData, profissionaisData] = await Promise.all([
        getPlantoes(),
        getUsuarios().catch(() => []), // Ignora erro se falhar em pegar os usuários
        getProfissionais().catch(() => []) // Ignora erro se falhar em pegar os profissionais
      ]);

      // Mapeia UserId -> FotoPerfilUrl
      const usersMap = new Map<number, string>();
      if (Array.isArray(usersData)) {
        usersData.forEach((u) => {
          if (u.id && u.fotoPerfilUrl) {
            usersMap.set(u.id, u.fotoPerfilUrl);
          }
        });
      }

      // Mapeia Nome do Profissional -> FotoPerfilUrl
      const profissionaisPhotoMap = new Map<string, string>();
      if (Array.isArray(profissionaisData)) {
        profissionaisData.forEach((p) => {
          if (p.nome && p.userId) {
            const photoUrl = usersMap.get(p.userId);
            if (photoUrl) {
              profissionaisPhotoMap.set(p.nome.toLowerCase(), photoUrl);
            }
          }
        });
      }

      const mapped = (plantoesData || [])
        .map((p) => apiPlantaoToRelatorio(p, profissionaisPhotoMap))
        .filter((r) => r.profissional !== "Não atribuído");
      
      // Ordena pelos mais recentes primeiro
      mapped.reverse(); 
      setRawPlantoes(mapped);
    } catch {
      setError("Erro ao carregar relatórios.");
      toast.error("Erro ao carregar os dados dos relatórios.");
      setRawPlantoes([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line
    fetchData();
  }, [fetchData]);

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();

    return rawPlantoes.filter((row) => {
      const matchesSearch =
        query.length === 0 ||
        [row.id, row.unidade, row.profissional, row.concluidoPor, row.data]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesStatus = status === "Todos" || row.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [rawPlantoes, search, status]);

  const summary = useMemo(() => {
    const total = rawPlantoes.length;
    const completos = rawPlantoes.filter((row) => row.status === "Completo").length;
    const emAberto = rawPlantoes.filter((row) => row.status === "Em aberto").length;
    const receitaTotal = rawPlantoes
      .filter((row) => row.status === "Completo")
      .reduce((sum, row) => sum + row.valorGerado, 0);

    return { total, completos, emAberto, receitaTotal };
  }, [rawPlantoes]);

  return {
    rows: filteredRows,
    allRows: rawPlantoes,
    summary,
    isLoading,
    error,
    search,
    setSearch,
    status,
    setStatus,
    refetch: fetchData,
  };
}
