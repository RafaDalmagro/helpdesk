import { Router } from "express";
import { TechAvailabilityController } from "@/controllers/TechAvailability";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const techAvailabilityRoutes = Router();
const techAvailabilityController = new TechAvailabilityController();

techAvailabilityRoutes.get(
    "/",
    verifyUserAuthorization(["admin", "client", "tech"]),
    techAvailabilityController.index
);
techAvailabilityRoutes.post(
    "/:techId/availability",
    verifyUserAuthorization(["admin"]),
    techAvailabilityController.create
);
techAvailabilityRoutes.put(
    "/:techId/availability",
    verifyUserAuthorization(["admin"]),
    techAvailabilityController.update
);

export { techAvailabilityRoutes };