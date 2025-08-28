import { findById, find } from "../models/BusAssignment.js";

// Update bus location
export async function updateBusLocation(req, res) {
  try {
    const { busId, lat, lng } = req.body;

    const busAssignment = await findById(busId);
    if (!busAssignment) {
      return res.status(404).json({ message: "Bus assignment not found" });
    }

    await busAssignment.updateLocation(lat, lng);

    // Emit real-time update to all clients tracking this bus
    req.io.to(`bus-${busId}`).emit("location-update", {
      busId,
      location: { lat, lng },
      timestamp: new Date(),
    });

    res.json({ message: "Location updated successfully" });
  } catch (error) {
    console.error("Error updating bus location:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Get bus location
export async function getBusLocation(req, res) {
  try {
    const { busId } = req.params;

    const busAssignment = await findById(busId).populate(
      "student",
      "name user"
    );

    if (!busAssignment) {
      return res.status(404).json({ message: "Bus assignment not found" });
    }

    res.json(busAssignment);
  } catch (error) {
    console.error("Error fetching bus location:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Get all buses
export async function getAllBuses(req, res) {
  try {
    const buses = await find({ isActive: true }).populate(
      "student",
      "name user class"
    );

    res.json(buses);
  } catch (error) {
    console.error("Error fetching buses:", error);
    res.status(500).json({ message: "Server error" });
  }
}

/*
├── server/                 # Node.js/Express backend
│   ├── config/            # Configuration files
│   │   ├── db.js
│   │   ├── multer.js      # File upload config
│   │   
│   ├── controllers/       # Route controllers
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── classController.js
│   │   ├── materialController.js
│   │   ├── attendanceController.js
│   │   ├── gradeController.js
│   │   ├── announcementController.js
│   │   └── busController.js
│   ├── middleware/        # Custom middleware
│   │   ├── auth.js        # Authentication middleware
│   │   ├── rbac.js        # Role-based access control
│   │   ├── validation.js  # Input validation
│   │   └── upload.js      # File upload handling
│   ├── models/            # MongoDB models
│   │   ├── User.js
│   │   ├── Student.js
│   │   ├── Parent.js
│   │   ├── Teacher.js
│   │   ├── Class.js
│   │   ├── StudyMaterial.js
│   │   ├── Attendance.js
│   │   ├── Grade.js
│   │   ├── Announcement.js
│   │   └── BusAssignment.js
│   ├── routes/            # API routes
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── classes.js
│   │   ├── materials.js
│   │   ├── attendance.js
│   │   ├── grades.js
│   │   ├── announcements.js
│   │   └── bus.js
│   ├── utils/             # Utility functions
│   │   ├── helpers.js
│   │   ├── notifications.js # Email/SMS notifications
│   │   └── busSimulator.js  # Bus location simulation
│   ├── .env
│   ├── package.json
│   └── server.js          # Main server file

**According to this give me complete backend for the Teacher module and do not use cloudinary for files uploads instead use the multer with uploads directory. You have already files in previous response consider it.**
*/
