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

// Update Comment
router.patch(
  "/:commentId",
  auth(UserRole.ADMIN, UserRole.USER),
  commentControllers.updateComment,
);

// moderate Comment
router.patch(
  "/moderate/:commentId",
  auth(UserRole.ADMIN),
  commentControllers.moderateComment,
);

// Delete Comment
router.delete(
  "/:commentId",
  auth(UserRole.ADMIN, UserRole.USER),
  commentControllers.deleteComment,
);

export const commentRouter = router;
