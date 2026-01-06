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
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date | null;
    techId: string | null;
    clientId: string;
};
