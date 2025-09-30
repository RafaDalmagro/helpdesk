import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { z } from "zod";
import { prisma } from "@/database/prisma";

class ServiceController {
    async index(req: Request, res: Response, next: NextFunction) {
        const items = await prisma.service.findMany({
            select: {
                id: true,
            },
            where: {
                isActive: true,
            },
        });

        if (!items) {
            throw new AppError("Não foi possível encontrar os Items", 404);
        }

        return res.status(200).json({ items });
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const bodySchema = z.object({
            name: z.string().trim().min(1, { message: "Nome é obrigatório" }),
            description: z
                .string()
                .trim()
                .min(1, { message: "Descrição é obrigatória" }),
            price: z
                .number({ message: "O preço é obrigatório" })
                .positive({ message: "Preço deve ser um número positivo" }),
            ticketId: z.uuid({ message: "ID do ticket inválido" }),
        });

        const data = bodySchema.parse(req.body);

        const item = await prisma.service.create({
            data,
        });

        return res.status(201).json({ item });
    }

    async show(req: Request, res: Response, next: NextFunction) {
        const paramsSchema = z.object({
            id: z.uuid({ message: "ID inválido" }),
        });

        const { id } = paramsSchema.parse(req.params);

        const item = await prisma.service.findUnique({
            where: {
                id,
                isActive: true,
            },
        });

        if (!item) {
            throw new AppError("Item não encontrado", 404);
        }

        return res.status(200).json({ item });
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const paramsSchema = z.object({
            id: z.uuid({ message: "ID inválido" }),
        });

        const bodySchema = z.object({
            // Add validation schema here (optional fields)
        });

        const { id } = paramsSchema.parse(req.params);
        const updateData = bodySchema.parse(req.body);

        const itemExists = await prisma.service.findUnique({
            where: {
                id,
                isActive: true,
            },
        });

        if (!itemExists) {
            throw new AppError("Item não encontrado", 404);
        }

        const item = await prisma.service.update({
            where: {
                id,
            },
            data: {
                ...updateData,
                updatedAt: new Date(),
            },
        });

        return res.status(200).json({ item });
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const paramsSchema = z.object({
            id: z.uuid({ message: "ID inválido" }),
        });

        const { id } = paramsSchema.parse(req.params);

        const itemExists = await prisma.service.findUnique({
            where: {
                id,
                isActive: true,
            },
        });

        if (!itemExists) {
            throw new AppError("Item não encontrado", 404);
        }

        // Soft delete
        await prisma.service.update({
            where: {
                id,
            },
            data: {
                isActive: false,
                deletedAt: new Date(),
            },
        });

        return res.status(204).send();
    }
}

export { ServiceController };
