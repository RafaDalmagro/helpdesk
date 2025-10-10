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
                client: { select: { id: true, name: true } },
                tech: { select: { id: true, name: true } },
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
        });

        const { title, description, techId, clientId } = bodySchema.parse(
            req.body
        );

        const ticket = (await prisma.ticket.create({
            data: {
                title,
                description,
                techId,
                clientId: clientId || req.user!.id,
            },
        })) as Ticket;

        if (!ticket) {
            throw new AppError("Não foi possível criar o Ticket", 400);
        }

        return res.status(201).json({ ticket });
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
            const prevTicket = await prisma.ticket.findUnique({
                where: { id },
            });

            if (prevTicket?.clientId !== user.id) {
                throw new AppError("Esse ticket não pertence ao cliente", 401);
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

        if (user.role === "tech") {
            const prevTicket = await prisma.ticket.findUnique({
                where: { id },
            });

            if (prevTicket?.techId !== user.id) {
                throw new AppError("Esse ticket não pertence ao técnico", 401);
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
    }

    async show(req: Request, res: Response, next: NextFunction) {
        const paramSchema = z.object({
            id: z.uuid({ message: "ID de Ticket inválido" }),
        });

        const { id } = paramSchema.parse(req.params);

        const ticket = await prisma.ticket.findUnique({
            where: { id },
        });

        return res.status(200).json({ ticket });
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

        const updatedTicket = await prisma.ticket.update({
            where: { id },
            data: { status },
        });

        return res
            .status(200)
            .json({ previous: ticket, updated: updatedTicket });
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const paramSchema = z.object({
            id: z.uuid({ message: "ID de Ticket inválido" }),
        });

        const { id } = paramSchema.parse(req.params);

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
