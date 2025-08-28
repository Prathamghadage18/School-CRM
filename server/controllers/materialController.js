import StudyMaterial from "../models/StudyMaterial";
import Class from "../models/Class";
import { sendNotification } from "../utils/notifications";

// Upload study material
export const uploadMaterial = async (req, res) => {
  try {
    const { title, description, classId, subject } = req.body;
    const fileUrl = req.file.path; // Assuming multer handles file upload

    // Check if class exists
    const classExists = await Class.findById(classId);
    if (!classExists) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    const material = await StudyMaterial.create({
      title,
      description,
      fileUrl,
      class: classId,
      subject,
      uploadedBy: req.user.teacherId,
    });

    // Populate the material with additional info
    await material.populate("class", "name section");

    // Notify students and parents about new material (simplified)
    // In a real implementation, you would send notifications to all students in the class
    sendNotification({
      type: "NEW_MATERIAL",
      class: classId,
      message: `New study material uploaded for ${subject}: ${title}`,
    });

    res.status(201).json({
      success: true,
      message: "Study material uploaded successfully",
      data: material,
    });
  } catch (error) {
    console.error("Upload material error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get materials by class
export const getMaterialsByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const materials = await StudyMaterial.find({ class: classId })
      .populate("class", "name section")
      .populate("uploadedBy", "name")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await StudyMaterial.countDocuments({ class: classId });

    res.status(200).json({
      success: true,
      data: materials,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get materials error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Delete study material
export const deleteMaterial = async (req, res) => {
  try {
    const { materialId } = req.params;

    const material = await StudyMaterial.findById(materialId);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Material not found",
      });
    }

    // Check if the teacher owns this material
    if (material.uploadedBy.toString() !== req.user.teacherId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this material",
      });
    }

    await StudyMaterial.findByIdAndDelete(materialId);

    res.status(200).json({
      success: true,
      message: "Material deleted successfully",
    });
  } catch (error) {
    console.error("Delete material error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
