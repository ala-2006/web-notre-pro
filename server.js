const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // Serve static files from public/


// Route to handle form submission
app.post("/submit", async (req, res) => {
    const { name, email, phone, message, access_key } = req.body;

    // Basic validation
    if (!name || !email || !phone || !message) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Validate access_key (example check, replace with actual key validation)
    if (access_key !== "YOUR_ACCESS_KEY") {
        return res.status(403).json({ success: false, message: "Invalid access key." });
    }

    // You can add more validation logic for name, email, and phone here if needed
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^[0-9]{8,15}$/;

    if (!emailPattern.test(email)) {
        return res.status(400).json({ success: false, message: "Invalid email format." });
    }

    if (!phonePattern.test(phone)) {
        return res.status(400).json({ success: false, message: "Invalid phone number format." });
    }

    // If all validation passed, proceed with form submission
    // Here, you can add functionality to send an email, store data, etc.
    res.json({
        success: true,
        message: "Form submitted successfully.",
        data: { name, email, phone, message }
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});