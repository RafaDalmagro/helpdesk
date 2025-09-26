import { Router } from "express";
import { TicketController } from "@/controllers/TicketController";

const ticketRoutes = Router();
const ticketController = new TicketController();

ticketRoutes.get("/", ticketController.index);
ticketRoutes.post("/", ticketController.create);
ticketRoutes.put("/:id", ticketController.update);
ticketRoutes.get("/:id", ticketController.show);
ticketRoutes.delete("/:id", ticketController.delete);

export { ticketRoutes };
