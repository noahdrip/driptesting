"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Search,
  Bell,
  User,
  Menu,
  X,
  Droplets,
  Coins,
  Package,
} from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Instant Packs", href: "/instant-packs" },
  { label: "Live Streams", href: "#" },
  { label: "Marketplace", href: "#" },
];

export default function Header() {
  const pathname = usePathname();
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
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  isActive
                    ? "text-drip-text font-medium bg-drip-surface-hover"
                    : "text-drip-text-secondary hover:text-drip-text hover:bg-drip-surface-hover"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
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
          {/* My Vault - Prominent CTA */}
          <Link
            href="/vault"
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === "/vault"
                ? "bg-drip-accent/10 text-drip-accent"
                : "text-drip-text-secondary hover:text-drip-text hover:bg-drip-surface-hover"
            }`}
          >
            <Package className="w-4 h-4" />
            My Vault
          </Link>

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
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`block px-3 py-2.5 text-sm rounded-lg transition-colors ${
                  pathname === link.href
                    ? "text-drip-text font-medium bg-drip-surface-hover"
                    : "text-drip-text-secondary hover:text-drip-text hover:bg-drip-surface-hover"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/vault"
              className="flex items-center gap-2 px-3 py-2.5 text-sm text-drip-accent font-medium rounded-lg hover:bg-drip-surface-hover"
            >
              <Package className="w-4 h-4" />
              My Vault
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
