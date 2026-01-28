import { Router } from "express";
import { TicketServiceController } from "@/controllers/TicketServiceController";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const ticketServicesRoutes = Router();
const ticketController = new TicketServiceController();

ticketServicesRoutes.get("/", ticketController.index);
ticketServicesRoutes.get(
    "/:id/additional-services",
    ticketController.showAdditionalServices,
);
ticketServicesRoutes.post(
    "/",
    verifyUserAuthorization(["admin", "tech"]),
    ticketController.create,
);
ticketServicesRoutes.delete(
    "/:id",
    verifyUserAuthorization(["admin", "tech"]),
    ticketController.delete,
);
export { ticketServicesRoutes };
