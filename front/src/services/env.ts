import { z } from "zod";

const envSchema = z.object({
    VITE_BASE_URL: z
        .string()
        .min(1, "VITE_BASE_URL não pode estar vazia")
        .url("VITE_BASE_URL deve ser uma URL válida")
        .refine(
            (url) => url.startsWith("http://") || url.startsWith("https://"),
            "VITE_BASE_URL deve começar com http:// ou https://",
        ),
});

const env = envSchema.parse(import.meta.env);

export const BASE_URL = env.VITE_BASE_URL;
