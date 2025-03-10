import { Conversation } from "../../models/ConversationModel.js";
import { Message } from "../../models/MessagesModel.js";
import { Company } from "../../models/CompanyModel.js";
import { Freelancer } from "../../models/FreelancerModel.js";
import mongoose from "mongoose";

//CREATE CONVERSATION
export const createConversation = async (req, res) => {
  const { companyId, freelancerId } = req.body;

  try {
    let conversation = await Conversation.findOne({ companyId, freelancerId });

    if (!conversation) {
      conversation = await Conversation.create({ companyId, freelancerId });
    }

    res.status(201).json(conversation);
  } catch (error) {
    console.error("Error creating conversation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//SEND MESSAGE

export const sendMessage = async (req, res) => {
  try {
    const { conversationId, senderId, senderType, body } = req.body;

    if (!conversationId || !senderId || !senderType || !body) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found." });
    }

    const message = await Message.create({
      conversationId,
      senderId,
      senderType,
      body,
    });

    await Conversation.findByIdAndUpdate(conversationId, {
      $push: { messages: message._id },
    });

    res.status(201).json({ success: true, message });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all conversations for a user
const findUserType = async (userId) => {
  const company = await Company.findById(userId);
  if (company) return "Company";

  const freelancer = await Freelancer.findById(userId);
  if (freelancer) return "Freelancer";

  return null;
};

export const getUserConversations = async (req, res) => {
  const { userId } = req.params;

  try {
    const userType = await findUserType(userId);
    if (!userType) {
      return res.status(404).json({ error: "User not found" });
    }

    const filter =
      userType === "Company" ? { companyId: userId } : { freelancerId: userId };

    const conversations = await Conversation.find(filter)
      .populate("companyId", "companyName")
      .populate("freelancerId", "name");

    res.json(conversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all messages of a conversation
export const getConversationMessages = async (req, res) => {
  try {
    console.log("Request params:", req.params);

    const { conversationId } = req.params;

    if (!conversationId) {
      return res.status(400).json({ error: "conversationId is required" });
    }

    const messages = await Message.find({
      conversationId: new mongoose.Types.ObjectId(conversationId),
    })
      .populate("senderId", "companyName")
      .sort({ createdAt: "asc" })
      .select("body senderId");

    console.log("Fetched Messages:", messages);

    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
