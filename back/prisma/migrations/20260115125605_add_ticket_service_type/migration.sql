/*
  Warnings:

  - A unique constraint covering the columns `[ticket_id,service_id,type]` on the table `ticket_services` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "TicketServiceType" AS ENUM ('primary', 'additional');

-- AlterTable
ALTER TABLE "ticket_services" ADD COLUMN     "type" "TicketServiceType" NOT NULL DEFAULT 'primary';

-- CreateIndex
CREATE UNIQUE INDEX "ticket_services_ticket_id_service_id_type_key" ON "ticket_services"("ticket_id", "service_id", "type");
