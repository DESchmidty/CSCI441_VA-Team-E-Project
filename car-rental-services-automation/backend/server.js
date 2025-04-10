const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());

// serve index file -- this is the latest code for the server file.
const path = require("path");

app.use(express.static(path.join(__dirname, "../build")));

//  const { exec } = require("child_process");
  //  const path = require("path"); path for function below

// Function to export MongoDB collection in strict mode - does not solve issue
/* function exportMongoCollection() {
    const outputFilePath = path.join(__dirname, "exported_data.json");
    const command = `mongoexport --uri="${process.env.MONGO_URI}" --collection=cars --out=${outputFilePath} --jsonArray --strict`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error exporting collection: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`Collection exported successfully to ${outputFilePath}`);
    });
}   */

// Call the export function
//  exportMongoCollection();






// added in cors configuration because i was having database issues, not sure if its even necessary now, can probably remove
const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
};

app.use(cors(corsOptions));

// same here, this should post to the console actions that we do
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB connection error:", err));

// Import car routes
const carRoutes = require("./cars");
app.use("/api", carRoutes);  


// Catch-all route for React 
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
});


// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

