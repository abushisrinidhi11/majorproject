import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";
function Navbar()
{
    console.log("Navbar Rendering");
    const navigate = useNavigate();
    const {
        user,
        logout
    } = useAuth();
    const handleProfile=() =>
    {
        console.log("Profile Button Clicked");
        navigate("/profile");
    };
    const handleHome = () =>
    {
        console.log("Logo Clicked");
        if (user?.role === "jobRecruiter")
        {
            console.log("Navigating To Recruiter Dashboard");
            navigate("/recruiter/dashboard");
        }
        else
        {
            console.log("Navigating To Home");
            navigate("/home");
        }
    };
    const handleLogout = async () =>
    {
        console.log("Logout Button Clicked");
        try
        {
            await logout();
            console.log("Logout Successful");
            navigate("/auth");
        }
        catch (error)
        {
            console.log("Logout Failed");
            console.log(error);
        }
    };
    return (
        <nav className="navbar">
            <div
                className="navbarLogo"
                onClick={handleHome}>
                JobHunt
            </div>
            <div className="navbarRight">
                <span className="navbarUser">
                    Welcome,
                    {" "}
                    {user?.fullName}
                </span>
                <button
                    className="navbarButton"
                    onClick={handleProfile}>
                    Profile
                </button>
                <button
                    className="navbarButton logoutButton"
                    onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
}
export default Navbar;