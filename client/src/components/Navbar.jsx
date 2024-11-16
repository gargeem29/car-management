import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
            <h1 className="text-lg font-bold">Car Management</h1>
            <div>
                <Link to="/dashboard" className="mx-2">Dashboard</Link>
                <Link to="/add-car" className="mx-2">Add Car</Link>
                <button onClick={handleLogout} className="bg-red-500 px-4 py-1 rounded">Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
