import { Request, Response } from "express";

// create posts
const createPost = async (req: Request, res: Response) => {
  try {
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
