import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [cars, setCars] = useState([]);
    const [keyword, setKeyword] = useState("");

    const navigate = useNavigate();

    const fetchCars = async () => {
        try {
            const token = localStorage.getItem("token");
            API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const { data } = await API.get(`/cars/search?keyword=${keyword}`);
            setCars(data.cars);
        } catch (error) {
            console.error("Error fetching cars:", error);
        }
    };

    useEffect(() => {
        fetchCars();
    }, [keyword]);

    return (
        <div>
            <Navbar />
            <div className="p-4">
                <input
                    type="text"
                    placeholder="Search cars..."
                    className="w-full p-2 border rounded mb-4"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <div className="grid grid-cols-3 gap-4">
                    {cars.map((car) => (
                        <div key={car._id} className="bg-gray-100 p-6 rounded-lg shadow-lg">
                            <img
                                src={car.images[0]}
                                alt={car.title}
                                className="w-full h-40 object-cover rounded-t-lg mb-3"
                            />
                            <h3 className="font-semibold text-xl text-gray-800">{car.title}</h3>
                            <p className="text-gray-600 mt-2">{car.description}</p>
                            <button className="text-blue-600 mt-4 hover:text-blue-800 transition-colors duration-200" onClick={() => {
                                navigate(`/car/${car._id}`);
                            }}>
                                View Details
                            </button>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
