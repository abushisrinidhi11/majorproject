import * as Yup from "yup";

console.log("Auth Validation Loaded");

export const loginValidation = Yup.object({

    email: Yup.string()
        .email("Invalid Email")
        .required("Email is required"),

    password: Yup.string()
        .required("Password is required")

});

export const registerValidation = Yup.object({

    fullName: Yup.string()
        .required("Full Name is required"),

    email: Yup.string()
        .email("Invalid Email")
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