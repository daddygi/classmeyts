import * as z from "zod";

export const signInSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const signUpSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email().endsWith("adamson.edu.ph"),
  username: z.string(),
  studentNumber: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
  college: z.string(),
  department: z.string(),
  yearLevel: z.string(),
  password: z.string(),
});
