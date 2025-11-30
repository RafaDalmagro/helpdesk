import request from "supertest";
import { app } from "@/app";

describe("User Admin", () => {
    let response: request.Response;

    let fakeUserAdmin = {
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

    afterAll(async () => {
        await request(app)
            .delete(`/users/${response.body.user.id}`)
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
    });
});

// describe("Endpoints Admin", () => {
//     it("Should be able to update an Admin user", async () => {
//         await request(app)
//             .put(`/users/${fakeUserAdmin.id}`)
//             .set(
//                 "Authorization",
//                 `Bearer ${
//                     (
//                         await request(app).post("/sessions").send({
//                             email: fakeUserAdmin.email,
//                             password: fakeUserAdmin.password,
//                         })
//                     ).body.token
//                 }`
//             );
//         // console.log(response.body);

//         expect(response.status).toBe(201);
//         expect(response.body).toHaveProperty("user");
//         console.log(response.body.id);
//     });
// });
