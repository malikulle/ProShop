const express = require("express");
const multer = require("multer");
const path = require("path");
const protect = require("../middleware/auth");
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "backend/public/images");
  },
  filename(req, file, cb) {
    req.savedProfileImage = `${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, req.savedProfileImage);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }
  cb("Images only");
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", protect, upload.single("image"), (req, res) => {
  res.send(`/images/${req.savedProfileImage}`);
});

module.exports = router;
