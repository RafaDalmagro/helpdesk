import { createContext, type ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";
import { AxiosError } from "axios";

type TechContext = {
    users: UserResponse[];
    loading: boolean;
    error: any;
};

export const TechContext = createContext({} as TechContext);

export function TechProvider({ children }: { children: ReactNode }) {
    const [users, setUsers] = useState<UserResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTechs() {
            try {
                setError(null);
                const response = await api.get<UsersAPIResponse>(
                    "/users?role=tech"
                );

                setUsers(response.data.users);
            } catch (error) {
                if (error instanceof AxiosError) {
                    const errorMessage =
                        error.response?.data?.message ||
                        "Erro ao buscar tickets";
                    setError(errorMessage);
                } else {
                    setError("Erro ao buscar técnicos");
                }

                console.error("Erro ao buscar técnicos:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchTechs();
    }, []);

    return (
        <TechContext.Provider value={{ users, loading, error }}>
            {children}
        </TechContext.Provider>
    );
}
