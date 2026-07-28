import { env } from "./env";
import logger from "../utils/logger";

// @google/genai is a pure ESM package - it cannot be loaded with a
// normal top-level `import` inside this CommonJS backend, so it must
// be loaded lazily via dynamic import() and cached on first use.
let genAIInstance: any = null;

export const getGenAI = async () =>
{
    if (!genAIInstance)
    {
        logger.log("Configuring Gemini Client");

        const { GoogleGenAI } = await import("@google/genai");

        genAIInstance = new GoogleGenAI({
            vertexai: false,
            apiKey: env.GEMINI_API_KEY
        });

        logger.log("Gemini Client Configured");
    }

    return genAIInstance;
};