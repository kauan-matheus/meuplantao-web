import { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "sonner";
import {
  getUsuarios,
  criarUsuario,
  editarUsuario,
  deletarUsuario,
  type ApiUser,
  type CreateUserPayload,
  type UpdateUserPayload,
} from "@/lib/services/user.service";
import type { EquipeMember, EquipeRole } from "@/components/equipe/equipe-data";

// Mapeia role numérica da API para string do frontend
function roleNumberToString(role: number): EquipeRole {
  switch (role) {
    case 0:
      return "Admin";
    case 1:
      return "Gestor";
    case 2:
      return "Profissional";
    default:
      return "Profissional";
  }
}

// Mapeia string do frontend para role numérica da API
function roleStringToNumber(role: EquipeRole): number {
  switch (role) {
    case "Admin":
      return 0;
    case "Gestor":
      return 1;
    case "Profissional":
      return 2;
    default:
      return 2;
  }
}

// Converte ApiUser para EquipeMember
function apiUserToMember(user: ApiUser): EquipeMember {
  return {
    id: user.id.toString(),
    name: user.email.split("@")[0] || user.email,
    email: user.email,
    role: roleNumberToString(user.role),
    department: "",
    status: user.active ? "Ativo" : "Inativo",
    notes: "",
  };
}

export function useEquipe() {
  const [rawMembers, setRawMembers] = useState<EquipeMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState<EquipeRole | "Todos">("Todos");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const users = await getUsuarios();
      const mapped = (users || []).map(apiUserToMember);
      setRawMembers(mapped);
    } catch (err: unknown) {
      setError((err as Error).message || "Erro ao carregar usuários.");
      setRawMembers([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return rawMembers.filter((member) => {
      const matchesSearch =
        query.length === 0 ||
        [member.id, member.name, member.email, member.department, member.role, member.status]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesRole = role === "Todos" || member.role === role;

      return matchesSearch && matchesRole;
    });
  }, [rawMembers, search, role]);

  const handleCreateUser = async (data: {
    email: string;
    password: string;
    role: EquipeRole;
    active: boolean;
  }) => {
    const payload: CreateUserPayload = {
      email: data.email,
      password: data.password,
      role: roleStringToNumber(data.role),
      active: data.active,
    };

    try {
      await criarUsuario(payload);
      toast.success("Usuário criado com sucesso!");
      await fetchData();
    } catch (err: unknown) {
      toast.error((err as Error).message || "Erro ao criar usuário.");
      throw err;
    }
  };

  const handleEditUser = async (data: {
    id: number;
    email: string;
    password: string;
    role: EquipeRole;
    active: boolean;
  }) => {
    const payload: UpdateUserPayload = {
      id: data.id,
      email: data.email,
      password: data.password,
      role: roleStringToNumber(data.role),
      active: data.active,
    };

    try {
      await editarUsuario(payload);
      toast.success("Usuário editado com sucesso!");
      await fetchData();
    } catch (err: unknown) {
      toast.error((err as Error).message || "Erro ao editar usuário.");
      throw err;
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await deletarUsuario(id);
      toast.success("Usuário excluído com sucesso!");
      await fetchData();
    } catch (err: unknown) {
      toast.error((err as Error).message || "Erro ao excluir usuário.");
      throw err;
    }
  };

  return {
    members: filteredMembers,
    allMembers: rawMembers,
    isLoading,
    error,
    search,
    setSearch,
    role,
    setRole,
    handleCreateUser,
    handleEditUser,
    handleDeleteUser,
    refetch: fetchData,
  };
}
