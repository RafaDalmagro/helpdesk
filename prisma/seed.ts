import { prisma } from "@/database/prisma";
import { hash } from "bcrypt";
import {
    BUSINESS_WEEKDAYS,
    TECH1_TIMES,
    TECH2_TIMES,
    TECH3_TIMES,
} from "@/utils/availability";
import { SERVICES_CATALOG } from "@/utils/services";

function buildSlots(techId: string, times: readonly string[]) {
    return BUSINESS_WEEKDAYS.flatMap((weekday) =>
        times.map((time) => ({ techId, weekday, time }))
    );
}

async function seed() {
    await prisma.$transaction(async (tx) => {
        const admin = await tx.user.upsert({
            where: { email: "admin@email.com" },
            update: {},
            create: {
                name: "Admin User",
                email: "admin@email.com",
                password: await hash("admin123", 10),
                role: "admin",
            },
        });

        const tech1 = await tx.user.upsert({
            where: { email: "tech1@email.com" },
            update: {},
            create: {
                name: "Tech User 1",
                email: "tech1@email.com",
                password: await hash("tech123", 10),
                role: "tech",
            },
        });

        const tech2 = await tx.user.upsert({
            where: { email: "tech2@email.com" },
            update: {},
            create: {
                name: "Tech User 2",
                email: "tech2@email.com",
                password: await hash("tech123", 10),
                role: "tech",
            },
        });

        const tech3 = await tx.user.upsert({
            where: { email: "tech3@email.com" },
            update: {},
            create: {
                name: "Tech User 3",
                email: "tech3@email.com",
                password: await hash("tech123", 10),
                role: "tech",
            },
        });

        await tx.techAvailability.deleteMany({
            where: { techId: { in: [tech1.id, tech2.id, tech3.id] } },
        });

        await tx.techAvailability.createMany({
            data: [
                ...buildSlots(tech1.id, TECH1_TIMES),
                ...buildSlots(tech2.id, TECH2_TIMES),
                ...buildSlots(tech3.id, TECH3_TIMES),
            ],
            skipDuplicates: true,
        });

        await tx.service.upsert({
            where: { id: "" },
            update: {},
            create: {
                name: "Serviço Padrão",
                description: "Descrição do Serviço Padrão",
                price: 100,
            },
        });

        const existingServices = await tx.service.findMany({
            select: { name: true },
        });
        const existingNames = new Set(existingServices.map((s) => s.name));

        const toCreate = SERVICES_CATALOG.filter(
            (s) => !existingNames.has(s.name)
        );

        if (toCreate.length > 0) {
            await tx.service.createMany({ data: toCreate });
        }

        console.log("Seed concluída:", {
            admin: admin.email,
            techs: [tech1.email, tech2.email, tech3.email],
            slots: "Tec1 (08-12/14-18), Tec2 (10-14/16-20), Tec3 (12-16/18-22)",
        });
    });
}

seed()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
