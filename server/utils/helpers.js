import jwt from "jsonwebtoken";

// Generate JWT token
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// Format response
export const formatResponse = (success, message, data = null) => {
  return {
    success,
    message,
    data,
  };
};

// Pagination helper (for manual queries, not mongoose plugin)
export const paginate = (query, options = {}) => {
  const page = parseInt(options.page, 10) || 1;
  const limit = parseInt(options.limit, 10) || 10;
  const skip = (page - 1) * limit;

  return query.skip(skip).limit(limit);
};

// Generate username based on role and ID
export const generateUsername = (role, identifier) => {
  return role === "parent" ? `parent_${identifier}` : identifier;
};
