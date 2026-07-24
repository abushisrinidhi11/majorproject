import mongoose from "mongoose";
const jobSchema=new mongoose.Schema(
{
    title:
    {
        type:String,
        required:true
    },
    company:
    {
        type:String,
        required:true
    },
    location:
    {
        type:String,
        required:true
    },
    workplaceType:
    {
        type:String,
        enum:["On-site",
            "Remote",
            "Hybrid"
        ],
        required:true
    },
    employmentType:
    {
        type:String,
        enum:["Full-Time",
            "Part-Time",
            "Internship",
            "Contract",
            "Freelance",
            "Temporary"
        ],
        required:true
    },
    experience:
    {
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
        ],
        required:true
    },
    salary:{
        type:Number,
        required:true
    },

    description:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},
{
    timestamps:true
});
const Job=mongoose.models.Job||mongoose.model("Job",jobSchema);
export default Job;