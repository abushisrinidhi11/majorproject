import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";
import { toast } from "react-toastify";
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
            toast.success("Logout successful");
            navigate("/auth");
        }
        catch (error: any)
        {
            console.log(error);

            toast.error(
                error.response?.data?.message || "Logout failed"
            );
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
