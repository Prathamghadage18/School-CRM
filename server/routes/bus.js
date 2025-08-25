const express = require("express");
const router = express.Router();
const busController = require("../controllers/busController");
const { protect, authorize } = require("../middleware/auth");

// All bus routes require authentication
router.use(protect);

// Update bus location - authorized for drivers/staff only
router.put(
  "/location",
  authorize("principal", "teacher"),
  busController.updateBusLocation
);

// Get specific bus location
router.get(
  "/:busId",
  authorize("principal", "teacher", "parent", "student"),
  busController.getBusLocation
);

// Get all buses
router.get("/", authorize("principal", "teacher"), busController.getAllBuses);

module.exports = router;
