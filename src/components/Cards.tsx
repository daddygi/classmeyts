import Image from "next/image";
import React from "react";

import {
  BookmarkIcon,
  BookmarkFilledIcon,
  PersonIcon,
  ArrowUpIcon,
} from "@radix-ui/react-icons";

// TODO: props

const Cards = () => {
  return (
    <div className="w-[375px] h-[337px] bg-white p-8 rounded-xl shadow-2xl">
      <div className="---bg-link-color flex justify-between items-center">
        <div className="--bg-[#fff000] flex gap-2 items-center">
          <PersonIcon
            width={48}
            height={48}
            className="size-5 border rounded-full"
          />
          <p>user_name</p>
          <p className="text-link-color">followed</p>
        </div>
        <BookmarkFilledIcon
          color="yellow"
          width={48}
          height={48}
          className="size-5"
        />
      </div>

      <div className="--bg-important mt-4">
        <p className="text-sm mb-2">Title: Lorem ipsum dolor sit amet.</p>
        <p className="text-xs">Description: Lorem ipsum dolor sit amet.</p>
        <p className="text-xs">#Tags</p>
      </div>

      <div className="--bg-important mt-3 mb-2">
        <div className="flex justify-between items-center">
          <div className="text-link-color text-sm">Material.text</div>
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-2">
              <div className="size-3 bg-[#ACF5A0] rounded-full"></div>
              <p className="text-xs">300</p>
            </div>
            <div className="flex items-center">
              <div className="size-3 bg-[#CB4A4A] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs divide-y border-y border-[#D9D9D9] py-2">Comment</p>

      <div className="---bg-link-color flex justify-between items-center text-sm mt-2">
        <div className="--bg-[#fff000] flex gap-2 items-center">
          <PersonIcon
            width={48}
            height={48}
            className="size-3 border rounded-full"
          />
          <p className="">user_name // comment</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-2">
            <div className="size-3 bg-[#ACF5A0] rounded-full"></div>
            <p className="text-xs">300</p>
          </div>
          <div className="flex items-center">
            <div className="size-3 bg-[#CB4A4A] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* TODO: add comments */}
    </div>
  );
};

export default Cards;
