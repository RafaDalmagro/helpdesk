import { Router } from "express";
import { UserController } from "@/controllers/UserController";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const userRoutes = Router();
const userController = new UserController();

userRoutes.get("/", userController.index);
userRoutes.post("/", verifyUserAuthorization(["admin"]), userController.create);
userRoutes.put(
    "/:id",
    verifyUserAuthorization(["admin"]),
    userController.update
);
userRoutes.get("/:id", userController.show);
userRoutes.delete(
    "/:id",
    verifyUserAuthorization(["admin"]),
    userController.delete
);

export { userRoutes };
