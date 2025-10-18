import { NextFunction, Request, Response } from "express";

class UploadController {
    async create(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json({ message: "Create" });
    }
}

export { UploadController };
