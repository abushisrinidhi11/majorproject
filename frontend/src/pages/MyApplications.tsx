import { useEffect, useState } from "react";
import { useApplication } from "../context/ApplicationContext";
import JobSeekerLayout from "../layouts/JobSeekerLayout";
import "../styles/myApplications.css";
import { toast } from "react-toastify";
import ConfirmDialog from "../components/ConfirmDialog";

function MyApplications()
{
    console.log("My Applications Page Rendering");

    const application = useApplication();

    const [confirmWithdrawId, setConfirmWithdrawId] = useState<string | null>(null);

    useEffect(() =>
    {
        console.log("Applications Page Loaded");

        console.log("Total Applications");

        console.log(application.applications.length);

    }, [application.applications]);

    const handleWithdrawClick = (id: string) =>
    {
        console.log("Withdraw Button Clicked");

        setConfirmWithdrawId(id);
    };

    const handleConfirmWithdraw = async () =>
    {
        if (!confirmWithdrawId)
        {
            return;
        }

        try
        {
            await application.withdrawApplication(confirmWithdrawId);

            console.log("Application Withdrawn Successfully");

            toast.success("Application withdrawn successfully");
        }
        catch (error: any)
        {
            console.log("Withdraw Failed");

            console.log(error);

            toast.error(
                error.response?.data?.message || "Failed to withdraw application"
            );
        }
        finally
        {
            setConfirmWithdrawId(null);
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
                                                            handleWithdrawClick(item._id)
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

                <ConfirmDialog
                    isOpen={confirmWithdrawId !== null}
                    title="Withdraw Application"
                    message="Are you sure you want to withdraw this application?"
                    onConfirm={handleConfirmWithdraw}
                    onCancel={() => setConfirmWithdrawId(null)}
                />

            </div>

        </JobSeekerLayout>
    );
}

export default MyApplications;
