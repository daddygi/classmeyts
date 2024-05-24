import { NextApiRequest } from "next";
import { promises as fs } from "fs";
import path from "path";
import formidable from "formidable";
import { createPostSchema } from "../../../../schemas";
import { currentUser } from "@/lib/auth";
import { getUserById } from "../../../../data/users";
import db from "@/utils/db";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextApiRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing files:", err);
      return NextResponse.json(
        { error: "Error parsing the files" },
        { status: 500 }
      );
    }

    const validatedFields = createPostSchema.safeParse(fields);

    if (!validatedFields.success) {
      console.error("Validation failed:", validatedFields.error);
      return NextResponse.json({ error: "Invalid Fields" }, { status: 400 });
    }

    const { title, description, userId, department } = validatedFields.data;

    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await getUserById(userId);

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (dbUser.id !== userId) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 403 });
    }

    const userDepartment = dbUser?.department;

    if (!userDepartment) {
      return NextResponse.json({ error: "Dept not found" }, { status: 404 });
    }

    let fileUrl = "";

    if (files.file) {
      const fileArray = files.file as formidable.File[];
      const file = fileArray[0]; // Access the first file in the array
      const filePath = path.join(
        process.cwd(),
        "public/uploads",
        file.originalFilename!
      );

      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.rename(file.filepath, filePath);

      fileUrl = `/uploads/${file.originalFilename}`;
    }

    await db.posts.create({
      data: {
        title,
        description,
        userId,
        department: userDepartment,
        upvote: 0,
        downvote: 0,
        file: fileUrl,
        tags: "To be updated",
        archive: false,
      },
    });

    return NextResponse.json({ success: "Post Created" }, { status: 201 });
  });
}
