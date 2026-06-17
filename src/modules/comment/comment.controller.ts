import { Request, Response } from "express";
import { commentService } from "./comment.service";
import { success } from "better-auth/*";

// create comment
const createComment = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    req.body.authorId = user?.id;
    const result = await commentService.createComment(req.body);
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

// get comment by id
const getCommentById = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const result = await commentService.getCommentById(commentId as string);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// update comment
const updateComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const user = req.user;
    const updatedData = req.body;
    const result = await commentService.updateComment(
      commentId as string,
      user?.id as string,
      updatedData,
    );
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// moderate comment
const moderateComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const updatedData = req.body;
    const result = await commentService.moderateComment(
      commentId as string,
      updatedData,
    );
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// delete comment
const deleteComment = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { commentId } = req.params;
    const result = await commentService.deleteComment(
      commentId as string,
      user?.id as string,
    );
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Export comment controllers
export const commentControllers = {
  createComment,
  getCommentById,
  updateComment,
  deleteComment,
  moderateComment,
};
