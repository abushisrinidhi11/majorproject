import * as yup from "yup";

export const createCategoryValidation=yup.object({

    name:yup
        .string()
        .trim()
        .required("Category name is required")
        .min(3,"Category name must be at least 3 characters")
        .max(50,"Category name cannot exceed 50 characters"),

    description:yup
        .string()
        .trim()
        .required("Category description is required")
        .min(10,"Description must be at least 10 characters")
        .max(300,"Description cannot exceed 300 characters")

});

export const updateCategoryValidation=yup.object({

    name:yup
        .string()
        .trim()
        .min(3,"Category name must be at least 3 characters")
        .max(50,"Category name cannot exceed 50 characters"),

    description:yup
        .string()
        .trim()
        .min(10,"Description must be at least 10 characters")
        .max(300,"Description cannot exceed 300 characters")

});