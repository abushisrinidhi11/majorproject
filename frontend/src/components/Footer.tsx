import {Link} from "react-router-dom";
import "../styles/footer.css";
const Footer=()=>
{
    console.log("Footer Rendering");
    return(
        <footer className="footer">
            <h3>JobHunt</h3>
            <p>Find your dream job with JobHunt.</p>
            <div className="footerLinks">
                <Link to="/home">Home</Link>
                <Link to="/jobs">Jobs</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/my-applications">My Applications</Link>
            </div>
            <div className="footerBottom">
                <p>© 2026 JobHunt. All Rights Reserved.</p>
            </div>
        </footer>
    );
};
export default Footer;