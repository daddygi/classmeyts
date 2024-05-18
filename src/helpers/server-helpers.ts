import prisma from "@/utils/db";

export const connectToDatabase = async () => {
  try {
    await prisma.$connect();
  } catch (error) {
    console.group(error);
    throw new Error("Failed to connect to the database");
  }
};
