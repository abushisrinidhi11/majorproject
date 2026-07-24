import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/layout.css";
function RecruiterLayout({ children }: any)
{
    console.log("Recruiter Layout Rendering");
    return (
        <div className="layout">
            <Navbar />
            <div className="layoutBody">
                <Sidebar />
                <div className="layoutContent">
                    {children}
                </div>
            </div>
        </div>
    );
}
export default RecruiterLayout;