"use server";
import * as z from "zod";
import { signInSchema } from "../schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "../routes";
import { AuthError } from "next-auth";
import { generateVerificationTOken } from "@/utils/tokens";
import {
  getUserByEmail,
  getUserByUsername,
  getUserEmailByUsername,
} from "../data/users";
import { sendVerificationEmail } from "@/utils/mail";

type FormData = z.infer<typeof signInSchema>;

export const signInUser = async (values: FormData) => {
  const validatedFields = signInSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { username, password } = validatedFields.data;

  const existingUser = await getUserByUsername(username);

  if (!existingUser || !existingUser.email || !existingUser.passwordHash) {
    return { error: "User does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationTOken(
      existingUser.email
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Confirmation email sent!" };
  }

  try {
    await signIn("credentials", {
      username,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { success: "Success" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
