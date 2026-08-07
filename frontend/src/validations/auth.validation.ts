import * as Yup from "yup";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

const fullNameRegex = /^[A-Za-z][A-Za-z0-9 ]*$/;

export const loginValidation = Yup.object({

    email: Yup.string()
        .trim()
        .matches(emailRegex, "Enter a valid email address")
        .required("Email is required"),

    password: Yup.string()
        .required("Password is required")

});

export const registerValidation = Yup.object({

    fullName: Yup.string()
        .trim()
        .min(3, "Full name must be at least 3 characters")
        .max(50, "Full name cannot exceed 50 characters")
        .matches(/^[A-Za-z]/, "Full name must start with a letter")
        .matches(
            fullNameRegex,
            "Full name can only contain letters, numbers, and spaces"
        )
        .required("Full Name is required"),

    email: Yup.string()
        .trim()
        .matches(emailRegex, "Enter a valid email address")
        .required("Email is required"),

    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
            /[!@#$%^&*(),.?":{}|<>]/,
            "Password must contain at least one special character"
        )
        .required("Password is required"),

    role: Yup.string()
        .oneOf(
            [
                "jobSeeker",
                "jobRecruiter"
            ],
            "Invalid Role"
        )
        .required("Role is required")

});
