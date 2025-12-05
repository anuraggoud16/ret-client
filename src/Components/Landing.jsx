import  "../styles/Landing.css";
import { useNavigate } from "react-router-dom";
function Landing() {
    const navigate = useNavigate()
    return (
        <div className="landing-container">
              <h1>Realtime Expense Tracker</h1>
              <p>Track your expenses smartly and securely!</p>
              <div className="button-group">
                <button onClick={()=> navigate("/login")}>Login</button>
                <button onClick={()=> navigate("/signup")}>Signup</button>
              </div>
        </div>
    );
}
export default Landing;