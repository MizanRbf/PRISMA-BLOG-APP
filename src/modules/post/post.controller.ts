import { Request, Response } from "express";
import { postService } from "./post.service";
import { PostStatus } from "../../../generated/prisma/enums";
import paginationSortingHelpers from "../../helpers/paginationSortingHelpers";

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

    // Pagination
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);
    const skip = (page - 1) * limit;

    // Sort by & sort order
    const sortBy = req.query.sortBy as string | undefined;
    const sortOrder = req.query.sortOrder as "asc" | "desc" | undefined;

    const options = paginationSortingHelpers(req.query);

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

// export controllers
export const postControllers = {
  createPost,
  getAllPosts,
};
