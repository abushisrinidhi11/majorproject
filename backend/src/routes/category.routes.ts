import express from "express";
import {createCategory,getAllCategories,getCategoryById,updateCategory,deleteCategory} from "../controllers/category.controller";
import {protect,authorize} from "../middlewares/auth.middleware";
import validate from "../middlewares/validate.middleware";
import {createCategoryValidation,updateCategoryValidation} from "../validations/category.validation";

const router=express.Router();
router.post(
    "/",
    protect,
    authorize("jobRecruiter"),
    validate(createCategoryValidation),
    createCategory
);

router.get(
    "/",
    protect,
    getAllCategories
);

router.get(
    "/:id",
    protect,
    getCategoryById
);

router.put(
    "/:id",
    protect,
    authorize("jobRecruiter"),
    validate(updateCategoryValidation),
    updateCategory
);

router.delete(
    "/:id",
    protect,
    authorize("jobRecruiter"),
    deleteCategory
);
export default router;