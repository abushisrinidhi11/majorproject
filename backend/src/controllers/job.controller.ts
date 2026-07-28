import Job from "../models/Job";
import {Request,Response} from "express";
import Category from "../models/Category";
import User from "../models/User";
import { getGenAI } from "../config/gemini";
import Application from "../models/Application";
const createJob=async (req: any, res: Response) =>
{
    try
    {
        console.log("Create Job API called");
        const
        {
            title,
            company,
            location,
            workplaceType,
            employmentType,
            experience,
            salary,
            description,
            category
        }=req.body;
        console.log("checking whether category exists");
        const existingCategory=await Category.findById(category);
        if (!existingCategory)
        {
            console.log("Category not found");
            return res.status(404).json(
            {
                success:false,
                message:"Category not found"
            });
        }
        console.log("creating job");
        const job = await Job.create(
        {
            title,
            company,
            location,
            workplaceType,
            employmentType,
            experience,
            salary,
            description,
            category,
            postedBy:req.user._id
        });
        console.log("job created successfully");
        return res.status(201).json({
            success:true,
            message:"job created successfully",
            job
        });
    }
    catch(error:any)
    {
        console.log("create job error:", error.message);
        return res.status(500).json(
        {
            success:false,
            message:error.message
        });
    }
};
const getAllJobs=async(req:Request,res:Response)=>
{
    try
    {
        console.log("Get All Jobs API called");
        const jobs=await Job.find()
        .populate("category")
        .populate("postedBy","fullName email companyName designation");
        console.log("Jobs fetched successfully");
        return res.status(200).json(
        {
            success:true,
            count:jobs.length,
            jobs
        });
    }
    catch(error:any)
    {
        console.log("get all jobs error:",error.message);
        return res.status(500).json(
        {
            success:false,
            message:error.message
        });
    }
};

const getJobById=async(req:Request,res:Response)=>
{
    try
    {
        console.log("Get Job By Id API called");
        const job=await Job.findById(req.params.id)
        .populate("category")
        .populate("postedBy","fullName email companyName designation");
        if(!job)
        {
            console.log("job not found");
            return res.status(404).json(
            {
                success:false,
                message:"job not found"
            });
        }
        console.log("job fetched successfully");
        return res.status(200).json(
        {
            success:true,
            job
        });
    }
    catch(error:any)
    {
        console.log("get job by Id error:",error.message);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

const updateJob=async(req:any,res:Response)=>
{
    try
    {
        console.log("update job API called");
        const job=await Job.findById(req.params.id);
        if(!job)
        {
            console.log("job not found");
            return res.status(404).json(
            {
                success:false,
                message:"Job not found"
            });
        }
        if(job.postedBy.toString()!==req.user._id.toString())
        {
            console.log("access denied");
            return res.status(403).json(
            {
                success:false,
                message:"you can update only your own jobs"
            });
        }
        job.title=req.body.title||job.title;
        job.company=req.body.company||job.company;
        job.location=req.body.location||job.location;
        job.workplaceType=req.body.workplaceType||job.workplaceType;
        job.employmentType=req.body.employmentType||job.employmentType;
        job.experience=req.body.experience||job.experience;
        job.salary=req.body.salary||job.salary;
        job.description=req.body.description||job.description;
        job.category=req.body.category||job.category;
        await job.save();
        console.log("job updated successfully");
        return res.status(200).json(
        {
            success:true,
            message:"Job updated successfully",
            job
        });
    }
    catch(error:any)
    {
        console.log("update job error:",error.message);
        return res.status(500).json(
        {
            success:false,
            message:error.message
        });
    }
};

const deleteJob=async(req:any,res:Response)=>
{
    try
    {
        console.log("delete job API called");
        const job=await Job.findById(req.params.id);
        if(!job)
        {
            console.log("job not found");
            return res.status(404).json(
            {
                success:false,
                message:"job not found"
            });
        }
        if(job.postedBy.toString()!==req.user._id.toString())
        {
            console.log("access denied");
            return res.status(403).json(
            {
                success:false,
                message:"you can delete only your own jobs"
            });
        }
        await job.deleteOne();
        console.log("Deleting related applications");
        await Application.deleteMany({ jobId: job._id });
        console.log("job deleted successfully");
        return res.status(200).json(
        {
            success:true,
            message:"Job deleted successfully"
        });
    }
    catch(error:any)
    {
        console.log("Delete Job Error:",error.message);
        return res.status(500).json(
        {
            success:false,
            message:error.message
        });
    }
};

export{createJob,getAllJobs,getJobById,updateJob,deleteJob};
export const generateCoverLetter = async (req: any, res: Response) =>
{
    try
    {
        console.log("Generate Cover Letter API called");

        const job = await Job.findById(req.params.id);

        if (!job)
        {
            console.log("Job not found");

            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        const user = await User.findById(req.user._id);

        if (!user)
        {
            console.log("User not found");

            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        console.log("Calling Gemini API");

        const genAI = await getGenAI();

        // TEMPORARY DEBUG - list which models this API key can access
        const availableModels = await genAI.models.list();
        console.log("=== AVAILABLE MODELS FOR THIS KEY ===");
        for (const model of availableModels.page)
        {
            console.log(" -", model.name);
        }
        console.log("=== END MODEL LIST ===");

        const prompt =
            "Write a professional, concise cover letter (max 350 words) " +
            "for the following job application. Do not include any " +
            "placeholder text like [Your Name] - use the real details " +
            "given below. Return only the cover letter text, no preamble.\n\n" +
            "JOB DETAILS\n" +
            "Title: " + job.title + "\n" +
            "Company: " + job.company + "\n" +
            "Description: " + job.description + "\n\n" +
            "APPLICANT DETAILS\n" +
            "Name: " + user.fullName + "\n" +
            "Education: " + (user.education || "Not specified") + "\n" +
            "Experience: " + (user.experience || "Not specified") + "\n" +
            "Skills: " + ((user.skills && user.skills.join(", ")) || "Not specified");

        const aiResponse = await genAI.models.generateContent({
            model: "gemini-3.6-flash",
            contents: prompt
        });

        const coverLetter = aiResponse.text || "";

        console.log("Cover Letter Generated Successfully");

        return res.status(200).json({
            success: true,
            coverLetter
        });
    }
    catch (error: any)
    {
        console.log("Generate Cover Letter Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to generate cover letter"
        });
    }
};
