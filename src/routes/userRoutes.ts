import express from "express";
const router = express.Router();
import { getUser } from "../controllers/userController.ts";

router.get("/:id", getUser);

export default router;
