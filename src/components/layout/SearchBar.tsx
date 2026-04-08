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
    <form onSubmit={handleSearch} className="relative w-full md:w-96">
      <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-navy/30" />
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-brand-navy/5 border-none rounded-full py-3 pl-10 pr-4 text-sm touch-target focus:ring-2 focus:ring-brand-orange/40 transition-all placeholder:text-brand-navy/30 outline-none"
      />
    </form>
  );
}
