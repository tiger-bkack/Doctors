import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import adminRouter from "./routers/adminRouter.js";
import doctorRouter from "./routers/doctorRouter.js";
import userRouter from "./routers/userRouter.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middelwares
app.use(express.json());
app.use(cors());

//api endpoint
app.use("/api/admin", adminRouter);
// localhost:4000/api/admin/add-doctor

app.use("/api/doctor", doctorRouter);

app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Server starting in port ${port}`);
});
