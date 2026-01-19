import { z } from "zod";

export const BASE_URL = z
    .string()
    .min(1)
    .refine((v) => {
        try {
            new URL(v);
            return true;
        } catch {
            return false;
        }
    }, "VITE_BASE_URL inválida")
    .parse(import.meta.env.VITE_BASE_URL);
