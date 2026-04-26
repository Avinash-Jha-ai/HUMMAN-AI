
import express from "express";
import { chat, getHistory, getChatMessages, deleteChat } from "../controllers/chat.controller.js";
import authenticateUser from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/chat", authenticateUser, chat);
router.get("/history", authenticateUser, getHistory);
router.get("/chat/:id", authenticateUser, getChatMessages);
router.delete("/chat/:id", authenticateUser, deleteChat);

export default router;