import userRoutes from "./userRoutes.ts";
import authRoutes from "./authRoutes.ts";
import express from "express";
import boxRoutes from "./boxRoutes.ts";
const router = express.Router();

router.use("/users", userRoutes);
router.use("/box", boxRoutes);
router.use("/", authRoutes);

export default router;
