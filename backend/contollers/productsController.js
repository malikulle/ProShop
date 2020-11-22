const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc Get All Products
// @route GET /api/products
// @access Public
const GetProducts = expressAsyncHandler(async (req, res) => {
  return res.status(200).json(res.advanceResults);
});

// @desc Get Single Products
// @route GET /api/products/:id
// @access Public
const GetById = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  return res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc Remove Product
// @route DELETE /api/products/:id
// @access Private/Admin
const DeleteProduct = expressAsyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorResponse("Product Not Found", 400));
  }

  await product.remove();

  return res.status(200).json({
    success: true,
    message: "Product Removed",
  });
});

// @desc Create Product
// @route POST /api/products
// @access Private/Admin
const CreateProduct = expressAsyncHandler(async (req, res, next) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  await product.save();

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc Update Product
// @route POST /api/products
// @access Private/Admin
const UpdateProduct = expressAsyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.body.id);

  if (!product) {
    return new ErrorResponse("Product Not Found", 400);
  }

  const {
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    description,
  } = req.body;

  product.name = name;
  product.price = price;
  product.image = image;
  product.brand = brand;
  product.category = category;
  product.countInStock = countInStock;
  product.description = description;

  await product.save();

  res.status(200).json({
    success: true,
    message: "Product Updated",
    data: product,
  });
});

// @desc Create Product Review
// @route POST /api/products/:id/reviews
// @access Private/Admin
const CreateProductReview = expressAsyncHandler(async (req, res, next) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorResponse("Product Not Found", 400));
  }

  const alreadyReviewed = product.reviews.find(
    (x) => x.user.toString() === req.user._id.toString()
  );
  if (alreadyReviewed) {
    return next(new ErrorResponse("Product Already Reviewed"));
  }

  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment: comment,
    user: req.user._id,
  };
  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save();

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc Get Top Rating Product
// @route GET /api/products/top
// @access Public
const GetTopProducts = expressAsyncHandler(async (treq, res, next) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.status(200).json({
    success: true,
    data: products,
  });
});

module.exports = {
  GetProducts,
  GetById,
  DeleteProduct,
  CreateProduct,
  UpdateProduct,
  CreateProductReview,
  GetTopProducts
};
