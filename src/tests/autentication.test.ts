import request from "supertest";
import { app } from "@/app";

describe("Autentication", () => {
    const userData = {
        name: "Test User",
        email: "test@example.com",
        password: "test123",
    };
    
    let response: request.Response;

    beforeAll(async () => {
        response = await request(app).post("/users").send(userData);
        return response;
    });

    it("Return JWT token when credentials are valid", async () => {
        const authResponse = await request(app).post("/sessions").send({
            email: userData.email,
            password: userData.password,
        });

        expect(authResponse.status).toBe(200);
        expect(authResponse.body).toHaveProperty("token");
    });

    afterAll(async () => {
        await request(app)
            .delete(`/users/${response.body.user.id}`)
            .set(
                "Authorization",
                `Bearer ${
                    (
                        await request(app).post("/sessions").send({
                            email: "admin@email.com",
                            password: "admin123",
                        })
                    ).body.token
                }`
            );
    });
});
