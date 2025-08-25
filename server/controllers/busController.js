const BusAssignment = require("../models/BusAssignment");

// Update bus location
exports.updateBusLocation = async (req, res) => {
  try {
    const { busId, lat, lng } = req.body;

    const busAssignment = await BusAssignment.findById(busId);
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
};

// Get bus location
exports.getBusLocation = async (req, res) => {
  try {
    const { busId } = req.params;

    const busAssignment = await BusAssignment.findById(busId).populate(
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
};

// Get all buses
exports.getAllBuses = async (req, res) => {
  try {
    const buses = await BusAssignment.find({ isActive: true }).populate(
      "student",
      "name user class"
    );

    res.json(buses);
  } catch (error) {
    console.error("Error fetching buses:", error);
    res.status(500).json({ message: "Server error" });
  }
};
