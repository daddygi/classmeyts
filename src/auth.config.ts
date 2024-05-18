import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";

import { signInSchema } from "../schemas";
import { getUserByUsername } from "../data/users";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = signInSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { username, password } = validatedFields.data;

          const user = await getUserByUsername(username);
          if (!user || !user.passwordHash) return null;

          const passwordsMath = await bcrypt.compare(
            password,
            user.passwordHash
          );

          if (passwordsMath) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
