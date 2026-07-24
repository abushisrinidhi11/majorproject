import * as Yup from "yup";

console.log("Category Validation Loaded");

export const categoryValidation=Yup.object({

name:Yup.string()
.required("Category Name is required"),

description:Yup.string()
.required("Description is required")

});