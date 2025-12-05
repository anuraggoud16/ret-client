import { useState, useEffect, useCallback} from "react";
import "../styles/Home.css";

import axios from "axios";

import {useNavigate} from "react-router-dom";

function Home() {
    const [expenses, setExpenses] =useState([])
    const [form, setForm] = useState({
        amount: "",
        category: "",
        date: "",
        note: "",
    });

    const [filterDate, setFilterDate] = useState("");

    const [filterMonth, setFilterMonth] = useState("");

    const userId = localStorage.getItem("userId");

    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    const fetchAll = useCallback(async(e)=> {
        try {
            const res = await axios.get(`https://ret-server-xf88.vercel.app/api/expense/getUserExpense/${userId}`, 
                {
                    headers: {Authorization: `Bearer ${token}`},
                }
            );

            setExpenses(res.data);
        } catch(err) {
            alert(err.response.data.msg);
        }
    }, [userId, token]);

    useEffect(()=> {
        if(!userId || !token) {
            alert("Please login first");
            navigate("/login");
            return;
        }
        fetchAll();
    }, [userId, token, navigate, fetchAll]);

    const fetchByDate = async(e) => {
        try {
            const res = await axios.get("https://ret-server-xf88.vercel.app/api/expense/by-date",
                {
                    params: {userId, date: filterDate},
                    headers: {Authorization: `Bearer ${token}`},
                }
            );

            setExpenses(res.data);
        } catch(err) {
            alert(err.response.data.msg);
        }
    }

    const fetchByMonth = async(e) => {
        try {
            const res = await axios.get("https://ret-server-xf88.vercel.app/api/expense/by-month",
                {
                    params: {userId, month: filterMonth},
                    headers: {Authorization: `Bearer ${token}`},
                }
            );

            setExpenses(res.data);
        } catch(err) {
            alert(err.response.data.msg);
        }
    }

    function handleChange(e) {
        setForm({...form, [e.target.name]:e.target.value})
    }

    const handleSubmit = async(e)=> {
        e.preventDefault();
        if(!form.amount || !form.category) return;

        try {   
            const res = await axios.post("https://ret-server-xf88.vercel.app/api/expense/add",
                {...form, userId},
                {headers: {Authorization: `Bearer ${token}`}},
            );

            setExpenses((prev)=> [...prev, res.data]);

            setForm({
                amount:"",
                category:"",
                date:"",
                note:"",
            });

        } catch(err) {
            alert(err.response.data.msg);
        }

    }
    
    return (
        <div className="home-container">
            <h1>Welcome Back</h1>

            <form className="expense-form" onSubmit={handleSubmit}>
                <input type="Number" placeholder="Amount" name="amount" onChange={handleChange} value={form.amount} required />
                <input type="text" placeholder="Category" name="category" onChange={handleChange} value={form.category} required />
                <input type="date" placeholder="date" name="date" onChange={handleChange} value={form.date} />
                <input type="text" placeholder="Note.." name="note" onChange={handleChange} value={form.note}  />
                <button type="submit">Add Expense</button>
            </form>

            <div className="filter-section">
                <h1>Filter Expenses</h1>
                <input type="date" onChange={(e)=> setFilterDate(e.target.value)} />
                <button onClick={fetchByDate}>Filter by date</button>

                <input type="month" onChange={(e)=> setFilterMonth(e.target.value)}/>
                <button onClick={fetchByMonth}>Filter by Month</button>


                <button onClick={fetchAll}>Show all expenses</button>
            </div>

            <div className="expenses-list">
                 <h2>Recent Expenses</h2>
                 {
                    expenses.length === 0?(
                        <p>No Expenses</p>
                    ):(
                        <ul>
                            {
                                expenses.map((exp)=> {
                                    return <li key={exp.id}>₹{exp.amount}-{exp.category}({exp.date})<br/>
                                    <span className="note">{exp.note}</span>
                                    </li>
                                })
                            }
                        </ul>
                    )
                 }
            </div>
        </div>
    );

}

export default Home;