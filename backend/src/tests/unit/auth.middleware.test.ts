import request from "supertest";
import app from "../../app";
import { createTestUser } from "../helpers/testUser";
import { loginAndGetCookie } from "../helpers/authHelper";

describe("protect middleware", () =>
{
    it("should reject requests with no token cookie", async () =>
    {
        const response = await request(app).get("/api/auth/me");

        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });

    it("should reject requests with an invalid/garbage token", async () =>
    {
        const response = await request(app)
            .get("/api/auth/me")
            .set("Cookie", "token=not-a-real-jwt");

        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });

    it("should allow requests with a valid token and attach req.user", async () =>
    {
        const { user, plainPassword } = await createTestUser({
            email: "protectuser@example.com",
            role: "jobSeeker"
        });

        const cookie = await loginAndGetCookie(user.email, plainPassword);

        const response = await request(app)
            .get("/api/auth/me")
            .set("Cookie", cookie);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.user.email).toBe(user.email);
    });
});
