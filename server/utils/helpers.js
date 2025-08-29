import mongoose from "mongoose";

// Add paginate plugin to mongoose schema
mongoose.paginate = function (schema, options) {
  schema.statics.paginate = async function (query, options) {
    const { page = 1, limit = 10, sort, select, populate } = options || {};
    const skip = (page - 1) * limit;

    const countPromise = this.countDocuments(query).exec();
    const docsPromise = this.find(query)
      .select(select || "")
      .sort(sort || { createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate(populate || "")
      .exec();

    const [totalDocs, docs] = await Promise.all([countPromise, docsPromise]);
      const totalPages = Math.ceil(totalDocs / limit);
      return {
          docs,
          totalDocs,
          totalPages,
          page,
          limit,
          hasNext: page < totalPages,
          hasPrev: page > 1,
      };
  };
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number format
export const isValidPhone = (phone) => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
};

// Generate random string
export const generateRandomString = (length = 8) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Format response
export const formatResponse = (success, data, message = "") => {
  return {
    success,
    data,
    message,
  };
};

// Error response
export const errorResponse = (message, statusCode = 500) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};
