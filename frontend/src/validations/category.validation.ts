import * as Yup from "yup";

console.log("Category Validation Loaded");

export const categoryValidation = Yup.object({

    name: Yup.string()
        .trim()
        .min(3, "Category name must be at least 3 characters")
        .max(50, "Category name cannot exceed 50 characters")
        .required("Category Name is required"),

    description: Yup.string()
        .trim()
        .min(10, "Description must be at least 10 characters")
        .max(300, "Description cannot exceed 300 characters")
        .required("Description is required")

});
