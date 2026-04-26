import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  role: String,
  content: String,
});

const chatSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, default: "New Chat" },
  messages: {
    type: [messageSchema],
    default: [],
  },
}, { timestamps: true });

export default mongoose.model("Chat", chatSchema);