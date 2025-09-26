import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { z } from "zod";
import { prisma } from "@/database/prisma";

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
