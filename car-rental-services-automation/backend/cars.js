const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");


const CarSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    pricePerDay: { type: Number, required: true },
    availability: { type: Boolean, required: true }
});

const Car = mongoose.model("Car", CarSchema);

// Add a new car
router.post("/", async (req, res) => {
    try {
        const { make, model, year, pricePerDay, availability } = req.body;
        const newCar = new Car({ make, model, year, pricePerDay, availability });
        await newCar.save();
        res.status(201).json(newCar);
    } catch (err) {
        console.error("Error adding car:", err);
        res.status(400).json({ message: err.message });
    }
});

// Get all cars
router.get("/", async (req, res) => {
    try {
        const cars = await Car.find();   //.lean();   //added lean, found in a thread that suggested it may work
   //     console.log(cars); // added logging to show results
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a car - Done
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Car.findByIdAndDelete(id);
        res.status(200).json({ message: "Car deleted successfully" });
    } catch (err) {
        console.error("Error deleting car:", err);
        res.status(500).json({ message: err.message });
    }
});


// Update car availability - Also Done
router.put("/:id/availability", async (req, res) => {
    try {
        const { id } = req.params;
        const { availability } = req.body; 
        const updatedCar = await Car.findByIdAndUpdate(
            id,
            { availability },
            { new: true } 
        );
        if (!updatedCar) {
            return res.status(404).json({ message: "Car not found" });
        }
        res.status(200).json(updatedCar);
    } catch (err) {
        console.error("Error updating car availability:", err);
        res.status(500).json({ message: err.message });
    }
});


module.exports = {
    Car,
    router,
};
