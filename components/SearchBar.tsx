"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery) {
        router.replace(`/search?q=${searchQuery}`);
      } else if (initialQuery) {
        router.replace(`/search`);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, router, initialQuery]);

  return (
    <div className="w-full max-w-lg lg:max-w-xs">
      <label htmlFor="search" className="sr-only">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
        </div>
        <Input
          id="search"
          name="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-muted/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 sm:text-sm"
          placeholder="Search posts..."
          type="search"
          autoComplete="off"
        />
      </div>
    </div>
  );
}