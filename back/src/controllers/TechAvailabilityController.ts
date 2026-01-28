import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import {
    BUSINESS_WEEKDAYS,
    BUSINESS_TIMES,
    TECH1_TIMES,
    TECH2_TIMES,
    TECH3_TIMES,
} from "@/utils/availability";
import { prisma } from "@/database/prisma";

class TechAvailabilityController {
    async index(req: Request, res: Response, next: NextFunction) {
        const now = new Date();
        const weekday = now.getDay();
        const hour = now.getHours();
        const time = `${now.getHours().toString().padStart(2, "0")}:00`;

        if (weekday === 0 || weekday === 6) {
            return res.status(200).json({ techs: [], weekday, time });
        }

        const techs = await prisma.user.findMany({
            select: { id: true, name: true },
            where: {
                role: "tech",
                isActive: true,
                TechAvailability: {
                    some: {
                        weekday,
                        time,
                    },
                },
            },
        });

        return res.status(200).json({ techs });
    }

    async show(req: Request, res: Response, next: NextFunction) {
        const paramsSchema = z.object({
            techId: z.uuid({ message: "ID de técnico inválido" }),
        });

        const { techId } = paramsSchema.parse(req.params);

        const availabilities = await prisma.techAvailability.findMany({
            where: { techId },
            orderBy: [{ weekday: "asc" }, { time: "asc" }],
        });

        return res.status(200).json({ availabilities });
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const paramsSchema = z.object({
                techId: z.uuid({ message: "ID de técnico inválido" }),
            });
            const bodySchema = z.object({
                time: z.enum(["1", "2", "3"], {
                    message: "Informe 1, 2 ou 3 para o grupo de horários",
                }),
            });
            const { techId } = paramsSchema.parse(req.params);
            const { time } = bodySchema.parse(req.body);

            const tech = await prisma.user.findUnique({
                where: { id: techId },
                select: { id: true, role: true },
            });
            if (!tech)
                return res
                    .status(404)
                    .json({ message: "Técnico não encontrado" });
            if (tech.role !== "tech")
                return res
                    .status(400)
                    .json({ message: "Usuário informado não é um técnico" });

            const selectedTimes =
                time === "1"
                    ? TECH1_TIMES
                    : time === "2"
                      ? TECH2_TIMES
                      : time === "3"
                        ? TECH3_TIMES
                        : null;

            if (!selectedTimes) {
                return res
                    .status(400)
                    .json({ message: "Grupo de horários inválido" });
            }

            // verifica se os horários selecionados já correspondem ao que o técnico possui
            const weekdays = Array.from(BUSINESS_WEEKDAYS);
            const existing = await prisma.techAvailability.findMany({
                where: { techId, weekday: { in: weekdays } },
                select: { weekday: true, time: true },
            });

            const existingMap = new Map<number, Set<string>>();
            for (const r of existing) {
                if (!existingMap.has(r.weekday))
                    existingMap.set(r.weekday, new Set());
                existingMap.get(r.weekday)!.add(r.time);
            }

            const selectedSet = new Set(selectedTimes);

            let identical = true;
            for (const weekday of weekdays) {
                const set = existingMap.get(weekday) ?? new Set();
                if (set.size !== selectedSet.size) {
                    identical = false;
                    break;
                }
                for (const t of selectedSet) {
                    if (!set.has(t)) {
                        identical = false;
                        break;
                    }
                }
                if (!identical) break;
            }

            if (identical) {
                return res.status(400).json({
                    message:
                        "Horário selecionado já é o atual do técnico. Não é possível prosseguir.",
                });
            }

            // para cada array de dias úteis, cria os registros de disponibilidade
            const dataToCreate = weekdays.flatMap((weekday) =>
                selectedTimes.map((t) => ({ techId, weekday, time: t })),
            );

            await prisma.techAvailability.createMany({
                data: dataToCreate,
                skipDuplicates: true,
            });

            return res.status(201).json({
                message:
                    "Disponibilidades criadas com sucesso para segunda a sexta",
            });
        } catch (err: any) {
            if (err instanceof ZodError) {
                return res.status(400).json({
                    message: "Erro de validação",
                    issues: err.issues.map((i) => ({
                        path: i.path,
                        message: i.message,
                    })),
                });
            }
            if (err?.code === "P2002") {
                return res.status(409).json({
                    message:
                        "Alguns horários já estavam cadastrados para este técnico (seg-sex)",
                });
            }
            next(err);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const paramsSchema = z.object({
                techId: z.uuid({ message: "ID de técnico inválido" }),
            });

            const bodySchema = z.object({
                times: z
                    .array(z.string(), {
                        message: "Os horários devem ser um array de strings",
                    })
                    .min(1, { message: "Informe pelo menos um horário" })
                    .refine(
                        (times) =>
                            times.every((time) =>
                                BUSINESS_TIMES.includes(time),
                            ),
                        {
                            message: `Horários inválidos. Horários permitidos: ${BUSINESS_TIMES.join(", ")}`,
                        },
                    ),
            });

            const { techId } = paramsSchema.parse(req.params);
            const { times } = bodySchema.parse(req.body);

            const tech = await prisma.user.findUnique({
                where: { id: techId },
                select: { id: true, role: true },
            });

            if (!tech)
                return res
                    .status(404)
                    .json({ message: "Técnico não encontrado" });
            if (tech.role !== "tech")
                return res
                    .status(400)
                    .json({ message: "Usuário informado não é um técnico" });

            const weekdays = Array.from(BUSINESS_WEEKDAYS);

            const existing = await prisma.techAvailability.findMany({
                where: { techId, weekday: { in: weekdays } },
                select: { weekday: true, time: true },
            });

            const existingMap = new Map<number, Set<string>>();

            for (const r of existing) {
                if (!existingMap.has(r.weekday))
                    existingMap.set(r.weekday, new Set());
                existingMap.get(r.weekday)!.add(r.time);
            }

            const selectedSet = new Set(times);

            let identical = true;
            for (const weekday of weekdays) {
                const set = existingMap.get(weekday) ?? new Set();
                if (set.size !== selectedSet.size) {
                    identical = false;
                    break;
                }
                for (const t of selectedSet) {
                    if (!set.has(t)) {
                        identical = false;
                        break;
                    }
                }
                if (!identical) break;
            }

            if (identical) {
                return res.status(400).json({
                    message:
                        "Horários selecionados já são os atuais do técnico. Não é possível prosseguir.",
                });
            }

            const dataToCreate = weekdays.flatMap((weekday) =>
                times.map((time) => ({ techId, weekday, time })),
            );

            await prisma.$transaction(async (tx) => {
                // remove todos os horários atuais do técnico
                await tx.techAvailability.deleteMany({ where: { techId } });

                // cria os novos horários
                await tx.techAvailability.createMany({
                    data: dataToCreate,
                    skipDuplicates: true,
                });
            });

            return res.status(200).json({
                message: "Disponibilidades atualizadas com sucesso",
            });
        } catch (err: any) {
            if (err instanceof ZodError) {
                return res.status(400).json({
                    message: "Erro de validação",
                    issues: err.issues.map((i) => ({
                        path: i.path,
                        message: i.message,
                    })),
                });
            }
            next(err);
        }
    }
}

export { TechAvailabilityController };
