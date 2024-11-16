import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Car Management App</h1>
            <p className="text-lg text-gray-600 mb-8 text-center">
                Welcome to the Car Management App! You can add, view, edit, and manage cars with ease.
            </p>
            <div className="flex gap-4">
                <Link
                    to="/login"
                    className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition"
                >
                    Login
                </Link>
                <Link
                    to="/signup"
                    className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition"
                >
                    Sign Up
                </Link>
            </div>
        </div>
    );
};

export default Home;
