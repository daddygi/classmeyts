import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, postId } = await req.json();

  try {
    const existingBookmark = await db.bookmarks.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existingBookmark) {
      await db.bookmarks.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
      return NextResponse.json({ success: "Bookmark removed" });
    } else {
      await db.bookmarks.create({
        data: {
          userId,
          postId,
        },
      });
      return NextResponse.json({ success: "Bookmark added" });
    }
  } catch (error) {
    return NextResponse.json({ error: "Bookmark error" });
  }
}
