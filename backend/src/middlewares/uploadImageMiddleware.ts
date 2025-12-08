import Multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";

const storage = Multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, path.join(__dirname, "../../public/uploads"));
  },
  filename: (req: Request, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${file.originalname.replace(
      ext,
      ""
    )}${ext}`;
    cb(null, uniqueName);
  },
});
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, and JPG files are allowed!"));
  }
};

export const upload = Multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 2 },
});
