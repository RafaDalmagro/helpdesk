import express from "express";
import { routes } from "@/routes";
import { errorHandler } from "@/middlewares/errorHandler";
import UploadConfig from "./configs/UploadConfig";

const app = express();

app.use(express.json());

app.use("/uploads", express.static(UploadConfig.UPLOADS_FOLDER));

app.use(routes);
app.use(errorHandler);

export { app };
