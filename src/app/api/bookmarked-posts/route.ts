import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  try {
    const bookmarkedPosts = await db.bookmarks.findMany({
      where: { userId: userId },
      include: {
        post: {
          include: {
            user: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });

    const formattedPosts = bookmarkedPosts.map((bookmark) => ({
      ...bookmark.post,
      user: bookmark.post.user,
    }));

    return NextResponse.json(formattedPosts, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookmarked posts:", error);
    return NextResponse.json(error, { status: 500 });
  }
}
