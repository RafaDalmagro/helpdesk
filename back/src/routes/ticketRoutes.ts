import { Router } from "express";
import { TicketController } from "@/controllers/TicketController";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const ticketRoutes = Router();
const ticketController = new TicketController();

ticketRoutes.get("/", ticketController.index);
ticketRoutes.get("/:id", ticketController.show);
ticketRoutes.get("/user/:userId", ticketController.showTicketsByUser);

ticketRoutes.post(
    "/",
    verifyUserAuthorization(["admin", "client"]),
    ticketController.create
);
ticketRoutes.put(
    "/:id",
    verifyUserAuthorization(["admin", "tech", "client"]),
    ticketController.update
);
ticketRoutes.patch(
    "/:id/status",
    verifyUserAuthorization(["admin", "tech"]),
    ticketController.updateStatus
);
ticketRoutes.delete(
    "/:id",
    verifyUserAuthorization(["admin", "tech", "client"]),
    ticketController.delete
);

export { ticketRoutes };
