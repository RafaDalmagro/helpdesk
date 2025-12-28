import { createContext, useContext, useMemo } from "react";
import { useTicket } from "../hooks/useTicket";

type TicketsContextType = {
    tickets: Ticket[];
    loading: boolean;
    error: string | null;

    setStatusById: (id: Ticket["id"], status: TicketStatus) => void;
    getTicketById: (id: Ticket["id"]) => Ticket | undefined;
    refetch: () => Promise<void>;
};

const TicketsContext = createContext<TicketsContextType | null>(null);

export function TicketsProvider({ children }: { children: React.ReactNode }) {
    const { tickets, setTickets, loading, error } = useTicket();

    const setStatusById = (id: Ticket["id"], status: TicketStatus) => {
        setTickets((prev) =>
            prev.map((ticket) =>
                ticket.id === id ? { ...ticket, status } : ticket
            )
        );
    };

    const getTicketById = (id: Ticket["id"]) =>
        tickets.find((ticket) => ticket.id === id);

    const refetch = async () => {
        window.location.reload();
    };

    const value = useMemo(
        () => ({
            tickets,
            loading,
            error,
            setStatusById,
            getTicketById,
            refetch,
        }),
        [tickets, loading, error]
    );

    return (
        <TicketsContext.Provider value={value}>
            {children}
        </TicketsContext.Provider>
    );
}

export function useTickets() {
    const context = useContext(TicketsContext);

    if (!context) {
        throw new Error("useTickets deve ser usado dentro de TicketsProvider");
    }

    return context;
}
