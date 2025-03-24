import express from "express";
import { shareNote, getSharedNotes } from "../controllers/shareController.js";

const router = express.Router();

// Route to share a note
router.post("/share", shareNote);
router.get("/shared-notes", getSharedNotes)

export default router;
