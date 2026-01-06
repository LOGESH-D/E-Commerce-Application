import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";
import { connectCloudinary } from "./config/cloudinary.js";

connectCloudinary();

const app = express();
const PORT = process.env.PORT || 5000;



connectDB();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("API is running...");
});
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/driver", driverRoutes);


app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});
