import express from "express";
import { commentControllers } from "./comment.controller";
import auth, { UserRole } from "../../Middleware/authMiddleware";
const router = express.Router();

// Get By Id
router.get("/:commentId", commentControllers.getCommentById);

// Post
router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.USER),
  commentControllers.createComment,
);

// Delete Comment
router.delete("/:commentId", commentControllers.deleteComment);

export const commentRouter = router;
