import {Request,Response,NextFunction} from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
export const protect=async(req:any,res:Response,next:NextFunction)=>
{
    try
    {
        console.log("Protect middleware called");
        const token=req.cookies.token;
        if(!token)
        {
            console.log("Token not found");
            return res.status(401).json(
            {
                success:false,
                message:"Please login first"
            });
        }
        console.log("Verifying token");
        const decoded:any=jwt.verify(
            token,
            process.env.JWT_SECRET as string
        );
        console.log("Finding user");
        const user=await User.findById(decoded.id).select("-password");
        if(!user)
        {
            console.log("User not found");
            return res.status(401).json(
            {
                success:false,
                message:"User not found"
            });
        }
        req.user=user;
        console.log("User authenticated");
        next();
    }
    catch(error:any)
    {
        console.log("Protect Middleware Error:",error.message);
        return res.status(401).json({
            success:false,
            message:"Invalid or expired token"
        });
    }
};
export const authorize=(...roles:string[])=>
{
    return(req:any,res:Response,next:NextFunction)=>
    {
        try
        {
            console.log("Authorize middleware called");
            if(!roles.includes(req.user.role))
            {
                console.log("Access denied");
                return res.status(403).json(
                {
                    success:false,
                    message:"Access denied"
                });
            }
            console.log("User authorized");
            next();
        }
        catch(error:any)
        {
            console.log("Authorize Middleware Error:",error.message);
            return res.status(500).json(
            {
                success:false,
                message:error.message
            });
        }
    };
};