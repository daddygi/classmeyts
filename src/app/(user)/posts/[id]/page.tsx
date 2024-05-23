import React from "react";
import db from "@/utils/db";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import Image from "next/image";
import Comments from "@/components/Comments";

interface PostProps {
  params: {
    id: string;
  };
}

const PostPage = async ({ params }: PostProps) => {
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
    <div className="h-full flex">
      <div className="w-20 h-full">
        <Sidebar />
      </div>

      <div className="flex justify-center items-center w-full p-12">
        <div className="bg-white shadow-md rounded-lg p-12 w-[1214px] h-[850px] flex w-full gap-8">
          <div>
            <Link href="/dashboard">
              <Image src="/back.png" alt="Back" width={50} height={50} />
            </Link>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center mb-4 gap-4">
              <div className="w-10 h-10 rounded-full bg-important mr-2"></div>
              <div>
                <p className="text-sm font-bold">{post.user.username}</p>
                <p className="text-xs text-gray-500">
                  {JSON.stringify(post.createdAt)}
                </p>
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
            <p className="text-gray-700 mb-4">{post.description}</p>
            <p className="text-blue-500 mb-4">#{post.tags}</p>
            <p className="text-sm text-gray-500 mb-2">{post.department}</p>
            <a href={post.file} className="text-blue-500 mb-4" download>
              Material.text
            </a>
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <span className="text-green-500">✔</span>
                <span className="ml-1">{post.upvote}</span>
              </div>
              <div className="flex items-center">
                <span className="text-red-500">✖</span>
                <span className="ml-1">{post.downvote}</span>
              </div>
            </div>
            <div>
              <Comments postId={params.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
