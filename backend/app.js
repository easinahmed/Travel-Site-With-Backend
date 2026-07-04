const express = require("express");
const cors = require("cors");
const dbConfig = require("./config/db.config");
const authRoutes = require("./routes/auth.routes");
const contentRoutes = require("./routes/content.routes");
const bookingRoutes = require("./routes/booking.routes");
const consultationRoutes = require("./routes/consultation.routes");

const app = express();

// Middleware - Enable CORS for local dev port
app.use(cors());
app.use(express.json());

// Connect to MongoDB
if (process.env.MONGO_URI) {
  dbConfig();
}

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/visa-consultations", consultationRoutes);

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "TR Travel backend is running" });
});

module.exports = app;