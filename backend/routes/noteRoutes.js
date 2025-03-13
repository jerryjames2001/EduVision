import express from "express";
import { getUserNotes, saveNote, deleteNote } from "../controllers/noteController.js";
import { verifyToken } from "../middlware/verifyToken.js";

const noteRouter = express.Router();

noteRouter.post("/save-note", verifyToken, saveNote);

noteRouter.get("/get-notes", verifyToken, getUserNotes);

noteRouter.delete("/delete-note/:id", verifyToken, deleteNote);

export default noteRouter;