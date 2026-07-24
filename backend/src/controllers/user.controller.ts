import User from "../models/User";
import {Request,Response} from "express";
export const getProfile=async(req:any,res:Response)=>
{
    try
    {
        console.log("Get profile API called");
        console.log("finding user");
        const user=await User.findById(req.user._id).select("-password");
        if(!user)
        {
            console.log("user not found");
            return res.status(404).json(
            {
                success:false,
                message:"user not found"
            });
        }
        console.log("Profile fetched successfully");
        return res.status(200).json(
        {
            success:true,
            user
        });
    }
    catch(error:any)
    {
        console.log("Get profile error:",error.message);
        return res.status(500).json(
        {
            success:false,
            message:error.message
        });
    }
};
export const updateProfile = async (req: any, res: Response) => {
    try {
        console.log("Update Profile API called");

        const user = await User.findById(req.user._id);

        if (!user) {
            console.log("User not found");

            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        console.log("Checking user role");

        if (user.role === "jobSeeker") {

            console.log("Updating Job Seeker Profile");

            if (req.body.phone) {
                user.phone = req.body.phone;
            }

            if (req.body.education) {
                user.education = req.body.education;
            }

            if (req.body.experience) {
                user.experience = req.body.experience;
            }

            if (req.body.skills) {
                user.skills = req.body.skills;
            }

        } else {

            console.log("Updating Job Recruiter Profile");

            if (req.body.phone) {
                user.phone = req.body.phone;
            }

            if (req.body.companyName) {
                user.companyName = req.body.companyName;
            }

            if (req.body.designation) {
                user.designation = req.body.designation;
            }
        }

        await user.save();

        console.log("Profile updated successfully");

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user
        });

    } catch (error: any) {

        console.log("Update Profile Error:", error.message);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};