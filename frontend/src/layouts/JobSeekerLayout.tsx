import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/layout.css";

function JobSeekerLayout({ children }: any)
{
    console.log("Job Seeker Layout Rendering");
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
export default JobSeekerLayout;