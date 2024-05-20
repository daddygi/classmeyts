"use server";
import * as z from "zod";

import { ResetSchema } from "../schemas";
import { getUserByEmail } from "../data/users";
import { sendPasswordResetEmail } from "@/utils/mail";
import { generatePasswordResetToken } from "@/utils/tokens";

type FormData = z.infer<typeof ResetSchema>;

export const reset = async (values: FormData) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Email" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset email send" };
};
