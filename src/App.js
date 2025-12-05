import {BrowserRouter, Routes, Route} from "react-router-dom";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import Landing from "./Components/Landing";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";

export default function App() {
    return <div>
        <BrowserRouter>
             <Nav/>
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/home" element={<Home/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    </div>
}