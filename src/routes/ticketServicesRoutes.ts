import { Router } from "express";
import { TicketServiceController } from "@/controllers/TicketServiceController";

const ticketServicesRoutes = Router();
const ticketController = new TicketServiceController();

ticketServicesRoutes.get("/", ticketController.index);
ticketServicesRoutes.post("/", ticketController.create);

export { ticketServicesRoutes };
