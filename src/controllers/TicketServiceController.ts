import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { z } from "zod";
import { prisma } from "@/database/prisma";

const user = {
    id: "42fb9458-7d4f-4d95-af72-effb0295dfb7",
};
class TicketServiceController {
    async index(req: Request, res: Response, next: NextFunction) {
        const ticketServices = await prisma.ticketService.findMany({});

        return res.status(200).json({ ticketServices });
    }

    async create(req: Request, res: Response, next: NextFunction) {
        // const {id} = req.params.user;

        const bodySchema = z.object({
            ticketId: z.uuid({ message: "ID do ticket inválido" }),
            serviceId: z.uuid({ message: "ID do serviço inválido" }),
        });

        const { ticketId, serviceId } = bodySchema.parse(req.body);

        const ticket = await prisma.ticket.findUnique({
            where: {
                id: ticketId,
                isActive: true,
            },
        });

        if (!ticket) {
            throw new AppError("Ticket não encontrado", 404);
        }

        const service = await prisma.service.findUnique({
            where: {
                id: serviceId,
                isActive: true,
            },
        });

        if (!service) {
            throw new AppError("Serviço não encontrado", 404);
        }

        const data: CreateTicketServiceData = {
            ticketId: ticket.id,
            serviceId: service.id,
            addedById: user.id,
            unitPrice: service.price,
            totalPrice: service.price,
        };

        if (!data.unitPrice || !data.totalPrice) {
            throw new AppError("Preços inválidos", 400);
        }

        const ticketServices = await prisma.ticketService.create({
            data: {
                ticket: { connect: { id: data.ticketId } },
                service: { connect: { id: data.serviceId } },
                addedBy: { connect: { id: data.addedById } },
                unitPrice: data.unitPrice,
                totalPrice: data.totalPrice,
            },
        });

        return res.status(201).json({ ticketServices });
    }
}

export { TicketServiceController };
