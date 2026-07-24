import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const PrivateRoute = ({ children }: any) =>
{
    console.log("Private Route Rendering");
    const auth = useAuth();
    console.log("Checking Authentication");
    if (auth.loading)
    {
        console.log("Authentication Check In Progress");
        return <h2>Loading...</h2>;
    }
    console.log("Current User");
    console.log(auth.user);
    if (!auth.user)
    {
        console.log("User Not Logged In");
        return <Navigate to="/auth" replace />;
    }
    console.log("User Authenticated");
    return children;
};
export default PrivateRoute;