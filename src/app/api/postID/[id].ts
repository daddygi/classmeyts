// pages/api/posts/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import db from "@/utils/db";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid or missing post ID" });
  }

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

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return res.status(500).json({ error: "Error fetching post" });
  }
}
