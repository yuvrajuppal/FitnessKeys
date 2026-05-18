import multer from "multer";
import path from "path";

// Configure where and how the files are stored
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure to create an "uploads" folder in your root directory!
  },
  filename: function (req, file, cb) {
    // Generate a unique file name to prevent overwriting
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Initialize upload middleware

export const upload = multer({ storage: storage });
