import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const PublicRoute = ({ children }: any) =>
{
    console.log("Public Route Rendering");
    const auth = useAuth();
    if (auth.loading)
    {
        console.log("Authentication Check In Progress");
        return <h2>Loading...</h2>;
    }
    console.log("Current User");
    console.log(auth.user);
    if (auth.user)
    {
        console.log("User Already Logged In");
        if (auth.user.role === "jobRecruiter")
        {
            console.log("Redirecting To Recruiter Dashboard");
            return <Navigate to="/recruiter/dashboard" replace />;
        }
        console.log("Redirecting To Home");
        return <Navigate to="/home" replace />;
    }
    console.log("Public Route Access Granted");
    return children;
};
export default PublicRoute;