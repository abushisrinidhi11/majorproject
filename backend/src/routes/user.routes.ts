import express from "express";

import {
    getProfile,
    updateProfile
} from "../controllers/user.controller";

import {
    protect
} from "../middlewares/auth.middleware";

import validate from "../middlewares/validate.middleware";

import {
    updateJobSeekerProfileValidation,
    updateJobRecruiterProfileValidation
} from "../validations/user.validation";

import logger from "../utils/logger";

const router=express.Router();

router.get(
    "/profile",
    protect,
    getProfile
);

router.put(
    "/profile",
    protect,
    async(req:any,res,next)=>
    {
        try
        {
            logger.log("Checking user role for validation");

            if(req.user.role==="jobSeeker")
            {
                return validate(updateJobSeekerProfileValidation)(req,res,next);
            }

            return validate(updateJobRecruiterProfileValidation)(req,res,next);
        }
        catch(error)
        {
            next(error);
        }
    },
    updateProfile
);

export default router;