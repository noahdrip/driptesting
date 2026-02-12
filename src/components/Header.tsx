"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Search,
  ShoppingCart,
  Bell,
  User,
  Menu,
  X,
  Droplets,
  Coins,
} from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-drip-surface/95 backdrop-blur-md border-b border-drip-border">
      <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-drip-accent to-drip-pink rounded-lg flex items-center justify-center">
            <Droplets className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-drip-text hidden sm:block">
            drip
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 ml-4">
          <Link
            href="/"
            className="px-3 py-2 text-sm text-drip-text-secondary hover:text-drip-text rounded-lg hover:bg-drip-surface-hover transition-colors"
          >
            Home
          </Link>
          <Link
            href="/instant-packs"
            className="px-3 py-2 text-sm text-drip-text font-medium rounded-lg bg-drip-surface-hover transition-colors"
          >
            Instant Packs
          </Link>
          <Link
            href="#"
            className="px-3 py-2 text-sm text-drip-text-secondary hover:text-drip-text rounded-lg hover:bg-drip-surface-hover transition-colors"
          >
            Live Streams
          </Link>
          <Link
            href="#"
            className="px-3 py-2 text-sm text-drip-text-secondary hover:text-drip-text rounded-lg hover:bg-drip-surface-hover transition-colors"
          >
            Marketplace
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-4 hidden md:block">
          <div
            className={`relative flex items-center bg-drip-bg rounded-full border transition-colors ${
              searchFocused ? "border-drip-accent" : "border-drip-border"
            }`}
          >
            <Search className="w-4 h-4 text-drip-text-muted ml-4 shrink-0" />
            <input
              type="text"
              placeholder="Search packs, breaks, cards..."
              className="w-full bg-transparent text-sm text-drip-text placeholder-drip-text-muted py-2.5 px-3 outline-none"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Driplets Balance */}
          <div className="hidden sm:flex items-center gap-1.5 bg-drip-bg rounded-full px-3 py-1.5 border border-drip-border">
            <Coins className="w-4 h-4 text-drip-yellow" />
            <span className="text-sm font-medium text-drip-yellow">2,450</span>
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-drip-text-secondary hover:text-drip-text hover:bg-drip-surface-hover rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-drip-red rounded-full" />
          </button>

          {/* Cart */}
          <button className="relative p-2 text-drip-text-secondary hover:text-drip-text hover:bg-drip-surface-hover rounded-lg transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-drip-accent rounded-full text-[10px] font-bold flex items-center justify-center text-white">
              2
            </span>
          </button>

          {/* User Avatar */}
          <button className="flex items-center gap-2 p-1.5 hover:bg-drip-surface-hover rounded-lg transition-colors">
            <div className="w-8 h-8 bg-gradient-to-br from-drip-accent to-drip-blue rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="p-2 text-drip-text-secondary hover:text-drip-text lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-drip-border bg-drip-surface">
          <div className="p-4 space-y-2">
            {/* Mobile Search */}
            <div className="relative flex items-center bg-drip-bg rounded-full border border-drip-border mb-4 md:hidden">
              <Search className="w-4 h-4 text-drip-text-muted ml-4 shrink-0" />
              <input
                type="text"
                placeholder="Search packs, breaks, cards..."
                className="w-full bg-transparent text-sm text-drip-text placeholder-drip-text-muted py-2.5 px-3 outline-none"
              />
            </div>
            <Link
              href="/"
              className="block px-3 py-2.5 text-sm text-drip-text-secondary hover:text-drip-text rounded-lg hover:bg-drip-surface-hover"
            >
              Home
            </Link>
            <Link
              href="/instant-packs"
              className="block px-3 py-2.5 text-sm text-drip-text font-medium rounded-lg bg-drip-surface-hover"
            >
              Instant Packs
            </Link>
            <Link
              href="#"
              className="block px-3 py-2.5 text-sm text-drip-text-secondary hover:text-drip-text rounded-lg hover:bg-drip-surface-hover"
            >
              Live Streams
            </Link>
            <Link
              href="#"
              className="block px-3 py-2.5 text-sm text-drip-text-secondary hover:text-drip-text rounded-lg hover:bg-drip-surface-hover"
            >
              Marketplace
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
