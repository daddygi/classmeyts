"use server";

import * as z from "zod";
import db from "@/utils/db";
import { currentUser } from "@/lib/auth";
import { addCommentSchema } from "../schemas";

type FormData = z.infer<typeof addCommentSchema>;

export const addComment = async (values: FormData) => {
  const validatedFields = addCommentSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { comment, postId } = validatedFields.data;

  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized" };
  }

  const newComment = await db.comments.create({
    data: {
      comment,
      authorUsername: user.username,
      authorId: user.id,
      postId,
      upvote: 0,
      downvote: 0,
    },
  });

  return { success: "Comment successful", newComment };
};
