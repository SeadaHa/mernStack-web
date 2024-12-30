import express from "express";
import {
  login,
  register,
  logout,
  getUser,
  forgotPassword,
  ResetPassword,
  getProfile,
  saveProfile,
  getAllUsers,
  adminLogin,
  deleteUser
} from "../controllers/userController.js";

import { isAuthenticated, authorizeAdmin } from "../middlewares/auth.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);
router.post("/reset-password/:resetToken", ResetPassword);
router.post("/forgot-password", forgotPassword);
router.get("/profile/:_id", isAuthenticated, getProfile);
router.post("/profileadd/:_id", isAuthenticated, saveProfile);
router.get("/admin/users", isAuthenticated, authorizeAdmin, getAllUsers);
router.delete("/admin/delete/:id", isAuthenticated, authorizeAdmin, deleteUser);
router.post("/admin/login", adminLogin);

export default router;