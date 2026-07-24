import mongoose from "mongoose";
const applicationSchema=new mongoose.Schema(
{
    jobId:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:true
    },
    userId:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    resume:{
        url:
        {
            type:String,
            required:true
        },
        publicId:
        {
            type:String,
            required:true
        }
    },
    status:
    {
        type:String,
        enum:[
            "Applied",
            "Under Review",
            "Shortlisted",
            "Interview Scheduled",
            "Rejected",
            "Hired"
        ],
        default:"Applied"
    },
    appliedAt:{
        type:Date,
        default:Date.now
    }
},
{
    timestamps:true
});

const Application=mongoose.models.Application||mongoose.model("Application",applicationSchema);
export default Application;