import request from "supertest";
import app from "../../app";

describe("validate middleware", () =>
{
    it("should return 400 with field errors when required fields are missing", async () =>
    {
        const response = await request(app)
            .post("/api/auth/register")
            .send({});

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Validation failed");
        expect(Array.isArray(response.body.errors)).toBe(true);
        expect(response.body.errors.length).toBeGreaterThan(0);
    });

    it("should strip unknown fields instead of rejecting the request", async () =>
    {
        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: "someone@example.com",
                password: "irrelevant",
                notAField: "should be stripped, not rejected"
            });

        // Login will still fail (no such user), but it must fail with
        // "Invalid email or password" (401) rather than a validation
        // error about the unknown field.
        expect(response.status).toBe(401);
    });

    it("should pass through and reach the controller when input is valid", async () =>
    {
        const response = await request(app)
            .post("/api/auth/register")
            .send({
                fullName: "Valid User",
                email: "validuser@example.com",
                password: "Password@123",
                role: "jobSeeker"
            });

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
    });
});
