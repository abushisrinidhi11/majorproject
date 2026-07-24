import { useEffect } from "react";
import { useApplication } from "../context/ApplicationContext";
import JobSeekerLayout from "../layouts/JobSeekerLayout";
import "../styles/myApplications.css";

function MyApplications()
{
    console.log("My Applications Page Rendering");

    const application = useApplication();

    useEffect(() =>
    {
        console.log("Applications Page Loaded");

        console.log("Total Applications");

        console.log(application.applications.length);

    }, [application.applications]);

    const handleWithdraw = async (id: string) =>
    {
        console.log("Withdraw Button Clicked");

        try
        {
            await application.withdrawApplication(id);

            console.log("Application Withdrawn Successfully");
        }
        catch (error)
        {
            console.log("Withdraw Failed");

            console.log(error);
        }
    };

    if (application.loading)
    {
        console.log("Applications Loading");

        return (
            <JobSeekerLayout>

                <div className="loadingContainer">

                    <h2>Loading Applications...</h2>

                </div>

            </JobSeekerLayout>
        );
    }

    return (
        <JobSeekerLayout>

            <div className="applicationsPage">

                <div className="applicationsHeader">

                    <h1>My Applications</h1>

                    <p>

                        Total Applications :

                        <span>

                            {" "}

                            {application.applications.length}

                        </span>

                    </p>

                </div>

                <div className="applicationsTableCard">

                    <table className="applicationsTable">

                        <thead>

                            <tr>

                                <th>Job Title</th>

                                <th>Company</th>

                                <th>Location</th>

                                <th>Status</th>

                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                application.applications.length === 0 ?

                                    (

                                        <tr>

                                            <td
                                                colSpan={5}
                                                className="emptyRow"
                                            >

                                                No Applications Found

                                            </td>

                                        </tr>

                                    )

                                    :

                                    application.applications.map(
                                        (item: any) => (

                                            <tr key={item._id}>

                                                <td>{item.jobId?.title}</td>

                                                <td>{item.jobId?.company}</td>

                                                <td>{item.jobId?.location}</td>

                                                <td>

                                                    <span className="statusBadge">
                                                        {item.status}
                                                    </span>

                                                </td>

                                                <td>

                                                    <button
                                                        className="withdrawButton"
                                                        type="button"
                                                        onClick={() =>
                                                            handleWithdraw(item._id)
                                                        }
                                                    >
                                                        Withdraw
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

export default MyApplications;
