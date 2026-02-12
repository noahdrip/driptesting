"use client";

import { useState } from "react";
import {
  ShoppingBag,
  Zap,
  Radio,
  Package,
  Filter,
  ChevronDown,
} from "lucide-react";
import { purchases, type Purchase } from "@/data/mock";

type SourceFilter = "all" | "instant-pack" | "stream";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function PurchasesPage() {
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("all");

  const filtered =
    sourceFilter === "all"
      ? purchases
      : purchases.filter((p) => p.source === sourceFilter);

  const totalSpent = purchases.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );
  const totalPacks = purchases.reduce((sum, p) => sum + p.quantity, 0);

  const filters: { key: SourceFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "instant-pack", label: "Instant Packs" },
    { key: "stream", label: "Stream Purchases" },
  ];

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 bg-drip-accent/10 rounded-xl flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-drip-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-drip-text">
              My Purchases
            </h1>
            <p className="text-sm text-drip-text-muted">
              Packs you&apos;ve bought from instant packs and live streams.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        <div className="bg-drip-surface rounded-xl border border-drip-border p-3.5">
          <p className="text-xs text-drip-text-muted mb-1">Total Purchases</p>
          <p className="text-xl font-bold text-drip-text">{purchases.length}</p>
        </div>
        <div className="bg-drip-surface rounded-xl border border-drip-border p-3.5">
          <p className="text-xs text-drip-text-muted mb-1">Packs Opened</p>
          <p className="text-xl font-bold text-drip-accent">{totalPacks}</p>
        </div>
        <div className="bg-drip-surface rounded-xl border border-drip-border p-3.5">
          <p className="text-xs text-drip-text-muted mb-1">Total Spent</p>
          <p className="text-xl font-bold text-drip-green">
            ${totalSpent.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-4 h-4 text-drip-text-muted" />
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setSourceFilter(f.key)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              sourceFilter === f.key
                ? "bg-drip-accent text-white"
                : "bg-drip-surface text-drip-text-secondary border border-drip-border hover:bg-drip-surface-hover"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Purchase List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="w-12 h-12 text-drip-text-muted mx-auto mb-3" />
          <p className="text-drip-text-secondary">No purchases found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((purchase) => (
            <div
              key={purchase.id}
              className="bg-drip-surface rounded-xl border border-drip-border p-4"
            >
              <div className="flex items-center gap-4">
                {/* Pack Image */}
                <div
                  className={`w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br ${purchase.packImage} flex items-center justify-center`}
                >
                  <Zap className="w-7 h-7 text-white/80" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-semibold text-drip-text truncate">
                      {purchase.packTitle}
                    </h3>
                    <span
                      className={`shrink-0 flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        purchase.source === "stream"
                          ? "bg-drip-red/10 text-drip-red"
                          : "bg-drip-accent/10 text-drip-accent"
                      }`}
                    >
                      {purchase.source === "stream" ? (
                        <Radio className="w-3 h-3" />
                      ) : (
                        <Package className="w-3 h-3" />
                      )}
                      {purchase.source === "stream"
                        ? "Stream"
                        : "Instant Pack"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-drip-text-muted">
                    <span>{purchase.seller}</span>
                    <span>&middot;</span>
                    <span>{purchase.category}</span>
                    <span>&middot;</span>
                    <span>
                      {formatDate(purchase.purchasedAt)} at{" "}
                      {formatTime(purchase.purchasedAt)}
                    </span>
                  </div>

                  {purchase.cardPulled && (
                    <p className="text-xs text-drip-text-secondary mt-1">
                      Pulled:{" "}
                      <span className="text-drip-green font-medium">
                        {purchase.cardPulled}
                      </span>
                    </p>
                  )}
                </div>

                {/* Price */}
                <div className="text-right shrink-0">
                  <p className="text-base font-bold text-drip-text">
                    ${(purchase.price * purchase.quantity).toLocaleString()}
                  </p>
                  {purchase.quantity > 1 && (
                    <p className="text-[10px] text-drip-text-muted">
                      {purchase.quantity} &times; ${purchase.price}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
