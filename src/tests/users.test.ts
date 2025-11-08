import request from "supertest";
import { app } from "@/app";
import { prisma } from "@/database/prisma";

describe("Users", () => {
    let response: request.Response;

    it("Should be able list users", async () => {
        const responseUsers = await request(app).get("/users");
        // console.log(typeof response.body);

        expect(responseUsers.status).toBe(200);
        expect(responseUsers.body).toBeInstanceOf(Object);
    });

    it("Should be able to create a new user", async () => {
        response = await request(app).post("/users").send({
            name: "User test",
            email: "test@test.com",
            password: "test123",
        });

        expect(response.status).toBe(201);
        return response;
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
