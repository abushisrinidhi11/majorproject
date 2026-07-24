import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";
const ApplicationContext = createContext<any>(null);
export function ApplicationProvider({ children }: any)
{
    console.log("Application Provider Rendering");
    const auth = useAuth();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const getMyApplications = async () =>
    {
        console.log("Get My Applications Started");
        try
        {
            const response = await api.get(
                "/applications/my-applications"
            );
            console.log("Applications Loaded Successfully");
            setApplications(response.data.applications);
        }
        catch (error: any)
        {
            console.log("Get Applications Failed");
            console.log(error.response?.data || error.message);
        }
        finally
        {
            setLoading(false);
        }
    };
    useEffect(() =>
    {
        console.log("Loading My Applications");
        if (auth.loading)
        {
            return;
        }
        if (!auth.user)
        {
            setApplications([]);
            setLoading(false);
            return;
        }
        if (auth.user.role === "jobSeeker")
        {
            getMyApplications();
        }
        else
        {
            // Recruiters load their own applications explicitly from
            // the pages that need them (Applicants, RecruiterDashboard)
            setLoading(false);
        }
    }, [auth.loading, auth.user]);
    const getRecruiterApplications = async () =>
{
    console.log("Get Recruiter Applications Started");
    try
    {
        const response =await api.get("/applications");
        console.log("Recruiter Applications Loaded");
        setApplications(response.data.applications);
    }
    catch(error:any)
    {
        console.log("Failed To Load Recruiter Applications");
        console.log(error.response?.data || error.message);
    }
};
    const applyJob = async (jobId: string, resumeFile: File) =>
    {
        console.log("Apply Job Started");
        try
        {
            const formData = new FormData();
            formData.append("jobId", jobId);
            formData.append("resume", resumeFile);
            // Do not set a Content-Type header here - axios/the browser
            // needs to generate its own multipart boundary for FormData.
            await api.post("/applications", formData);
            console.log("Application Submitted Successfully");
            await getMyApplications();
        }
        catch (error: any)
        {
            console.log("Apply Job Failed");
            console.log(error.response?.data || error.message);
            throw error;
        }
    };
    const getApplicationById = async (id: string) =>
    {
        console.log("Get Application By Id Started");
        try
        {
            const response = await api.get( `/applications/${id}`);
            console.log("Application Retrieved Successfully");
            return response.data.application;
        }
        catch (error: any)
        {
            console.log("Get Application Failed");
            console.log(error.response?.data || error.message);
            throw error;
        }
    };
    const updateApplicationStatus = async (
        id: string,
        status: string) =>
    {
        console.log("Update Application Status Started");
        try
        {
            await api.put(`/applications/${id}`,{status});
            console.log("Application Status Updated");
            await getMyApplications();
        }
        catch (error: any)
        {
            console.log("Update Status Failed");
            console.log(error.response?.data || error.message);
            throw error;
        }
    };
    const withdrawApplication = async (id: string) =>
    {
        console.log("Withdraw Application Started");
        try
        {
            await api.delete(`/applications/${id}`);
            console.log("Application Withdrawn Successfully");
            await getMyApplications();
        }
        catch (error: any)
        {
            console.log("Withdraw Failed");
            console.log(error.response?.data || error.message);
            throw error;
        }
    };
    return (
        <ApplicationContext.Provider
            value={{
                applications,
                loading,
                applyJob,
                getMyApplications,
                getRecruiterApplications,
                getApplicationById,
                updateApplicationStatus,
                withdrawApplication
            }}
        >
            {children}
        </ApplicationContext.Provider>
    );
}

export function useApplication()
{
    return useContext(ApplicationContext);
}