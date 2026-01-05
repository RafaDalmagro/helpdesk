import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { z } from "zod";
import { prisma } from "@/database/prisma";

class CategoryController {
    async index(req: Request, res: Response, next: NextFunction) {
        const categories = await prisma.category.findMany({
            select: {
                id: true,
                name: true,
                description: true,
            },
            where: {
                isActive: true,
            },
        });

        if (!categories) {
            throw new AppError("Usuários não encontrados", 404);
        }

        return res.status(200).json({ categories });
    }

    async create(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json({ message: "Create" });
    }

    async update(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({ message: "Update" });
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        return res.status(204).json({ message: "Delete" });
    }
}

export { CategoryController };
