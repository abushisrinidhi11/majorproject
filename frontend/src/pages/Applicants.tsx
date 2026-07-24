import { useEffect } from "react";
import { toast } from "react-toastify";
import { useApplication } from "../context/ApplicationContext";
import RecruiterLayout from "../layouts/RecruiterLayout";
import "../styles/applicants.css";

function Applicants()
{
    console.log("Applicants Page Rendering");

    const application = useApplication();

    useEffect(() =>
    {
        console.log("Applicants Page Loaded");

        application.getRecruiterApplications();

    }, []);

    if (application.loading)
    {
        console.log("Loading Applicants");

        return (
            <RecruiterLayout>

                <div className="loadingContainer">

                    <h2>Loading Applicants...</h2>

                </div>

            </RecruiterLayout>
        );
    }

    const handleStatusChange = async (
        id: string,
        status: string
    ) =>
    {
        console.log("Status Changed");

        try
        {
            await application.updateApplicationStatus(
                id,
                status
            );

            console.log("Status Updated Successfully");
        }
        catch (error)
        {
            console.log("Status Update Failed");

            console.log(error);
        }
    };

    const handleView = (item: any) =>
    {
        console.log("Applicant Details");

        console.log(item);

        toast.info(
            <div>
                <p><strong>Applicant:</strong> {item.userId?.fullName}</p>
                <p><strong>Email:</strong> {item.userId?.email}</p>
                <p><strong>Job:</strong> {item.jobId?.title}</p>
                {
                    item.resume?.url &&
                    <p>
                        <a
                            href={item.resume.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View Resume
                        </a>
                    </p>
                }
            </div>,
            { autoClose: 8000 }
        );
    };

    return (

        <RecruiterLayout>

            <div className="applicantsPage">

                <div className="applicantsHeader">

                    <h1>

                        Applicants

                    </h1>

                    <p>

                        Total Applicants :

                        <span>

                            {" "}

                            {application.applications.length}

                        </span>

                    </p>

                </div>

                <div className="tableCard">

                    <table className="applicantsTable">

                        <thead>

                            <tr>

                                <th>Name</th>

                                <th>Job</th>

                                <th>Email</th>

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

                                                No Applicants Found

                                            </td>

                                        </tr>

                                    )

                                    :

                                    application.applications.map(
                                        (item: any) => (

                                            <tr key={item._id}>

                                                <td>

                                                    {item.userId?.fullName}

                                                </td>

                                                <td>

                                                    {item.jobId?.title}

                                                </td>

                                                <td>

                                                    {item.userId?.email}

                                                </td>

                                                <td>

                                                    <select
                                                        className="statusDropdown"
                                                        value={item.status}
                                                        onChange={(event) =>
                                                            handleStatusChange(
                                                                item._id,
                                                                event.target.value
                                                            )
                                                        }
                                                    >

                                                        <option value="Applied">
                                                            Applied
                                                        </option>

                                                        <option value="Under Review">
                                                            Under Review
                                                        </option>

                                                        <option value="Shortlisted">
                                                            Shortlisted
                                                        </option>

                                                        <option value="Interview Scheduled">
                                                            Interview Scheduled
                                                        </option>

                                                        <option value="Rejected">
                                                            Rejected
                                                        </option>

                                                        <option value="Hired">
                                                            Hired
                                                        </option>

                                                    </select>

                                                </td>

                                                <td>

                                                    <button
                                                        className="viewButton"
                                                        onClick={() =>
                                                            handleView(item)
                                                        }
                                                    >

                                                        View

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

        </RecruiterLayout>

    );
}

export default Applicants;