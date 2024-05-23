import { NextResponse } from "next/server";
import db from "@/utils/db";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const postId = url.searchParams.get("postId");

  if (!postId) {
    return NextResponse.json(
      { error: "Missing postId parameter" },
      { status: 400 }
    );
  }

  try {
    const comments = await db.comments.findMany({
      where: {
        postId: postId,
      },
      include: {
        post: {
          select: {
            id: true, // Assuming you want the post ID
          },
        },
      },
    });
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching comments" },
      { status: 500 }
    );
  }
}
