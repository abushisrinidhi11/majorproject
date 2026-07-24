import User from "../models/User";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken";
import cookieOptions from "../utils/cookieOptions";
import {Request,Response} from "express";
export const register=async(req:Request,res:Response)=>
{
    try
    {
        console.log("register api called");
        const {fullName,email,password,role}=req.body;
        console.log("register request Body");
        console.log(req.body);
        console.log("received role");
        console.log(role);
        console.log("checking if user already exists");
        const existingUser=await User.findOne({email});
        if(existingUser)
        {
            console.log("user already exists");
            return res.status(400).json(
            {
                success:false,
                message:"user already exists"
            });
        }
        console.log("hashing password");
        const hashedPassword=await bcrypt.hash(password,10);
        console.log("creating user");
        const user = await User.create(
            {
                fullName,
                email,
                password: hashedPassword,
                role
            });
        console.log("generating token");
        const token=generateToken(user._id.toString());
        res.cookie("token",token,cookieOptions);
        console.log("user registered successfully");
        return res.status(201).json(
        {
            success:true,
            message:"user registered successfully",
            user:{
                id:user._id,
                fullName:user.fullName,
                email:user.email,
                role:user.role
            }
        });
    }
    catch(error:any)
    {
        console.log("register error:",error.message);
        return res.status(500).json(
        {
            success:false,
            message:error.message
        });
    }
};

export const login=async(req:Request,res:Response)=>
{
    try
    {
        console.log("login api called");
        const {email,password}=req.body;
        console.log("finding user");
        const user=await User.findOne({email}).select("+password");
        if(!user)
        {
            console.log("user not found");
            return res.status(401).json(
            {
                success:false,
                message:"invalid email or password"
            });
        }
        console.log("comparing password");
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch)
        {
            console.log("password incorrect");
            return res.status(401).json(
            {
                success:false,
                message:"invalid email or password"
            });
        }
        console.log("generating token");
        const token=generateToken(user._id.toString());
        res.cookie("token",token,cookieOptions);
        console.log("login successful");
        return res.status(200).json(
        {
            success:true,
            message:"Login successful",
            user:{
                id:user._id,
                fullName:user.fullName,
                email:user.email,
                role:user.role
            }
        });
    }
    catch(error:any)
    {
        console.log("login error:",error.message);
        return res.status(500).json(
        {
            success:false,
            message:error.message
        });
    }
};
export const logout=async(req:Request,res:Response)=>
{
    try
    {
        console.log("logout API called");
        res.clearCookie("token",cookieOptions);
        console.log("logout successful");
        return res.status(200).json(
        {
            success:true,
            message:"logout successful"
        });
    }
    catch(error:any)
    {
        console.log("logout Error:",error.message);
        return res.status(500).json(
        {
            success:false,
            message:error.message
        });
    }
};
export const getMe=async(req:any,res:Response)=>
{
    try
    {
        console.log("get me api called");
        return res.status(200).json(
        {
            success:true,
            user:req.user
        });
    }
    catch(error:any)
    {
        console.log("get me error:",error.message);
        return res.status(500).json(
        {
            success:false,
            message:error.message
        });
    }
};