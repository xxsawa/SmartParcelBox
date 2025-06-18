import express from "express";
import {
  getBoxByBoxName,
  getNearBoxes,
  postBoxRegalClosed,
  postBoxRegalToOpen,
} from "../controllers/boxController";
const router = express.Router();

router.get("/near", getNearBoxes);
router.get("/:name", getBoxByBoxName);
router.post("/open", postBoxRegalToOpen);
router.post("/close", postBoxRegalClosed);

export default router;
