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
                    <p>welcome to JobHunt</p>
                </div>
                <div className="dashboardCards">
                    <div className="dashboardCard" onClick={handleJobs}>
                        <h2>Browse Jobs</h2>
                        <p>Search and apply for jobs</p>
                    </div>
                    <div className="dashboardCard" onClick={handleApplications}>
                        <h2>My Applications</h2>
                        <p>Track your job applications</p>
                    </div>
                    <div className="dashboardCard" onClick={handleProfile}>
                        <h2>My Profile</h2>
                        <p>Update your profile and career details</p>
                    </div>
                </div>
            </div>
        </JobSeekerLayout>
    );
}
export default Home;