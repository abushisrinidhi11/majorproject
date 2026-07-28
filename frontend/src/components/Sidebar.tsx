import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/sidebar.css";

function Sidebar({ isOpen, onClose }: any)
{
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    const recruiterMenu = [
        { title: "Dashboard", path: "/recruiter/dashboard" },
        { title: "Create Job", path: "/job" },
        { title: "Categories", path: "/category" },
        { title: "Applicants", path: "/applicants" },
        { title: "Profile", path: "/profile" }
    ];
    const jobSeekerMenu = [
        { title: "Home", path: "/home" },
        { title: "Browse Jobs", path: "/jobs" },
        { title: "My Applications", path: "/my-applications" },
        { title: "Profile", path: "/profile" }
    ];

    const menu = user?.role === "jobRecruiter" ? recruiterMenu : jobSeekerMenu;

    const handleNavigation = (path: string) =>
    {
        navigate(path);
        if (onClose) onClose();
    };

    return (
        <>
            {isOpen && <div className="sidebarOverlay" onClick={onClose} />}

            <div className={isOpen ? "sidebar sidebarOpen" : "sidebar"}>
                <h2 className="sidebarTitle">Menu</h2>
                {menu.map((item) => (
                    <button
                        key={item.path}
                        className={
                            location.pathname === item.path
                                ? "sidebarButton activeSidebarButton"
                                : "sidebarButton"
                        }
                        onClick={() => handleNavigation(item.path)}
                    >
                        {item.title}
                    </button>
                ))}
            </div>
        </>
    );
}
export default Sidebar;