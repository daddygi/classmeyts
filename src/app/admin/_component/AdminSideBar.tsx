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
    href: "/admin/dashboard",
  },
  {
    id: 2,
    title: "Reports",
    icon: "/bookmark.png",
    href: "/admin/reports",
  },
  {
    id: 3,
    title: "Logs",
    icon: "/ask.png",
    href: "/discussion",
  },
];

function AdminSideBar() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleSignOut = () => {
    signOut();
    console.log("Signing out...");
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  // Determine if the current path is one of the account-related pages
  const isAccountPage =
    pathname === "/posts" ||
    pathname === "/profile" ||
    pathname === "/settingsPage";

  return (
    <div className="relative z-50 h-full flex flex-col bg-secondary-color-blue text-white group transition-all duration-300 ease-in-out w-16 hover:w-52 top-0 left-0">
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
        <p className="opacity-0 group-hover:opacity-100 font-bold text-xl transition-opacity duration-300 ease-in-out">
          Classmeyts'
        </p>
      </Link>

      {NavLinks.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={cn(
            "flex justify-start items-center p-4 border-b border-main-color-blue group-hover:border-none transition-all duration-300 ease-in-out",
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
          <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
            {item.title}
          </p>
        </Link>
      ))}

      <div
        className="relative"
        onMouseEnter={toggleDropdown}
        onMouseLeave={closeDropdown}
      >
        <button
          className={cn(
            "w-full flex justify-start items-center p-4 border-b border-main-color-blue group-hover:border-none transition-all duration-300 ease-in-out",
            { "bg-main-color-blue": isAccountPage }
          )}
        >
          <Image
            src="/account.png"
            alt="Account"
            width={39}
            height={42}
            className="mr-4"
          />
          <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
            Account
          </p>
        </button>

        {dropdownOpen && (
          <div className="absolute left-0 w-full bg-secondary-color-blue shadow-lg rounded-b-lg transition-all duration-300 ease-in-out">
            <Link
              href="/posts"
              className="block px-4 py-2 hover:bg-main-color-blue transition-colors duration-300 ease-in-out"
            >
              Posts
            </Link>
            <Link
              href="/profile"
              className="block px-4 py-2 hover:bg-main-color-blue transition-colors duration-300 ease-in-out"
            >
              Profile
            </Link>
            <Link
              href="/settingsPage"
              className="block px-4 py-2 hover:bg-main-color-blue transition-colors duration-300 ease-in-out"
            >
              Settings
            </Link>
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 hover:bg-main-color-blue transition-colors duration-300 ease-in-out"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminSideBar;
