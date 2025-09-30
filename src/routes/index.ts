import { Router } from "express";

import { userRoutes } from "@/routes/userRoutes";
import { ticketRoutes } from "./ticketRoutes";
import { serviceRoutes } from "./serviceRoutes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/tickets", ticketRoutes);
routes.use("/services", serviceRoutes);

export { routes };
