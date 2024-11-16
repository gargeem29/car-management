import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

const CarDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        tags: "",
    });

    // Helper to set Authorization header
    const setAuthToken = () => {
        const token = localStorage.getItem("token");
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    };

    // Fetch car details
    const fetchCar = async () => {
        try {
            setAuthToken();
            const { data } = await API.get(`/cars/${id}`);
            setCar(data.car);
            setFormData({
                title: data.car.title,
                description: data.car.description,
                tags: data.car.tags.join(", "),
            });
        } catch (error) {
            console.error("Error fetching car details:", error);
            alert("Unable to load car details. Please try again.");
        }
    };

    // Update car details
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            setAuthToken();
            const tagsArray = formData.tags.split(",").map((tag) => tag.trim());
            await API.put(`/cars/${id}`, {
                title: formData.title,
                description: formData.description,
                tags: tagsArray,
            });
            alert("Car details updated successfully!");
            setIsEditing(false);
            fetchCar();
        } catch (error) {
            console.error("Error updating car details:", error);
            alert("Unable to update car. Please try again.");
        }
    };

    // Delete car
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this car?")) return;

        try {
            setAuthToken();
            await API.delete(`/cars/${id}`);
            alert("Car deleted successfully!");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error deleting car:", error);
            alert("Unable to delete car. Please try again.");
        }
    };

    useEffect(() => {
        fetchCar();
    }, []);

    if (!car) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500">Loading car details...</p>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto p-6">
                {isEditing ? (
                    <form
                        onSubmit={handleUpdate}
                        className="bg-white p-6 shadow-md rounded-md border"
                    >
                        <h2 className="text-xl font-semibold mb-4">Edit Car Details</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({ ...formData, title: e.target.value })
                                }
                                required
                                aria-label="Car Title"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                className="w-full p-2 border rounded"
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                                required
                                aria-label="Car Description"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Tags (comma-separated)
                            </label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={formData.tags}
                                onChange={(e) =>
                                    setFormData({ ...formData, tags: e.target.value })
                                }
                                required
                                aria-label="Car Tags"
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="bg-white p-6 shadow-md rounded-md border">
                        <h1 className="text-2xl font-bold mb-4">{car.title}</h1>
                        <p className="mb-4 text-gray-700">{car.description}</p>
                        <p className="mb-4 text-gray-600">
                            <strong>Tags:</strong> {car.tags.join(", ")}
                        </p>
                        <div className="flex gap-2 mb-4">
                            {car.images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`Car ${idx + 1}`}
                                    className="w-24 h-24 object-cover rounded-md shadow-sm"
                                />
                            ))}
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CarDetail;
