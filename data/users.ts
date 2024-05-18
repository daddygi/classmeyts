import db from "@/utils/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
};

export const getUserEmailByUsername = async (username: string) => {
  try {
    const user = await db.user.findUnique({ where: { username } });
    if (user) return user.email;
  } catch {
    return null;
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    const user = await db.user.findUnique({ where: { username } });
    return user;
  } catch {
    return null;
  }
};

export const getUserStudentNumber = async (studentNumber: string) => {
  try {
    const user = await db.user.findUnique({ where: { studentNumber } });
    if (user) return user.studentNumber;
  } catch {
    return null;
  }
};
