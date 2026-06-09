import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { getPlantoes, aprovarPlantao, recusarPlantao, criarPlantao, editarPlantao, deletarPlantao } from "@/lib/services/plantao.service";
import type { PlantaoItem, PlantaoStatus } from "@/components/plantoes/plantoes-data";

export function usePlantoes() {
  const [rawPlantoes, setRawPlantoes] = useState<PlantaoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<PlantaoStatus | "Todos">("Todos");

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const plantoesData = await getPlantoes();
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mapped: PlantaoItem[] = (plantoesData || []).map((p: any) => {
        let mappedStatus = "Pendente";
        let professionalName = "Não alocado";

        // De acordo com StatusPlantaoEnum da API: 0 = Disponivel, 2 = Ativo, 3 = Inativo, 4 = Recusado
        if (p.status === 3) {
          mappedStatus = "Inativo";
        } else if (p.status === 4) {
          mappedStatus = "Recusado";
        } else if (p.status === 2 || (p.status !== 0 && p.onDuty && p.onDuty !== "Disponivel")) {
          // Status 2 é Ativo (Aprovado)
          mappedStatus = "Aprovado";
          professionalName = p.onDuty as string;
        } else if (p.status === 0) {
          // Status 0 (Disponivel), mas pode ou não ter solicitações!
          if (p.hasSolicitacao) {
            mappedStatus = "Pendente"; // Tem um profissional querendo este plantão
            professionalName = `${p.requesterName} (Aguardando Aprovação)`;
          } else {
            mappedStatus = "Disponível"; // Ninguém pediu ainda
          }
        }

        return {
          id: p.id?.toString() || "-",
          unidade: (p.locale as string) || "Unidade não informada",
          profissional: professionalName,
          especialidade: (p.sector as string) || "Geral",
          periodo: `${p.date}, ${p.start} (${p.duration}h)`,
          solicitante: (p.responsable as string) || "Sistema", 
          status: mappedStatus as PlantaoStatus,
          observacao: "", // Removido o texto 'Detalhes do plantão carregados via API'
        };
      });
      
      setRawPlantoes(mapped);
    } catch (err: unknown) {
      setError((err as Error).message || "Erro ao carregar dados dos plantões.");
      setRawPlantoes([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetchData();
  }, []);

  const filteredItems = useMemo(() => {
    return rawPlantoes.filter((item) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        query.length === 0 ||
        [item.id, item.unidade, item.profissional, item.especialidade, item.periodo, item.solicitante]
          .join(" ")
          .toLowerCase()
          .includes(query);
      const matchesStatus = status === "Todos" || item.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [rawPlantoes, search, status]);

  const handleAprovar = async (id: string) => {
    try {
      await aprovarPlantao(Number(id));
      toast.success(`Plantão ${id} aprovado com sucesso!`);
      await fetchData(); // Recarregar da API
    } catch (err: unknown) {
      toast.error((err as Error).message || "Erro ao aprovar plantão");
      setError((err as Error).message || "Erro ao aprovar plantão");
    }
  };

  const handleRecusar = async (id: string) => {
    try {
      await recusarPlantao(Number(id));
      toast.success(`Plantão ${id} recusado com sucesso!`);
      await fetchData(); // Recarregar da API
    } catch (err: unknown) {
      toast.error((err as Error).message || "Erro ao recusar plantão");
      setError((err as Error).message || "Erro ao recusar plantão");
    }
  };

  const handleCriarPlantao = async (plantaoData: { valor: number; setorId: number; inicio: string; fim: string }) => {
    try {
      await criarPlantao(plantaoData);
      toast.success("Plantão criado com sucesso!");
      await fetchData(); 
    } catch (err: unknown) {
      toast.error((err as Error).message || "Erro ao criar plantão");
      throw err; 
    }
  };

  const handleEditarPlantao = async (plantaoData: { id: number; valor: number; setorId: number; inicio: string; fim: string }) => {
    try {
      await editarPlantao(plantaoData);
      toast.success(`Plantão ${plantaoData.id} editado com sucesso!`);
      await fetchData();
    } catch (err: unknown) {
      toast.error((err as Error).message || "Erro ao editar plantão");
      throw err;
    }
  };

  const handleDeletarPlantao = async (id: number) => {
    try {
      await deletarPlantao(id);
      toast.success(`Plantão ${id} excluído com sucesso!`);
      await fetchData();
    } catch (err: unknown) {
      toast.error((err as Error).message || "Erro ao excluir plantão");
      throw err;
    }
  };

  return {
    items: rawPlantoes,
    filteredItems,
    isLoading,
    error,
    search,
    setSearch,
    status,
    setStatus,
    handleAprovar,
    handleRecusar,
    handleCriarPlantao,
    handleEditarPlantao,
    handleDeletarPlantao,
    refresh: fetchData
  };
}
