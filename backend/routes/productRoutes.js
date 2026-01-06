import express from "express";
import {addProduct, getMyProducts, deleteProduct, getAllProducts, getAllProductsAdmin, toggleProductStatus} from "../controllers/productController.js";
import protect from "../middleware/authMiddleware.js";
import isPartner from "../middleware/partnerMiddleware.js";
import upload from "../config/multer.js";
import isAdmin from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", protect, isPartner, upload.single("image"), addProduct);
router.get("/my-products", protect, isPartner, getMyProducts);
router.delete("/:id", protect, isPartner, deleteProduct);


router.get("/admin/all", protect, isAdmin, getAllProductsAdmin);
router.put("/admin/toggle/:id", protect, isAdmin, toggleProductStatus);

export default router;