import express from "express";
import {register,login,logout,getMe} from "../controllers/auth.controller";
import validate from "../middlewares/validate.middleware";
import {registerValidation,loginValidation} from "../validations/auth.validation";
import {protect} from "../middlewares/auth.middleware";
const router=express.Router();
router.post(
    "/register",
    validate(registerValidation),
    register
);

router.post(
    "/login",
    validate(loginValidation),
    login
);

router.post(
    "/logout",
    protect,
    logout
);

router.get(
    "/me",
    protect,
    getMe
);

export default router;