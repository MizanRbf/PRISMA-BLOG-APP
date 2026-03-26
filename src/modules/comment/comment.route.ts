import express from "express";
import { commentControllers } from "./comment.controller";
import auth, { UserRole } from "../../Middleware/authMiddleware";
const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.USER),
  commentControllers.createComment,
);

export const commentRouter = router;
