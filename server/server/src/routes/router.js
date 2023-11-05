import express from "express";
import { registerUser, loginUser } from "../controllers/auth.js";
import {
  getAllBlogs,
  registerBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.js";

const router = express.Router();

// Authentication Routes
router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);

// Blog Routes
router.post("/registerBlog", registerBlog);
router.get("/getAllBlogs", getAllBlogs);
router.put("/updateBlog", updateBlog);
router.delete("/deleteBlog", deleteBlog);

export default router;
