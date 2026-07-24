import { env } from "../config/env";

const isProduction = env.NODE_ENV === "production";

const logger = {
    log: (...args: any[]) =>
    {
        if (!isProduction)
        {
            console.log(...args);
        }
    },
    error: (...args: any[]) =>
    {
        // Errors are always logged, even in production
        console.error(...args);
    }
};

export default logger;
