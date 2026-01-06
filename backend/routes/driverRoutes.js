import express from "express";
import protect from "../middleware/authMiddleware.js";
import isDriver from "../middleware/driverMiddleware.js";
import { updateDriverLocation, getNearbyOrders } from "../controllers/driverController.js";

const router = express.Router();

router.put("/location", protect, isDriver, updateDriverLocation);
router.get("/nearby-orders", protect, isDriver, getNearbyOrders);

export default router;