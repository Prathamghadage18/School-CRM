import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { UPLOAD_PATHS } from "../config/constants.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create upload directories if they don't exist
import fs from "fs";

[UPLOAD_PATHS.NOTICES, UPLOAD_PATHS.STUDY_MATERIALS].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure storage for notices
const noticeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_PATHS.NOTICES);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "notice-" + uniqueSuffix + path.extname(file.originalname));
  },
});

// Configure storage for study materials
const materialStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_PATHS.STUDY_MATERIALS);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "material-" + uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only PDF, DOC, DOCX, and images are allowed."
      ),
      false
    );
  }
};

// Multer instances
export const uploadNotice = multer({
  storage: noticeStorage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

export const uploadMaterial = multer({
  storage: materialStorage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
});

export default { uploadNotice, uploadMaterial };
