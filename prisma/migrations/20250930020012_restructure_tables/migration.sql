/*
  Warnings:

  - You are about to drop the column `ticket_id` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `tickets` table. All the data in the column will be lost.
  - Added the required column `client_id` to the `tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tech_id` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "ticket_services" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unitPrice" REAL NOT NULL,
    "totalPrice" REAL NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'initial',
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "added_by_id" TEXT NOT NULL,
    "ticket_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    CONSTRAINT "ticket_services_added_by_id_fkey" FOREIGN KEY ("added_by_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ticket_services_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ticket_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_services" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "deletedAt" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);
INSERT INTO "new_services" ("created_at", "deletedAt", "description", "id", "isActive", "name", "price", "updated_at") SELECT "created_at", "deletedAt", "description", "id", "isActive", "name", "price", "updated_at" FROM "services";
DROP TABLE "services";
ALTER TABLE "new_services" RENAME TO "services";
CREATE TABLE "new_tickets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'open',
    "totalValue" REAL NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "deletedAt" DATETIME,
    "client_id" TEXT NOT NULL,
    "tech_id" TEXT NOT NULL,
    CONSTRAINT "tickets_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tickets_tech_id_fkey" FOREIGN KEY ("tech_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tickets" ("created_at", "deletedAt", "description", "id", "isActive", "status", "title", "updated_at") SELECT "created_at", "deletedAt", "description", "id", "isActive", "status", "title", "updated_at" FROM "tickets";
DROP TABLE "tickets";
ALTER TABLE "new_tickets" RENAME TO "tickets";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "ticket_services_ticket_id_service_id_key" ON "ticket_services"("ticket_id", "service_id");
