const expressAsyncHandler = require("express-async-handler");
const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc Auth User
// @route GET /api/users/login
// @access Public
const AuthUser = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorResponse("User Not Found", 400));
  }

  const match = await user.matchPassword(password);

  if (!match) {
    return next(new ErrorResponse("Invalid Credential. Try Again !", 400));
  }

  res.status(200).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: user.generateToken(),
    },
  });
});

// @desc Get Logged In User
// @route GET /api/users/profile
// @access Private
const GetLoggedInUser = expressAsyncHandler(async (req, res, next) => {
  res.status(200).json(req.user);
});

// @desc Update User Profile
// @route PUT /api/users
// @access Private
const UpdateProfile = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return new ErrorResponse("User Not Found", 401);
  }

  const { name, email, password } = req.body;

  user.email = email;
  user.name = name;
  user.password = password;
  await user.save();
  user.password = undefined;

  res.status(200).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: user.generateToken(),
    },
  });
});

// @desc Register User
// @route GET /api/users
// @access Public
const RegisterUser = expressAsyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const exist = await User.findOne({ email });

  if (exist) {
    return next(new ErrorResponse("Email is taken. Try another.", 400));
  }

  let user = {
    name,
    email,
    password,
  };

  user = await User.create(user);

  res.status(200).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: user.generateToken(),
    },
  });
});

// @desc Get All Users
// @route GET /api/users
// @access Private/Admin
const GetUsers = expressAsyncHandler(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({
    success: true,
    data: users,
  });
});

// @desc Delete User
// @route DELETE /api/users
// @access Privete/Admin
const DeleteUser = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return new ErrorResponse("User Not Found", 401);
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Removed",
  });
});

// @desc Get User By Id
// @route DELETE /api/users/:id
// @access Privete/Admin
const GetUserById = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id).select("-password");

  if (!user) {
    return new ErrorResponse("User Not Found", 404);
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc Update User Profile
// @route PUT /api/users/:id
// @access Private
const UpdateUser = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return new ErrorResponse("User Not Found", 401);
  }

  const { name, email,  isAdmin } = req.body;

  user.email = email;
  user.name = name;
  user.isAdmin = isAdmin;
  await user.save();

  res.status(200).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
  });
});

module.exports = {
  AuthUser,
  GetLoggedInUser,
  RegisterUser,
  UpdateProfile,
  GetUsers,
  DeleteUser,
  GetUserById,
  UpdateUser
};
