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

export const getPostById = async (id: string) => {
  try {
    const post = await db.posts.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
    return post;
  } catch (error) {
    return null;
  }
};
