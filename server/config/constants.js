export const ROLES = {
  ADMIN: "admin",
  PRINCIPAL: "principal",
  TEACHER: "teacher",
  PARENT: "parent",
  STUDENT: "student",
};

export const DEFAULT_ADMIN = {
  employeeId: "admin001",
  username: "admin",
  password: "admin123", // Should be changed in production
  email: "admin@school.com",
  firstName: "System",
  lastName: "Admin",
  role: "admin",
};

export const FILE_TYPES = {
  NOTICE: "notice",
  STUDY_MATERIAL: "study_material",
};

export const UPLOAD_PATHS = {
  NOTICES: "uploads/notices/",
  STUDY_MATERIALS: "uploads/study-materials/",
};
