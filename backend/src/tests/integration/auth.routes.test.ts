import request from "supertest";
import app from "../../app";

describe("Authentication Routes", () =>
{
    describe("Register API", () =>
    {
        it("should return 400 when request body is empty", async () =>
        {
            console.log("Testing Register API with empty body");

            const response = await request(app)
                .post("/api/auth/register")
                .send({});

            console.log("Status Code:", response.status);

            expect(response.status).toBe(400);

            expect(response.body.success).toBe(false);

            expect(response.body.message).toBe("Validation failed");
        });
    });
});