import Application from "../models/Application";
import Job from "../models/Job";
import {Response} from "express";
import uploadToCloudinary from "../utils/uploadToCloudinary";
export const applyJob = async (req: any, res: Response) =>
{
    try
    {
        console.log("Apply Job API called");
        const { jobId } = req.body;
        if (!req.file)
        {
            console.log("Resume not uploaded");
            return res.status(400).json(
            {
                success: false,
                message: "resume is required"
            });
        }
        console.log("Checking if job exists");
        const job = await Job.findById(jobId);
        if (!job)
        {
            console.log("Job not found");
            return res.status(404).json(
            {
                success: false,
                message: "job not found"
            });
        }
        console.log("checking if already applied");
        const existingApplication = await Application.findOne({
            jobId,
            userId: req.user._id
        });
        if (existingApplication)
        {
            console.log("Already applied");
            return res.status(400).json(
            {
                success:false,
                message:"you have already applied for this job"
            });
        }
        console.log("Uploading Resume To Cloudinary");
        const resume=await uploadToCloudinary(
            req.file.buffer,
            "jobhunt/resumes"
        );
        console.log("resume uploaded successfully");
        console.log("creating application");
        const application=await Application.create({
            jobId,
            userId:req.user._id,
            resume
        });
        console.log("application submitted successfully");
        return res.status(201).json(
        {
            success:true,
            message:"job applied successfully",
            application
        });
    }
    catch(error:any)
    {
        console.log("apply job error:",error.message);
        return res.status(500).json(
        {
            success:false,
            message:error.message
        });
    }
};
export const getMyApplications=async(req:any,res:Response)=>
{
    try
    {
        console.log("Get my applications api called");
        const applications=await Application.find(
        {
            userId:req.user._id
        })
        .populate("jobId")
        .populate("userId","fullName email");
        console.log("applications fetched successfully");
        return res.status(200).json(
        {
            success:true,
            count:applications.length,
            applications
        });
    }
    catch(error:any)
    {
        console.log("Get my applications error:",error.message);
        return res.status(500).json(
        {
            success:false,
            message:error.message
        });
    }
};
export const getApplicationById=async(req:any,res:Response) =>
{
    try
    {
        console.log("get application by id api called");
        const application=await Application.findById(req.params.id)
            .populate("jobId")
            .populate("userId", "fullName email phone education experience skills");
        if (!application)
        {
            console.log("application not found");
            return res.status(404).json(
            {
                success:false,
                message:"application not found"
            });
        }
        console.log("Checking user role");
        if (req.user.role === "jobSeeker")
        {
            if(application.userId._id.toString()!==req.user._id.toString())
            {
                console.log("access denied");
                return res.status(403).json(
                {
                    success:false,
                    message:"access denied"
                });
            }
        }
        if(req.user.role==="jobRecruiter")
        {
            const job = await Job.findById(application.jobId._id);
            if (!job)
            {
                return res.status(404).json({
                    success: false,
                    message: "job not found"
                });
            }
            if(job.postedBy.toString()!==req.user._id.toString())
            {
                console.log("access denied");
                return res.status(403).json(
                {
                    success:false,
                    message:"access denied"
                });
            }
        }
        console.log("application fetched successfully");
        return res.status(200).json(
        {
            success: true,
            application
        });
    }
    catch(error:any)
    {
        console.log("get application by id error:", error.message);
        return res.status(500).json(
        {
            success:false,
            message:error.message
        });
    }
};

export const updateApplicationStatus=async(req:any,res:Response)=>
{
    try
    {
        console.log("update application status api called");
        const application=await Application.findById(req.params.id);
        if(!application)
        {
            console.log("application not found");
            return res.status(404).json(
            {
                success:false,
                message:"application not found"
            });
        }
        console.log("finding related job");
        const job=await Job.findById(application.jobId);
        if(!job)
        {
            console.log("job not found");
            return res.status(404).json(
            {
                success:false,
                message:"job not found"
            });
        }
        console.log("Checking recruiter ownership");
        if(job.postedBy.toString()!==req.user._id.toString())
        {
            console.log("access denied");
            return res.status(403).json(
            {
                success:false,
                message:"access denied"
            });
        }
        console.log("updating application status");
        application.status=req.body.status;
        await application.save();
        console.log("application status updated successfully");
        return res.status(200).json(
        {
            success:true,
            message:"application status updated successfully",
            application
        });
    }
    catch(error:any)
    {
        console.log("update application status error:",error.message);
        return res.status(500).json(
        {
            success:false,
            message:error.message
        });
    }
};
export const getApplicationsByJob=async (req:any,res: Response) =>
{
    try
    {
        console.log("get applications by job API called");
        console.log("checking if job exists");
        const job = await Job.findById(req.params.jobId);
        if (!job)
        {
            console.log("job not found");
            return res.status(404).json(
            {
                success:false,
                message:"job not found"
            });
        }
        console.log("checking recruiter ownership");
        if (job.postedBy.toString()!== req.user._id.toString())
        {
            console.log("Access denied");
            return res.status(403).json(
            {
                success:false,
                message:"you can view applications only for your own jobs"
            });
        }
        const applications=await Application.find(
        {
            jobId: req.params.jobId
        })
        .populate(
            "userId",
            "fullName email phone education experience skills"
        );
        console.log("applications fetched successfully");
        return res.status(200).json(
        {
            success:true,
            count:applications.length,
            applications
        });
    }
    catch(error:any)
    {
        console.log("Get applications by job error:",error.message);
        return res.status(500).json(
        {
            success:false,
            message:error.message
        });
    }
};
export const withdrawApplication=async(req:any,res:Response) =>
{
    try
    {
        console.log("Withdraw Application API called");
        console.log("Finding application");
        const application = await Application.findById(req.params.id);
        if (!application)
        {
            console.log("Application not found");
            return res.status(404).json(
            {
                success: false,
                message: "Application not found"
            });
        }
        console.log("Checking application owner");
        if (application.userId.toString() !== req.user._id.toString())
        {
            console.log("Access denied");
            return res.status(403).json({
                success: false,
                message: "You can withdraw only your own application"
            });
        }
        console.log("Deleting application");
        await application.deleteOne();
        console.log("Application withdrawn successfully");
        return res.status(200).json(
        {
            success: true,
            message: "Application withdrawn successfully"
        });
    }
    catch(error:any)
    {
        console.log("Withdraw Application Error:", error.message);
        return res.status(500).json(
        {
            success: false,
            message: error.message
        });
    }
};
export const getAllApplications = async (req: any, res: Response) =>
{
    try
    {
        console.log("Get All Applications API called");
        console.log("Finding jobs posted by recruiter");
        const jobs = await Job.find(
        {
            postedBy: req.user._id
        });
        const jobIds = jobs.map(job => job._id);
        console.log("Finding applications");
        const applications = await Application.find(
        {
            jobId: { $in: jobIds }
        })
        .populate("jobId")
        .populate(
            "userId",
            "fullName email phone education experience skills"
        );
        console.log("Applications fetched successfully");
        return res.status(200).json(
        {
            success: true,
            count: applications.length,
            applications
        });
    }
    catch(error:any)
    {
        console.log("Get All Applications Error:", error.message);
        return res.status(500).json(
        {
            success: false,
            message: error.message
        });
    }
};