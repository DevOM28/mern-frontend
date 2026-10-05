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

// MongoDB Atlas Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected Successfully!"))
  .catch((err) => console.error("Database connection error:", err));

// Test routes
app.get("/", (req, res) => {
  res.send("MERN Application Running");
});

app.get("/api/status", (req, res) => {
  res.json({
    status: "Online",
    message: "Backend and MongoDB Atlas are connected and working!",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});