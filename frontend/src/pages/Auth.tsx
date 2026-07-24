import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import {
    loginValidation,
    registerValidation
} from "../validations/auth.validation";
import "../styles/auth.css";

const Auth = () =>
{
    console.log("Auth Page Rendering");

    const navigate = useNavigate();
    const auth = useAuth();

    const [isLogin, setIsLogin] = useState(true);

    const handleLogin = async (values: any) =>
    {
        console.log("Login Started");

        try
        {
            console.log("Login Values");
            console.log(values);

            console.log("Calling Login API");

            const response = await auth.login(
                values.email,
                values.password
            );

            console.log("Login Successful");

            console.log("Logged In User");
            console.log(response.user);

            if (response.user.role === "jobRecruiter")
            {
                console.log("Navigating To Recruiter Dashboard");

                navigate("/recruiter/dashboard");
            }
            else
            {
                console.log("Navigating To Home");

                navigate("/home");
            }
        }
        catch (error: any)
        {
            console.log("Login Failed");

            console.log(
                error.response?.data || error.message
            );

            toast.error(
                error.response?.data?.message ||
                "Login Failed"
            );
        }
    };

    const handleRegister = async (
        values: any,
        { resetForm }: any
    ) =>
    {
        console.log("================================");
        console.log("Register Started");
        console.log("Register Values");
        console.log(values);
        console.log("Role :", values.role);
        console.log("================================");

        try
        {
            console.log("Calling Register API");

            await auth.register(
                values.fullName,
                values.email,
                values.password,
                values.role
            );

            console.log("Registration Successful");

            resetForm();

            setIsLogin(true);

            toast.success("Registration successful. Please login.");
        }
        catch (error: any)
        {
            console.log("Registration Failed");

            console.log(
                error.response?.data || error.message
            );

            toast.error(
                error.response?.data?.message ||
                "Registration Failed"
            );
        }
    };

    return (
        <div className="auth">

            <h1 className="title">
                JobHunt
            </h1>

            <div className="tabContainer">

                <button
                    className={
                        isLogin
                            ? "activeTab"
                            : "tabButton"
                    }
                    type="button"
                    onClick={() =>
                    {
                        console.log("Login Tab Clicked");

                        setIsLogin(true);
                    }}
                >
                    Login
                </button>

                <button
                    className={
                        !isLogin
                            ? "activeTab"
                            : "tabButton"
                    }
                    type="button"
                    onClick={() =>
                    {
                        console.log("Register Tab Clicked");

                        setIsLogin(false);
                    }}
                >
                    Register
                </button>

            </div>

            {isLogin ? (

                <Formik
                    key="login"
                    initialValues={{
                        email: "",
                        password: ""
                    }}
                    validationSchema={loginValidation}
                    onSubmit={handleLogin}
                >

                    <Form className="authForm">

                        <div className="formGroup">

                            <label>Email</label>

                            <Field
                                type="email"
                                name="email"
                                placeholder="Enter Email"
                            />

                            <ErrorMessage
                                name="email"
                                component="p"
                                className="error"
                            />

                        </div>

                        <div className="formGroup">

                            <label>Password</label>

                            <Field
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                            />

                            <ErrorMessage
                                name="password"
                                component="p"
                                className="error"
                            />

                        </div>

                        <button
                            className="submitButton"
                            type="submit"
                        >
                            Login
                        </button>

                    </Form>

                </Formik>

            ) : (

                <Formik
                    key="register"
                    initialValues={{
                        fullName: "",
                        email: "",
                        password: "",
                        role: "jobSeeker"
                    }}
                    validationSchema={registerValidation}
                    onSubmit={handleRegister}
                >

                    <Form className="authForm">

                        <div className="formGroup">

                            <label>Full Name</label>

                            <Field
                                type="text"
                                name="fullName"
                                placeholder="Enter Full Name"
                            />

                            <ErrorMessage
                                name="fullName"
                                component="p"
                                className="error"
                            />

                        </div>

                        <div className="formGroup">

                            <label>Email</label>

                            <Field
                                type="email"
                                name="email"
                                placeholder="Enter Email"
                            />

                            <ErrorMessage
                                name="email"
                                component="p"
                                className="error"
                            />

                        </div>

                        <div className="formGroup">

                            <label>Password</label>

                            <Field
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                            />

                            <ErrorMessage
                                name="password"
                                component="p"
                                className="error"
                            />

                        </div>

                        <div className="formGroup">

                            <label>Role</label>

                            <Field
                                as="select"
                                name="role"
                            >
                                <option value="jobSeeker">
                                    Job Seeker
                                </option>

                                <option value="jobRecruiter">
                                    Job Recruiter
                                </option>

                            </Field>

                            <ErrorMessage
                                name="role"
                                component="p"
                                className="error"
                            />

                        </div>

                        <button
                            className="submitButton"
                            type="submit"
                        >
                            Register
                        </button>

                    </Form>

                </Formik>

            )}

        </div>
    );
};

export default Auth;