import { Request, Response } from "express";
import { postService } from "./post.service";

// create posts
const createPost = async (req: Request, res: Response) => {
  try {
    const result = await postService.createPost();
    res.status(201).json({
      success: true,
      message: "Post created successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const postControllers = {
  createPost,
};
