type TicketServices = {
    id: string;
    unitPrice: number;
    totalPrice: number;
    addedAt: Date;
    addedById: string;
    ticketId: string;
    serviceId: string;
};

type CreateTicketServiceData = {
    ticketId: string;
    serviceId: string;
    addedById: string;
    unitPrice?: number;
    totalPrice?: number;
};
