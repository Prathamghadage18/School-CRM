import Notice from "../models/Notice.js";

// 📌 Create Notice
export const createNotice = async (req, res) => {
  try {
    const { title, content, category, linkType, linkUrl, expiryDate } = req.body;
    const createdBy = req.user.id; // set by auth middleware

    let attachment = null;
    let link = null;

    // 📂 Handle file upload (Multer adds req.file)
    if (req.file) {
      attachment = {
        filename: req.file.filename,
        path: req.file.path,
        originalName: req.file.originalname,
      };
    }

    // 🔗 Handle external link
    if (linkUrl) {
      link = {
        url: linkUrl,
        type: linkType || "website",
      };
    }

    const notice = new Notice({
      title,
      content,
      category: category || "general",
      attachment,
      link,
      createdBy,
      expiryDate: expiryDate || null,
    });

    await notice.save();

    res.status(201).json({
      success: true,
      message: "Notice created successfully",
      data: notice,
    });
  } catch (error) {
    console.error("Error creating notice:", error);
    res.status(500).json({
      success: false,
      message: "Error creating notice",
      error: error.message,
    });
  }
};

// 📌 Get Active Notices
export const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find({ isActive: true })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      message: "Notices retrieved successfully",
      data: notices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching notices",
      error: error.message,
    });
  }
};

// 📌 Update Notice
export const updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, linkType, linkUrl, expiryDate, isActive } =
      req.body;

    let updateData = {
      title,
      content,
      category,
      expiryDate,
      isActive,
    };

    // 📂 If new file uploaded
    if (req.file) {
      updateData.attachment = {
        filename: req.file.filename,
        path: req.file.path,
        originalName: req.file.originalname,
      };
    }

    // 🔗 If new link provided
    if (linkUrl) {
      updateData.link = {
        url: linkUrl,
        type: linkType || "website",
      };
    }

    const updatedNotice = await Notice.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedNotice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found",
      });
    }

    res.json({
      success: true,
      message: "Notice updated successfully",
      data: updatedNotice,
    });
  } catch (error) {
    console.error("Error updating notice:", error);
    res.status(500).json({
      success: false,
      message: "Error updating notice",
      error: error.message,
    });
  }
};

// 📌 Delete Notice
export const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNotice = await Notice.findByIdAndDelete(id);

    if (!deletedNotice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found",
      });
    }

    res.json({
      success: true,
      message: "Notice deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting notice:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting notice",
      error: error.message,
    });
  }
};