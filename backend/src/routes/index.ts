import { Router } from "express";
import salonsRoutes from "./salons.routes";
import { sendOtp, verifyOtp } from "../controllers/auth.controller";

const router = Router();

// Mount all modular routes
router.use("/salons", salonsRoutes);

// Auth OTP routes
router.post("/auth/send-otp", sendOtp);
router.post("/auth/verify-otp", verifyOtp);

export default router;
