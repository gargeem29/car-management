const Car = require('../models/Car');

const createCar = async (req, res) => {
    try {
        const { title, description, images, tags } = req.body;
        const car = await Car.create({
            userId: req.userId,
            title,
            description,
            images,
            tags,
        });
        res.status(201).send({ message: "Car created successfully", car });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const listCars = async (req, res) => {
    try {
        const cars = await Car.find({ userId: req.userId });
        res.status(200).send({ cars });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const searchCars = async (req, res) => {
    try {
        const { keyword, page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        const cars = await Car.find({
            userId: req.userId,
            $or: [
                { title: new RegExp(keyword, 'i') },
                { description: new RegExp(keyword, 'i') },
                { tags: { $regex: keyword, $options: 'i' } },
            ],
        })
            .skip(skip)
            .limit(Number(limit));
        res.status(200).send({ cars, page, total: cars.length });

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const getCar = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.findOne({ _id: id, userId: req.userId });
        if (!car) return res.status(404).send({ message: "Car not found" });
        res.status(200).send({ car });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const updateCar = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const car = await Car.findOneAndUpdate({ _id: id, userId: req.userId }, updates, { new: true });
        if (!car) return res.status(404).send({ message: "Car not found" });
        res.status(200).send({ message: "Car updated successfully", car });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const deleteCar = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.findOneAndDelete({ _id: id, userId: req.userId });
        if (!car) return res.status(404).send({ message: "Car not found" });
        res.status(200).send({ message: "Car deleted successfully" });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

module.exports = { createCar, listCars, searchCars, getCar, updateCar, deleteCar };
