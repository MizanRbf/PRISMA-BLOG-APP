import express from "express";
import { postControllers } from "./post.controller";
import auth, { UserRole } from "../../Middleware/authMiddleware";
const router = express.Router();

// POST
router.post(
  "/",
  auth(UserRole.USER, UserRole.ADMIN),
  postControllers.createPost,
);

// GET

// UPDATE

// DELETE

export const postRouter = router;
