import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import userRoutes from "./routes/userRoute";
import doctorRoutes from "./routes/doctorRoute";
import appointmentRoutes from "./routes/appiontmentRoute";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use("/api/users/", userRoutes);
app.use("/api/doctors/", doctorRoutes);
app.use("/api/appointments/", appointmentRoutes);
// global error handler
app.use(errorHandler);

export default app;
