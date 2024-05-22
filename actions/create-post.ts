"use server";

import * as z from "zod";
import db from "@/utils/db";
import { createPostSchema } from "../schemas";
import { currentUser } from "@/lib/auth";
import { getUserById } from "../data/users";
import { error } from "console";

type FormData = z.infer<typeof createPostSchema>;

export const createPost = async (values: FormData) => {
  const validatedFields = createPostSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { title, description } = validatedFields.data;

  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized" };
  }

  const userId = user.id;
  const dbUser = await getUserById(userId);

  if (!dbUser) {
    return { error: "User not found" };
  }

  if (dbUser.id != userId) {
    return { error: "Invalid user ID" };
  }

  const department = dbUser?.department;

  if (!department) {
    return { error: "Dept not found" };
  }

  const upvote = 0;
  const downvote = 0;

  const archive = false;

  const tags = "To be updated";

  const file = "To be updated";

  await db.posts.create({
    data: {
      title,
      description,
      userId,
      department,
      upvote,
      downvote,
      file,
      tags,
      archive,
    },
  });

  return { success: "Post Created" };
};
