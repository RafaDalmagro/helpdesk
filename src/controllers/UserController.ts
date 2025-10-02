import { NextFunction, Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { z } from "zod";
import { prisma } from "@/database/prisma";

class UserController {
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

        const userAlreadyExists = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (userAlreadyExists) {
            throw new AppError("This email already exists");
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
            },
        });

        const { password: _, ...userWithoutPassword } = user;

        return res.status(201).json({ user: userWithoutPassword });
    }

    async index(req: Request, res: Response, next: NextFunction) {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                ticketsAsClient: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
                ticketsAsTech: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
            where: {
                isActive: true,
            },
        });

        if (!users) {
            throw new AppError("Usuários não encontrados", 404);
        }

        return res.status(200).json({ users });
    }

    async show(req: Request, res: Response, next: NextFunction) {
        const paramsSchema = z.object({
            id: z.uuid({ message: "Formato de ID de usuário inválido" }),
        });

        const { id } = paramsSchema.parse(req.params);
        let role = null;

        const userWithoutRole = await prisma.user.findUnique({
            where: {
                id,
            },
        });

        if (!userWithoutRole) {
            throw new AppError("Usuário não encontrado", 404);
        }
        console.log(userWithoutRole.role);

        if (userWithoutRole?.role === "client") {
            role = await prisma.user.findUnique({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    ticketsAsClient: {
                        select: {
                            id: true,
                            title: true,
                        },
                    },
                },
                where: { id },
            });
        } else if (userWithoutRole?.role === "tech") {
            role = await prisma.user.findUnique({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    ticketsAsTech: {
                        select: {
                            id: true,
                            title: true,
                        },
                    },
                },
                where: { id },
            });
        } else if (userWithoutRole?.role === "admin") {
            role = await prisma.user.findUnique({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true,
                },
                where: { id },
            });
        }

        if (!role) {
            throw new AppError("Usuário não encontrado", 404);
        }

        return res.status(200).json({ user: role });
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const userSchema = z.object({
            name: z
                .string()
                .min(2, { message: "O nome deve ter no mínimo 2 caracteres" })
                .optional(),
            email: z.email({ message: "Formato de email inválido" }).optional(),
            password: z
                .string()
                .min(6, { message: "A senha deve ter no mínimo 6 caracteres" })
                .optional(),
            role: z.enum(["admin", "client", "tech"]).optional(),
        });

        const paramsSchema = z.object({
            id: z.uuid({ message: "Formato de ID de usuário inválido" }),
        });

        const { id } = paramsSchema.parse(req.params);

        const { name, email, password, role } = userSchema.parse(req.body);

        const prevUser = await prisma.user.findUnique({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
            where: {
                id,
            },
        });

        if (!prevUser) {
            throw new AppError("Usuário não encontrado", 404);
        }

        const updatedUser = await prisma.user.update({
            where: {
                id,
            },
            data: {
                name,
                email,
                role,
                password,
            },
        });

        const { password: _, ...updatedUserWithoutPassword } = updatedUser;

        return res.status(200).json({
            prevUser,
            updatedUser: updatedUserWithoutPassword,
        });
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const paramsSchema = z.object({
            id: z.uuid({ message: "Formato de ID de usuário inválido" }),
        });

        const { id } = paramsSchema.parse(req.params);

        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });

        if (!user) {
            throw new AppError("Usuário não encontrado", 404);
        }

        if (!user.isActive) {
            throw new AppError("Usuário já está inativo", 400);
        }
        const when = new Date();

        await prisma.$transaction([
            prisma.ticket.updateMany({
                where: { id, isActive: true },
                data: { isActive: false, deletedAt: when },
            }),
            prisma.user.update({
                where: { id },
                data: { isActive: false, deletedAt: when },
            }),
        ]);

        return res.status(204).json();
    }
}

export { UserController };
