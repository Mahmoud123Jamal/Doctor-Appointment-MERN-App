import { Router } from "express";
import { addDoctors } from "../controllers/doctorController";
const router = Router();
router.post("/addDoctors", addDoctors);
export default router;
