"use client";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  TextInput,
} from "flowbite-react";
import ThemeToggle from "../ui/toggler";
import { UserButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/clerk-react";

const Input = () => {
  return <TextInput placeholder="Search..." color="gray" className="w-full" />;
};

export default function Header() {
  return (
    <Navbar fluid rounded className="border-b px-2 sm:px-4">
      {/* Left-side Logo */}
      <NavbarBrand href="/" className="mr-3 flex-shrink-0">
        {/* Mobile Logo: "sb" */}
        <span className="block self-center whitespace-nowrap rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1.5 text-base font-semibold text-white md:hidden">
          sb
        </span>
        {/* Desktop Logo: "sura's blog" */}
        <span className="hidden items-center gap-2 md:flex">
          <span className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-xl text-white">
            sura
          </span>
          <span className="text-xl font-bold text-shadow-white">'s blog</span>
        </span>
      </NavbarBrand>

      {/* Search Bar (takes up remaining space) */}
      <div className="flex-1 mr-2">
        <Input />
      </div>

      {/* Right-side Icons */}
      <div className="ml-3 flex items-center gap-3 md:order-2">
        <div className="hidden md:flex">
          <ThemeToggle />
        </div>
        <div className="hidden md:flex">
          <SignedIn>
            <UserButton/>
          </SignedIn>
        </div>
        <NavbarToggle />
      </div>

      {/* Collapsible Menu Content */}
      <NavbarCollapse>
        <NavbarLink href="#">About</NavbarLink>
        <NavbarLink href="#">Services</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>

        {/* Mobile-only section for UserButton and ThemeToggle */}
        <div className="mt-4 flex flex-col gap-4 border-t border-gray-200 pt-4 dark:border-gray-700 md:hidden">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Theme</span>
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Profile</span>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </NavbarCollapse>
    </Navbar>
  );
}