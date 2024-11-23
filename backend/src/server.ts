import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api", profileRoutes);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
