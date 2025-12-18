import { ZodError, z } from "zod";
import { AppError } from "@/utils/AppError";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof AppError) {
        return res.status(400).json({
            message: err.message,
        });
    }
    if (err instanceof ZodError) {
        return res
            .status(400)
            .json({ message: "Validation error", issues: z.treeifyError(err) });
    }

    return res.status(500).json({
        message: err.message || "Internal server error",
    });
};
