import { Router } from "express";
import { ServiceController } from "@/controllers/ServiceController";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const serviceRoutes = Router();
const serviceController = new ServiceController();

serviceRoutes.get("/", serviceController.index);
serviceRoutes.post(
    "/",
    verifyUserAuthorization(["admin"]),
    serviceController.create,
);
serviceRoutes.get("/:id", serviceController.show);
serviceRoutes.put(
    "/:id",
    verifyUserAuthorization(["admin", "tech"]),
    serviceController.update,
);
serviceRoutes.put(
    "/:id/status",
    verifyUserAuthorization(["admin", "tech"]),
    serviceController.updateStatus,
);
serviceRoutes.delete(
    "/:id",
    verifyUserAuthorization(["admin"]),
    serviceController.delete,
);

export { serviceRoutes };
