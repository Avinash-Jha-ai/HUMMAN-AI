import { generateAIResponse } from "../services/ai.service.js";
import { getChatHistory, saveMessage, getUserChats, createChat, deleteChat as deleteChatService } from "../services/memory.service.js";

export const chat = async (req, res) => {
  const { message, chatId } = req.body;
  const userId = req.user?.id || "guest";

  try {
    if (!message) {
      return res.status(400).json({ success: false, message: "Message required" });
    }

    let chatDoc;
    if (chatId) {
      chatDoc = await getChatHistory(chatId);
    } else {
      chatDoc = await createChat(userId, message.slice(0, 30));
    }

    if (!chatDoc) {
      return res.status(404).json({ success: false, message: "Chat not found" });
    }

    const messages = chatDoc.messages.map(m => ({
      role: m.role,
      content: m.content
    }));

    messages.push({ role: "user", content: message });

    const aiReply = await generateAIResponse(messages);
    messages.push({ role: "assistant", content: aiReply });

    const updatedChat = await saveMessage(chatDoc._id, messages);

    return res.json({
      success: true,
      reply: aiReply,
      chatId: updatedChat._id,
      title: updatedChat.title
    });

  } catch (error) {
    console.log("CHAT ERROR 👉", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getHistory = async (req, res) => {
  const userId = req.user?.id || "guest";
  try {
    const chats = await getUserChats(userId);
    return res.json({ success: true, sessions: chats });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getChatMessages = async (req, res) => {
  const { id } = req.params;
  try {
    const chatDoc = await getChatHistory(id);
    if (!chatDoc) return res.status(404).json({ success: false, message: "Chat not found" });
    return res.json({ success: true, messages: chatDoc.messages, title: chatDoc.title });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteChat = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteChatService(id);
    return res.json({ success: true, message: "Chat deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};