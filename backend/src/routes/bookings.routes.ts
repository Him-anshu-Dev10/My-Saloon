import { Router } from "express";
import {
  createBooking,
  getBooking,
  cancelBooking,
  getAvailableSlots,
  getUserBookings,
  getAllBookings,
  getSalonBookings,
  allocateBarber
} from "../controllers/bookings.controller";
import { authenticateJWT, requireAdmin } from "../middlewares/auth";

const router = Router();

// Order matters: specific routes before parameterized ones

// Admin routes
router.get("/admin", authenticateJWT, requireAdmin, getSalonBookings);
router.patch("/admin/:id/allocate", authenticateJWT, requireAdmin, allocateBarber);

router.get("/all", getAllBookings); // <--- Added endpoint for admins
router.get("/slots", getAvailableSlots);
router.get("/user/:email", getUserBookings);
router.post("/", createBooking);
router.get("/:id", getBooking);
router.patch("/:id/cancel", cancelBooking);

export default router;
