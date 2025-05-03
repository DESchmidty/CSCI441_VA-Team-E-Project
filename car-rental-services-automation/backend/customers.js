const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Car = require("./cars").Car; 

//Customer Schema
const CustomerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true }, //should reference whatever car is selected
});

const Customer = mongoose.model("Customer", CustomerSchema);
//code to add customers
router.post("/", async (req, res) => {
    try {
        const { firstName, lastName, email, phone, carId } = req.body;
        const newCustomer = new Customer({ firstName, lastName, email, phone, carId });
        await newCustomer.save();
        res.status(201).json(newCustomer);
    } catch (err) {
        console.error("Error adding customer:", err);
        res.status(400).json({ message: err.message });
    }
});
//get customers both all of them and by specific id, for finding whos connected to what car further down
router.get("/", async (req, res) => {
    try {
        const customers = await Customer.find(); // Fetch all customers
        res.status(200).json(customers);
    } catch (err) {
        console.error("Error fetching customers:", err);
        res.status(500).json({ message: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id); // search by id
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json(customer);
    } catch (err) {
        console.error("Error fetching customer:", err);
        res.status(500).json({ message: err.message });
    }
});

router.delete("/:id", async (req, res) => {  // new code for deleting customers
    try {
        const { id } = req.params;

        // searches by the customers id to find the carid associated with the customer
        const customer = await Customer.findById(id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        // delete by id
        await Customer.findByIdAndDelete(id);

        // updates the car's availability to true
        if (customer.carId) {
            await Car.findByIdAndUpdate(customer.carId, { availability: true });
        }

        res.status(200).json({ message: "Customer deleted" });
    } catch (err) {
        console.error("Error deleting customer:", err);
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
