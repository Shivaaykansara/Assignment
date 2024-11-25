import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import noteRoutes from "./routes/noteRoutes";
var cors = require('cors')


dotenv.config();

const app = express();

const corsOptions = {
  origin: ['https://hd-note-taker-frontend.onrender.com'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  credentials: true, // Allow cookies and credentials
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api", profileRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/api/notes", noteRoutes);

const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
