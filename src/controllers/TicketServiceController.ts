import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { z } from "zod";
import { prisma } from "@/database/prisma";

class TicketServiceController {
    async index(req: Request, res: Response, next: NextFunction) {
        const ticketServices = await prisma.ticketService.findMany({});

        return res.status(200).json({ ticketServices });
    }

    async create(req: Request, res: Response, next: NextFunction) {
        if (req.user?.role !== "admin") {
            throw new AppError(
                "Apenas administradores podem adicionar serviços ao ticket",
                401
            );
        }

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
            addedById: req.user.id,
            unitPrice: service.price,
            totalPrice: service.price,
        };

        if (!data.unitPrice || !data.totalPrice) {
            throw new AppError("Preços inválidos", 400);
        }

        const ticketServices = await prisma.ticketService.create({
            data: {
                ticketId: data.ticketId,
                serviceId: data.serviceId,
                addedById: data.addedById,
                unitPrice: data.unitPrice,
                totalPrice: data.totalPrice,
            },
        });

        return res.status(201).json({ ticketServices });
    }
}

export { TicketServiceController };
