import cookieParser from "cookie-parser";
import express from "express"
import authRouter from "./routes/auth.route.js"
import chatRouter from "./routes/chat.route.js"
import cors from "cors";
const app=express();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/", (_req, res) => {
    res.status(200).json({ message: "Server is running" });
});

app.use("/api/auth",authRouter);
app.use("/api", chatRouter);

export default app;