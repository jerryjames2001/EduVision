import express from "express";
import { summarizeNote } from "../controllers/summarizeController.js";
import { generateQuestion } from "../controllers/questionController.js";

const router = express.Router();

router.post("/summarize", summarizeNote)
router.post("/question", generateQuestion);

export default router;