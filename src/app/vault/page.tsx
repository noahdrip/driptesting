"use client";

import { useState } from "react";
import {
  Package,
  Truck,
  CheckCircle,
  Zap,
  ArrowRight,
  Filter,
  Archive,
} from "lucide-react";
import { vaultItems, type VaultItem } from "@/data/mock";

type StatusFilter = "all" | "vaulted" | "shipping" | "redeemed";

const statusConfig: Record<
  VaultItem["status"],
  { label: string; color: string; bg: string; icon: typeof Package }
> = {
  vaulted: {
    label: "In Vault",
    color: "text-drip-accent",
    bg: "bg-drip-accent/10",
    icon: Package,
  },
  shipping: {
    label: "Shipping",
    color: "text-drip-yellow",
    bg: "bg-drip-yellow/10",
    icon: Truck,
  },
  redeemed: {
    label: "Delivered",
    color: "text-drip-green",
    bg: "bg-drip-green/10",
    icon: CheckCircle,
  },
};

export default function VaultPage() {
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [redeemingId, setRedeemingId] = useState<string | null>(null);
  const [items, setItems] = useState(vaultItems);

  const filtered =
    filter === "all" ? items : items.filter((item) => item.status === filter);

  const vaultedCount = items.filter((i) => i.status === "vaulted").length;
  const totalValue = items.reduce((sum, i) => sum + i.estimatedValue, 0);

  const handleRedeem = (id: string) => {
    setRedeemingId(id);
    setTimeout(() => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "shipping" as const } : item
        )
      );
      setRedeemingId(null);
    }, 1200);
  };

  const filters: { key: StatusFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "vaulted", label: "In Vault" },
    { key: "shipping", label: "Shipping" },
    { key: "redeemed", label: "Delivered" },
  ];

  return (
    <div className="p-4 md:p-6 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-drip-text mb-1">My Vault</h1>
        <p className="text-sm text-drip-text-secondary">
          Your pulled items live here. Redeem to have them shipped to you.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-drip-surface rounded-xl border border-drip-border p-3.5">
          <p className="text-xs text-drip-text-muted mb-1">Total Items</p>
          <p className="text-xl font-bold text-drip-text">{items.length}</p>
        </div>
        <div className="bg-drip-surface rounded-xl border border-drip-border p-3.5">
          <p className="text-xs text-drip-text-muted mb-1">Ready to Redeem</p>
          <p className="text-xl font-bold text-drip-accent">{vaultedCount}</p>
        </div>
        <div className="bg-drip-surface rounded-xl border border-drip-border p-3.5">
          <p className="text-xs text-drip-text-muted mb-1">
            Estimated Value
          </p>
          <p className="text-xl font-bold text-drip-green">
            ${totalValue.toLocaleString()}
          </p>
        </div>
        <div className="bg-drip-surface rounded-xl border border-drip-border p-3.5">
          <p className="text-xs text-drip-text-muted mb-1">In Transit</p>
          <p className="text-xl font-bold text-drip-yellow">
            {items.filter((i) => i.status === "shipping").length}
          </p>
        </div>
      </div>

      {/* Redemption CTA Banner */}
      {vaultedCount > 0 && (
        <div className="flex items-center gap-3 bg-drip-accent/5 border border-drip-accent/20 rounded-xl p-4 mb-6">
          <Archive className="w-5 h-5 text-drip-accent shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-drip-text">
              You have {vaultedCount} item{vaultedCount !== 1 ? "s" : ""} ready
              to redeem
            </p>
            <p className="text-xs text-drip-text-muted">
              Click &quot;Redeem&quot; on any vaulted item to ship it to your
              address. Free shipping on all redemptions.
            </p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-4 h-4 text-drip-text-muted" />
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              filter === f.key
                ? "bg-drip-accent text-white"
                : "bg-drip-surface text-drip-text-secondary border border-drip-border hover:bg-drip-surface-hover"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <Package className="w-12 h-12 text-drip-text-muted mx-auto mb-3" />
          <p className="text-drip-text-secondary">No items found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => {
            const status = statusConfig[item.status];
            const isRedeeming = redeemingId === item.id;

            return (
              <div
                key={item.id}
                className="bg-drip-surface rounded-xl border border-drip-border overflow-hidden"
              >
                {/* Card Image */}
                <div
                  className={`aspect-[4/3] bg-gradient-to-br ${item.image} flex items-center justify-center relative`}
                >
                  <div className="text-white/90 text-center p-4">
                    <div className="w-14 h-14 mx-auto mb-2 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                      <Zap className="w-7 h-7" />
                    </div>
                    <p className="text-xs font-medium opacity-80">
                      {item.grade}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`absolute top-2.5 right-2.5 flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md ${status.bg} ${status.color}`}
                  >
                    <status.icon className="w-3 h-3" />
                    {status.label}
                  </span>
                </div>

                {/* Content */}
                <div className="p-3.5">
                  <h3 className="text-sm font-semibold text-drip-text mb-1 truncate">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-drip-text-muted mb-2">
                    <span>{item.grader} {item.grade}</span>
                    <span>·</span>
                    <span>{item.category}</span>
                  </div>
                  <p className="text-[10px] text-drip-text-muted mb-3">
                    From: {item.packTitle}
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-drip-text-muted">
                        Est. Value
                      </p>
                      <p className="text-base font-bold text-drip-green">
                        ${item.estimatedValue}
                      </p>
                    </div>

                    {item.status === "vaulted" && (
                      <button
                        onClick={() => handleRedeem(item.id)}
                        disabled={isRedeeming}
                        className="flex items-center gap-1.5 bg-drip-accent hover:bg-drip-accent-hover disabled:opacity-60 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                      >
                        {isRedeeming ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Redeeming...
                          </>
                        ) : (
                          <>
                            Redeem
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    )}

                    {item.status === "shipping" && (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-drip-yellow bg-drip-yellow/10 px-3 py-2 rounded-xl">
                        <Truck className="w-3.5 h-3.5" />
                        In Transit
                      </span>
                    )}

                    {item.status === "redeemed" && (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-drip-green bg-drip-green/10 px-3 py-2 rounded-xl">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Delivered
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
