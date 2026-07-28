import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";
function Navbar({ onMenuClick }: any)
{
    console.log("Navbar Rendering");
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const handleProfile = () => navigate("/profile");
    const handleHome = () =>
    {
        if (user?.role === "jobRecruiter") navigate("/recruiter/dashboard");
        else navigate("/home");
    };
    const handleLogout = async () =>
    {
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
        <nav className="navbar">
            <div className="navbarLeft">
                <button
                    className="menuButton"
                    onClick={onMenuClick}
                    aria-label="Toggle menu"
                    type="button"
                >
                    &#9776;
                </button>
                <div className="navbarLogo" onClick={handleHome}>
                    JobHunt
                </div>
            </div>
            <div className="navbarRight">
                <span className="navbarUser">Welcome, {user?.fullName}</span>
                <button className="navbarButton" onClick={handleProfile}>Profile</button>
                <button className="navbarButton logoutButton" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
}
export default Navbar;