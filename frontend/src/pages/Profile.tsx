import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

import RecruiterLayout from "../layouts/RecruiterLayout";
import JobSeekerLayout from "../layouts/JobSeekerLayout";

import "../styles/profile.css";

function Profile()
{
    console.log("Profile Page Rendering");

    const navigate = useNavigate();

    const auth = useAuth();

    const Layout =
        auth.user?.role === "jobRecruiter"
            ? RecruiterLayout
            : JobSeekerLayout;

    const [isEditing, setIsEditing] = useState(false);

    const [profileData, setProfileData] = useState({
        phone: "",
        education: "",
        experience: "",
        skills: [] as string[],
        companyName: "",
        designation: ""
    });
    const [originalProfileData, setOriginalProfileData] = useState({
        phone: "",
        education: "",
        experience: "",
        skills: [] as string[],
        companyName: "",
        designation: ""
    });

    const loadProfile = async () =>
    {
        console.log("Loading Profile");

        try
        {
            await auth.getProfile();

            console.log("Profile Loaded Successfully");
        }
        catch (error)
        {
            console.log("Profile Loading Failed");

            console.log(error);
        }
    };

    useEffect(() =>
    {
        console.log("Profile Page Loaded");

        loadProfile();

    }, []);

    useEffect(() =>
    {
        if (auth.user)
        {
            console.log("Setting Profile Data");

            setProfileData({
                phone: auth.user.phone || "",
                education: auth.user.education || "",
                experience: auth.user.experience || "",
                skills: auth.user.skills || [],
                companyName: auth.user.companyName || "",
                designation: auth.user.designation || ""
            });
        }

    }, [auth.user]);
    useEffect(() =>
    {
        if (auth.user)
        {
            console.log("Setting Profile Data");

            const loadedData = {
                phone: auth.user.phone || "",
                education: auth.user.education || "",
                experience: auth.user.experience || "",
                skills: auth.user.skills || [],
                companyName: auth.user.companyName || "",
                designation: auth.user.designation || ""
            };

            setProfileData(loadedData);

            setOriginalProfileData(loadedData);
        }

    }, [auth.user]);

    const handleChange = (event: any) =>
    {
        const { name, value } = event.target;

        setProfileData({
            ...profileData,

            [name]:
                name === "skills"
                    ? value.split(",")
                 .map((skill: string) => skill.trim())
                  .filter((skill: string) => skill !== "")

                    : value
        });
    };

    const handleSave = async () =>
    {
        console.log("Save Profile Clicked");
                const noChangesMade =
            JSON.stringify(profileData) ===
            JSON.stringify(originalProfileData);

        if (noChangesMade)
        {
            console.log("No Changes Made - Skipping Update");

            setIsEditing(false);

            return;
        }

        try
        {
            await auth.updateProfile(profileData);

            console.log("Profile Updated Successfully");

            setIsEditing(false);

            toast.success("Profile updated successfully");
        }
        catch (error: any)
        {
            console.log("Profile Update Failed");

            console.log(error);

            toast.error(
                error.response?.data?.message || "Profile update failed"
            );
        }
    };

    const handleCancel = () =>
    {
        console.log("Cancel Button Clicked");

        setIsEditing(false);

        loadProfile();
    };

    const handleLogout = async () =>
    {
        console.log("Logout Started");

        try
        {
            await auth.logout();

            console.log("Logout Successful");

            navigate("/auth");
        }
        catch (error)
        {
            console.log("Logout Failed");

            console.log(error);
        }
    };

    if (auth.loading)
    {
        return (
            <Layout>

                <div className="profilePage">

                    <h2>Loading...</h2>

                </div>

            </Layout>
        );
    }

    return (
        <Layout>

            <div className="profilePage">

                <div className="profileCard">

                    <h1 className="profileHeading">
                        My Profile
                    </h1>

                    <div className="profileSection">

                        <h2>Basic Information</h2>

                        <div className="profileField">

                            <label>Full Name</label>

                            <input
                                type="text"
                                value={auth.user?.fullName || ""}
                                disabled
                            />

                        </div>

                        <div className="profileField">

                            <label>Email</label>

                            <input
                                type="email"
                                value={auth.user?.email || ""}
                                disabled
                            />

                        </div>

                        <div className="profileField">

                            <label>Role</label>

                            <input
                                type="text"
                                value={auth.user?.role || ""}
                                disabled
                            />

                        </div>

                        <div className="profileField">

                            <label>Phone</label>

                            <input
                                type="text"
                                name="phone"
                                value={profileData.phone}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />

                        </div>

                    </div>

                    {
                        auth.user?.role === "jobSeeker" &&

                        <div className="profileSection">

                            <h2>Career Information</h2>

                            <div className="profileField">

                                <label>Education</label>
                                    <select
    name="education"
    value={profileData.education}
    onChange={handleChange}
    disabled={!isEditing}
>
    <option value="">Select Education</option>
    <option value="10th">10th</option>
    <option value="Intermediate">Intermediate</option>
    <option value="Diploma">Diploma</option>
    <option value="ITI">ITI</option>
    <option value="B.Tech">B.Tech</option>
    <option value="B.E">B.E</option>
    <option value="B.Sc">B.Sc</option>
    <option value="BCA">BCA</option>
    <option value="B.Com">B.Com</option>
    <option value="B.A">B.A</option>
    <option value="BBA">BBA</option>
    <option value="B.Pharm">B.Pharm</option>
    <option value="B.Arch">B.Arch</option>
    <option value="MBBS">MBBS</option>
    <option value="BDS">BDS</option>
    <option value="B.Sc Nursing">B.Sc Nursing</option>
    <option value="LLB">LLB</option>
    <option value="M.Tech">M.Tech</option>
    <option value="M.E">M.E</option>
    <option value="M.Sc">M.Sc</option>
    <option value="MCA">MCA</option>
    <option value="M.Com">M.Com</option>
    <option value="M.A">M.A</option>
    <option value="MBA">MBA</option>
    <option value="M.Pharm">M.Pharm</option>
    <option value="MDS">MDS</option>
    <option value="LLM">LLM</option>
    <option value="Ph.D">Ph.D</option>
    <option value="Other">Other</option>
</select>

                            </div>

                            <div className="profileField">

                                <label>Experience</label>

                                <select
    name="experience"
    value={profileData.experience}
    onChange={handleChange}
    disabled={!isEditing}
>
    <option value="">Select Experience</option>
    <option value="Student">Student</option>
    <option value="Fresher">Fresher</option>
    <option value="0 Years">0 Years</option>
    <option value="1 Year">1 Year</option>
    <option value="2 Years">2 Years</option>
    <option value="3 Years">3 Years</option>
    <option value="4-6 Years">4-6 Years</option>
    <option value="7-10 Years">7-10 Years</option>
    <option value="10+ Years">10+ Years</option>
</select>

                            </div>

                            <div className="profileField">

                                <label>Skills</label>

                                <input
                                    type="text"
                                    name="skills"
                                    value={profileData.skills.join(", ")}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    placeholder="React, Node, MongoDB"
                                />

                            </div>

                        </div>

                    }

                    {
                        auth.user?.role === "jobRecruiter" &&

                        <div className="profileSection">

                            <h2>Company Information</h2>

                            <div className="profileField">

                                <label>Company Name</label>

                                <input
                                    type="text"
                                    name="companyName"
                                    value={profileData.companyName}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />

                            </div>

                            <div className="profileField">

                                <label>Designation</label>

                                <input
                                    type="text"
                                    name="designation"
                                    value={profileData.designation}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />

                            </div>

                        </div>

                    }

                    <div className="profileButtons">

                        {
                            !isEditing
                                ?

                                <button
                                    className="editButton"
                                    onClick={() =>
                                    {
                                        console.log("Edit Profile Clicked");

                                        setIsEditing(true);
                                    }}
                                >
                                    Edit Profile
                                </button>

                                :

                                <>

                                    <button
                                        className="saveButton"
                                        onClick={handleSave}
                                    >
                                        Save Changes
                                    </button>

                                    <button
                                        className="cancelButton"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>

                                </>

                        }

                        <button
                            className="logoutButton"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </div>

        </Layout>
    );
}

export default Profile;
