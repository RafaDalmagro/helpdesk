enum TicketStatus {
    OPEN = "open",
    IN_PROGRESS = "in_progress",
    CLOSED = "closed",
}

type Ticket = {
    id: string;
    title: string;
    description: string;
    status: TicketStatus;
    totalValue: number;
    isActive: boolean;
    deletedAt?: string;
    createdAt: string;
    updatedAt?: string;
    client: {
        id: string;
        name: string;
        email: string;
        role: string;
    };
    tech: {
        id: string;
        name: string;
        email: string;
        role: string;
    };
    ticketServices: TicketService[];
    category: {
        id: string;
        name: string;
    };
};

type TicketService = {
    service: {
        id: string;
        name: string;
        description: string;
        price: number;
    };
    addedBy: {
        id: string;
        name: string;
    };
};
