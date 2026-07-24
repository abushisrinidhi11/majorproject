import { useNavigate } from "react-router-dom";
import "../styles/notFound.css";

function NotFound()
{
    console.log("Not Found Page Rendering");

    const navigate = useNavigate();

    const handleHome = () =>
    {
        console.log("Go Home Button Clicked");

        navigate("/home");
    };

    return (

        <div className="notFoundPage">

            <div className="notFoundCard">

                <h1 className="errorCode">

                    404

                </h1>

                <h2>

                    Oops! Page Not Found

                </h2>

                <p>

                    The page you are looking for might have been removed,
                    renamed or is temporarily unavailable.

                </p>

                <button
                    className="homeButton"
                    onClick={handleHome}
                >

                    Go Back Home

                </button>

            </div>

        </div>

    );
}

export default NotFound;