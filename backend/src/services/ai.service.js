import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, AIMessage, SystemMessage } from "@langchain/core/messages";
import { config } from "../configs/config.js";

const model = new ChatMistralAI({
  apiKey: config.MISTRAL_API_KEY,
  model: "mistral-large-latest",
  temperature: 0.7,
});

export const generateAIResponse = async (messages) => {
  const langchainMessages = [
    new SystemMessage("You are HUMMAN AI, a premium intelligence assistant. Provide structured, concise, and professional responses using Markdown. Use emojis sparingly but effectively to maintain a premium feel.")
  ];

  messages.forEach(msg => {
    if (msg.role === "user") langchainMessages.push(new HumanMessage(msg.content));
    if (msg.role === "assistant") langchainMessages.push(new AIMessage(msg.content));
  });

  const response = await model.invoke(langchainMessages);
  return response.content;
};