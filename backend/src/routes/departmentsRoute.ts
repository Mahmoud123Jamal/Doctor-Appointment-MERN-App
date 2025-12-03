import { upload } from "./../middlewares/uploadImageMiddleware";
import Router from "express";
import { protect } from "../middlewares/authMiddleware";
import { createDepartment } from "../controllers/departmentsController";
import { authRole } from "../middlewares/roleMiddleware";
import { multerErrorHandler } from "../middlewares/multerErrorHandler";
const router = Router();
router.post(
  "/addDepartment",
  protect,
  authRole("admin"),
  //   upload.single("image"),
  //   multerErrorHandler,
  createDepartment
);

export default router;
