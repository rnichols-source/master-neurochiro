"use client";

import { Search as SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/portal/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-40 md:w-96">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-brand-navy/30" />
      <input 
        type="text" 
        placeholder="Search units or resources..." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-brand-navy/5 border-none rounded-full py-2 pl-8 md:pl-10 pr-4 text-xs focus:ring-2 focus:ring-brand-orange/40 transition-all placeholder:text-brand-navy/30 outline-none"
      />
    </form>
  );
}
