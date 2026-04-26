# 🤖 HUMMAN AI (MERN Stack)

A premium, AI-driven conversational platform built using the MERN stack, featuring advanced multi-model integrations, secure OTP-based authentication, and a sophisticated, animation-rich user interface.

> [!NOTE]
> **Development Note:** The backend architecture, featuring complex Langchain integrations and session management logic, was custom-engineered from scratch. The frontend user interface was developed with significant AI assistance to achieve a high-end, premium aesthetic.

## 🚀 Features
- 🔐 **Secure Authentication:** Robust email OTP verification system with JWT and Bcrypt.
- 🧠 **Multi-Model AI Integration:** Powered by Langchain, supporting OpenAI, Google Gemini, and Mistral AI.
- 💬 **Session-Based Chat:** Persistent chat history with session management (Create, Delete, Switch).
- 🎨 **Premium Aesthetic:** Dark mode interface with glassmorphism, fluid Framer Motion animations, and custom SCSS.
- 📝 **Markdown Excellence:** Rich text rendering for AI responses with code highlighting and GFM support.
- 📱 **Responsive Design:** Fully optimized for mobile and desktop with a dynamic sidebar and layout.
- 📊 **State Management:** Efficient global state handling using Redux Toolkit.

## 🛠️ Tech Stack

### Frontend
- **React.js (Vite)**
- **Redux Toolkit** (State Management)
- **Framer Motion** (Premium Animations)
- **SCSS** (Modular Styling)
- **React Markdown** (AI Response Formatting)
- **Lucide React** (Modern Iconography)

### Backend
- **Node.js & Express.js**
- **Langchain** (AI Orchestration)
- **Mongoose** (MongoDB ODM)

### AI & Services
- **Models:** OpenAI, Google Gemini, Mistral AI
- **Auth:** JWT & BcryptJS
- **Email:** Nodemailer (OTP Delivery)
- **Media:** ImageKit & Multer

## 📂 Project Structure

```text
HUMMAN AI/
│
├── backend/
│   ├── src/
│   │   ├── configs/        # DB & AI Provider configurations
│   │   ├── controllers/    # Logic (Auth, AI Chat, User)
│   │   ├── middlewares/    # Auth & Security middleware
│   │   ├── models/         # MongoDB schemas (User, ChatSession)
│   │   ├── routes/         # API endpoints (Auth, Chat)
│   │   ├── services/       # Langchain & External service logic
│   │   └── utils/          # Helper functions (OTP generator)
│   ├── app.js              # Express configuration
│   └── server.js           # Entry point
│
└── frontend/
    ├── src/
    │   ├── api/            # Axios instance & interceptors
    │   ├── components/     # Reusable UI (Navbar, GlassCard, ProtectedRoute)
    │   ├── pages/          # Core views (Dashboard, Login, Register, Verify)
    │   ├── store/          # Redux Toolkit (Auth & Chat slices)
    │   ├── styles/         # Global SCSS & Design system
    │   └── main.jsx        # Entry point
```

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Avinash-Jha-ai/HUMMAN-AI.git
   cd HUMMAN-AI
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Setup Environment Variables**
   Create a `.env` file in the `backend` folder:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_app_password
   OPENAI_API_KEY=your_key
   GOOGLE_GENAI_API_KEY=your_key
   MISTRAL_API_KEY=your_key
   ```

4. **Run the project**
   ```bash
   # Run backend (from backend folder)
   npm run dev

   # Run frontend (from frontend folder)
   npm run dev
   ```

## 📚 Key Learnings
- Orchestrating multiple LLM providers using **Langchain**.
- Implementing a secure **OTP-based authentication** flow from scratch.
- Managing complex **Redux state** for real-time chat streaming and history.
- Building **glassmorphism-based UI** that remains performant with animations.

## 🔮 Future Roadmap
- 🎤 **Voice Interaction:** Speech-to-text and text-to-speech capabilities.
- 📁 **File Analysis:** Upload documents for AI to analyze and summarize.
- 👥 **Shared Chats:** Ability to share specific AI conversations via links.
- ⚡ **Performance:** Edge function deployment for faster AI responses.

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## 📬 Contact
- **GitHub:** [Avinash-Jha-ai](https://github.com/Avinash-Jha-ai)
- **LinkedIn:** [Avinash Jha](https://www.linkedin.com/in/avinash-jha-0a261b385/)

---
⭐ **If you find this project useful, please give it a star!**
