import express from "express";
import { placeOrder, acceptOrder, assignDriver, updateDeliveryStatus, getMyOrders, cancelOrder } from "../controllers/orderController.js";
import protect from "../middleware/authMiddleware.js";
import isPartner from "../middleware/partnerMiddleware.js";
import isDriver from "../middleware/driverMiddleware.js";

const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/my-orders", protect, getMyOrders);
router.put("/:id/accept", protect, isPartner, acceptOrder);
router.put("/:id/assign", protect, isDriver, assignDriver);
router.put("/:id/status", protect, isDriver, updateDeliveryStatus);
router.put("/:id/cancel", protect, cancelOrder);

export default router;