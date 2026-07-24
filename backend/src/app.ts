import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";
import jobRoutes from "./routes/job.routes";
import applicationRoutes from "./routes/application.routes";
import { errorHandler } from "./middlewares/error.middleware";
import { env } from "./config/env";

const app=express();
console.log("Creating Express application");
app.use((req,res,next)=>
{
    console.log("New Request");
    console.log("Method:",req.method);
    console.log("URL:",req.url);
    next();
});
console.log("Loading JSON middleware");
app.use(express.json());
console.log("Loading Cookie Parser");
app.use(cookieParser());
console.log("Loading CORS");
app.use(cors({
    origin:env.CLIENT_URL,
    credentials:true
}));
console.log("Loading Authentication Routes");
app.use("/api/auth",authRoutes);
console.log("Loading User Routes");
app.use("/api/users",userRoutes);
console.log("Loading Category Routes");
app.use("/api/categories",categoryRoutes);
console.log("Loading Job Routes");
app.use("/api/jobs",jobRoutes);
console.log("Loading Application Routes");
app.use("/api/applications",applicationRoutes);
app.get("/",(req,res)=>
{
    console.log("Home route called");
    res.status(200).json({
        success:true,
        message:"Welcome to JobHunt API"
    });
});
app.use((req,res)=>
{
    console.log("Route not found");
    res.status(404).json({
        success:false,
        message:"Route not found"
    });
});
app.use(errorHandler);
export default app;