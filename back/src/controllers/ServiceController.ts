import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { z } from "zod";
import { prisma } from "@/database/prisma";

class ServiceController {
    async index(req: Request, res: Response, next: NextFunction) {
        const items = await prisma.service.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                createdAt: true,
                updatedAt: true,
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
            price: z
                .number({ message: "O preço é obrigatório" })
                .positive({ message: "Preço deve ser um número positivo" }),
        });

        const { name, price } = bodySchema.parse(req.body);

        const service = (await prisma.service.create({
            data: {
                name,
                price,
                description: "",
            },
        })) as Service;

        return res.status(201).json({ service });
    }

    async show(req: Request, res: Response, next: NextFunction) {
        const paramsSchema = z.object({
            id: z.uuid({ message: "ID inválido" }),
        });

        const { id } = paramsSchema.parse(req.params);

        const item = await prisma.service.findUnique({
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                createdAt: true,
                updatedAt: true,
            },
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
            name: z
                .string()
                .trim()
                .min(1, { message: "Nome é obrigatório" })
                .optional(),
            description: z.string().trim().optional(),
            price: z
                .number({ message: "O preço é obrigatório" })
                .positive({ message: "Preço deve ser um número positivo" })
                .optional(),
        });

        const { id } = paramsSchema.parse(req.params);
        const { name, description, price } = bodySchema.parse(req.body);

        const item = await prisma.service.findUnique({
            where: {
                id,
            },
        });

        if (!item) {
            throw new AppError("Item não encontrado", 404);
        }

        const updatedItem = (await prisma.service.update({
            where: {
                id,
            },
            data: {
                name,
                description,
                price,
            },
        })) as Service;

        return res.status(200).json({ prev: item, new: updatedItem });
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const paramsSchema = z.object({
            id: z.uuid({ message: "ID inválido" }),
        });

        const { id } = paramsSchema.parse(req.params);

        const itemExists = await prisma.service.findUnique({
            where: {
                id,
            },
        });

        if (!itemExists) {
            throw new AppError("Item não encontrado", 404);
        }

        if (!itemExists.isActive) {
            throw new AppError("Item já está inativo", 400);
        }

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

    async updateStatus(req: Request, res: Response, next: NextFunction) {
        const paramsSchema = z.object({
            id: z.uuid({ message: "ID inválido" }),
        });

        const bodySchema = z.object({
            isActive: z.boolean({ message: "Status é obrigatório" }),
        });

        const { id } = paramsSchema.parse(req.params);
        const { isActive } = bodySchema.parse(req.body);

        const item = await prisma.service.findUnique({
            where: {
                id,
            },
        });

        if (!item) {
            throw new AppError("Item não encontrado", 404);
        }

        const updatedItem = await prisma.service.update({
            where: {
                id,
            },
            data: {
                isActive,
            },
        });

        return res.status(200).json({ service: updatedItem });
    }
}

export { ServiceController };
