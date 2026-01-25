import {
    createContext,
    type ReactNode,
    useCallback,
    useEffect,
    useState,
} from "react";
import { api } from "../services/api";
import { AxiosError } from "axios";

type TechContext = {
    techs: UserTech[];
    loading: boolean;
    error: any;
    fetchTechById: (id: string) => Promise<UserTechDetail | null>;
    updateTechAvailability: (
        techId: string,
        times: string[],
    ) => Promise<boolean>;
};

export const TechContext = createContext({} as TechContext);

export function TechProvider({ children }: { children: ReactNode }) {
    const [techs, setTechs] = useState<UserTech[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTechById = useCallback(
        async (id: string): Promise<UserTechDetail | null> => {
            try {
                setError(null);
                const response = await api.get<{ user: UserTechDetail }>(
                    `/users/${id}`,
                );

                return response.data?.user ?? null;
            } catch (error) {
                if (error instanceof AxiosError) {
                    const errorMessage =
                        error.response?.data?.message ||
                        "Erro ao buscar técnico";
                    setError(errorMessage);
                }
                setError("Erro ao buscar técnico");

                console.error("Erro ao buscar técnico:", error);
                return null;
            }
        },
        [],
    );

    const updateTechAvailability = useCallback(
        async (techId: string, times: string[]): Promise<boolean> => {
            try {
                setError(null);
                setLoading(true);
                await api.put(`/tech-availability/availability/${techId}`, {
                    times,
                });
                setLoading(false);
                return true;
            } catch (error) {
                setLoading(false);
                if (error instanceof AxiosError) {
                    const errorMessage =
                        error.response?.data?.message ||
                        "Erro ao atualizar disponibilidade";
                    setError(errorMessage);
                } else {
                    setError("Erro ao atualizar disponibilidade");
                }
                console.error("Erro ao atualizar disponibilidade:", error);
                return false;
            }
        },
        [],
    );

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
        <TechContext.Provider
            value={{
                techs,
                loading,
                error,
                fetchTechById,
                updateTechAvailability,
            }}>
            {children}
        </TechContext.Provider>
    );
}
