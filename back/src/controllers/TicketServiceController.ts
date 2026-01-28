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
        if (!req.user) {
            throw new AppError("Usuário não autenticado", 401);
        }

        const userId = req.user.id;

        if (req.user.role === "client") {
            throw new AppError(
                "Apenas administradores e técnicos podem adicionar serviços ao ticket",
                401,
            );
        }

        const bodySchema = z.object({
            ticketId: z.uuid({ message: "ID do ticket inválido" }),
            serviceId: z.uuid({ message: "ID do serviço inválido" }),
        });

        const { ticketId, serviceId } = bodySchema.parse(req.body);

        const ticket = await prisma.ticket.findUnique({
            where: { id: ticketId, isActive: true },
        });

        if (!ticket) {
            throw new AppError("Ticket não encontrado", 404);
        }

        const service = await prisma.service.findUnique({
            where: { id: serviceId, isActive: true },
        });

        if (!service) {
            throw new AppError("Serviço não encontrado", 404);
        }

        if (service.price == null) {
            throw new AppError("Preço do serviço inválido", 400);
        }

        const result = await prisma.$transaction(async (tx) => {
            const ticketService = await tx.ticketService.create({
                data: {
                    ticketId: ticket.id,
                    serviceId: service.id,
                    addedById: userId,
                    unitPrice: service.price,
                    totalPrice: service.price,
                    type: "additional",
                },
                include: {
                    service: true,
                    addedBy: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            });

            const updatedTicket = await tx.ticket.update({
                where: { id: ticket.id },
                data: {
                    totalValue: {
                        increment: service.price,
                    },
                },
                select: {
                    id: true,
                    totalValue: true,
                },
            });

            return { ticketService, updatedTicket };
        });

        return res.status(201).json(result);
    }

    async showAdditionalServices(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        const paramSchema = z.object({
            id: z.uuid({ message: "ID de Ticket inválido" }),
        });

        const { id } = paramSchema.parse(req.params);

        const additionalServices = await prisma.ticketService.findMany({
            where: {
                ticketId: id,
                type: "additional",
            },
            include: {
                service: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        price: true,
                    },
                },
            },
            orderBy: {
                addedAt: "asc",
            },
        });

        if (additionalServices.length === 0) {
            return res.status(200).json({
                message: "Chamado não possui serviços adicionais",
                data: [],
            });
        }

        return res.status(200).json({ additionalServices });
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        if (!req.user) {
            throw new AppError("Usuário não autenticado", 401);
        }

        if (req.user.role === "client") {
            throw new AppError(
                "Apenas administradores e técnicos podem remover serviços do ticket",
                401,
            );
        }

        const paramSchema = z.object({
            id: z.uuid({ message: "ID do serviço do ticket inválido" }),
        });

        const { id } = paramSchema.parse(req.params);

        const ticketService = await prisma.ticketService.findUnique({
            where: { id },
        });

        if (!ticketService) {
            throw new AppError("Serviço do ticket não encontrado", 404);
        }

        if (ticketService.type !== "additional") {
            throw new AppError(
                "Apenas serviços adicionais podem ser removidos",
                400,
            );
        }

        await prisma.$transaction(async (tx) => {
            await tx.ticketService.delete({
                where: { id },
            });

            await tx.ticket.update({
                where: { id: ticketService.ticketId },
                data: {
                    totalValue: {
                        decrement: ticketService.totalPrice,
                    },
                },
            });
        });

        return res.status(204).send();
    }
}

export { TicketServiceController };
