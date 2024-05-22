import Image from "next/image";
import React, { useState } from "react";
import {
  BookmarkIcon,
  BookmarkFilledIcon,
  PersonIcon,
  ArrowUpIcon,
} from "@radix-ui/react-icons";

interface CardsProps {
  username: string;
  title: string;
  description: string;
  tags: string;
  file: Blob;
  upvote: number;
  downvote: number;
}

const Cards: React.FC<CardsProps> = ({
  username,
  title,
  description,
  tags,
  file,
  upvote,
  downvote,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="w-[375px] h-[337px] bg-white p-8 rounded-xl shadow-2xl">
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
        <p className="text-xs">Description: {description}</p>
        <p className="text-xs">{tags}</p>
      </div>

      <div className="mt-3 mb-2">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            Material: {file ? file.name : "No file"}
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
