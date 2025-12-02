import { Router } from "express";
import {
  addDoctors,
  getAllDoctors,
  getDoctorById,
} from "../controllers/doctorController";
import { upload } from "../middlewares/uploadImageMiddleware";
const router = Router();
router.post("/addDoctors", upload.single("image"), addDoctors);
router.get("/allDoctors", getAllDoctors);
router.get("/:id", getDoctorById);
export default router;
