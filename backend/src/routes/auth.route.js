import { Router } from "express";
import { getMe, login, logout, register, verifyEmail } from "../controllers/auth.controller.js";
import authenticateUser from "../middlewares/auth.middleware.js"
import upload from "../middlewares/upload.middleware.js";
const router=Router();

router.post("/register",upload.single("avatar"), register);
router.post("/verify", verifyEmail);
router.post("/login",login)
router.get("/me",authenticateUser,getMe);
router.get("/logout",authenticateUser,logout)

export default router