"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/utils/utils";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

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
];

function Sidebar() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleSignOut = () => {
    signOut();
    console.log("Signing out...");
  };

  return (
    <div className="relative z-50 h-full flex flex-col bg-secondary-color-blue text-white group hover:w-52">
      <Link
        className="pt-6 flex items-center p-3 border-b border-main-color-blue group-hover:border-none"
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
            "flex justify-start items-center p-4 border-b border-main-color-blue group-hover:border-none",
            { "bg-main-color-blue": item.href === pathname }
          )}
        >
          <Image
            src={item.icon}
            alt={item.title}
            width={39}
            height={42}
            className="mr-4"
          />
          <p className="opacity-0 group-hover:opacity-100">{item.title}</p>
        </Link>
      ))}

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="w-full flex justify-start items-center p-4 border-b border-main-color-blue group-hover:border-none"
        >
          <Image
            src="/account.png"
            alt="Account"
            width={39}
            height={42}
            className="mr-4"
          />
          <p className="opacity-0 group-hover:opacity-100">Account</p>
        </button>

        {dropdownOpen && (
          <div className="absolute left-0 w-full bg-secondary-color-blue shadow-lg rounded-b-lg">
            <Link
              href="/posts"
              className="block px-4 py-2 hover:bg-main-color-blue"
            >
              Posts
            </Link>
            <Link
              href="/profile"
              className="block px-4 py-2 hover:bg-main-color-blue"
            >
              Profile
            </Link>
            <Link
              href="/settings"
              className="block px-4 py-2 hover:bg-main-color-blue"
            >
              Settings
            </Link>
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 hover:bg-main-color-blue"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
