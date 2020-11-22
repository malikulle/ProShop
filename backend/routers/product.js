const express = require("express");
const {
  GetById,
  GetProducts,
  DeleteProduct,
  CreateProduct,
  UpdateProduct,
  CreateProductReview,
  GetTopProducts,
} = require("../contollers/productsController");
const Product = require("../models/Product");
const advanceResult = require("../middleware/advanceResults");
const protect = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
const router = express.Router();

router.get("/", advanceResult(Product), GetProducts);
router.get("/top", GetTopProducts);
router.post("/", protect, adminAuth, CreateProduct);
router.post("/:id/reviews", protect, CreateProductReview);
router.put("/", protect, adminAuth, UpdateProduct);
router.get("/:id", GetById);
router.delete("/:id", protect, adminAuth, DeleteProduct);

module.exports = router;
