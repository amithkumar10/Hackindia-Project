import express from "express";
import {
  createConversation,
  sendMessage,
  getUserConversations,
  getConversationMessages,
} from "../../controllers/MessagesControllers/MessagesController.js";

const router = express.Router();

router.post("/createconvo", createConversation);
router.post("/sendmessage", sendMessage);
router.get("/getconvos/:userId", getUserConversations);
router.get("/getmessages/:conversationId", getConversationMessages);

export default router;
