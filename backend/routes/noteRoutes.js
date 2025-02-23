import express from "express";
import { saveNote } from "../controllers/noteController.js";
import { verifyToken } from "../middlware/verifyToken.js";

const noteRouter = express.Router();

noteRouter.post("/save-note", verifyToken, saveNote);

export default noteRouter;