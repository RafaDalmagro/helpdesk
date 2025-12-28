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
    deletedAt?: Date;
    createdAt: Date;
    updatedAt?: Date;
    tech: {
        id: string;
        name: string;
    };
    client: {
        id: string;
        name: string;
    };
    serviceId: string;
};
