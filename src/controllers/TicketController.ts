import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { z } from "zod";
import { prisma } from "@/database/prisma";
import { title } from "process";

class TicketController {
    async index(req: Request, res: Response, next: NextFunction) {
        const tickets = await prisma.ticket.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                isActive: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
            where: {
                isActive: true,
            },
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
            status: z.enum(["open", "in_progress", "closed"]).optional(),
            userId: z.uuid({ message: "ID de usuário inválido" }),
			
        });

        return res.status(201).json({ message: "Create" });
    }

    async update(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({ message: "Update" });
    }

    async show(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({ message: "Show" });
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        return res.status(204).json({ message: "Delete" });
    }
}

export { TicketController };
