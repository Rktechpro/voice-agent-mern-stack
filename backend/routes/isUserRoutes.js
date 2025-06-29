import express from "express";

import isAuthtoken from "../middleware/isAuthToken.js";

import {
  deleteHistoryByText,
  getisAuth,
  updateVoiceAgent,
} from "../controller/isAuthcontroller.js";
import upload from "../middleware/Multer.js";
import GeminiAskByControle from "../controller/GeminiConteoler.js";

const isuserRoutes = express.Router();

isuserRoutes.get("/current", isAuthtoken, getisAuth);
isuserRoutes.post("/geminiagent", isAuthtoken, GeminiAskByControle);

isuserRoutes.post(
  "/AgentUpdate",
  isAuthtoken,
  upload.single("assistantImage"),
  updateVoiceAgent
);
isuserRoutes.post("/historydelete", isAuthtoken, deleteHistoryByText);

export default isuserRoutes;
