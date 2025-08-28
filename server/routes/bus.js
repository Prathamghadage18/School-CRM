import { Router } from "express";
const router = Router();
import { updateBusLocation, getBusLocation, getAllBuses } from "../controllers/busController.js";
import { protect, authorize } from "../middleware/auth.js";

// All bus routes require authentication
router.use(protect);

// Update bus location - authorized for drivers/staff only
router.put(
  "/location",
  authorize("principal", "teacher"),
  updateBusLocation
);

// Get specific bus location
router.get(
  "/:busId",
  authorize("principal", "teacher", "parent", "student"),
  getBusLocation
);

// Get all buses
router.get("/", authorize("principal", "teacher"), getAllBuses);

export default router;
