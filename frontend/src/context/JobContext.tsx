import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";
const JobContext = createContext<any>(null);
export function JobProvider({ children }: any)
{
    console.log("Job Provider Rendering");
    const auth = useAuth();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const getJobs = async () =>
    {
        console.log("Get Jobs Started");
        try
        {
            const response = await api.get("/jobs");
            console.log("Jobs Loaded Successfully");
            setJobs(response.data.jobs);
        }
        catch (error: any)
        {
            console.log("Get Jobs Failed");
            console.log(error.response?.data || error.message);
        }
        finally
        {
            setLoading(false);
        }
    };
    useEffect(() =>
    {
        console.log("Loading Jobs");
        if (auth.loading)
        {
            return;
        }
        if (!auth.user)
        {
            setJobs([]);
            setLoading(false);
            return;
        }
        getJobs();
    }, [auth.loading, auth.user]);
    const getJobById = async (id: string) =>
    {
        console.log("Get Job By Id Started");
        try
        {
            const response = await api.get(`/jobs/${id}`);
            console.log("Job Retrieved Successfully");
            return response.data.job;
        }
        catch (error: any)
        {
            console.log("Get Job By Id Failed");
            console.log(error.response?.data || error.message);
            throw error;
        }
    };
    const createJob = async (jobData: any) =>
    {
        console.log("Create Job Started");
        try
        {
            await api.post("/jobs", jobData);
            console.log("Job Created Successfully");
            await getJobs();
        }
        catch (error: any)
        {
            console.log("Create Job Failed");
            console.log(error.response?.data || error.message);
            throw error;
        }
    };
    const updateJob = async (
        id: string,
        jobData: any
    ) =>
    {
        console.log("Update Job Started");
        try
        {
            await api.put(`/jobs/${id}`, jobData);
            console.log("Job Updated Successfully");
            await getJobs();
        }
        catch (error: any)
        {
            console.log("Update Job Failed");
            console.log(error.response?.data || error.message);
            throw error;
        }
    };
    const deleteJob = async (id: string) =>
    {
        console.log("Delete Job Started");
        try
        {
            await api.delete(`/jobs/${id}`);
            console.log("Job Deleted Successfully");
            await getJobs();
        }
        catch (error: any)
        {
            console.log("Delete Job Failed");
            console.log(error.response?.data || error.message);
            throw error;
        }
    };
    return (
        <JobContext.Provider
            value={{
                jobs,
                loading,
                getJobs,
                getJobById,
                createJob,
                updateJob,
                deleteJob
            }}
        >
            {children}
        </JobContext.Provider>
    );
}
export function useJob()
{
    return useContext(JobContext);
}