import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import API from "../services/api";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await API.post("/users/signup", { name, email, password });
            alert("Signup successful! Please login.");
            navigate("/login");
        } catch (error) {
            alert("Signup failed. Try again.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSignup} className="bg-white p-8 shadow-md rounded">
                <h2 className="text-xl font-bold mb-4">Signup</h2>
                <input
                    type="text"
                    placeholder="Name"
                    className="w-full p-2 border rounded mb-4"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-4">
                    Signup
                </button>
                {/* Add the Login link */}
                <div className="text-center">
                    <p>
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Go to Login
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Signup;
