import {Link, useNavigate} from "react-router-dom";
import "../styles/Login.css";
import { useState } from "react";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const res= await axios.post("https://ret-server-xf88.vercel.app/api/auth/login", {
                email,
                password,
            });

            alert("Login successful!");

            localStorage.setItem("token", res.data.token);

            localStorage.setItem("userId", res.data.user._id);



            navigate("/home");
        } catch(err) {
            alert(err.response.data.msg);
        }
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login Up</h2>


                <input type="email"
                placeholder="email"
                required
                onChange={(e)=> setEmail(e.target.value)}
                />

                <input type="password"
                placeholder="password"
                required
                onChange={(e)=> setPassword(e.target.value)}
                />

                <button type="submit">Log In</button>

                <p>Don't have an account? <Link  to="/signup">Sign Up</Link></p>
            </form>
        </div>
    );
}

export default Login;