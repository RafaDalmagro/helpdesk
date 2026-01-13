import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";

import UploadConfig from "@/configs/UploadConfig";
import { DiskStorage } from "@/utils/diskStorage";
import { AppError } from "@/utils/AppError";
import { prisma } from "@/database/prisma";

class UploadController {
    async create(req: Request, res: Response, next: NextFunction) {
        const diskStorage = new DiskStorage();

        try {
            const fileSchema = z
                .object({
                    filename: z.string().min(1, "Arquivo obrigatório"),
                    mimetype: z
                        .string()
                        .refine(
                            (type) =>
                                UploadConfig.ACCEPTED_MIME_TYPES.includes(type),
                            {
                                message: `Tipo de arquivo não suportado. Formatos aceitos: ${UploadConfig.ACCEPTED_MIME_TYPES}`,
                            }
                        ),
                    size: z
                        .number()
                        .positive(
                            "O tamanho do arquivo deve ser maior que zero"
                        )
                        .refine((size) => size <= UploadConfig.MAX_FILE_SIZE, {
                            message: `O tamanho do arquivo excede o limite de ${UploadConfig.MAX_FILE_SIZE}MB.`,
                        }),
                })
                .loose();

            const paramsSchema = z.object({
                id: z.uuid("ID de usuário inválido"),
            });

            const params = paramsSchema.parse(req.params);
            const userId = params.id;

            const file = fileSchema.parse(req.file);
            const filename = await diskStorage.saveFile(file.filename);

            await prisma.user.update({
                where: { id: userId },
                data: { filename },
            });

            return res.status(201).json({ filename });
        } catch (error) {
            if (error instanceof ZodError) {
                if (req.file) {
                    await diskStorage.deleteFile(req.file.filename, "tmp");
                }

                throw new AppError(error.issues[0].message);
            }

            throw error;
        }
    }
}

export { UploadController };
