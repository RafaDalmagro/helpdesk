import { authConfig } from "@/configs/AuthConfig";
import { AppError } from "@/utils/AppError";
import { NextFunction, Request, Response } from "express";
import { request } from "http";
import { verify } from "jsonwebtoken";

interface TokenPayload {
    sub: string;
    role: string;
}

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new AppError("JWT token não encontrado", 401);
        }

        const [, token] = authHeader.split(" ");

        const { role, sub: user_id } = verify(
            token,
            authConfig.jwt.secret
        ) as TokenPayload;

        req.user = {
            id: user_id,
            role,
        };

        return next();
    } catch (error) {
        throw new AppError("JWT token inválido", 401);
    }
}

export { ensureAuthenticated };
