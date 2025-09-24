import { Router } from "express";
import { UsersController } from "@/controllers/UsersController";

const userRoutes = Router();
const usersController = new UsersController();

userRoutes.get("/", usersController.index);
userRoutes.post("/", usersController.create);
userRoutes.put("/:id", usersController.update);
userRoutes.get("/:id", usersController.show);
userRoutes.delete("/:id", usersController.delete);

export { userRoutes };
