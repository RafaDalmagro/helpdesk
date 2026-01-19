import { z } from "zod";

const envSchema = z.object({
    BASE_URL: z.string().url(),
});

const env = envSchema.parse(import.meta.env);

export const BASE_URL = env.BASE_URL;
