import express from "express";
import { postControllers } from "./post.controller";
const router = express.Router();

// POST
router.post("/", postControllers.createPost);

// GET

// UPDATE

// DELETE

export const postRouter = router;
