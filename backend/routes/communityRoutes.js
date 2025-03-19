import express from "express";
import { shareNote } from "../controllers/shareController.js";

const router = express.Router();

// Route to share a note
router.post("/share", shareNote);

export default router;
