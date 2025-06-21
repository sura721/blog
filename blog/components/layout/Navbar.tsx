"use client";

import { useState } from "react";
import Link from "next/link";
import { UserButton, SignedIn } from "@clerk/nextjs";
import { Menu, X } from "lucide-react"; 

import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input";   
import ThemeToggle from "../ui/toggler";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#", label: "About" },
    { href: "#", label: "Services" },
    { href: "#", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="mr-4 flex items-center">
          <span className="inline-block self-center whitespace-nowrap rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1.5 text-base font-semibold text-white md:hidden">
            sb
          </span>
          <span className="hidden items-center gap-2 md:flex">
            <span className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-xl text-white">
              sura
            </span>
            <span className="text-xl font-bold">'s blog</span>
          </span>
        </Link>

        {/* Center: Search Bar (Desktop) */}
        <div className="hidden flex-1 md:flex md:justify-center">
          <div className="w-full max-w-sm">
            <Input placeholder="Search..." className="w-full" />
          </div>
        </div>

        {/* Right: Desktop Nav & Icons */}
        <div className="hidden items-center gap-4 md:flex">
          <nav className="flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                <span className="sr-only">Toggle menu</span>
            </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="container py-4 md:hidden">
           {/* Mobile Search */}
          <div className="mb-4">
            <Input placeholder="Search..." className="w-full" />
          </div>
          {/* Mobile Nav Links */}
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium text-muted-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          {/* Mobile Profile */}
          <div className="mt-4 border-t pt-4">
             <SignedIn>
              <UserButton afterSignOutUrl="/" showName />
            </SignedIn>
          </div>
        </div>
      )}
    </header>
  );
}