import * as yup from "yup";

export const registerValidation=yup.object({

    fullName:yup
        .string()
        .trim()
        .required("Full name is required")
        .min(3,"Full name must be at least 3 characters")
        .max(50,"Full name cannot exceed 50 characters"),

    email:yup
        .string()
        .trim()
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
            "Please enter a valid email address"
        )
        .required("Email is required"),

    password:yup
        .string()
        .required("Password is required")
        .min(8,"Password must be at least 8 characters")
        .matches(
            /[A-Z]/,
            "Password must contain at least one uppercase letter"
        )
        .matches(
            /[a-z]/,
            "Password must contain at least one lowercase letter"
        )
        .matches(
            /[0-9]/,
            "Password must contain at least one number"
        )
        .matches(
            /[!@#$%^&*(),.?":{}|<>]/,
            "Password must contain at least one special character"
        ),

    role:yup
        .string()
        .oneOf(
            ["jobSeeker","jobRecruiter"],
            "Invalid role"
        )
        .required("Role is required")

});

export const loginValidation=yup.object({

    email:yup
        .string()
        .trim()
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
            "Please enter a valid email address"
        )
        .required("Email is required"),

    password:yup
        .string()
        .required("Password is required")

});