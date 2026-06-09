import { useState, useEffect, useMemo } from "react";
import { getPlantoes } from "@/lib/services/plantao.service";
import type { PlantaoStatus } from "@/components/plantoes/plantoes-data";
import type { DashboardFilters } from "@/lib/types/plantao.types";

interface RawPlantao {
  id?: number | string;
  status?: number;
  onDuty?: string;
  hasSolicitacao?: boolean;
  requesterName?: string;
  locale?: string;
  sector?: string;
  inicio?: string;
  date?: string;
  start?: string;
  duration?: string;
  [key: string]: unknown;
}

export function useDashboard() {
  const [rawPlantoes, setRawPlantoes] = useState<RawPlantao[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<DashboardFilters>({
    search: "",
    periodo: "7d",
    status: "Todos",
  });

  // Buscar dados
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getPlantoes();
        setRawPlantoes((data as unknown) as RawPlantao[] || []);
      } catch (err: unknown) {
        setError((err as Error).message || "Erro ao carregar dados do dashboard.");
        // Em caso de erro, definimos array vazio mas podemos mostrar um toast no UI
        setRawPlantoes([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Helper interno para obter o status real
  const getPlantaoStatus = (p: RawPlantao): PlantaoStatus => {
    if (p.status === 3) return "Inativo";
    if (p.status === 4) return "Recusado";
    if (p.status === 2 || (p.status !== 0 && p.onDuty && p.onDuty !== "Disponivel")) return "Aprovado";
    if (p.status === 0) {
      if (p.hasSolicitacao) return "Pendente";
      return "Disponível";
    }
    return "Pendente";
  };

  // Processar filtros
  const filteredPlantoes = useMemo(() => {
    return rawPlantoes.filter((plantao) => {
      const plantaoStatus = getPlantaoStatus(plantao);

      // Filtro de Status
      if (filters.status !== "Todos" && plantaoStatus !== filters.status) {
        return false;
      }

      // Filtro de Busca (Search)
      if (filters.search) {
        const term = filters.search.toLowerCase();
        
        const searchString = `
          ${plantao.id} 
          ${plantao.locale || ""} 
          ${plantao.sector || ""} 
          ${plantao.onDuty || ""}
        `.toLowerCase();
        
        if (!searchString.includes(term)) {
          return false;
        }
      }

      return true;
    });
  }, [rawPlantoes, filters]);

  // Processar Métricas (Aprovados, Recusados, Pendentes, Total)
  const metrics = useMemo(() => {
    let aprovados = 0;
    let recusados = 0;
    let pendentes = 0;

    rawPlantoes.forEach((p) => {
      const status = getPlantaoStatus(p);
      
      if (status === "Aprovado") aprovados++;
      else if (status === "Recusado") recusados++;
      else if (status === "Pendente") pendentes++;
    });

    return {
      aprovados,
      recusados,
      pendentes,
      total: rawPlantoes.length, // Usar rawPlantoes ao invés de filteredPlantoes para que os cards mostrem o geral
    };
  }, [rawPlantoes]); // <-- Mudei de filteredPlantoes para rawPlantoes para o total do card não zerar quando filtra

  // Processar Gráfico Semanal (Dias da semana atuais)
  const weeklyVolume = useMemo(() => {
    const days = [
      { day: "Dom", value: 0 },
      { day: "Seg", value: 0 },
      { day: "Ter", value: 0 },
      { day: "Qua", value: 0 },
      { day: "Qui", value: 0 },
      { day: "Sex", value: 0 },
      { day: "Sab", value: 0 },
    ];

    // Focar apenas nos plantões que caem na semana atual para ser mais preciso,
    // mas aqui simplificamos contando o dia da semana dos filtrados
    filteredPlantoes.forEach((p) => {
      if (!p.date) return; // A API retorna "date" no formato "DD/MM/YYYY"
      try {
        const parts = p.date.split("/");
        if (parts.length === 3) {
          // parse DD/MM/YYYY -> YYYY-MM-DD
          const isoDate = `${parts[2]}-${parts[1]}-${parts[0]}T12:00:00`;
          const date = new Date(isoDate);
          const dayOfWeek = date.getDay(); // 0 = Domingo, 1 = Segunda...
          if (!isNaN(dayOfWeek)) {
            days[dayOfWeek].value++;
          }
        }
      } catch (_e) {
        // ignora data inválida
      }
    });

    // Reordenar para começar na Segunda (Seg, Ter, Qua, Qui, Sex, Sab, Dom)
    return [...days.slice(1), days[0]];
  }, [filteredPlantoes]);

  // Processar "Últimos Plantões" para a tabela
  const recentShifts = useMemo(() => {
    return filteredPlantoes
      .sort((a, b) => {
        return (Number(b.id) || 0) - (Number(a.id) || 0);
      })
      .slice(0, 5)
      .map((p) => {
        const status = getPlantaoStatus(p);
        
        let professionalName = "Não alocado";
        if (status === "Aprovado") professionalName = p.onDuty || "Não alocado";
        else if (status === "Pendente") professionalName = `${p.requesterName || ""} (Aguardando)`;

        return {
          id: p.id?.toString() || "-",
          unidade: p.locale || "Unidade não informada",
          profissional: professionalName,
          periodo: `${p.date}, ${p.start} (${p.duration}h)`,
          status: status,
        };
      });
  }, [filteredPlantoes]);

  // Processar "Atenção Imediata"
  const urgentItems = useMemo(() => {
    const items: Array<{title: string, subtitle: string, badge: string}> = [];
    
    // Regra simples: Pendentes há mais tempo (no futuro ou passado próximo)
    // Se a API não tem regras claras, mostramos os primeiros 4 pendentes
    const pendentes = filteredPlantoes.filter(p => getPlantaoStatus(p) === "Pendente");
    
    pendentes.slice(0, 4).forEach(p => {
      items.push({
        title: "Plantão Pendente",
        subtitle: p.locale || "Unidade não informada",
        badge: "Urgente"
      });
    });

    return items;
  }, [filteredPlantoes]);

  return {
    isLoading,
    error,
    filters,
    setFilters,
    metrics,
    weeklyVolume,
    recentShifts,
    urgentItems,
    // raw data em caso de necessidade de re-refresh
    refresh: () => setRawPlantoes([...rawPlantoes]),
  };
}
