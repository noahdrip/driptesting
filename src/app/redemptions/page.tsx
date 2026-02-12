"use client";

import { useState } from "react";
import {
  RotateCcw,
  Zap,
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Copy,
  Filter,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import { redemptions, type Redemption } from "@/data/mock";

type StatusFilter = "all" | "processing" | "shipped" | "in-transit" | "delivered";

const statusConfig: Record<
  Redemption["status"],
  { label: string; color: string; bg: string; icon: typeof Package }
> = {
  processing: {
    label: "Processing",
    color: "text-drip-yellow",
    bg: "bg-drip-yellow/10",
    icon: Clock,
  },
  shipped: {
    label: "Shipped",
    color: "text-drip-blue",
    bg: "bg-drip-blue/10",
    icon: Package,
  },
  "in-transit": {
    label: "In Transit",
    color: "text-drip-accent",
    bg: "bg-drip-accent/10",
    icon: Truck,
  },
  delivered: {
    label: "Delivered",
    color: "text-drip-green",
    bg: "bg-drip-green/10",
    icon: CheckCircle,
  },
};

const statusOrder: Redemption["status"][] = [
  "processing",
  "shipped",
  "in-transit",
  "delivered",
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function RedemptionsPage() {
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered =
    filter === "all"
      ? redemptions
      : redemptions.filter((r) => r.status === filter);

  const activeCount = redemptions.filter(
    (r) => r.status !== "delivered"
  ).length;

  const filters: { key: StatusFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "processing", label: "Processing" },
    { key: "shipped", label: "Shipped" },
    { key: "in-transit", label: "In Transit" },
    { key: "delivered", label: "Delivered" },
  ];

  const copyTracking = (tracking: string, id: string) => {
    navigator.clipboard.writeText(tracking);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 bg-drip-accent/10 rounded-xl flex items-center justify-center">
            <RotateCcw className="w-5 h-5 text-drip-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-drip-text">
              My Redemptions
            </h1>
            <p className="text-sm text-drip-text-muted">
              Track items you&apos;ve redeemed from your vault.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-drip-surface rounded-xl border border-drip-border p-3.5">
          <p className="text-xs text-drip-text-muted mb-1">Total Redemptions</p>
          <p className="text-xl font-bold text-drip-text">
            {redemptions.length}
          </p>
        </div>
        <div className="bg-drip-surface rounded-xl border border-drip-border p-3.5">
          <p className="text-xs text-drip-text-muted mb-1">Active Shipments</p>
          <p className="text-xl font-bold text-drip-accent">{activeCount}</p>
        </div>
        <div className="bg-drip-surface rounded-xl border border-drip-border p-3.5">
          <p className="text-xs text-drip-text-muted mb-1">Items Shipped</p>
          <p className="text-xl font-bold text-drip-blue">
            {redemptions.reduce((sum, r) => sum + r.items.length, 0)}
          </p>
        </div>
        <div className="bg-drip-surface rounded-xl border border-drip-border p-3.5">
          <p className="text-xs text-drip-text-muted mb-1">Delivered</p>
          <p className="text-xl font-bold text-drip-green">
            {redemptions.filter((r) => r.status === "delivered").length}
          </p>
        </div>
      </div>

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

      {/* Redemption List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <RotateCcw className="w-12 h-12 text-drip-text-muted mx-auto mb-3" />
          <p className="text-drip-text-secondary">No redemptions found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((redemption) => {
            const status = statusConfig[redemption.status];
            const isExpanded = expandedId === redemption.id;
            const currentStep = statusOrder.indexOf(redemption.status);

            return (
              <div
                key={redemption.id}
                className="bg-drip-surface rounded-xl border border-drip-border overflow-hidden"
              >
                {/* Main Row */}
                <button
                  onClick={() =>
                    setExpandedId(isExpanded ? null : redemption.id)
                  }
                  className="w-full flex items-center gap-4 p-4 text-left hover:bg-drip-surface-hover/50 transition-colors"
                >
                  {/* Items thumbnails */}
                  <div className="flex -space-x-2 shrink-0">
                    {redemption.items.map((item, i) => (
                      <div
                        key={i}
                        className={`w-11 h-11 rounded-lg bg-gradient-to-br ${item.image} flex items-center justify-center border-2 border-drip-surface`}
                      >
                        <Zap className="w-5 h-5 text-white/80" />
                      </div>
                    ))}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-drip-text truncate">
                      {redemption.items.map((i) => i.title).join(", ")}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-drip-text-muted mt-0.5">
                      <span>
                        {redemption.items.length} item
                        {redemption.items.length !== 1 ? "s" : ""}
                      </span>
                      <span>&middot;</span>
                      <span>
                        Requested {formatDate(redemption.requestedAt)}
                      </span>
                      {redemption.carrier && (
                        <>
                          <span>&middot;</span>
                          <span>{redemption.carrier}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Status + Chevron */}
                  <span
                    className={`shrink-0 flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg ${status.bg} ${status.color}`}
                  >
                    <status.icon className="w-3.5 h-3.5" />
                    {status.label}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-drip-text-muted shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-drip-text-muted shrink-0" />
                  )}
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-drip-border px-4 pb-4">
                    {/* Progress Steps */}
                    <div className="py-4">
                      <div className="flex items-center gap-0">
                        {statusOrder.map((step, i) => {
                          const stepConf = statusConfig[step];
                          const reached = i <= currentStep;
                          return (
                            <div key={step} className="flex items-center flex-1 last:flex-initial">
                              <div className="flex flex-col items-center">
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    reached
                                      ? `${stepConf.bg} ${stepConf.color}`
                                      : "bg-drip-bg text-drip-text-muted border border-drip-border"
                                  }`}
                                >
                                  <stepConf.icon className="w-4 h-4" />
                                </div>
                                <p
                                  className={`text-[10px] mt-1 font-medium ${
                                    reached
                                      ? "text-drip-text"
                                      : "text-drip-text-muted"
                                  }`}
                                >
                                  {stepConf.label}
                                </p>
                              </div>
                              {i < statusOrder.length - 1 && (
                                <div
                                  className={`flex-1 h-0.5 mx-1 mb-5 rounded ${
                                    i < currentStep
                                      ? "bg-drip-accent"
                                      : "bg-drip-border"
                                  }`}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Items */}
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-drip-text-muted uppercase tracking-wider">
                          Items
                        </p>
                        {redemption.items.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 bg-drip-bg rounded-lg p-2.5 border border-drip-border"
                          >
                            <div
                              className={`w-10 h-10 shrink-0 rounded-lg bg-gradient-to-br ${item.image} flex items-center justify-center`}
                            >
                              <Zap className="w-5 h-5 text-white/80" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-drip-text">
                                {item.title}
                              </p>
                              <p className="text-xs text-drip-text-muted">
                                {item.grader} {item.grade}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Shipping Details */}
                      <div className="space-y-3">
                        <p className="text-xs font-medium text-drip-text-muted uppercase tracking-wider">
                          Shipping Details
                        </p>

                        {redemption.trackingNumber && (
                          <div className="bg-drip-bg rounded-lg p-3 border border-drip-border">
                            <p className="text-[10px] text-drip-text-muted uppercase tracking-wider mb-1">
                              Tracking Number
                            </p>
                            <div className="flex items-center gap-2">
                              <code className="text-sm text-drip-text font-mono flex-1 truncate">
                                {redemption.trackingNumber}
                              </code>
                              <button
                                onClick={() =>
                                  copyTracking(
                                    redemption.trackingNumber!,
                                    redemption.id
                                  )
                                }
                                className="shrink-0 p-1.5 text-drip-text-muted hover:text-drip-accent rounded-md hover:bg-drip-surface-hover transition-colors"
                                title="Copy tracking number"
                              >
                                {copiedId === redemption.id ? (
                                  <CheckCircle className="w-4 h-4 text-drip-green" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                            {redemption.carrier && (
                              <p className="text-xs text-drip-text-muted mt-1">
                                via {redemption.carrier}
                              </p>
                            )}
                          </div>
                        )}

                        <div className="bg-drip-bg rounded-lg p-3 border border-drip-border">
                          <p className="text-[10px] text-drip-text-muted uppercase tracking-wider mb-1">
                            Ship To
                          </p>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-drip-text-muted shrink-0" />
                            <p className="text-sm text-drip-text">
                              {redemption.address}
                            </p>
                          </div>
                        </div>

                        {/* Timeline */}
                        <div className="bg-drip-bg rounded-lg p-3 border border-drip-border space-y-2">
                          <p className="text-[10px] text-drip-text-muted uppercase tracking-wider">
                            Timeline
                          </p>
                          {redemption.deliveredAt && (
                            <div className="flex items-center gap-2 text-xs">
                              <CheckCircle className="w-3.5 h-3.5 text-drip-green shrink-0" />
                              <span className="text-drip-text">
                                Delivered{" "}
                                {formatDateTime(redemption.deliveredAt)}
                              </span>
                            </div>
                          )}
                          {redemption.shippedAt && (
                            <div className="flex items-center gap-2 text-xs">
                              <Package className="w-3.5 h-3.5 text-drip-blue shrink-0" />
                              <span className="text-drip-text">
                                Shipped{" "}
                                {formatDateTime(redemption.shippedAt)}
                              </span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-xs">
                            <Clock className="w-3.5 h-3.5 text-drip-yellow shrink-0" />
                            <span className="text-drip-text">
                              Requested{" "}
                              {formatDateTime(redemption.requestedAt)}
                            </span>
                          </div>
                        </div>

                        {/* Cost */}
                        <div className="bg-drip-bg rounded-lg p-3 border border-drip-border">
                          <p className="text-[10px] text-drip-text-muted uppercase tracking-wider mb-2">
                            Cost
                          </p>
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span className="text-drip-text-muted">
                                Shipping
                              </span>
                              <span className="text-drip-text">
                                ${redemption.shippingCost.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-drip-text-muted">
                                Tax (7%)
                              </span>
                              <span className="text-drip-text">
                                ${redemption.taxCost.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between pt-1 border-t border-drip-border">
                              <span className="font-medium text-drip-text">
                                Total
                              </span>
                              <span className="font-bold text-drip-text">
                                $
                                {(
                                  redemption.shippingCost + redemption.taxCost
                                ).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
