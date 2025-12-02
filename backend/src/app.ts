import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import userRoutes from "./routes/userRoute";
import doctorRoutes from "./routes/doctorRoute";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use("/api/users/", userRoutes);
app.use("/api/doctors/", doctorRoutes);

// global error handler
app.use(errorHandler);

export default app;
