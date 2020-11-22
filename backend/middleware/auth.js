const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User")
const ErrorResponse = require("../utils/errorResponse");

const protect = expressAsyncHandler(async (req,res,next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
  
    if (!token) {
      return next(new ErrorResponse("Not Authorize To Access Route",401));
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      req.user = await User.findById(decoded.id);

      req.user.password = undefined;
      next();
    } catch (error) {
      return next(new ErrorResponse("Not Authorize To Access Route",401));
    }
})


module.exports = protect