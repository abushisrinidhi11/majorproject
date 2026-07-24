import * as yup from "yup";

// Treat empty strings as "not provided" so optional fields don't fail
// format/enum checks when the user hasn't filled them in yet.
const emptyToUndefined = (value: any, originalValue: any) =>
    (typeof originalValue === "string" && originalValue.trim() === "")
        ? undefined
        : value;

export const updateJobSeekerProfileValidation=yup.object({

    phone:yup
        .string()
        .transform(emptyToUndefined)
        .matches(
            /^[6-9]\d{9}$/,
            "Enter a valid 10-digit mobile number"
        ),

    education:yup
        .string()
        .transform(emptyToUndefined)
        .oneOf(
            [
                "10th",
                "Intermediate",
                "Diploma",
                "ITI",
                "B.Tech",
                "B.E",
                "B.Sc",
                "BCA",
                "B.Com",
                "B.A",
                "BBA",
                "B.Pharm",
                "B.Arch",
                "MBBS",
                "BDS",
                "B.Sc Nursing",
                "LLB",
                "M.Tech",
                "M.E",
                "M.Sc",
                "MCA",
                "M.Com",
                "M.A",
                "MBA",
                "M.Pharm",
                "MDS",
                "LLM",
                "Ph.D",
                "Other"
            ],
            "Invalid education"
        ),

    experience:yup
        .string()
        .transform(emptyToUndefined)
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

    skills:yup
        .array()
        .of(yup.string().trim())

});

export const updateJobRecruiterProfileValidation=yup.object({

    phone:yup
        .string()
        .transform(emptyToUndefined)
        .matches(
            /^[6-9]\d{9}$/,
            "Enter a valid 10-digit mobile number"
        ),

    companyName:yup
        .string()
        .trim()
        .transform(emptyToUndefined)
        .min(2,"Company name must be at least 2 characters")
        .max(100,"Company name cannot exceed 100 characters"),

    designation:yup
        .string()
        .trim()
        .transform(emptyToUndefined)
        .min(2,"Designation must be at least 2 characters")
        .max(100,"Designation cannot exceed 100 characters")

});
