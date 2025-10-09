import { Router } from "express";
import { TicketController } from "@/controllers/TicketController";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const ticketRoutes = Router();
const ticketController = new TicketController();

ticketRoutes.get("/", ticketController.index);
ticketRoutes.post(
    "/",
    verifyUserAuthorization(["admin", "client"]),
    ticketController.create
);
ticketRoutes.put(
    "/:id",
    verifyUserAuthorization(["admin"]),
    ticketController.update
);
ticketRoutes.patch(
    "/:id/status",
    verifyUserAuthorization(["admin", "tech"]),
    ticketController.updateStatus
);
ticketRoutes.get("/:id", ticketController.show);
ticketRoutes.delete(
    "/:id",
    verifyUserAuthorization(["admin"]),
    ticketController.delete
);

export { ticketRoutes };
