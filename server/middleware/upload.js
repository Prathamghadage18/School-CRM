import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZES } from "../config/constants.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File filter function
const fileFilter = (req, file, cb) => {
  if (ALLOWED_FILE_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only PDF, images, and documents are allowed."
      ),
      false
    );
  }
};

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "uploads/";

    if (req.route.path.includes("notices")) {
      uploadPath += "notices/";
    } else if (req.route.path.includes("materials")) {
      uploadPath += "study-materials/";
    } else {
      uploadPath += "general/";
    }

    cb(null, path.join(__dirname, "../", uploadPath));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

// Multer instance for general uploads
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZES.STUDY_MATERIAL,
  },
});

// Specific upload instances
export const uploadNotice = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../uploads/notices"));
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, "notice-" + uniqueSuffix + path.extname(file.originalname));
    },
  }),
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZES.NOTICE },
});

export const uploadMaterial = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../uploads/study-materials"));
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, "material-" + uniqueSuffix + path.extname(file.originalname));
    },
  }),
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZES.STUDY_MATERIAL },
});

// Error handling middleware for multer
export const handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File too large" });
    }
    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({ message: "Too many files" });
    }
  }
  next(error);
};
