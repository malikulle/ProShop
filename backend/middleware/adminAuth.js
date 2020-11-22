const expressAsyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");

const adminAuth = expressAsyncHandler(async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(new ErrorResponse("You dont have permission to access.", 401));
  }
  next();
});

module.exports = adminAuth;
