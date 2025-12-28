import { useEffect, useState } from "react";
import { api } from "../services/api";
import { AxiosError } from "axios";

export function useTicket() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        async function fetchTickets() {
            const token = localStorage.getItem("@HelpDesk:session:token");

            if (!token) {
                if (mounted) {
                    setError("Token não encontrado");
                    setLoading(false);
                }
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const response = await api.get<{ tickets: Ticket[] }>(
                    "/tickets"
                );

                if (!mounted) return;

                setTickets(response.data.tickets);
            } catch (err) {
                if (!mounted) return;

                if (err instanceof AxiosError) {
                    const errorMessage =
                        err.response?.data?.message || "Erro ao buscar tickets";
                    setError(errorMessage);
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
    }, []);

    return { tickets, setTickets, loading, error };
}
