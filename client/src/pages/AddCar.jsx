import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

const AddCar = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    const handleAddCar = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const tagsArray = tags.split(",").map((tag) => tag.trim());
            await API.post("/cars", { title, description, tags: tagsArray, images });
            alert("Car added successfully!");
            navigate("/dashboard");
        } catch (error) {
            alert("Error adding car. Please try again.");
        }
    };

    const handleAddImage = () => {
        if (imageURL.trim() === "") {
            alert("Please enter a valid image URL.");
            return;
        }
        setImages((prevImages) => [...prevImages, imageURL]);
        setImageURL(""); // Clear the input field
    };

    const handleRemoveImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, idx) => idx !== index));
    };

    return (
        <div>
            <Navbar />
            <div className="p-4">
                <h1 className="text-xl font-bold mb-4">Add Car</h1>
                <form onSubmit={handleAddCar} className="bg-white p-6 shadow-md rounded">
                    <input
                        type="text"
                        placeholder="Title"
                        className="w-full p-2 border rounded mb-4"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        className="w-full p-2 border rounded mb-4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Tags (comma-separated)"
                        className="w-full p-2 border rounded mb-4"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        required
                    />
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Image URL"
                            className="w-full p-2 border rounded mb-2"
                            value={imageURL}
                            onChange={(e) => setImageURL(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={handleAddImage}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Add Image
                        </button>
                    </div>
                    <div className="flex gap-2 mb-4 flex-wrap">
                        {images.map((img, idx) => (
                            <div key={idx} className="relative">
                                <img
                                    src={img}
                                    alt={`Car preview ${idx + 1}`}
                                    className="w-24 h-24 object-cover rounded"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(idx)}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Car</button>
                </form>
            </div>
        </div>
    );
};

export default AddCar;
