import { Router } from "express";
import { UserController } from "@/controllers/UserController";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";
import { verifyUserSelf } from "@/middlewares/verifyIsUserSelf";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";

const userRoutes = Router();
const userController = new UserController();

userRoutes.get("/", userController.index);
userRoutes.post("/", userController.create);
userRoutes.put(
    "/:id",
    ensureAuthenticated,
    // verifyUserAuthorization(["admin", "tech", "client"]),
    verifyUserSelf(),
    userController.update
);
userRoutes.get("/:id", userController.show);
userRoutes.delete(
    "/:id",
    ensureAuthenticated,
    verifyUserAuthorization(["admin"]),
    userController.delete
);
userRoutes.patch(
    "/password/:id",
    ensureAuthenticated,
    verifyUserAuthorization(["admin", "tech"]),
    userController.updatePassword
);

export { userRoutes };
