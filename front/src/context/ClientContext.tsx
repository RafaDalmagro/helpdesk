import {
    createContext,
    type ReactNode,
    useCallback,
    useEffect,
    useState,
} from "react";

import { api } from "../services/api";
import { AxiosError } from "axios";

type ClientContext = {
    users: UserResponse[];
    loading: boolean;
    error: any;
    fetchClientById: (id: string) => Promise<UserResponse | null>;
    createClient: (data: UserResponse) => Promise<boolean>;
    deleteClient: (id: string) => Promise<boolean>;
    updateClient: (
        id: string,
        data: { name: string; email: string },
    ) => Promise<boolean>;
};

export const ClientContext = createContext({} as ClientContext);

export function ClientProvider({ children }: { children: ReactNode }) {
    const [users, setUsers] = useState<UserResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchClientById = useCallback(
        async (id: string): Promise<UserResponse | null> => {
            try {
                setError(null);
                const response = await api.get<{ user: UserResponse }>(
                    `/users/${id}`,
                );

                return response.data?.user ?? null;
            } catch (error) {
                if (error instanceof AxiosError) {
                    const errorMessage =
                        error.response?.data?.message ||
                        "Erro ao buscar cliente";
                    setError(errorMessage);
                } else {
                    setError("Erro ao buscar cliente");
                }

                console.error("Erro ao buscar cliente:", error);
                return null;
            }
        },
        [],
    );

    const createClient = useCallback(
        async (data: UserResponse): Promise<boolean> => {
            try {
                setError(null);
                setLoading(true);
                await api.post("/users", data);

                const response = await api.get<{ users: UserResponse[] }>(
                    "/users?role=client",
                );
                setUsers(response.data?.users ?? []);

                setLoading(false);
                return true;
            } catch (error: unknown) {
                setLoading(false);
                if (error instanceof AxiosError) {
                    const errorMessage =
                        error.response?.data?.message ||
                        "Erro ao criar cliente";
                    setError(errorMessage);
                    console.error("Erro ao criar cliente:", error);
                    throw error;
                } else {
                    console.error("Erro ao criar cliente:", error);
                    setError("Erro ao criar cliente");
                    throw new Error("Erro ao criar cliente");
                }
            }
        },
        [],
    );

    const deleteClient = useCallback(async (id: string): Promise<boolean> => {
        try {
            setError(null);
            setLoading(true);

            await api.delete(`/users/${id}`);

            const response = await api.get<{ users: UserResponse[] }>(
                "/users?role=client",
            );
            setUsers(response.data?.users ?? []);

            setLoading(false);
            return true;
        } catch (error: unknown) {
            setLoading(false);
            if (error instanceof AxiosError) {
                const errorMessage =
                    error.response?.data?.message || "Erro ao deletar cliente";
                setError(errorMessage);
                console.error("Erro ao deletar cliente:", error);
                throw error;
            } else {
                console.error("Erro ao deletar cliente:", error);
                setError("Erro ao deletar cliente");
                throw new Error("Erro ao deletar cliente");
            }
        }
    }, []);

    const updateClient = useCallback(
        async (
            id: string,
            data: { name: string; email: string },
        ): Promise<boolean> => {
            try {
                setError(null);
                setLoading(true);

                await api.put(`/users/${id}`, data);

                const response = await api.get<{ users: UserResponse[] }>(
                    "/users?role=client",
                );
                setUsers(response.data?.users ?? []);

                setLoading(false);
                return true;
            } catch (error: unknown) {
                setLoading(false);
                if (error instanceof AxiosError) {
                    const errorMessage =
                        error.response?.data?.message ||
                        "Erro ao atualizar cliente";
                    setError(errorMessage);
                    console.error("Erro ao atualizar cliente:", error);
                    throw error;
                } else {
                    console.error("Erro ao atualizar cliente:", error);
                    setError("Erro ao atualizar cliente");
                    throw new Error("Erro ao atualizar cliente");
                }
            }
        },
        [],
    );

    useEffect(() => {
        async function fetchClients() {
            try {
                setError(null);
                const response = await api.get<{ users: UserResponse[] }>(
                    "/users?role=client",
                );

                setUsers(response.data?.users ?? []);
            } catch (error) {
                if (error instanceof AxiosError) {
                    const errorMessage =
                        error.response?.data?.message ||
                        "Erro ao buscar clientes";
                    setError(errorMessage);
                } else {
                    setError("Erro ao buscar clientes");
                }

                console.error("Erro ao buscar clientes:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchClients();
    }, []);

    return (
        <ClientContext.Provider
            value={{
                users,
                loading,
                error,
                fetchClientById,
                createClient,
                deleteClient,
                updateClient,
            }}>
            {children}
        </ClientContext.Provider>
    );
}
