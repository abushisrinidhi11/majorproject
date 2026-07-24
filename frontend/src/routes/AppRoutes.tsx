import {Routes,Route} from "react-router-dom";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import Jobs from "../pages/Jobs";
import JobDetails from "../pages/JobDetails";
import Profile from "../pages/Profile";
import MyApplications from "../pages/MyApplications";
import RecruiterDashboard from "../pages/RecruiterDashboard";
import Applicants from "../pages/Applicants";
import Category from "../pages/Category";
import Job from "../pages/Job";
import NotFound from "../pages/NotFound";
import PrivateRoute from "../components/PrivateRoute";
import PublicRoute from "../components/PublicRoute";

const AppRoutes=()=>
{
    console.log("App Routes Rendering");

    return(
        <Routes>

            <Route
                path="/"
                element={
                    <PublicRoute>
                        <Auth/>
                    </PublicRoute>
                }
            />

            <Route
                path="/auth"
                element={
                    <PublicRoute>
                        <Auth/>
                    </PublicRoute>
                }
            />

            <Route
                path="/home"
                element={
                    <PrivateRoute>
                        <Home/>
                    </PrivateRoute>
                }
            />

            <Route
                path="/jobs"
                element={
                    <PrivateRoute>
                        <Jobs/>
                    </PrivateRoute>
                }
            />

            <Route
                path="/job-details/:id"
                element={
                    <PrivateRoute>
                        <JobDetails/>
                    </PrivateRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <PrivateRoute>
                        <Profile/>
                    </PrivateRoute>
                }
            />

            <Route
                path="/my-applications"
                element={
                    <PrivateRoute>
                        <MyApplications/>
                    </PrivateRoute>
                }
            />

            <Route
                path="/recruiter/dashboard"
                element={
                    <PrivateRoute>
                        <RecruiterDashboard/>
                    </PrivateRoute>
                }
            />

            <Route
                path="/category"
                element={
                    <PrivateRoute>
                        <Category/>
                    </PrivateRoute>
                }
            />

            <Route
                path="/job"
                element={
                    <PrivateRoute>
                        <Job/>
                    </PrivateRoute>
                }
            />

            <Route
                path="/applicants"
                element={
                    <PrivateRoute>
                        <Applicants/>
                    </PrivateRoute>
                }
            />

            <Route
                path="*"
                element={<NotFound/>}
            />

        </Routes>
    );
};

export default AppRoutes;