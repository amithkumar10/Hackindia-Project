import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import router from "./route.js";
import connectDB from "./db/mongodb.js";
import http from "http";
import initializeSocket from "./sockets.js";

dotenv.config({ path: "../.env" });

const app = express();
const server = http.createServer(app);

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Initialize Socket.io
const io = initializeSocket(server);

// Basic Route
app.use("/api", router);

// Connect to MongoDB
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
