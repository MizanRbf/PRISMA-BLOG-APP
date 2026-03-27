import { prisma } from "../../lib/prisma";

// create comment
const createComment = async (payload: {
  content: string;
  authorId: string;
  postId: string;
  parentId?: string;
}) => {
  // Check if the post exists
  const postData = await prisma.post.findUnique({
    where: {
      id: payload.postId,
    },
  });
  if (!postData) {
    throw new Error("Post not found!! maybe post id is wrong!!!");
  }
  // Check if the parent comment exists
  if (payload.parentId) {
    await prisma.comments.findUniqueOrThrow({
      where: {
        id: payload.parentId,
      },
    });
  }
  return await prisma.comments.create({
    data: payload,
  });
};

// Export comment service
export const commentService = {
  createComment,
};
