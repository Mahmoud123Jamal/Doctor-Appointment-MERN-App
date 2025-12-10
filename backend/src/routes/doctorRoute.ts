import { Router } from "express";
import {
  addDoctors,
  getAllDoctors,
  getDoctorById,
  countDoctors,
  relatedSpecializations,
} from "../controllers/doctorController";
import { upload } from "../middlewares/uploadImageMiddleware";
const router = Router();
router.post("/addDoctors", upload.single("image"), addDoctors);
router.get("/allDoctors", getAllDoctors);
router.get("/count", countDoctors);
router.get("/bySpecialization/:specialization", relatedSpecializations);
router.get("/:id", getDoctorById);

export default router;
