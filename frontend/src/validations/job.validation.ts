import * as Yup from "yup";

console.log("Job Validation Loaded");

export const jobValidation=Yup.object({

title:Yup.string()
.required("Job Title is required"),

company:Yup.string()
.required("Company is required"),

location:Yup.string()
.required("Location is required"),

workplaceType:Yup.string()
.required("Workplace Type is required"),

employmentType:Yup.string()
.required("Employment Type is required"),

experience:Yup.string()
.required("Experience is required"),

salary:Yup.number()
.required("Salary is required"),

description:Yup.string()
.required("Description is required"),

category:Yup.string()
.required("Category is required")

});