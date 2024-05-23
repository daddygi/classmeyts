import { NextResponse } from "next/server";
import db from "@/utils/db";

export async function GET() {
  try {
    const comments = await db.comments.findMany({
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
    return NextResponse.json(
      { error: "Error fetching comments" },
      { status: 500 }
    );
  }
}
