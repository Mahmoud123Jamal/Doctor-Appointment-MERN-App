import { Router } from "express";
import {
  createAppointment,
  getUserAppointments,
  deleteUserAppointment,
} from "../controllers/appiontmentController";
import { protect } from "../middlewares/authMiddleware";
const router = Router();
router.post("/createAppointment", protect, createAppointment);
router.get("/getUserAppointments", protect, getUserAppointments);
router.delete("/deleteUserAppointment/:id", deleteUserAppointment);

export default router;
