const express = require("express");
const {
  AddOrder,
  GetOrderById,
  UpdateOrderToPaid,
  GetMyOrders,
  GetAllOrders,
  UpdateOrderToDelivered,
} = require("../contollers/ordersController");
const protect = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
const router = express.Router();

router.get("/myorders", protect, GetMyOrders);
router.get("/", protect, adminAuth, GetAllOrders);
router.post("/", protect, AddOrder);
router.get("/:id", protect, GetOrderById);
router.put("/:id/pay", protect, UpdateOrderToPaid);
router.put("/:id/deliver", protect, adminAuth, UpdateOrderToDelivered);
module.exports = router;
