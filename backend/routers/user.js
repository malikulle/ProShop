const express = require("express");
const protect = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
const router = express.Router();
const {
  AuthUser,
  GetLoggedInUser,
  RegisterUser,
  UpdateProfile,
  GetUsers,
  DeleteUser,
  GetUserById,
  UpdateUser
} = require("../contollers/usersController");

router.post("/", RegisterUser);
router.get("/", protect, adminAuth, GetUsers);
router.put("/profile", protect, UpdateProfile);
router.get("/profile", protect, GetLoggedInUser);
router.get("/:id", protect, adminAuth, GetUserById);
router.put("/:id", protect, adminAuth, UpdateUser);
router.delete("/:id", protect, adminAuth, DeleteUser);
router.post("/login", AuthUser);

module.exports = router;
