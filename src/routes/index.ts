import { Router } from "express";

import { userRoutes } from "@/routes/userRoutes";
import { ticketRoutes } from "./ticketRoutes";
import { serviceRoutes } from "./serviceRoutes";
import { ticketServicesRoutes } from "./ticketServicesRoutes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/tickets", ticketRoutes);
routes.use("/services", serviceRoutes);
routes.use("/ticket-services", ticketServicesRoutes);

export { routes };
