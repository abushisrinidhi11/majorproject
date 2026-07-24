import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useJob } from "../context/JobContext";
import { useCategory } from "../context/CategoryContext";
import { useApplication } from "../context/ApplicationContext";
import { useAuth } from "../context/AuthContext";
import RecruiterLayout from "../layouts/RecruiterLayout";
import "../styles/recruiterDashboard.css";

function RecruiterDashboard()
{
    console.log("Recruiter Dashboard Rendering");

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const job = useJob();

    const category = useCategory();

    const application = useApplication();

    useEffect(() =>
    {
        console.log("Recruiter Dashboard Loaded");

        application.getRecruiterApplications();

    }, []);

    const myJobs = job.jobs.filter(
        (item: any) => item.postedBy?._id === user?._id
    );

    useEffect(() =>
    {
        console.log(myJobs.length);

        console.log(category.categories.length);

        console.log(application.applications.length);

    }, [
        job.jobs,
        category.categories,
        application.applications
    ]);

    if (
        job.loading ||
        category.loading ||
        application.loading
    )
    {
        return (
            <RecruiterLayout>

                <div className="loadingContainer">

                    <h2>Loading Dashboard...</h2>

                </div>

            </RecruiterLayout>
        );
    }

    const handleCreateJob = () =>
    {
        console.log("Create Job");

        navigate("/job");
    };

    const handleCategory = () =>
    {
        console.log("Manage Categories");

        navigate("/category");
    };

    const handleApplicants = () =>
    {
        console.log("Applicants");

        navigate("/applicants");
    };

    const handleLogout = async () =>
    {
        console.log("Logout");

        try
        {
            await logout();

            navigate("/auth");
        }
        catch (error)
        {
            console.log(error);
        }
    };

    return (

        <RecruiterLayout>

            <div className="dashboardPage">

                <div className="welcomeCard">

                    <h1>

                        Welcome,

                        {" "}

                        {user?.fullName}

                    </h1>

                    <p>

                        Manage jobs, categories and applicants from one place.

                    </p>

                </div>

                <div className="dashboardCards">

                    <div
                        className="dashboardCard"
                        onClick={handleCreateJob}
                    >

                        <h2>

                            Total Jobs

                        </h2>

                        <h1>

                            {myJobs.length}

                        </h1>

                        <p>

                            Click to manage jobs

                        </p>

                    </div>

                    <div
                        className="dashboardCard"
                        onClick={handleCategory}
                    >

                        <h2>

                            Categories

                        </h2>

                        <h1>

                            {category.categories.length}

                        </h1>

                        <p>

                            Click to manage categories

                        </p>

                    </div>

                    <div
                        className="dashboardCard"
                        onClick={handleApplicants}
                    >

                        <h2>

                            Applicants

                        </h2>

                        <h1>

                            {application.applications.length}

                        </h1>

                        <p>

                            View received applications

                        </p>

                    </div>

                </div>

                <div className="quickActions">

                    <h2>

                        Quick Actions

                    </h2>

                    <div className="buttonGroup">

                        <button
                            className="primaryButton"
                            onClick={handleCreateJob}
                        >

                            Create Job

                        </button>

                        <button
                            className="primaryButton"
                            onClick={handleCategory}
                        >

                            Manage Categories

                        </button>

                        <button
                            className="primaryButton"
                            onClick={handleApplicants}
                        >

                            View Applicants

                        </button>

                        <button
                            className="logoutButton"
                            onClick={handleLogout}
                        >

                            Logout

                        </button>

                    </div>

                </div>

            </div>

        </RecruiterLayout>

    );
}

export default RecruiterDashboard;