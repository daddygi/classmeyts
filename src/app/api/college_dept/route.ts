import { NextResponse } from "next/server";
import db from "@/utils/db";

export async function GET() {
  try {
    const posts = await db.colleges.findMany({
      select: {
        collegeName: true,
      },
    });
    const collegeNames = posts.map((post) => post.collegeName);
    return Response.json(collegeNames, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return Response.json({ error: "Error fetching posts" }, { status: 500 });
  }
}
