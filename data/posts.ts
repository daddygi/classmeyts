import db from "@/utils/db";

export const getAllPost = async () => {
  try {
    const posts = await db.posts.findMany();
    return posts || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};
