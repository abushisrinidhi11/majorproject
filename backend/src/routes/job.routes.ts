import express from "express";
import {createJob,getAllJobs,getJobById,updateJob,deleteJob} from "../controllers/job.controller";
import {protect,authorize} from "../middlewares/auth.middleware";
import validate from "../middlewares/validate.middleware";
import {createJobValidation,updateJobValidation} from "../validations/job.validation";
const router=express.Router();
router.post(
    "/",
    protect,
    authorize("jobRecruiter"),
    validate(createJobValidation),
    createJob
);

router.get(
    "/",
    protect,
    getAllJobs
);

router.get(
    "/:id",
    protect,
    getJobById
);

router.put(
    "/:id",
    protect,
    authorize("jobRecruiter"),
    validate(updateJobValidation),
    updateJob
);

router.delete(
    "/:id",
    protect,
    authorize("jobRecruiter"),
    deleteJob
);

export default router;