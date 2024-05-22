import React from "react";
import db from "@/utils/db";
import { ObjectId } from "mongodb"; // Import ObjectId if using MongoDB

interface PostProps {
  params: {
    id: string;
  };
}

const PostPage = async ({ params }: PostProps) => {
  //   let decodedId = decodeURIComponent(params.id).trim(); // Decode and trim the ID

  //   if (!ObjectId.isValid(decodedId)) {
  //     // Check if the ID is valid
  //     return <p>Invalid Post ID: {decodedId}</p>;
  //   }

  const post = await db.posts.findUnique({
    where: {
      id: params.id,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  if (!post) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="mt-2 text-gray-700">{post.description}</p>
      <p className="mt-2 text-gray-700">By: {post.user.username}</p>
      <p className="mt-2 text-gray-700">Tags: {post.tags}</p>
      <p className="mt-2 text-gray-700">Department: {post.department}</p>
      <div className="mt-2">
        <strong>Upvotes:</strong> {post.upvote}
      </div>
      <div className="mt-2">
        <strong>Downvotes:</strong> {post.downvote}
      </div>
      {post.file && (
        <div className="mt-2">
          <a href={post.file} download>
            Download File
          </a>
        </div>
      )}
    </div>
  );
};

export default PostPage;
