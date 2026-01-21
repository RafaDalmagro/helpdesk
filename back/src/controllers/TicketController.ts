import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { z } from "zod";
import { prisma } from "@/database/prisma";

class TicketController {
    async index(req: Request, res: Response, next: NextFunction) {
        const actor = req.user!;

        let where: any = { isActive: true };

        if (actor.role === "client") {
            where = { ...where, clientId: actor.id };
        } else if (actor.role === "tech") {
            where = { ...where, techId: actor.id };
        }

        const tickets = await prisma.ticket.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                status: true,
                totalValue: true,
                createdAt: true,
                updatedAt: true,
                client: {
                    select: { id: true, name: true, email: true, role: true },
                },
                tech: {
                    select: { id: true, name: true, email: true, role: true },
                },
                ticketServices: {
                    select: {
                        service: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                            },
                        },
                        addedBy: { select: { id: true, name: true } },
                    },
                },
                category: {
                    select: { id: true, name: true },
                },
            },
            where,
            orderBy: { createdAt: "desc" },
        });

        if (!tickets) {
            throw new AppError("Não foi possível encontrar os Tickets", 404);
        }

        return res.status(200).json({ tickets });
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const bodySchema = z.object({
            title: z.string().min(3, {
                message: "O título deve ter no mínimo 3 caracteres",
            }),
            description: z.string().min(10, {
                message: "A descrição deve ter no mínimo 10 caracteres",
            }),
            techId: z.uuid({ message: "ID de técnico inválido" }),
            clientId: z.uuid({ message: "ID de cliente inválido" }).optional(),
            serviceId: z.uuid({ message: "ID de serviço inválido" }).optional(),
            categoryId: z.uuid({ message: "ID da categoria inválido" }),
        });

        const { title, description, techId, clientId, serviceId, categoryId } =
            bodySchema.parse(req.body);

        try {
            const newTicket = await prisma.$transaction(async (tx) => {
                const category = await tx.category.findFirst({
                    where: { id: categoryId, isActive: true },
                });
                if (!category) {
                    throw new AppError(
                        "Categoria não encontrada ou inativa",
                        404,
                    );
                }

                const tech = await tx.user.findFirst({
                    where: { id: techId, role: "tech", isActive: true },
                });
                if (!tech) {
                    throw new AppError(
                        "Técnico não encontrado ou inativo",
                        404,
                    );
                }

                const ticket = await tx.ticket.create({
                    data: {
                        title,
                        description,
                        techId,
                        clientId: clientId ?? req.user!.id,
                        categoryId,
                    },
                    include: {
                        category: true,
                        tech: { select: { id: true, name: true, email: true } },
                        client: {
                            select: { id: true, name: true, email: true },
                        },
                    },
                });

                const service = await tx.service.findFirst({
                    where: { id: serviceId, isActive: true },
                    select: { id: true, price: true, name: true },
                });
                
                if (!service) {
                    throw new AppError(
                        "Serviço não encontrado ou inativo",
                        404,
                    );
                }

                await tx.ticketService.create({
                    data: {
                        ticketId: ticket.id,
                        serviceId: service.id,
                        addedById: req.user!.id,
                        unitPrice: service.price,
                        totalPrice: service.price,
                    },
                });

                const sum = await tx.ticketService.aggregate({
                    where: { ticketId: ticket.id },
                    _sum: { totalPrice: true },
                });

                const updatedTicket = await tx.ticket.update({
                    where: { id: ticket.id },
                    data: {
                        totalValue: sum._sum.totalPrice ?? 0,
                    },
                    include: {
                        category: true,
                        tech: { select: { id: true, name: true, email: true } },
                        client: {
                            select: { id: true, name: true, email: true },
                        },
                        ticketServices: {
                            include: {
                                service: true,
                            },
                        },
                    },
                });

                return updatedTicket;
            });

            return res.status(201).json(newTicket);
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Não foi possível criar o Ticket", 400);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const paramSchema = z.object({
            id: z.uuid({ message: "ID de Ticket inválido" }),
        });

        const { id } = paramSchema.parse(req.params);

        const bodySchema = z.object({
            title: z.string().min(3, {
                message: "O título deve ter no mínimo 3 caracteres",
            }),
            description: z.string().min(10, {
                message: "A descrição deve ter no mínimo 10 caracteres",
            }),
            techId: z.uuid({ message: "ID de técnico inválido" }).optional(),
        });

        const { title, description, techId } = bodySchema.parse(req.body);

        const user = req.user as { id: string; role: string };

        if (user.role === "client") {
            throw new AppError(
                "Você não tem permissão para atualizar este ticket",
                401,
            );
        }

        if (user.role === "tech") {
            const prevTicket = await prisma.ticket.findUnique({
                where: { id },
            });

            if (prevTicket?.techId !== user.id) {
                throw new AppError(
                    "Você não é o técnico responsável por este ticket",
                    401,
                );
            }

            const updatedTicket = (await prisma.ticket.update({
                where: { id },
                data: {
                    title,
                    description,
                    techId,
                },
            })) as Ticket;

            if (!updatedTicket) {
                throw new AppError("Não foi possível atualizar o Ticket", 400);
            }

            return res.status(200).json({ prevTicket, updatedTicket });
        }

        const prevTicket = await prisma.ticket.findUnique({
            where: { id },
        });

        const updatedTicket = (await prisma.ticket.update({
            where: { id },
            data: {
                title,
                description,
                techId,
            },
        })) as Ticket;

        if (!updatedTicket) {
            throw new AppError("Não foi possível atualizar o Ticket", 400);
        }

        return res.status(200).json({ prevTicket, updatedTicket });
    }

    async show(req: Request, res: Response, next: NextFunction) {
        const paramSchema = z.object({
            id: z.uuid({ message: "ID de Ticket inválido" }),
        });

        const { id } = paramSchema.parse(req.params);

        const ticket = await prisma.ticket.findUnique({
            where: { id },
            select: {
                id: true,
                title: true,
                description: true,
                createdAt: true,
                updatedAt: true,
                status: true,
                totalValue: true,
                client: {
                    select: { id: true, name: true, email: true, role: true },
                },
                tech: {
                    select: { id: true, name: true, email: true, role: true },
                },
                ticketServices: {
                    select: {
                        service: {
                            select: {
                                name: true,
                                description: true,
                                price: true,
                            },
                        },
                        addedBy: { select: { id: true, name: true } },
                    },
                },
                category: {
                    select: { id: true, name: true },
                },
            },
        });

        return res.status(200).json({ ticket });
    }

    async showTicketsByUser(req: Request, res: Response, next: NextFunction) {
        const paramSchema = z.object({
            userId: z.uuid({ message: "ID de usuário inválido" }),
        });

        const { userId } = paramSchema.parse(req.params);

        if (req.user?.role === "client") {
            const tickets = await prisma.ticket.findMany({
                where: { clientId: req.user.id },
            });
            return res.status(200).json({ tickets });
        }

        const tickets = await prisma.ticket.findMany({
            where: { techId: userId },
        });

        return res.status(200).json({ tickets });
    }

    async updateStatus(req: Request, res: Response, next: NextFunction) {
        const paramSchema = z.object({
            id: z.uuid({ message: "ID de Ticket inválido" }),
        });

        const { id } = paramSchema.parse(req.params);

        const bodySchema = z.object({
            status: z.enum(["open", "in_progress", "closed"], {
                message: "Status inválido",
            }),
        });
        const { status } = bodySchema.parse(req.body);

        const ticket = await prisma.ticket.findUnique({
            where: { id },
        });

        if (!ticket) {
            throw new AppError("Ticket não encontrado", 404);
        }

        await prisma.ticket.update({
            where: { id },
            data: { status },
        });

        return res.status(200).json();
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const paramSchema = z.object({
            id: z.uuid({ message: "ID de Ticket inválido" }),
        });

        const { id } = paramSchema.parse(req.params);

        const user = req.user as { id: string; role: string };

        if (user.role === "client") {
            throw new AppError(
                "Você não tem permissão para deletar este ticket",
                401,
            );
        }

        const ticket = await prisma.ticket.delete({
            where: { id },
        });

        if (!ticket) {
            throw new AppError("Não foi possível deletar o Ticket", 400);
        }

        return res.status(204).json();
    }
}

export { TicketController };
