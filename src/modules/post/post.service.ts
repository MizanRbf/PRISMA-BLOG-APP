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
}: {
  search: string | undefined;
  tags: string[] | [];
  isFeatured: boolean | undefined;
  status: PostStatus | undefined;
  authorId: string | undefined;
  page: number;
  limit: number;
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
    where: {
      AND: andConditions,
    },
  });
  return result;
};

// export service
export const postService = {
  createPost,
  getAllPosts,
};
