import { Request, Response } from "express";
import { commentService } from "./comment.service";

// create comment
const createComment = async (req: Request, res: Response) => {
  try {
    const result = await commentService.createComment();
    res.status(201).json({
      success: true,
      message: "Comment created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
