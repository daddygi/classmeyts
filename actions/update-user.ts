"use server";

import * as z from "zod";
import db from "@/utils/db";
import { getUserByEmail } from "../data/users";
import { updateUserSchema } from "../schemas";

type FormData = z.infer<typeof updateUserSchema>;

export const updateUser = async (values: FormData) => {
  const validatedFields = updateUserSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const {
    firstName,
    lastName,
    username,
    email,
    studentNumber,
    college,
    department,
    yearLevel,
  } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "User not found" };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      firstName,
      lastName,
      username,
      email,
      studentNumber,
      college,
      department,
      yearLevel,
    },
  });

  return { success: "Update successful" };
};
