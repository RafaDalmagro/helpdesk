import { createContext, type ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";
import { AxiosError } from "axios";

type TechContext = {
    techs: UserTech[];
    loading: boolean;
    error: any;
};

export const TechContext = createContext({} as TechContext);

export function TechProvider({ children }: { children: ReactNode }) {
    const [techs, setTechs] = useState<UserTech[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTechs() {
            try {
                setError(null);
                const response = await api.get<{ users: UserTech[] }>(
                    "/users?role=tech",
                );

                setTechs(response.data?.users ?? []);
            } catch (error) {
                if (error instanceof AxiosError) {
                    const errorMessage =
                        error.response?.data?.message ||
                        "Erro ao buscar técnicos";
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
        <TechContext.Provider value={{ techs, loading, error }}>
            {children}
        </TechContext.Provider>
    );
}
