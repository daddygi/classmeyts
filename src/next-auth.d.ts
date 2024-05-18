import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  firstName: string;
  lastName: string;
  username: string;
};
declare module "@auth/core" {
  interface Session {
    role: ExtendedUser;
  }
}
