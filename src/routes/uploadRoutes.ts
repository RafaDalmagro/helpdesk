import { Router } from "express";
import multer from "multer";
import UploadConfig from "@/configs/UploadConfig";

import { UploadController } from "@/controllers/UploadController";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const uploadRoutes = Router();
const uploadController = new UploadController();

const upload = multer(UploadConfig.MULTER);

uploadRoutes.use(verifyUserAuthorization(["admin", "client", "tech"]));
uploadRoutes.post("/", upload.single("file"), uploadController.create);


export { uploadRoutes };
