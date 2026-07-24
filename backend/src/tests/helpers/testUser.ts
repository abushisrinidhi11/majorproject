import bcrypt from "bcrypt";
import User from "../../models/User";

interface CreateTestUserOptions
{
    fullName?: string;
    email?: string;
    password?: string;
    role?: "jobSeeker" | "jobRecruiter";
}

/**
 * Creates a user directly in the (in-memory) database for use in tests,
 * bypassing the HTTP registration flow. Returns both the created document
 * and the plaintext password (since the stored password is hashed).
 */
export const createTestUser = async (options: CreateTestUserOptions = {}) =>
{
    const plainPassword = options.password || "Password@123";

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const user = await User.create({
        fullName: options.fullName || "Test User",
        email: options.email || `test${Date.now()}${Math.random()}@example.com`,
        password: hashedPassword,
        role: options.role || "jobSeeker"
    });

    return {
        user,
        plainPassword
    };
};

export default createTestUser;
