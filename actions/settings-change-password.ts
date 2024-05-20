"use server";

import * as z from "zod";
import { SettingsChangePasswordSchema } from "../schemas";
import { getUserById } from "../data/users";
import bcrypt from "bcryptjs";
import db from "@/utils/db";
import { currentUser } from "@/lib/auth";

type FormData = z.infer<typeof SettingsChangePasswordSchema>;

export const settingsChangePassword = async (values: FormData) => {
  const validatedFields = SettingsChangePasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { password, newPassword, retypeNewPassword } = validatedFields.data;

  if (newPassword !== retypeNewPassword) {
    return { error: "Passwords do not match" };
  }

  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || !dbUser.passwordHash) {
    return { error: "Unauthorized" };
  }

  const passwordMatch = await bcrypt.compare(password, dbUser.passwordHash);

  if (!passwordMatch) {
    return { error: "Old password is incorrect" };
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      passwordHash: hashedNewPassword,
    },
  });

  return { success: "Password changed successfully" };
};
