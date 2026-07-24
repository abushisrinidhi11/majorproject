import mongoose from "mongoose";
const userSchema=new mongoose.Schema(
{
    fullName:
    {
        type:String,
        required:true,
        trim:true
    },
    email:
    {
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:
    {
        type:String,
        required:true,
        select:false,
        minlength:8
    },
    phone:
    {
        type: String,
        trim: true,
        match: [/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"]
    },
    role:
    {
        type:String,
        enum:["jobSeeker","jobRecruiter"],
        default:"jobSeeker"
    },
    education:
    {
        type:String,
        enum:[
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
        ]
    },

    experience:{
        type:String,
        enum:[
            "Student",
            "Fresher",
            "0 Years",
            "1 Year",
            "2 Years",
            "3 Years",
            "4-6 Years",
            "7-10 Years",
            "10+ Years"
        ]
    },
    skills:[
        {
            type:String,
            trim:true
        }
    ],
    companyName:{
        type:String,
        trim:true
    },
    designation:{
        type:String,
        trim:true
    }
},{
    timestamps:true
});
const User=mongoose.models.User||mongoose.model("User",userSchema);
export default User;