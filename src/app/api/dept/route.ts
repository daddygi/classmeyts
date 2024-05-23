import { NextResponse } from "next/server";
import db from "@/utils/db";

export async function GET() {
  try {
    const posts = await db.departments.findMany({
      select: {
        department: true,
      },
    });
    const department = posts.map((post) => post.department);
    return Response.json(department, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return Response.json({ error: "Error fetching posts" }, { status: 500 });
  }
}
