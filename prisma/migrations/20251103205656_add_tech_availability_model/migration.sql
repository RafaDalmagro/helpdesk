-- CreateTable
CREATE TABLE "tech_availability" (
    "id" TEXT NOT NULL,
    "tech_id" TEXT NOT NULL,
    "weekday" INTEGER NOT NULL,
    "time" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tech_availability_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tech_availability_tech_id_weekday_time_idx" ON "tech_availability"("tech_id", "weekday", "time");

-- CreateIndex
CREATE UNIQUE INDEX "tech_availability_tech_id_weekday_time_key" ON "tech_availability"("tech_id", "weekday", "time");

-- AddForeignKey
ALTER TABLE "tech_availability" ADD CONSTRAINT "tech_availability_tech_id_fkey" FOREIGN KEY ("tech_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
