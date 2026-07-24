import express from "express";
import upload from "../middlewares/upload.middleware";
import {applyJob,getMyApplications,getApplicationById,getApplicationsByJob,updateApplicationStatus,withdrawApplication,getAllApplications} from "../controllers/application.controller";
import {protect,authorize} from "../middlewares/auth.middleware";
import validate from "../middlewares/validate.middleware";
import {applyJobValidation,updateApplicationStatusValidation} from "../validations/application.validation";

const router=express.Router();
router.post(
    "/",
    protect,
    authorize("jobSeeker"),
    upload.single("resume"),
    validate(applyJobValidation),
    applyJob
);

router.get(
    "/my-applications",
    protect,
    authorize("jobSeeker"),
    getMyApplications
);

router.delete(
    "/:id",
    protect,
    authorize("jobSeeker"),
    withdrawApplication
);

router.get(
    "/",
    protect,
    authorize("jobRecruiter"),
    getAllApplications
);

router.get(
    "/:id",
    protect,
    getApplicationById
);

router.get(
    "/job/:jobId",
    protect,
    authorize("jobRecruiter"),
    getApplicationsByJob
);

router.put(
    "/:id",
    protect,
    authorize("jobRecruiter"),
    validate(updateApplicationStatusValidation),
    updateApplicationStatus
);

export default router;