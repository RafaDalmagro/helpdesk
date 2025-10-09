import { NextFunction, Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { authConfig } from "@/config/AuthConfig";
import { sign } from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "@/database/prisma";
import { compare } from "bcrypt";

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

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Usuário ou senha incorretos", 404);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({ role: user.role }, secret, {
            subject: user.id,
            expiresIn,
        });

        const { password: _, ...userWithoutPassword } = user;

        return res.status(200).json({
            token,
            userWithoutPassword,
        });
    }
}
export { SessionController };
