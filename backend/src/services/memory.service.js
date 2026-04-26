import Chat from "../models/chat.model.js";

export const getChatHistory = async (chatId) => {
  return await Chat.findById(chatId);
};

export const getUserChats = async (userId) => {
  return await Chat.find({ userId }).sort({ updatedAt: -1 });
};

export const createChat = async (userId, title) => {
  return await Chat.create({ userId, title, messages: [] });
};

export const saveMessage = async (chatId, messages) => {
  const updateData = { messages };
  
  // Update title if it's still the default and we have a user message
  if (messages.length > 0 && messages[0].role === 'user') {
    const firstMsg = messages[0].content;
    updateData.title = firstMsg.slice(0, 30) + (firstMsg.length > 30 ? "..." : "");
  }

  return await Chat.findByIdAndUpdate(
    chatId,
    updateData,
    { new: true }
  );
};

export const deleteChat = async (chatId) => {
  return await Chat.findByIdAndDelete(chatId);
};