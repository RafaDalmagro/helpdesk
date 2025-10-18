import { NextFunction, Request, Response } from "express";
import { file, z } from "zod";

import UploadConfig from "@/configs/UploadConfig";

class UploadController {
    async create(req: Request, res: Response, next: NextFunction) {
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
            const { file } = fileSchema.parse(req.file);
            return res.status(201).json("Arquivo enviado com sucesso!");
        } catch (error) {
            throw error;
        }
    }
}

export { UploadController };
