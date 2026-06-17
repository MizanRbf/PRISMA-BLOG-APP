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

// getStats
router.get("/stats", auth(UserRole.ADMIN), postControllers.getStats);

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
router.delete(
  "/:postId",
  auth(UserRole.ADMIN, UserRole.USER),
  postControllers.deletePost,
);

export const postRouter = router;
