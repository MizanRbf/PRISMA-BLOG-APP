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
router.get("/", postControllers.getAllPosts);
router.get(
  "/myPosts",
  auth(UserRole.ADMIN, UserRole.USER),
  postControllers.getMyPost,
);
router.get("/:postId", postControllers.getPostById);

// UPDATE
router.patch(
  "/:postId",
  auth(UserRole.ADMIN, UserRole.USER),
  postControllers.updateMyPost,
);
// DELETE

export const postRouter = router;
