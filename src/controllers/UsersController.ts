import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { prisma } from "@/database/prisma";

class UsersController {
    async index(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({ message: "Index" });
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const userSchema = z.object({
            name: z
                .string()
                .min(2, { message: "O nome deve ter no mínimo 2 caracteres" }),
            email: z.email(),
            password: z
                .string()
                .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
        });

        const { name, email, password } = userSchema.parse(req.body);

        return res.status(201).json({ name, email, password });
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

export { UsersController };
