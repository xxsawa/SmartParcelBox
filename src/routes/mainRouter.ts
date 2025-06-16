import userRoutes from "./userRoutes.ts";
import authRoutes from "./authRoutes.ts";
import express from "express";
const router = express.Router();

router.use("/users", userRoutes);
router.use("/", authRoutes);

export default router;
