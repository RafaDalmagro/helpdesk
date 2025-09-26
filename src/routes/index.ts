import { Router } from "express";
import { userRoutes } from "@/routes/userRoutes";
import { ticketRoutes } from "./ticketRoutes";
const routes = Router();

routes.use("/users", userRoutes);
routes.use("/tickets", ticketRoutes);

export { routes };
