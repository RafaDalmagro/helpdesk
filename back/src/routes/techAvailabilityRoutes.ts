import { Router } from "express";
import { TechAvailabilityController } from "@/controllers/TechAvailabilityController";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const techAvailabilityRoutes = Router();
const techAvailabilityController = new TechAvailabilityController();

techAvailabilityRoutes.get(
    "/",
    verifyUserAuthorization(["admin", "client", "tech"]),
    techAvailabilityController.index
);
techAvailabilityRoutes.post(
    "/availability/:techId",
    verifyUserAuthorization(["admin"]),
    techAvailabilityController.create
);
techAvailabilityRoutes.put(
    "/availability/:techId",
    verifyUserAuthorization(["admin"]),
    techAvailabilityController.update
);

export { techAvailabilityRoutes };