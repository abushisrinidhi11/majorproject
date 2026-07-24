import { useNavigate } from "react-router-dom";
import JobSeekerLayout from "../layouts/JobSeekerLayout";
import { useAuth } from "../context/AuthContext";
import "../styles/home.css";

function Home()
{
    console.log("Home Page Rendering");

    const navigate = useNavigate();

    const { user } = useAuth();

    const handleJobs = () =>
    {
        console.log("Browse Jobs Clicked");

        navigate("/jobs");

        console.log("Navigated To Jobs");
    };

    const handleProfile = () =>
    {
        console.log("Profile Clicked");

        navigate("/profile");

        console.log("Navigated To Profile");
    };

    const handleApplications = () =>
    {
        console.log("Applications Clicked");

        navigate("/my-applications");

        console.log("Navigated To Applications");
    };

    return (
        <JobSeekerLayout>

            <div className="homePage">

                <div className="welcomeCard">

                    <h1>
                        Welcome,
                        {" "}
                        {user?.fullName}
                        !
                    </h1>

                    <p>
                        Find your dream job and track all your applications from one place.
                    </p>

                </div>

                <div className="dashboardCards">

                    <div
                        className="dashboardCard"
                        onClick={handleJobs}
                    >

                        <h2>Browse Jobs</h2>

                        <p>
                            Search and apply for the latest jobs.
                        </p>

                    </div>

                    <div
                        className="dashboardCard"
                        onClick={handleApplications}
                    >

                        <h2>My Applications</h2>

                        <p>
                            Track all the jobs you have applied for.
                        </p>

                    </div>

                    <div
                        className="dashboardCard"
                        onClick={handleProfile}
                    >

                        <h2>My Profile</h2>

                        <p>
                            Update your profile and career details.
                        </p>

                    </div>

                </div>

                <div className="tipsCard">

                    <h2>Quick Tips</h2>

                    <ul>

                        <li>
                            Complete your profile before applying.
                        </li>

                        <li>
                            Keep your skills updated.
                        </li>

                        <li>
                            Apply for jobs that match your experience.
                        </li>

                        <li>
                            Check your application status regularly.
                        </li>

                    </ul>

                </div>

            </div>

        </JobSeekerLayout>
    );
}

export default Home;