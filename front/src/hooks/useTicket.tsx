import { useEffect, useState } from "react";
import { api } from "../services/api";
import { AxiosError } from "axios";
import { useAuth } from "./useAuth";

export function useTicket() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { session } = useAuth();

    useEffect(() => {
        let mounted = true;

        async function fetchTickets() {
            if (!session?.token) {
                if (mounted) {
                    setError("Usuário não autenticado");
                    setLoading(false);
                }
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const response = await api.get<{ tickets: Ticket[] }>(
                    "/tickets",
                );

                if (!mounted) return;

                setTickets(response.data.tickets);
            } catch (err) {
                if (!mounted) return;

                if (err instanceof AxiosError) {
                    const errorMessage =
                        err.response?.data?.message || "Erro ao buscar tickets";
                    setError(errorMessage);

                    if (
                        err.response?.status === 401 ||
                        err.response?.status === 403
                    ) {
                        localStorage.removeItem("@HelpDesk:session:user");
                        localStorage.removeItem("@HelpDesk:session:token");
                        window.location.assign("/");
                        return;
                    }
                } else {
                    setError("Erro ao buscar tickets");
                }

                console.error("Erro ao buscar tickets:", err);
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        }

        fetchTickets();

        return () => {
            mounted = false;
        };
    }, [session]);

    return { tickets, setTickets, loading, error };
}
