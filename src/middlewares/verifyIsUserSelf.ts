import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { z } from "zod";

export function verifyUserSelf() {
    return (req: Request, res: Response, next: NextFunction) => {
        const paramSchema = z.object({
            id: z.uuid({ message: "ID de usuário inválido" }),
        });
        const { id } = paramSchema.parse(req.params);

        const user = req.user;

        if (!user) {
            throw new AppError("Não autenticado", 401);
        }

        const isSelf = user.id === id;
        const isAdmin = user.role === "admin";

        if (!isSelf && !isAdmin) {
            throw new AppError(
                "Você não tem permissão para alterar dados de outros usuários",
                401
            );
        }

        return next();
    };
}
