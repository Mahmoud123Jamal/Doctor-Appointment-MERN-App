import Multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

const uploadPath = path.join(__dirname, "../../public/uploads");

// Create folder if missing
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = Multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, uploadPath);
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
  allowedTypes.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error("Only JPEG, PNG, and JPG files are allowed!"));
};

export const upload = Multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
