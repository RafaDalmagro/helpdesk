import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
    BUSINESS_WEEKDAYS,
    TECH1_TIMES,
    TECH2_TIMES,
    TECH3_TIMES,
} from "@/utils/availability";
import { prisma } from "@/database/prisma";

class TechAvailabilityController {
    async create(req: Request, res: Response, next: NextFunction) {
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

        try {
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

            // para cada array de dias úteis, cria os registros de disponibilidade
            const dataToCreate = BUSINESS_WEEKDAYS.flatMap((weekday) =>
                selectedTimes.map((t) => ({ techId, weekday, time: t }))
            );

            const result = await prisma.techAvailability.createMany({
                data: dataToCreate,
                skipDuplicates: true,
            });

            return res.status(201).json({
                message:
                    "Disponibilidades criadas com sucesso para segunda a sexta",
                group: time,
                weekdays: BUSINESS_WEEKDAYS,
                times: selectedTimes,
                insertedCount: result.count, // pode ser menor que total se já existiam
            });
        } catch (err: any) {
            if (err instanceof z.ZodError) {
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
}

export { TechAvailabilityController };
