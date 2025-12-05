import { Router } from "express";
import {
  addDoctors,
  getAllDoctors,
  getDoctorById,
  countDoctors,
} from "../controllers/doctorController";
import { upload } from "../middlewares/uploadImageMiddleware";
const router = Router();
router.post("/addDoctors", upload.single("image"), addDoctors);
router.get("/allDoctors", getAllDoctors);
router.get("/countdoctors", countDoctors);
router.get("/:id", getDoctorById);

export default router;
