import { Router } from "express";
import { TechAvailabilityController } from "@/controllers/TechAvailability";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const techAvailabilityRoutes = Router();
const techAvailabilityController = new TechAvailabilityController();

techAvailabilityRoutes.use(verifyUserAuthorization(["admin"]));
techAvailabilityRoutes.post("/:techId", techAvailabilityController.create);

export { techAvailabilityRoutes };
