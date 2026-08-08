import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
    const [submitting, setSubmitting] = useState(false);
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

const handleLogin = async (values: any) =>
    {
        console.log("Login Started");

        setSubmitting(true);

        try
        {
            console.log("Calling Login API");

            const response = await auth.login(
                values.email,
                values.password
            );

            console.log("Login Successful");

            toast.success("Login successful");

            if (response.user.role === "jobRecruiter")
            {
                navigate("/recruiter/dashboard");
            }
            else
            {
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
        finally
        {
            setSubmitting(false);
        }
    };
    const handleRegister = async (
        values: any,
        { resetForm }: any
    ) =>
    {
        console.log("Register Started");

        setSubmitting(true);

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
        finally
        {
            setSubmitting(false);
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
                    onClick={() => setIsLogin(true)}
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
                    onClick={() => setIsLogin(false)}
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

                            <div className="passwordField">

                                <Field
                                    type={showLoginPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter Password"
                                />

                                <button
                                    type="button"
                                    className="togglePasswordIcon"
                                    onClick={() =>
                                        setShowLoginPassword(!showLoginPassword)
                                    }
                                    tabIndex={-1}
                                    aria-label={
                                        showLoginPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {
                                        showLoginPassword
                                            ? <FaEyeSlash />
                                            : <FaEye />
                                    }
                                </button>

                            </div>

                            <ErrorMessage
                                name="password"
                                component="p"
                                className="error"
                            />

                        </div>

 <button
                            className="submitButton"
                            type="submit"
                            disabled={submitting}
                        >
                            {submitting ? "Logging in..." : "Login"}
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

                            <div className="passwordField">

                                <Field
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter Password"
                                />

                                <button
                                    type="button"
                                    className="togglePasswordIcon"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    tabIndex={-1}
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {
                                        showPassword
                                            ? <FaEyeSlash />
                                            : <FaEye />
                                    }
                                </button>

                            </div>

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
                            disabled={submitting}
                        >
                            {submitting ? "Registering..." : "Register"}
                        </button>

                    </Form>

                </Formik>

            )}

        </div>
    );
};

export default Auth;
