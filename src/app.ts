import express from "express";
import { routes } from "@/routes";
import { errorHandler } from "@/middlewares/errorHandler";
import UploadConfig from "./configs/UploadConfig";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(UploadConfig.UPLOADS_FOLDER));

app.use(routes);
app.use(errorHandler);

export { app };
