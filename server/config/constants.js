export const ROLES = {
  ADMIN: "admin",
  PRINCIPAL: "principal",
  TEACHER: "teacher",
  PARENT: "parent",
};

export const FILE_TYPES = {
  NOTICE: "notice",
  STUDY_MATERIAL: "study-material",
};

export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const MAX_FILE_SIZES = {
  NOTICE: 10 * 1024 * 1024, // 10MB
  STUDY_MATERIAL: 20 * 1024 * 1024, // 20MB
};

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};
