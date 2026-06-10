/**
 * Tipos do domínio Plantão.
 *
 * Como o Swagger não detalha o schema de retorno do GET /api/Plantao/plantoes,
 * inferimos os campos baseados no RequestPlantaoRegisterJson e nos dados
 * necessários pela UI (unidade, profissional, periodo, status).
 */

export enum PlantaoStatus {
  Aprovado = "Aprovado",
  Pendente = "Pendente",
  Recusado = "Recusado",
}

export interface Setor {
  id: number;
  nome: string;
  estabelecimentoNome: string;
}

export interface Profissional {
  id: number;
  nome: string;
  crm?: string;
  coren?: string;
  userId?: number;
}

export interface Plantao {
  id: number;
  valor: number;
  inicio: string; // ISO date string
  fim: string; // ISO date string
  status: PlantaoStatus | string;

  // Relacionamentos assumidos pela UI
  setorId?: number;
  setor?: Setor;
  
  profissionalId?: number;
  profissional?: Profissional;
  
  // Propriedade usada na atenção imediata
  dataCriacao?: string;
}

export interface DashboardFilters {
  search: string;
  periodo: "7d" | "30d" | "mes" | "todos";
  status: "Todos" | PlantaoStatus | string;
}

export interface DashboardMetrics {
  aprovados: number;
  recusados: number;
  pendentes: number;
  total: number;
}
