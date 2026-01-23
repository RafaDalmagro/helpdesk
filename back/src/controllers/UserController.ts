import { NextFunction, Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { z } from "zod";
import { prisma } from "@/database/prisma";
import { hash } from "bcrypt";

class UserController {
    async index(req: Request, res: Response, next: NextFunction) {
        const { role } = req.query;

        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                filename: true,
                createdAt: true,
                ticketsAsClient: {
                    select: { id: true, title: true },
                },
                ticketsAsTech: {
                    select: { id: true, title: true },
                },
                TechAvailability: {
                    select: {
                        time: true,
                        weekday: true,
                    },
                },
            },
            where: {
                isActive: true,
                ...(role &&
                (role === "admin" || role === "client" || role === "tech")
                    ? { role: role as "admin" | "client" | "tech" }
                    : {}),
            },
        });

        if (!users) {
            throw new AppError("Usuários não encontrados", 404);
        }

        const currentWeekday = new Date().getDay();

        // Filtrar tickets e disponibilidade baseado na role de cada usuário
        const filteredUsers = users.map((user) => {
            const {
                ticketsAsClient,
                ticketsAsTech,
                TechAvailability,
                ...userData
            } = user;

            const filteredAvailability = TechAvailability?.filter(
                (availability) => availability.weekday === currentWeekday,
            );

            if (user.role === "client") {
                return {
                    ...userData,
                    ticketsAsClient,
                    ...(filteredAvailability &&
                        filteredAvailability.length > 0 && {
                            TechAvailability: filteredAvailability,
                        }),
                };
            } else if (user.role === "tech") {
                return {
                    ...userData,
                    ticketsAsTech,
                    ...(filteredAvailability &&
                        filteredAvailability.length > 0 && {
                            TechAvailability: filteredAvailability,
                        }),
                };
            } else {
                return {
                    ...userData,
                    ...(filteredAvailability &&
                        filteredAvailability.length > 0 && {
                            TechAvailability: filteredAvailability,
                        }),
                };
            }
        });

        return res.status(200).json({ users: filteredUsers });
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
            role: z.enum(["admin", "client", "tech"]).optional(),
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

        const hashedPassword = await hash(password, 8);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        const { password: _, ...userWithoutPassword } = user;

        return res.status(201).json({ user: userWithoutPassword });
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
            role: z.enum(["admin", "client", "tech"]).optional(),
            password: z
                .string()
                .min(6, { message: "A senha deve ter no mínimo 6 caracteres" })
                .optional(),
        });

        const paramsSchema = z.object({
            id: z.uuid({ message: "Formato de ID de usuário inválido" }),
        });

        const { id } = paramsSchema.parse(req.params);
        const { name, email, role, password } = userSchema.parse(req.body);

        if (req.user?.id !== id && req.user?.role !== "admin") {
            throw new AppError(
                "Você não está autorizado a atualizar este usuário",
                401,
            );
        }

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

        let dataToUpdate: any = {};
        if (name) dataToUpdate.name = name;
        if (email) dataToUpdate.email = email;
        if (role) dataToUpdate.role = role;
        if (password) {
            const hashedPassword = await hash(password, 8);
            dataToUpdate.password = hashedPassword;
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: dataToUpdate,
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

    async updatePassword(req: Request, res: Response, next: NextFunction) {
        const paramsSchema = z.object({
            id: z.uuid({ message: "Formato de ID de usuário inválido" }),
        });

        const { id } = paramsSchema.parse(req.params);

        const bodySchema = z.object({
            password: z
                .string()
                .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
            confirmPassword: z.string().min(6).optional(),
            oldPassword: z.string().min(6, {
                message:
                    "A senha antiga é obrigatória e deve ter no mínimo 6 caracteres",
            }),
        });

        const userLoged = req.user as { id: string; role: string };

        if (userLoged.id !== id && userLoged.role !== "admin") {
            throw new AppError(
                "Você não tem permissão para alterar esta senha",
                403,
            );
        }
        const { password, confirmPassword, oldPassword } = bodySchema.parse(
            req.body,
        );

        if (confirmPassword && password !== confirmPassword) {
            throw new AppError("As senhas não conferem", 400);
        }

        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            throw new AppError("Usuário não encontrado", 404);
        }

        if (user.firstLogin === true) {
            throw new AppError(
                "A senha só pode ser alterada após o primeiro acesso",
                403,
            );
        }

        const bcrypt = await import("bcrypt");
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            throw new AppError("A senha antiga está incorreta", 400);
        }

        const hashedPassword = await hash(password, 8);

        await prisma.user.update({
            where: { id },
            data: { password: hashedPassword },
        });

        return res
            .status(200)
            .json({ message: "Senha atualizada com sucesso" });
    }

    async updateFileName(req: Request, res: Response, next: NextFunction) {
        const paramsSchema = z.object({
            id: z.uuid({ message: "Formato de ID de usuário inválido" }),
        });
        const bodySchema = z.object({
            filename: z.string().nullable(),
        });

        const { id } = paramsSchema.parse(req.params);
        const { filename } = bodySchema.parse(req.body);

        const userLoged = req.user as { id: string; role: string };

        if (userLoged.id !== id && userLoged.role !== "admin") {
            throw new AppError(
                "Você não tem permissão para essa alteração.",
                403,
            );
        }

        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new AppError("Usuário não encontrado", 404);
        }

        await prisma.user.update({
            where: { id },
            data: { filename },
        });

        return res.status(200).json({
            message: "Imagem de perfil atualizada com sucesso",
            filename,
        });
    }
}

export { UserController };
