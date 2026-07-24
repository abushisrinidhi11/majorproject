import request from "supertest";
import app from "../../app";

/**
 * Logs a user in through the real HTTP login route and returns the
 * "token" cookie so it can be attached to subsequent authenticated
 * requests in tests, e.g.:
 *
 *   const cookie = await loginAndGetCookie(email, password);
 *   await request(app).get("/api/auth/me").set("Cookie", cookie);
 */
export const loginAndGetCookie = async (
    email: string,
    password: string
): Promise<string> =>
{
    const response = await request(app)
        .post("/api/auth/login")
        .send({ email, password });

    const setCookieHeader = response.headers["set-cookie"];

    if (!setCookieHeader || setCookieHeader.length === 0)
    {
        throw new Error(
            "Login did not return a token cookie - check credentials or auth route"
        );
    }

    const tokenCookie = (setCookieHeader as unknown as string[])
        .find((cookie: string) => cookie.startsWith("token="));

    if (!tokenCookie)
    {
        throw new Error("No 'token' cookie found in login response");
    }

    return tokenCookie.split(";")[0];
};

export default loginAndGetCookie;
