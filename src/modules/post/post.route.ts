import express from "express";
import { postControllers } from "./post.controller";
import auth from "../../Middleware/authMiddleware";
const router = express.Router();

// POST
router.post("/", auth("admin", "user"), postControllers.createPost);

// GET

// UPDATE

// DELETE

export const postRouter = router;
