import {Link, useNavigate} from "react-router-dom";
import "../styles/Signup.css";
import { useState } from "react";
import axios from "axios";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignup = async(e) => {
        e.preventDefault();
        try {
            await axios.post("https://ret-server-xf88.vercel.app/api/auth/signup", {
                name,
                email,
                password,
            });

            alert("Signup successful!");

            navigate("/login");
        } catch(err) {
            alert(err.response.data.msg);
        }
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSignup}>
                <h2>Sign Up</h2>

                <input type="text"
                placeholder="Name"
                required
                onChange={(e)=> setName(e.target.value)}
                />

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

                <button type="submit">Sign Up</button>

                <p>Have an account? <Link  to="/login">Log In</Link></p>
            </form>
        </div>
    );
}

export default Signup;