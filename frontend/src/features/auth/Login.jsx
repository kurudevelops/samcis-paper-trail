import { Link } from "react-router-dom";

function Login() {
    // TODO: make a proper login page and style the link (<a>) as a button
    return (
        <div>            
            <Link to="http://localhost:8000/api/v1/auth/login/google">Google Sign-in</Link>
        </div>
    )
}

export default Login;