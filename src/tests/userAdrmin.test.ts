import request from "supertest";
import { app } from "@/app";
import { prisma } from "@/database/prisma";

describe("User Admin", () => {
    let response: request.Response;
    const fakeUserAdmin = {
        name: "User test admin",
        email: "admin@test.com",
        password: "test123",
        role: "admin",
    };
    it("Should be able to create Admin user", async () => {
        response = await request(app).post("/users").send({
            name: fakeUserAdmin.name,
            email: fakeUserAdmin.email,
            password: fakeUserAdmin.password,
            role: fakeUserAdmin.role,
        });

        expect(response.status).toBe(201);
        return response;
    });

    it("Should be able to update an Admin user", async () => {
        const userId = response.body.id;
        await request(app)
            .put(`/users/${userId}`)
            .set(
                "Authorization",
                `Bearer ${
                    (
                        await request(app).post("/sessions").send({
                            email: fakeUserAdmin.email,
                            password: fakeUserAdmin.password,
                        })
                    ).body.token
                }`
            );

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("updatedUser");
    });

    afterAll(async () => {
        const userId = response.body.user.id;
        await prisma.user.delete({
            where: {
                id: userId,
            },
        });
    });
});
