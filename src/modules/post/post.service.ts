import { Post, PostStatus } from "../../../generated/prisma/client";
import { PostWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

// create post
const createPost = async (
  data: Omit<Post, "id" | "createdAt" | "updatedAt" | "authorId">,
  userId: string,
) => {
  const result = await prisma.post.create({
    data: {
      ...data,
      authorId: userId,
    },
  });

  return result;
};

// get all posts
const getAllPosts = async ({
  search,
  tags,
  isFeatured,
  status,
  authorId,
  page,
  limit,
  skip,
  sortBy,
  sortOrder,
}: {
  search: string | undefined;
  tags: string[] | [];
  isFeatured: boolean | undefined;
  status: PostStatus | undefined;
  authorId: string | undefined;
  page: number;
  limit: number;
  skip: number;
  sortBy: string | undefined;
  sortOrder: "asc" | "desc" | undefined;
}) => {
  console.log(page, limit);
  // and condition for search query
  const andConditions: PostWhereInput[] = [];

  // search in title, content and tags
  if (search) {
    andConditions.push({
      OR: [
        // search by title
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        // search by content
        {
          content: {
            contains: search,
            mode: "insensitive",
          },
        },
        // search by tags
        {
          tags: {
            has: search,
          },
        },
      ],
    });
  }

  // filter by multiple tags
  if (tags.length > 0) {
    andConditions.push({
      tags: {
        hasEvery: tags as string[],
      },
    });
  }

  // filter by isFeatured
  if (typeof isFeatured === "boolean") {
    andConditions.push({
      isFeatured,
    });
  }

  // filter by status
  if (status) {
    andConditions.push({
      status,
    });
  }

  // filter by author id
  if (authorId) {
    andConditions.push({
      authorId,
    });
  }

  // fetch posts from database
  const result = await prisma.post.findMany({
    take: limit,
    skip,
    where: {
      AND: andConditions,
    },
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : { createdAt: "desc" },
  });

  // get total count of posts
  const total = await prisma.post.count({
    where: {
      AND: andConditions,
    },
  });

  // return posts and total count
  return {
    data: result,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// get post by id
const getPostById = async (postId: string) => {
  // increment view count by 1
  const viewCount = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });

  // fetch post from database
  const result = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });
  return result;
};

// export service
export const postService = {
  createPost,
  getAllPosts,
  getPostById,
};
