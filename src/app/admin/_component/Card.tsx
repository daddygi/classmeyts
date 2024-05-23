import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  BookmarkIcon,
  BookmarkFilledIcon,
  PersonIcon,
  ArrowUpIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user"; // Assume you have this hook

interface CardsProps {
  id: string;
  username: string;
  title: string;
  description: string;
  tags: string;
  file?: string;
  upvote: number;
  downvote: number;
}

const Cards: React.FC<CardsProps> = ({
  id,
  username,
  title,
  description,
  tags,
  file,
  upvote,
  downvote,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const router = useRouter();
  const user = useCurrentUser();

  useEffect(() => {
    async function fetchBookmarkStatus() {
      if (!user) return;
      try {
        const response = await fetch(
          `/api/bookmarks?userId=${user.id}&postId=${id}`
        );
        const data = await response.json();
        setIsBookmarked(data.isBookmarked);
      } catch (error) {
        console.error("Error fetching bookmark status", error);
      }
    }

    fetchBookmarkStatus();
  }, [user, id]);

  const handleBookmarkToggle = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    try {
      const response = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id, postId: id }),
      });

      if (response.ok) {
        setIsBookmarked(!isBookmarked);
      } else {
        console.error("Error bookmarking post");
      }
    } catch (error) {
      console.error("Error bookmarking post", error);
    }
  };

  const handleClick = () => {
    router.push(`/posts/${id}`);
  };

  return (
    <div
      className="w-[375px] h-[337px] bg-white p-8 rounded-xl shadow-2xl cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <PersonIcon width={48} height={48} className="border rounded-full" />
          <p>{username}</p>
        </div>
        {isBookmarked ? (
          <BookmarkFilledIcon
            color="yellow"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={handleBookmarkToggle}
          />
        ) : (
          <BookmarkIcon
            color="yellow"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={handleBookmarkToggle}
          />
        )}
      </div>

      <div className="mt-4">
        <p className="text-sm mb-2">Title: {title}</p>
        <p className="text-xs mb-2">Description: {description}</p>
        <p className="text-xs">{tags}</p>
      </div>

      <div className="mt-3 mb-2">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            Material:{" "}
            {file ? (
              <a href={file} download className="text-blue-500 underline">
                Download
              </a>
            ) : (
              "No file"
            )}
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-2">
              <ArrowUpIcon width={16} height={16} />
              <p className="text-xs">{upvote}</p>
            </div>
            <div className="flex items-center gap-2">
              <ArrowUpIcon width={16} height={16} className="rotate-180" />
              <p className="text-xs">{downvote}</p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs border-t border-b border-[#D9D9D9] py-2">Comment</p>

      <div className="flex justify-between items-center text-sm mt-2">
        <div className="flex gap-2 items-center">
          <PersonIcon width={24} height={24} className="border rounded-full" />
          <p>{username} // comment</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-2">
            <ArrowUpIcon width={16} height={16} />
            <p className="text-xs">300</p>
          </div>
          <div className="flex items-center gap-2">
            <ArrowUpIcon width={16} height={16} className="rotate-180" />
            <p className="text-xs">100</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
