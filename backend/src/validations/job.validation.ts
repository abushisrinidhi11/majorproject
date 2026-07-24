import * as yup from "yup";

export const createJobValidation=yup.object({

    title:yup
        .string()
        .trim()
        .required("Job title is required"),

    company:yup
        .string()
        .trim()
        .required("Company name is required"),

    location:yup
        .string()
        .trim()
        .required("Location is required"),

    workplaceType:yup
        .string()
        .oneOf(
            [
                "On-site",
                "Remote",
                "Hybrid"
            ],
            "Invalid workplace type"
        )
        .required("Workplace type is required"),

    employmentType:yup
        .string()
        .oneOf(
            [
                "Full-Time",
                "Part-Time",
                "Internship",
                "Contract",
                "Freelance",
                "Temporary"
            ],
            "Invalid employment type"
        )
        .required("Employment type is required"),

    experience:yup
        .string()
        .oneOf(
            [
                "Student",
                "Fresher",
                "0 Years",
                "1 Year",
                "2 Years",
                "3 Years",
                "4-6 Years",
                "7-10 Years",
                "10+ Years"
            ],
            "Invalid experience"
        )
        .required("Experience is required"),

    salary:yup
        .number()
        .typeError("Salary must be a number")
        .positive("Salary must be greater than zero")
        .required("Salary is required"),

    description:yup
        .string()
        .trim()
        .required("Job description is required"),

    category:yup
        .string()
        .required("Category is required")

});

export const updateJobValidation=yup.object({

    title:yup
        .string()
        .trim(),

    company:yup
        .string()
        .trim(),

    location:yup
        .string()
        .trim(),

    workplaceType:yup
        .string()
        .oneOf(
            [
                "On-site",
                "Remote",
                "Hybrid"
            ],
            "Invalid workplace type"
        ),

    employmentType:yup
        .string()
        .oneOf(
            [
                "Full-Time",
                "Part-Time",
                "Internship",
                "Contract",
                "Freelance",
                "Temporary"
            ],
            "Invalid employment type"
        ),

    experience:yup
        .string()
        .oneOf(
            [
                "Student",
                "Fresher",
                "0 Years",
                "1 Year",
                "2 Years",
                "3 Years",
                "4-6 Years",
                "7-10 Years",
                "10+ Years"
            ],
            "Invalid experience"
        ),

    salary:yup
        .number()
        .typeError("Salary must be a number")
        .positive("Salary must be greater than zero"),

    description:yup
        .string()
        .trim(),

    category:yup
        .string()

});