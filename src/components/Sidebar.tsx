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
  Archive,
  ShoppingBag,
  Bookmark,
  RotateCcw,
  Grid,
  ExternalLink,
} from "lucide-react";

interface NavItem {
  label: string;
  icon: typeof Flame;
  href: string;
  color: string;
  badge?: string;
}

const discoverItems: NavItem[] = [
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
    label: "Categories",
    icon: Grid,
    href: "#",
    color: "text-drip-text-secondary",
  },
];

const myStuffItems: NavItem[] = [
  {
    label: "My Vault",
    icon: Archive,
    href: "/vault",
    color: "text-drip-accent",
  },
  {
    label: "Purchases",
    icon: ShoppingBag,
    href: "#",
    color: "text-drip-text-secondary",
  },
  {
    label: "Saved",
    icon: Bookmark,
    href: "#",
    color: "text-drip-text-secondary",
  },
  {
    label: "Redemptions",
    icon: RotateCcw,
    href: "#",
    color: "text-drip-text-secondary",
  },
];

const communityItems: NavItem[] = [
  { label: "Leaderboard", icon: Trophy, href: "#", color: "text-drip-yellow" },
  { label: "Giveaways", icon: Gift, href: "#", color: "text-drip-pink" },
  { label: "Rewards", icon: Star, href: "#", color: "text-drip-yellow" },
];

const featuredSellers = [
  { name: "DripOfficial", avatar: "DO", live: true },
  { name: "SlabKings", avatar: "SK", live: true },
  { name: "HoopsBreaks", avatar: "HB", live: false },
  { name: "RetroCards", avatar: "RC", live: false },
];

function NavSection({
  title,
  items,
  pathname,
}: {
  title: string;
  items: NavItem[];
  pathname: string;
}) {
  return (
    <div>
      <h3 className="text-[10px] font-semibold text-drip-text-muted uppercase tracking-wider mb-1 px-3">
        {title}
      </h3>
      <div className="space-y-0.5">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-drip-surface-hover text-drip-text font-medium"
                  : "text-drip-text-secondary hover:text-drip-text hover:bg-drip-surface-hover"
              }`}
            >
              <item.icon className={`w-[18px] h-[18px] ${item.color}`} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="text-[10px] font-bold bg-drip-red/20 text-drip-red px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden xl:flex flex-col w-56 shrink-0 bg-drip-sidebar border-r border-drip-border h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
      <nav className="p-3 space-y-4">
        <NavSection
          title="Discover"
          items={discoverItems}
          pathname={pathname}
        />

        <div className="border-t border-drip-border" />

        <NavSection
          title="My Stuff"
          items={myStuffItems}
          pathname={pathname}
        />

        <div className="border-t border-drip-border" />

        <NavSection
          title="Community"
          items={communityItems}
          pathname={pathname}
        />
      </nav>

      {/* Divider */}
      <div className="mx-3 my-2 border-t border-drip-border" />

      {/* Featured Sellers */}
      <div className="p-3">
        <h3 className="text-[10px] font-semibold text-drip-text-muted uppercase tracking-wider mb-1 px-3">
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

      {/* Spacer */}
      <div className="flex-1" />

      {/* Seller Hub CTA */}
      <div className="p-3">
        <Link
          href="#"
          className="flex items-center justify-center gap-2 w-full bg-drip-green/10 hover:bg-drip-green/20 text-drip-green text-sm font-medium py-2.5 px-3 rounded-lg transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Go to Seller Hub
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="p-3 px-6 space-y-2 border-t border-drip-border">
        <div className="flex items-center gap-2 text-xs">
          <TrendingUp className="w-3.5 h-3.5 text-drip-green" />
          <span className="text-drip-text-secondary">
            <strong className="text-drip-text">1,247</strong> active packs
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Star className="w-3.5 h-3.5 text-drip-yellow" />
          <span className="text-drip-text-secondary">
            <strong className="text-drip-text">89</strong> sellers online
          </span>
        </div>
      </div>
    </aside>
  );
}
