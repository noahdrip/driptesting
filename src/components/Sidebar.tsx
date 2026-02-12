"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Flame,
  Package,
  Radio,
  Store,
  Trophy,
  Gift,
  Star,
  TrendingUp,
} from "lucide-react";

const navItems = [
  { label: "Trending", icon: Flame, href: "/", color: "text-drip-red" },
  {
    label: "Instant Packs",
    icon: Package,
    href: "/instant-packs",
    color: "text-drip-accent",
  },
  {
    label: "Live Streams",
    icon: Radio,
    href: "#",
    color: "text-drip-green",
    badge: "3 LIVE",
  },
  { label: "Marketplace", icon: Store, href: "#", color: "text-drip-blue" },
  {
    label: "Leaderboard",
    icon: Trophy,
    href: "#",
    color: "text-drip-yellow",
  },
  { label: "Rewards", icon: Gift, href: "#", color: "text-drip-pink" },
];

const featuredSellers = [
  { name: "DripOfficial", avatar: "DO", live: true },
  { name: "SlabKings", avatar: "SK", live: true },
  { name: "HoopsBreaks", avatar: "HB", live: false },
  { name: "RetroCards", avatar: "RC", live: false },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden xl:flex flex-col w-56 shrink-0 bg-drip-sidebar border-r border-drip-border h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
      {/* Navigation */}
      <nav className="p-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-drip-surface-hover text-drip-text font-medium"
                  : "text-drip-text-secondary hover:text-drip-text hover:bg-drip-surface-hover"
              }`}
            >
              <item.icon className={`w-5 h-5 ${item.color}`} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="text-[10px] font-bold bg-drip-red/20 text-drip-red px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="mx-3 my-2 border-t border-drip-border" />

      {/* Featured Sellers */}
      <div className="p-3">
        <h3 className="text-xs font-semibold text-drip-text-muted uppercase tracking-wider mb-2 px-3">
          Featured Sellers
        </h3>
        <div className="space-y-0.5">
          {featuredSellers.map((seller) => (
            <Link
              key={seller.name}
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-drip-text-secondary hover:text-drip-text hover:bg-drip-surface-hover transition-colors"
            >
              <div className="relative">
                <div className="w-7 h-7 bg-gradient-to-br from-drip-accent to-drip-pink rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                  {seller.avatar}
                </div>
                {seller.live && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-drip-red rounded-full border-2 border-drip-sidebar" />
                )}
              </div>
              <span className="flex-1 truncate">{seller.name}</span>
              {seller.live && (
                <span className="w-2 h-2 bg-drip-red rounded-full animate-pulse" />
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-3 my-2 border-t border-drip-border" />

      {/* Quick Stats */}
      <div className="p-3 px-6 space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <TrendingUp className="w-4 h-4 text-drip-green" />
          <span className="text-drip-text-secondary">
            <strong className="text-drip-text">1,247</strong> active packs
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Star className="w-4 h-4 text-drip-yellow" />
          <span className="text-drip-text-secondary">
            <strong className="text-drip-text">89</strong> sellers online
          </span>
        </div>
      </div>
    </aside>
  );
}
