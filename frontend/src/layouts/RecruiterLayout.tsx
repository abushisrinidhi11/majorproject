import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/layout.css";

function RecruiterLayout({ children }: any)
{
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="layout">
            <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            <div className="layoutBody">
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <div className="layoutContent">{children}</div>
            </div>
        </div>
    );
}
export default RecruiterLayout;