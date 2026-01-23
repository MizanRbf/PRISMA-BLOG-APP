import { prisma } from "../../lib/prisma";

const createPost = async () => {
  const result = "Post created";

  return result;
};

export const postService = {
  createPost,
};
