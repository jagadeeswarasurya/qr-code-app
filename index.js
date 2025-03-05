const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");  // Import CORS
const qr = require("qrcode");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());  // Enable CORS for all origins
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public")); // Serve static frontend files

// Generate QR Code
app.get("/api/qrcode", async (req, res) => {
    const text = req.query.q;
    if (!text) return res.status(400).send("Missing query parameter 'q'");

    try {
        const qrCodeData = await qr.toDataURL(text);
        res.json({ qrCode: qrCodeData });
    } catch (error) {
        res.status(500).send("QR Code generation failed: " + error.message);
    }
});

// Start server
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
