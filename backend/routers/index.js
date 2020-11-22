const express = require("express");
const product = require("./product");
const order = require("./order");
const user = require("./user");
const upload = require("./upload");
const router = express.Router();

router.use("/products", product);
router.use("/users", user);
router.use("/orders", order);
router.use("/uploads", upload);

router.get("/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

module.exports = router;
