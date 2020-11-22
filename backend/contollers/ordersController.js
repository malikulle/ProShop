const expressAsyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc Create New Order
// @route POST /api/orders
// @access Private
const AddOrder = expressAsyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    return new ErrorResponse("No Order Items", 400);
  }
  const order = new Order({
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: req.user._id,
  });

  const createdOrder = await order.save();

  return res.status(200).json({
    success: true,
    data: createdOrder,
  });
});

// @desc Get Order By Id
// @route GET /api/orders/:id
// @access Private
const GetOrderById = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate("user", "name email");

  if (!order) {
    return new ErrorResponse("No Order Found", 403);
  }

  return res.status(200).json({
    success: true,
    data: order,
  });
});

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
const UpdateOrderToPaid = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findById(id);

  if (!order) {
    return new ErrorResponse("No Order Found", 403);
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.payer.email_address,
  };

  const updatedOrder = await order.save();

  res.status(200).json({
    success: true,
    data: updatedOrder,
  });
});

// @desc Get Logged In User Order
// @route GET /api/orders/myorders
// @access Private
const GetMyOrders = expressAsyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAt: "desc",
  });
  res.status(200).json({
    success: true,
    data: orders,
  });
});

// @desc Get All Order
// @route GET /api/orders
// @access Private/Admin
const GetAllOrders = expressAsyncHandler(async (req, res, next) => {
  const orders = await Order.find({})
    .populate("user", "name")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: orders,
  });
});

// @desc Update Order To delivered
// @route PUT /api/orders/:id/deliver
// @access Private/Admin
const UpdateOrderToDelivered = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findById(id);

  if (!order) {
    return new ErrorResponse("No Order Found", 403);
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({
    success: true,
    data: order,
  });
});

module.exports = {
  AddOrder,
  GetOrderById,
  UpdateOrderToPaid,
  GetMyOrders,
  GetAllOrders,
  UpdateOrderToDelivered,
};
