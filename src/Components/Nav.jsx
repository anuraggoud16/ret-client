import {Link}  from "react-router-dom";

import "../styles/Nav.css"

function Nav() {
    return (
        <nav className="nav-bar">
           <div className="logo">Realtime Expense Tracker</div>

           <div className="nav-links">
                <Link to='/'>Home</Link>
                <Link to='/signup'>Signup</Link>
                <Link to='/login'>Login</Link>
           </div>


        </nav>
    );
}

export default Nav;