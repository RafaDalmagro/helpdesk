import { Router } from "express";

import { userRoutes } from "@/routes/userRoutes";
import { ticketRoutes } from "./ticketRoutes";
import { serviceRoutes } from "./serviceRoutes";
import { ticketServicesRoutes } from "./ticketServicesRoutes";
import { sessionRoutes } from "./sessionRoutes";
import { uploadRoutes } from "./uploadRoutes";
import { techAvailabilityRoutes } from "./techAvailabilityRoutes";

import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/sessions", sessionRoutes);

routes.use(ensureAuthenticated);
routes.use("/tickets", ticketRoutes);
routes.use("/tech-availability", techAvailabilityRoutes);
routes.use("/services", serviceRoutes);
routes.use("/ticket-services", ticketServicesRoutes);
routes.use("/uploads", uploadRoutes);

export { routes };
