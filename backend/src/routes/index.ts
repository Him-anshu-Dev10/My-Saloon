import { Router } from "express";
import salonsRoutes from "./salons.routes";
import { sendOtp, verifyOtp } from "../controllers/auth.controller";
import bookingRoutes from "./bookings.routes";

const router = Router();

// Mount all modular routes
router.use("/salons", salonsRoutes);
router.use("/bookings", bookingRoutes);

// Auth OTP routes
router.post("/auth/send-otp", sendOtp);
router.post("/auth/verify-otp", verifyOtp);

export default router;
