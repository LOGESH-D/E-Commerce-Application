import {cloudinary} from "../config/cloudinary.js";
import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!name || !description || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const numericPrice = Number(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      return res.status(400).json({ message: "Price must be a valid positive number" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Product image is required" });
    }

    if (req.file.size > 5 * 1024 * 1024) {
      return res.status(400).json({ message: "Image file too large. Maximum size is 5MB" });
    }

    if (!req.file.mimetype.startsWith('image/')) {
      return res.status(400).json({ message: "Only image files are allowed" });
    }

    const uploadResult = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "products",
      }
    );

    const product = await Product.create({
      name,
      description,
      price: numericPrice,
      image: {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      },
      partner: req.user.id,
      platformCommission: 10,
      isActive: true,
    });

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Add product error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({
      partner: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.partner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    /* ===== Delete image from Cloudinary ===== */
    if (product.image?.public_id) {
      await cloudinary.uploader.destroy(product.image.public_id);
    }

    await product.deleteOne();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true })
      .populate("partner", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
