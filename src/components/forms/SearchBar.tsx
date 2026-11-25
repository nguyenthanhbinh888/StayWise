"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { useStore } from "@/hooks/useStore";
import { useDebounce } from "@/hooks/useDebounce";

export const SearchBar: React.FC<{ placeholder?: string; className?: string }> = ({
  placeholder = "Tìm khu vực (Cầu Giấy, Bình Thạnh, Thủ Đức...)",
  className = "",
}) => {
  const router = useRouter();
  const { areas } = useStore();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(query, 150);

  const suggestions = debouncedQuery.trim()
    ? areas.filter(
        (a) =>
          a.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          a.displayCity.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectArea = (slug: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(`/areas/${slug}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSelectArea(suggestions[0].slug);
    } else if (query.trim()) {
      router.push(`/explore?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <form onSubmit={handleSearchSubmit} className="relative flex items-center">
        <div className="absolute left-4 text-textMuted pointer-events-none flex items-center">
          <Search className="w-4 h-4 text-primary" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full h-12 pl-11 pr-24 rounded-2xl bg-white border border-border shadow-sm text-sm text-textPrimary placeholder:text-textMuted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
        <button
          type="submit"
          className="absolute right-2 px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors flex items-center gap-1 shadow-sm"
        >
          Tìm <ArrowRight className="w-3 h-3" />
        </button>
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && query.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-border shadow-modal z-30 overflow-hidden text-left max-h-64 overflow-y-auto animate-in fade-in-50 zoom-in-95">
          {suggestions.length > 0 ? (
            <div className="p-2 divide-y divide-border/40">
              {suggestions.map((area) => (
                <button
                  key={area.id}
                  type="button"
                  onClick={() => handleSelectArea(area.slug)}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-background text-left transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-navy">{area.name}</div>
                      <div className="text-[11px] text-textMuted">{area.displayCity}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-primary">{area.rent.average} tr/tháng</div>
                    <div className="text-[10px] text-textMuted">Thuê TB</div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-xs text-textMuted">
              Không tìm thấy khu vực nào khớp với &quot;{query}&quot;
            </div>
          )}
        </div>
      )}
    </div>
  );
};
