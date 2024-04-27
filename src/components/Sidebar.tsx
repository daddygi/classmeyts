"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { cn } from "@/utils/utils";
import { usePathname } from "next/navigation";

const NavLinks = [
  {
    id: 1,
    title: "Dashboard",
    icon: "/dashboard3.png",
    href: "/dashboard",
  },
  {
    id: 2,
    title: "Bookmarks",
    icon: "/bookmark.png",
    href: "/bookmarks",
  },
  {
    id: 3,
    title: "Discussion",
    icon: "/ask.png",
    href: "/discussion",
  },
  {
    id: 4,
    title: "Account",
    icon: "/account.png",
    href: "/account",
  },
];

function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="relative z-50 h-full flex flex-col bg-secondary-color-blue text-white group hover:w-52">
      <Link
        className="pt-6 flex items-center p-3 border-b  border-main-color-blue group-hover:border-none"
        href="/"
      >
        <Image
          src="/circle-logo.png"
          alt="logo"
          width={56}
          height={56}
          className="mr-2"
        />
        <p className="opacity-0 group-hover:opacity-100 font-bold text-xl">
          Classmeyts'
        </p>
      </Link>

      {NavLinks.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={cn(
            "flex justify-start items-center p-4 border-b  border-main-color-blue group-hover:border-none  ",
            { "bg-main-color-blue": item.href === pathname }
          )}
        >
          <Image
            src={item.icon}
            alt=""
            width={39}
            height={42}
            className="mr-4"
          ></Image>
          <p className="opacity-0 group-hover:opacity-100">{item.title}</p>
        </Link>
      ))}
    </div>
  );
}
export default Sidebar;
