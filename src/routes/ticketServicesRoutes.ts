import { Router } from "express";
import { TicketServiceController } from "@/controllers/TicketServiceController";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";
	
const ticketServicesRoutes = Router();
const ticketController = new TicketServiceController();

ticketServicesRoutes.get("/", ticketController.index);
ticketServicesRoutes.post("/", verifyUserAuthorization(["admin"]), ticketController.create);

export { ticketServicesRoutes };
