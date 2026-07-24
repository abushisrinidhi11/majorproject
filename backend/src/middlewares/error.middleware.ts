import { Request, Response, NextFunction } from "express";
export const errorHandler=(
    error: any,
    req: Request,
    res: Response,
    next: NextFunction) =>
{
    console.log("Global Error Handler");
    console.log("Error Message:", error.message);
    return res.status(error.statusCode || 500).json(
    {
        success: false,
        message: error.message || "Internal Server Error"
    });
};