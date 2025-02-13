import express from "express";
import { uploadFile } from "../controllers/fileController.js";

const fileRouter = express.Router();

fileRouter.post("/upload", uploadFile);

export default fileRouter;