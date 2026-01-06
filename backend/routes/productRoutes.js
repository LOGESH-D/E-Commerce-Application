import express from "express";
import {addProduct, getMyProducts, deleteProduct, getAllProducts} from "../controllers/productController.js";
import protect from "../middleware/authMiddleware.js";
import isPartner from "../middleware/partnerMiddleware.js";
import upload from "../config/multer.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", protect, isPartner, upload.single("image"), addProduct);
router.get("/my-products", protect, isPartner, getMyProducts);
router.delete("/:id", protect, isPartner, deleteProduct);


export default router;