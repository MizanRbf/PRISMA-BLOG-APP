import { CommentStatus } from "../../../generated/prisma/enums";
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

// get comment by id
const getCommentById = async (commentId: string) => {
  return await prisma.comments.findUnique({
    where: {
      id: commentId,
    },
    include: {
      post: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
};

// update comment
const updateComment = async (
  commentId: string,
  authorId: string,
  updatedData: { content: string; status?: CommentStatus },
) => {
  // check if the comment exist
  const commentData = await prisma.comments.findUnique({
    where: {
      id: commentId,
      authorId,
    },
  });

  if (!commentData) {
    throw new Error("Comment not found!!!");
  }

  return await prisma.comments.update({
    where: {
      id: commentId,
      authorId,
    },
    data: updatedData,
  });
};

// delete comment
const deleteComment = async (commentId: string, authorId: string) => {
  // check if the comment exist
  const commentData = prisma.comments.findFirst({
    where: {
      id: commentId,
      authorId,
    },
  });
  if (!commentData) {
    throw new Error("comment not found");
  }
  return prisma.comments.delete({
    where: {
      id: commentId,
    },
    select: {
      id: true,
    },
  });
};

// moderate comment
const moderateComment = async (
  commentId: string,
  data: { status: CommentStatus },
) => {
  const moderateData = await prisma.comments.findUniqueOrThrow({
    where: {
      id: commentId,
    },
    select: {
      id: true,
      status: true,
    },
  });

  if (moderateData.status === data.status) {
    throw new Error(`This status ${data.status} already exist.`);
  }

  return await prisma.comments.update({
    where: {
      id: commentId,
    },
    data,
  });
};

// Export comment service
export const commentService = {
  createComment,
  getCommentById,
  updateComment,
  deleteComment,
  moderateComment,
};
