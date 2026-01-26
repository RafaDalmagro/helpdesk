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
    users: UsersAPIResponse[];
    loading: boolean;
    error: any;
    fetchClientById: (id: string) => Promise<UsersAPIResponse | null>;
    createClient: (data: UsersAPIResponse) => Promise<boolean>;
};

export const ClientContext = createContext({} as ClientContext);

export function ClientProvider({ children }: { children: ReactNode }) {
    const [users, setUsers] = useState<UsersAPIResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchClientById = useCallback(
        async (id: string): Promise<UsersAPIResponse | null> => {
            try {
                setError(null);
                const response = await api.get<{ user: UsersAPIResponse }>(
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
        async (data: UsersAPIResponse): Promise<boolean> => {
            try {
                setError(null);
                setLoading(true);
                await api.post("/users", data);

                const response = await api.get<{ users: UsersAPIResponse[] }>(
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

    useEffect(() => {
        async function fetchClients() {
            try {
                setError(null);
                const response = await api.get<{ users: UsersAPIResponse[] }>(
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
            }}>
            {children}
        </ClientContext.Provider>
    );
}
