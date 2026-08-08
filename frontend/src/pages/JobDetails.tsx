import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useJob } from "../context/JobContext";
import { useApplication } from "../context/ApplicationContext";
import JobSeekerLayout from "../layouts/JobSeekerLayout";
import "../styles/jobDetails.css";
import { toast } from "react-toastify";
function JobDetails()
{
    console.log("Job Details Page Rendering");

    const { id } = useParams();

    const navigate = useNavigate();

    const jobContext = useJob();

    const application = useApplication();

    const [job, setJob] = useState<any>(null);

    const [loading, setLoading] = useState(true);

    const [resumeFile, setResumeFile] = useState<File | null>(null);

    const [applyError, setApplyError] = useState("");

    const [applying, setApplying] = useState(false);
    const [coverLetter, setCoverLetter] = useState("");
const [generatingLetter, setGeneratingLetter] = useState(false);
const [coverLetterError, setCoverLetterError] = useState("");
    const loadJob = async () =>
    {
        try
        {
            console.log("Calling Get Job By Id API");

            const selectedJob =
                await jobContext.getJobById(id as string);

            setJob(selectedJob);

            console.log("Job Loaded Successfully");
        }
        catch (error)
        {
            console.log("Failed To Load Job");

            console.log(error);
        }
        finally
        {
            setLoading(false);
        }
    };

    useEffect(() =>
    {
        console.log("Loading Job Details");

        loadJob();

    }, [id]);

    const handleResumeChange = (event: any) =>
    {
        const file = event.target.files?.[0];

        if (!file)
        {
            setResumeFile(null);
            return;
        }

        if (file.type !== "application/pdf")
        {
            setApplyError("Only PDF files are allowed");
            setResumeFile(null);
            return;
        }

        if (file.size > 5 * 1024 * 1024)
        {
            setApplyError("Resume must be smaller than 5MB");
            setResumeFile(null);
            return;
        }

        setApplyError("");
        setResumeFile(file);
    };
    const handleGenerateCoverLetter = async () =>
{
    console.log("Generate Cover Letter Button Clicked");

    setGeneratingLetter(true);
    setCoverLetterError("");

try
    {
        const letter = await jobContext.generateCoverLetter(job._id);

        setCoverLetter(letter);

        toast.success("Cover letter generated successfully");
    }
    catch (error: any)
    {
        console.log("Generate Cover Letter Failed");

        console.log(error);

        const message =
            error.response?.data?.message ||
            "Failed to generate cover letter";

        setCoverLetterError(message);

        toast.error(message);
    }
    finally
    {
        setGeneratingLetter(false);
    }
};

    const handleApply = async () =>
    {
        console.log("Apply Button Clicked");

        if (!resumeFile)
        {
            setApplyError("Please select a PDF resume before applying");
            return;
        }

        setApplying(true);
        setApplyError("");

try
        {
            console.log("Calling Apply Job API");

            await application.applyJob(job._id, resumeFile);

            console.log("Application Submitted Successfully");

            toast.success("Application submitted successfully");

            navigate("/my-applications");
        }
        catch (error: any)
        {
            console.log("Application Failed");

            console.log(error);

            const message =
                error.response?.data?.message || "Failed To Apply";

            setApplyError(message);

            toast.error(message);
        }
        finally
        {
            setApplying(false);
        }
    };

    if (loading)
    {
        return (
            <JobSeekerLayout>

                <div className="loadingContainer">

                    <h2>Loading Job...</h2>

                </div>

            </JobSeekerLayout>
        );
    }

    if (!job)
    {
        return (
            <JobSeekerLayout>

                <div className="jobNotFound">

                    <h1>Job Not Found</h1>

                </div>

            </JobSeekerLayout>
        );
    }

    return (

        <JobSeekerLayout>

            <div className="jobDetailsPage">

                <div className="jobDetailsCard">

                    <div className="jobHeader">

                        <h1>

                            {job.title}

                        </h1>

                        <h3>

                            {job.company}

                        </h3>

                    </div>

                    <div className="detailsGrid">

                        <div className="detailItem">

                            <label>Location</label>

                            <p>{job.location}</p>

                        </div>

                        <div className="detailItem">

                            <label>Workplace</label>

                            <p>{job.workplaceType}</p>

                        </div>

                        <div className="detailItem">

                            <label>Employment</label>

                            <p>{job.employmentType}</p>

                        </div>

                        <div className="detailItem">

                            <label>Experience</label>

                            <p>{job.experience}</p>

                        </div>

                        <div className="detailItem">

                            <label>Salary</label>

                            <p>₹ {job.salary}</p>

                        </div>

                        <div className="detailItem">

                            <label>Category</label>

                            <p>

                                {
                                    job.category?.name ||
                                    "No Category"
                                }

                            </p>

                        </div>

                    </div>

                    <div className="descriptionCard">

                        <h2>

                            Job Description

                        </h2>

                        <p>

                            {job.description}

                        </p>

                    </div>
                    <div className="coverLetterSection">

    <div className="coverLetterHeader">

        <h2>Cover Letter</h2>

        <button
            type="button"
            className="generateButton"
            onClick={handleGenerateCoverLetter}
            disabled={generatingLetter}
        >
            {generatingLetter ? "Generating..." : "Generate with AI"}
        </button>

    </div>

    {coverLetterError && <p className="error">{coverLetterError}</p>}

    {
        coverLetter &&
        <textarea
            className="coverLetterBox"
            value={coverLetter}
            onChange={(event) => setCoverLetter(event.target.value)}
            rows={12}
        />
    }

</div>

                    <div className="resumeUploadSection">

                        <label htmlFor="resumeUpload">
                            Upload Resume (PDF, max 5MB)
                        </label>

                        <input
                            id="resumeUpload"
                            type="file"
                            accept="application/pdf"
                            onChange={handleResumeChange}
                        />

                        {
                            applyError &&
                            <p className="error">{applyError}</p>
                        }

                    </div>

                    <div className="buttonContainer">

                        <button
                            className="applyButton"
                            onClick={handleApply}
                            disabled={applying}
                        >

                            {applying ? "Submitting..." : "Apply Job"}

                        </button>

                        <button
                            className="backButton"
                            onClick={() => navigate("/jobs")}
                        >

                            Back To Jobs

                        </button>

                    </div>

                </div>

            </div>

        </JobSeekerLayout>

    );
}

export default JobDetails;
