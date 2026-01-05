import { Router } from "express";
import { CategoryController } from "@/controllers/CategoryController";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const categoryRoutes = Router();
const categoryController = new CategoryController();

categoryRoutes.get("/", categoryController.index);

export { categoryRoutes };
