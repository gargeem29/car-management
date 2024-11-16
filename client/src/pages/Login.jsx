import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import API from "../services/api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post("/users/login", { email, password });
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (error) {
            alert("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleLogin} className="bg-white p-8 shadow-md rounded">
                <h2 className="text-xl font-bold mb-4">Login</h2>
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
                    Login
                </button>
                {/* Add the Signup link */}
                <div className="text-center">
                    <p>
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-blue-500 hover:underline">
                            Create one
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
