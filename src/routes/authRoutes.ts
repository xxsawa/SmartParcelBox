import express from "express";
const router = express.Router();
import { postLogin, postRegister } from "../controllers/authController.ts";

router.post("/login", postLogin);
router.post("/register", postRegister);

export default router;
