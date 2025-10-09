import { NextFunction, Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { z } from "zod";
import { prisma } from "@/database/prisma";

class SessionController {
    async create(req: Request, res: Response, next: NextFunction) {
        const bodySchema = z.object({
            email: z.email({ message: "E-mail inválido" }),
            password: z.string({ message: "Senha inválida" }).min(6, {
                message: "A senha deve ter no mínimo 6 caracteres",
            }),
        });

        const { email, password } = bodySchema.parse(req.body);

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new AppError("Usuário ou senha incorretos", 404);
        }

        if (user.password !== password) {
            throw new AppError("Usuário ou senha incorretos", 401);
        }

        return res.status(200).json({ email, password });
    }
}
export { SessionController };
