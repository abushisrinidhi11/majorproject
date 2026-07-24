import request from "supertest";
import mongoose from "mongoose";
import app from "../../app";
import { createTestUser } from "../helpers/testUser";
import { loginAndGetCookie } from "../helpers/authHelper";

const validJobPayload = {
    title: "Backend Engineer",
    company: "Acme Corp",
    location: "Bengaluru",
    workplaceType: "Remote",
    employmentType: "Full-Time",
    experience: "2 Years",
    salary: 100000,
    description: "Build and maintain backend services.",
    category: new mongoose.Types.ObjectId().toString()
};

describe("authorize middleware", () =>
{
    it("should deny a jobSeeker from creating a job (403)", async () =>
    {
        const { user, plainPassword } = await createTestUser({
            email: "seeker@example.com",
            role: "jobSeeker"
        });

        const cookie = await loginAndGetCookie(user.email, plainPassword);

        const response = await request(app)
            .post("/api/jobs")
            .set("Cookie", cookie)
            .send(validJobPayload);

        expect(response.status).toBe(403);
        expect(response.body.success).toBe(false);
    });

    it("should allow a jobRecruiter to reach the create-job controller", async () =>
    {
        const { user, plainPassword } = await createTestUser({
            email: "recruiter@example.com",
            role: "jobRecruiter"
        });

        const cookie = await loginAndGetCookie(user.email, plainPassword);

        const response = await request(app)
            .post("/api/jobs")
            .set("Cookie", cookie)
            .send(validJobPayload);

        // Authorization passes; the request proceeds to the controller,
        // which then 404s because the referenced category doesn't exist.
        // Either way, it must NOT be blocked by authorize() with a 403.
        expect(response.status).not.toBe(403);
    });
});
