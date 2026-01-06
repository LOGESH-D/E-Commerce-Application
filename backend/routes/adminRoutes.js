import express from "express";
import { getPendingDrivers, getPendingPartners, approveDriver, approvePartner } from "../controllers/adminController.js";
import protect from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/partners/pending", protect, isAdmin, getPendingPartners);
router.get("/drivers/pending", protect, isAdmin, getPendingDrivers);
router.put("/partner/approve/:id", protect, isAdmin, approvePartner);
router.put("/driver/approve/:id", protect, isAdmin, approveDriver);

export default router;