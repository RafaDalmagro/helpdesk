/*
  Warnings:

  - You are about to drop the column `quantity` on the `ticket_services` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `ticket_services` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ticket_services" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "unitPrice" REAL NOT NULL,
    "totalPrice" REAL NOT NULL,
    "added_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "added_by_id" TEXT NOT NULL,
    "ticket_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    CONSTRAINT "ticket_services_added_by_id_fkey" FOREIGN KEY ("added_by_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ticket_services_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ticket_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ticket_services" ("added_at", "added_by_id", "id", "service_id", "ticket_id", "totalPrice", "unitPrice") SELECT "added_at", "added_by_id", "id", "service_id", "ticket_id", "totalPrice", "unitPrice" FROM "ticket_services";
DROP TABLE "ticket_services";
ALTER TABLE "new_ticket_services" RENAME TO "ticket_services";
CREATE UNIQUE INDEX "ticket_services_ticket_id_service_id_key" ON "ticket_services"("ticket_id", "service_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
