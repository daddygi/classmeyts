"use server";
import * as z from "zod";
import { signUpSchema } from "../schemas";
import bcrypt from "bcryptjs";
import db from "@/utils/db";
import { getUserByEmail, getUserStudentNumber } from "../data/users";
import { generateVerificationTOken } from "@/utils/tokens";
import { sendVerificationEmail } from "@/utils/mail";

type FormData = z.infer<typeof signUpSchema>;

export const signUpUser = async (values: FormData) => {
  const validatedFields = signUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
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
    password,
  } = validatedFields.data;

  const passwordHash = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  const existingStudentNumber = await getUserStudentNumber(studentNumber);

  if (existingUser) return { error: "Email already in use!" };

  if (existingStudentNumber) return { error: "Student Number already in use!" };

  await db.user.create({
    data: {
      firstName,
      lastName,
      username,
      email,
      studentNumber,
      college,
      department,
      yearLevel,
      passwordHash: passwordHash,
    },
  });

  const verificationToken = await generateVerificationTOken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: " Confirmation email sent!" };
};
