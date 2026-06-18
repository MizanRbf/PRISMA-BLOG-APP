import { NextFunction, Request, Response } from "express";
import { postService } from "./post.service";
import { PostStatus } from "../../../generated/prisma/enums";
import paginationSortingHelpers from "../../helpers/paginationSortingHelpers";
import { changeEmail } from "better-auth/api";
import { UserRole } from "../../Middleware/authMiddleware";

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
    // get search query
    const { search } = req.query;
    const searchString = typeof search === "string" ? search : undefined;

    // get tags query and split it into array
    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];

    // get isFeatured query and convert it into boolean
    const isFeatured = req.query.isFeatured
      ? req.query.isFeatured === "true"
        ? true
        : req.query.isFeatured === "false"
          ? false
          : undefined
      : undefined;

    // filter by status
    const status = req.query.status as PostStatus | undefined;

    // filter by author id
    const authorId = req.query.authorId as string | undefined;

    // pagination and sorting
    const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelpers(
      req.query,
    );

    const result = await postService.getAllPosts({
      search: searchString,
      tags: tags,
      isFeatured,
      status,
      authorId,
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
    });

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

// get myPost
const getMyPost = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("You are unauthorized");
    }

    const result = await postService.getMyPost(user?.id as string);

    // send response
    res.status(200).json({
      success: true,
      message: "Post retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// get post by id
const getPostById = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    // validate post id
    // if (!postId) {
    //   throw new Error("Post id is required");
    // }

    // retrieve post by id
    const result = await postService.getPostById(postId as string);

    // send response
    res.status(200).json({
      success: true,
      message: "Post retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// update myPost
const updateMyPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    const isAdmin = user?.role === UserRole.ADMIN;

    if (!user) {
      throw new Error("You are unauthorized");
    }
    const { postId } = req.params;
    const updatedData = req.body;
    const result = await postService.updateMyPost(
      postId as string,
      updatedData,
      user?.id,
      isAdmin,
    );
    // send response
    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

// delete post
const deletePost = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const isAdmin = user?.role === UserRole.ADMIN;

    if (!user) {
      throw new Error("You are unauthorized");
    }
    const { postId } = req.params;
    const updatedData = req.body;
    const result = await postService.deletePost(
      postId as string,
      user?.id,
      isAdmin,
    );
    // send response
    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// get Stats
const getStats = async (req: Request, res: Response) => {
  try {
    const result = await postService.getStats();

    res.status(200).json({
      success: true,
      message: "Stats found successfully",
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
  getPostById,
  getMyPost,
  updateMyPost,
  deletePost,
  getStats,
};
