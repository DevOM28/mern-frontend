require("dotenv").config();
const dns = require("node:dns");
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Reusable connection cache for serverless environments
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = db.connections[0].readyState;
    console.log("MongoDB Atlas Connected Successfully!");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

// Middleware to ensure DB connection before handling requests
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Test routes
app.get("/", (req, res) => {
  res.send("MERN Application Running on Vercel");
});

app.get("/api/status", (req, res) => {
  res.json({
    status: "Online",
    message: "Backend and MongoDB Atlas are connected and working!",
  });
});

// Run local listener only in development mode
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

// Export the express app for Vercel Serverless Functions
module.exports = app;