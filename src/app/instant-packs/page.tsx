"use client";

import { useState, useMemo } from "react";
import {
  SlidersHorizontal,
  ChevronDown,
  Package,
  Search,
  X,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { instantPacks, categories, sortOptions } from "@/data/mock";

export default function InstantPacksPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("trending");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPacks = useMemo(() => {
    let packs = [...instantPacks];

    // Filter by category
    if (selectedCategory !== "All") {
      packs = packs.filter((p) => p.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      packs = packs.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.seller.name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        packs.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        packs.sort((a, b) => b.price - a.price);
        break;
      case "pulls":
        packs.sort(
          (a, b) => (b.pullsRemaining ?? 0) - (a.pullsRemaining ?? 0)
        );
        break;
      case "newest":
        packs.reverse();
        break;
    }

    return packs;
  }, [selectedCategory, sortBy, searchQuery]);

  const currentSort =
    sortOptions.find((s) => s.value === sortBy)?.label ?? "Trending";

  return (
    <div className="p-4 md:p-6 max-w-6xl">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 bg-drip-accent/10 rounded-xl flex items-center justify-center">
            <Package className="w-5 h-5 text-drip-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-drip-text">
              Instant Packs
            </h1>
            <p className="text-sm text-drip-text-muted">
              Rip mystery packs instantly &mdash; graded slabs, chase cards &
              more
            </p>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Category Pills */}
        <div className="flex-1 flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-drip-accent text-white"
                  : "bg-drip-surface text-drip-text-secondary border border-drip-border hover:border-drip-border-light hover:text-drip-text"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Search */}
          <div className="relative">
            <div className="flex items-center bg-drip-surface border border-drip-border rounded-lg overflow-hidden">
              <Search className="w-4 h-4 text-drip-text-muted ml-3" />
              <input
                type="text"
                placeholder="Filter..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm text-drip-text placeholder-drip-text-muted py-2 px-2 w-28 focus:w-40 outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1 mr-1 text-drip-text-muted hover:text-drip-text"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 bg-drip-surface border border-drip-border rounded-lg px-3 py-2 text-sm text-drip-text-secondary hover:text-drip-text hover:border-drip-border-light transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">{currentSort}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {showSortDropdown && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowSortDropdown(false)}
                />
                <div className="absolute right-0 top-full mt-1 z-20 bg-drip-surface border border-drip-border rounded-xl shadow-xl shadow-black/20 py-1 min-w-[180px]">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setShowSortDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        sortBy === option.value
                          ? "text-drip-accent bg-drip-accent/5"
                          : "text-drip-text-secondary hover:text-drip-text hover:bg-drip-surface-hover"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-drip-text-muted">
          Showing{" "}
          <strong className="text-drip-text">{filteredPacks.length}</strong>{" "}
          packs
          {selectedCategory !== "All" && (
            <>
              {" "}
              in{" "}
              <strong className="text-drip-text">{selectedCategory}</strong>
            </>
          )}
        </p>
      </div>

      {/* Product Grid */}
      {filteredPacks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {filteredPacks.map((pack) => (
            <ProductCard key={pack.id} product={pack} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Package className="w-12 h-12 text-drip-text-muted mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-drip-text mb-1">
            No packs found
          </h3>
          <p className="text-sm text-drip-text-muted">
            Try adjusting your filters or search query.
          </p>
        </div>
      )}
    </div>
  );
}
