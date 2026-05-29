import { Router } from "express";
import {
  getDashboardStats,
  getServices,
  createService,
  updateService,
  deleteService,
  getTeam,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  getSalonProfile,
  createSalonProfile,
  updateSalonProfile,
  createSuperAdminSalon,
  updateSuperAdminSalon,
  deleteSuperAdminSalon,
} from "../controllers/admin.controller";
import {
  getAdminBookings,
  getAdminBookingById,
  updateAdminBooking,
  deleteAdminBooking,
} from "../controllers/bookings.controller";

const router = Router();

// Dashboard
router.get("/dashboard-stats", getDashboardStats);

// Bookings management
router.get("/bookings", getAdminBookings);
router.get("/bookings/:id", getAdminBookingById);
router.put("/bookings/:id", updateAdminBooking);
router.delete("/bookings/:id", deleteAdminBooking);

// Services CRUD
router.get("/services", getServices);
router.post("/services", createService);
router.put("/services/:id", updateService);
router.delete("/services/:id", deleteService);

// Team
router.get("/team", getTeam);
router.post("/team", createTeamMember);
router.put("/team/:id", updateTeamMember);
router.delete("/team/:id", deleteTeamMember);

// Salon Profile
router.get("/salon-profile", getSalonProfile);
router.post("/salon-profile", createSalonProfile);
router.put("/salon-profile", updateSalonProfile);

// SuperAdmin Salon Management
import { requireSuperAdmin } from "../middlewares/auth";
router.post("/salons", requireSuperAdmin, createSuperAdminSalon);
router.put("/salons/:id", requireSuperAdmin, updateSuperAdminSalon);
router.delete("/salons/:id", requireSuperAdmin, deleteSuperAdminSalon);

export default router;
