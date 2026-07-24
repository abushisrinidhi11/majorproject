import {Link} from "react-router-dom";
function JobCard({job}:any)
{
    console.log("Job Card Rendering");
    return(
        <div>
            <h2>{job.title}</h2>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Experience:</strong> {job.experience}</p>
            <p><strong>Salary:</strong> ₹{job.salary}</p>
            <p><strong>Workplace:</strong> {job.workplaceType}</p>
            <p><strong>Employment:</strong> {job.employmentType}</p>
            <Link to={"/job-details/"+job._id}>
            <button>View Details</button>
        </Link>
</div>
);
}
export default JobCard;