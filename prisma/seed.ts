import { prisma } from "@/database/prisma";
import { hash } from "bcrypt";
import { BUSINESS_WEEKDAYS } from "@/utils/availability";

const TECH1_TIMES = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
] as const;

const TECH2_TIMES = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
] as const;

const TECH3_TIMES = [
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
] as const;

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

        // 3) Disponibilidade: apaga as antigas (se houver) e recria
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
