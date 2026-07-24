import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useJob } from "../context/JobContext";
import JobSeekerLayout from "../layouts/JobSeekerLayout";
import "../styles/jobs.css";

function Jobs()
{
    console.log("Jobs Page Rendering");

    const navigate = useNavigate();

    const job = useJob();

    useEffect(() =>
    {
        console.log("Jobs Page Loaded");

        console.log("Total Jobs");

        console.log(job.jobs.length);

    }, [job.jobs]);

    if (job.loading)
    {
        return (
            <JobSeekerLayout>

                <div className="loadingContainer">

                    <h2>Loading Jobs...</h2>

                </div>

            </JobSeekerLayout>
        );
    }

    const handleView = (id: string) =>
    {
        console.log("View Job Button Clicked");

        console.log(id);

        navigate("/job-details/" + id);
    };

    return (

        <JobSeekerLayout>

            <div className="jobsPage">

                <div className="jobsHeader">

                    <h1>

                        Available Jobs

                    </h1>

                    <p>

                        Total Jobs :

                        <span>

                            {" "}

                            {job.jobs.length}

                        </span>

                    </p>

                </div>

                <div className="jobsTableCard">

                    <table className="jobsTable">

                        <thead>

                            <tr>

                                <th>Title</th>

                                <th>Company</th>

                                <th>Location</th>

                                <th>Experience</th>

                                <th>Salary</th>

                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                job.jobs.length === 0 ?

                                    (

                                        <tr>

                                            <td
                                                colSpan={6}
                                                className="emptyRow"
                                            >

                                                No Jobs Available

                                            </td>

                                        </tr>

                                    )

                                    :

                                    job.jobs.map(
                                        (item: any) => (

                                            <tr key={item._id}>

                                                <td>

                                                    {item.title}

                                                </td>

                                                <td>

                                                    {item.company}

                                                </td>

                                                <td>

                                                    {item.location}

                                                </td>

                                                <td>

                                                    {item.experience}

                                                </td>

                                                <td>

                                                    ₹ {item.salary}

                                                </td>

                                                <td>

                                                    <button
                                                        className="viewButton"
                                                        type="button"
                                                        onClick={() =>
                                                            handleView(item._id)
                                                        }
                                                    >

                                                        View Details

                                                    </button>

                                                </td>

                                            </tr>

                                        )
                                    )

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </JobSeekerLayout>

    );
}

export default Jobs;