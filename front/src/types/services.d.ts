enum ServiceType {
    ADDITIONAL = "additional",
    STANDARD = "standard",
}

type Service = {
    id: string;
    name: string;
    description: string;
    price: number;
    isActive: boolean;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date | null;
};

type AdditionalService = {
    id: string;
    quantity: number;
    type: ServiceType;
    unitPrice: number;
    totalPrice: number;
    addedAt: string;
    addedById: string;
    ticketId: string;
    serviceId: string;
    service: {
        id: string;
        name: string;
        description: string;
        price: number;
    };
};
