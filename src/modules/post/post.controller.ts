import { Request, Response } from "express";
import { postService } from "./post.service";

// create posts
const createPost = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const result = await postService.createPost(
      req.body,
      req.user.id as string,
    );
    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// get all posts
const getAllPosts = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const result = await postService.getAllPosts({ search: search as string });
    res.status(200).json({
      success: true,
      message: "Posts retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// export controllers
export const postControllers = {
  createPost,
  getAllPosts,
};
