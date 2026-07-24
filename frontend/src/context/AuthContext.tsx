import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
const AuthContext = createContext<any>(null);
const AuthProvider = ({ children }: any) =>
{
    console.log("Auth Provider Rendering");
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() =>
    {
        console.log("Checking Logged In User");
        getCurrentUser();
    }, []);
    const getCurrentUser = async () =>
    {
        console.log("Get Current User Started");
        try
        {
            console.log("Calling Get Me API");
            const response = await api.get("/auth/me");
            console.log("Current User Retrieved Successfully");
            setUser(response.data.user);
        }
        catch (error: any)
        {
            console.log("Get Current User Failed");
            setUser(null);
            console.log(
                error.response?.data || error.message
            );
        }
        finally
        {
            console.log("Current User Check Completed");
            setLoading(false);
        }
    };
    const login = async (
        email: string,
        password: string
    ) =>
    {
        console.log("Login Started");
        try
        {
            console.log("Calling Login API");
            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );
            console.log("Login Successful");
            console.log("Fetching Current User");
            await getCurrentUser();
            return response.data;
        }
        catch (error: any)
        {
            console.log("Login Failed");
            console.log(
                error.response?.data || error.message
            );
            throw error;
        }
    };
    const register = async (
        fullName: string,
        email: string,
        password: string,
        role: string
    ) =>
    {
        console.log("Register Started");
        try
        {
            console.log("Calling Register API");
            const response = await api.post(
                "/auth/register",
                {
                    fullName,
                    email,
                    password,
                    role
                }
            );
            console.log("Registration Successful");
            return response.data;
        }
        catch (error: any)
        {
            console.log("Registration Failed");
            console.log(
                error.response?.data || error.message
            );
            throw error;
        }
    };
    const logout = async () =>
    {
        console.log("Logout Started");
        try
        {
            console.log("Calling Logout API");
            await api.post("/auth/logout");
            setUser(null);
            console.log("Logout Successful");
        }
        catch (error: any)
        {
            console.log("Logout Failed");
            console.log(
                error.response?.data || error.message
            );
            throw error;
        }
    };
    const getProfile = async () =>
    {
        console.log("Get Profile Started");
        try
        {
            console.log("Calling Get Profile API");
            const response = await api.get("/users/profile");
            console.log("Profile Loaded Successfully");
            setUser(response.data.user);
            return response.data;
        }
        catch (error: any)
        {
            console.log("Get Profile Failed");
            console.log(
                error.response?.data || error.message
            );
            throw error;
        }
    };
    const updateProfile = async (
        profileData: any
    ) =>
    {
        console.log("Update Profile Started");
        try
        {
            console.log("Calling Update Profile API");
            await api.put(
                "/users/profile",
                profileData
            );
            console.log("Profile Updated Successfully");
            await getProfile();
        }
        catch (error: any)
        {
            console.log("Update Profile Failed");
            console.log("Backend Response:");
            console.log(error.response?.data);
            throw error;
        }
    };
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                login,
                register,
                logout,
                getCurrentUser,
                getProfile,
                updateProfile,
                isAuthenticated: user !== null
            }}>
            {children}
        </AuthContext.Provider>
    );
};
const useAuth = () =>
{
    return useContext(AuthContext);
};
export { AuthProvider, useAuth };