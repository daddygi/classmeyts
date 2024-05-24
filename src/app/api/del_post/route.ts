import { NextResponse } from "next/server";

import db from "@/utils/db";

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const postId = url.searchParams.get("postId");

  if (!postId) {
    return NextResponse.json(
      { error: "Missing postId parameter" },
      { status: 400 }
    );
  }

  try {
    await db.posts.delete({
      where: { id: postId },
    });
    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
