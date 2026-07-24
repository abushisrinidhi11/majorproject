import "dotenv/config";
import app from "./app";
import {connectDatabase} from "./config/database";
import { env } from "./config/env";
const startServer = async () =>
{
    try 
    {
        console.log("Starting JobHunt Server");
        console.log("Connecting to MongoDB");
        await connectDatabase();
        console.log("MongoDB Connected");
        app.listen(env.PORT, () => {
            console.log(`Server running on http://localhost:${env.PORT}`);
        });
    } 
    catch(error)
    {
        console.error("Failed to start server:",error);
        process.exit(1);
    }
};
startServer();