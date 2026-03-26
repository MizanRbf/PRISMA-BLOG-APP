import { prisma } from "../../lib/prisma";

// create comment
const createComment = async (payload: {
  content: string;
  authorId: string;
  postId: string;
  parentId?: string;
}) => {
  return await prisma.comments.create({
    data: payload,
  });
};
// Export comment service
export const commentService = {
  createComment,
};
