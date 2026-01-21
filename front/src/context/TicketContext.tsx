import { createContext, useContext, useMemo, useState } from "react";
import { useTicket } from "../hooks/useTicket";
import { api } from "../services/api";

type TicketsContextType = {
    tickets: Ticket[];
    loading: boolean;
    error: string | null;

    setStatusById: (id: Ticket["id"], status: TicketStatus) => void;
    getTicketById: (id: Ticket["id"]) => Ticket | undefined;
    refetch: () => Promise<void>;

    additionalServicesByTicketId: Record<string, AdditionalService[]>;
    loadingAdditionalServicesByTicketId: Record<string, boolean>;

    getAdditionalServicesByTicketId: (
        ticketId: Ticket["id"],
    ) => Promise<AdditionalService[]>;
    clearAdditionalServicesCache: (ticketId?: Ticket["id"]) => void;
};

const TicketsContext = createContext<TicketsContextType | null>(null);

export function TicketsProvider({ children }: { children: React.ReactNode }) {
    const { tickets, setTickets, loading, error } = useTicket();

    const [refetchLoading, setRefetchLoading] = useState(false);
    const [refetchError, setRefetchError] = useState<string | null>(null);

    const [additionalServicesByTicketId, setAdditionalServicesByTicketId] =
        useState<Record<string, AdditionalService[]>>({});

    const [
        loadingAdditionalServicesByTicketId,
        setLoadingAdditionalServicesByTicketId,
    ] = useState<Record<string, boolean>>({});

    const setStatusById = (id: Ticket["id"], status: TicketStatus) => {
        setTickets((prev) =>
            prev.map((ticket) =>
                ticket.id === id ? { ...ticket, status } : ticket,
            ),
        );
    };

    const getTicketById = (id: Ticket["id"]) =>
        tickets.find((ticket) => ticket.id === id);

    const refetch = async () => {
        setRefetchLoading(true);
        setRefetchError(null);

        try {
            const { data } = await api.get("/tickets");

            const nextTickets = (data.tickets ?? data) as Ticket[];

            setTickets(nextTickets);
        } catch (e: any) {
            const msg =
                e?.response?.data?.message ||
                e?.message ||
                "Erro ao atualizar chamados";
            setRefetchError(msg);
        } finally {
            setRefetchLoading(false);
        }
    };

    const getAdditionalServicesByTicketId = async (ticketId: Ticket["id"]) => {
        const cached = additionalServicesByTicketId[ticketId];
        if (cached) return cached;

        setLoadingAdditionalServicesByTicketId((prev) => ({
            ...prev,
            [ticketId]: true,
        }));

        try {
            const { data } = await api.get(
                `/ticket-services/${ticketId}/additional-services`,
            );

            const services = data.additionalServices as AdditionalService[];

            setAdditionalServicesByTicketId((prev) => ({
                ...prev,
                [ticketId]: services,
            }));
            return services;
        } finally {
            setLoadingAdditionalServicesByTicketId((prev) => ({
                ...prev,
                [ticketId]: false,
            }));
        }
    };

    const clearAdditionalServicesCache = (ticketId?: Ticket["id"]) => {
        if (!ticketId) {
            setAdditionalServicesByTicketId({});
            return;
        }
        setAdditionalServicesByTicketId((prev) => {
            const copy = { ...prev };
            delete copy[ticketId];
            return copy;
        });
    };

    const combinedLoading = loading || refetchLoading;
    const combinedError = error || refetchError;

    const value = useMemo(
        () => ({
            tickets,
            loading: combinedLoading,
            error: combinedError,
            setStatusById,
            getTicketById,
            refetch,

            additionalServicesByTicketId,
            loadingAdditionalServicesByTicketId,
            getAdditionalServicesByTicketId,
            clearAdditionalServicesCache,
        }),
        [
            tickets,
            combinedLoading,
            combinedError,
            additionalServicesByTicketId,
            loadingAdditionalServicesByTicketId,
        ],
    );

    return (
        <TicketsContext.Provider value={value}>
            {children}
        </TicketsContext.Provider>
    );
}

export function useTickets() {
    const context = useContext(TicketsContext);
    if (!context)
        throw new Error("useTickets deve ser usado dentro de TicketsProvider");
    return context;
}
