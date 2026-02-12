"use client";

import { useState } from "react";
import {
  Package,
  Truck,
  CheckCircle,
  Zap,
  Filter,
  Archive,
  X,
  ShieldCheck,
  Check,
} from "lucide-react";
import { vaultItems, type VaultItem } from "@/data/mock";

type StatusFilter = "all" | "vaulted" | "shipping" | "redeemed";

const SHIPPING_PER_ITEM = 4.57;
const TAX_RATE = 0.07;

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
  const [items, setItems] = useState(vaultItems);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [processing, setProcessing] = useState(false);

  const filtered =
    filter === "all" ? items : items.filter((item) => item.status === filter);

  const vaultedItems = items.filter((i) => i.status === "vaulted");
  const vaultedCount = vaultedItems.length;
  const totalValue = items.reduce((sum, i) => sum + i.estimatedValue, 0);

  const selectedItems = items.filter((i) => selectedIds.includes(i.id));

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectAllVaulted = () => {
    setSelectedIds(vaultedItems.map((i) => i.id));
  };

  const clearSelection = () => setSelectedIds([]);

  // Cost calculations for modal
  const shippingTotal = selectedItems.length * SHIPPING_PER_ITEM;
  const taxTotal = shippingTotal * TAX_RATE;
  const redeemTotal = shippingTotal + taxTotal;

  const handleConfirmRedeem = () => {
    setProcessing(true);
    setTimeout(() => {
      setItems((prev) =>
        prev.map((item) =>
          selectedIds.includes(item.id)
            ? { ...item, status: "shipping" as const }
            : item
        )
      );
      setSelectedIds([]);
      setShowRedeemModal(false);
      setProcessing(false);
    }, 1500);
  };

  const filters: { key: StatusFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "vaulted", label: "In Vault" },
    { key: "shipping", label: "Shipping" },
    { key: "redeemed", label: "Delivered" },
  ];

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-drip-text mb-1">My Vault</h1>
        <p className="text-sm text-drip-text-secondary">
          Your pulled items live here. Select items and redeem to have them
          shipped.
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
          <p className="text-xs text-drip-text-muted mb-1">Estimated Value</p>
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
              Select items below then click &quot;Redeem Selected&quot; to ship
              them. $4.57 shipping per item + 7% tax.
            </p>
          </div>
          {vaultedCount > 1 && (
            <button
              onClick={selectAllVaulted}
              className="text-xs font-medium text-drip-accent hover:text-drip-accent-hover shrink-0"
            >
              Select All
            </button>
          )}
        </div>
      )}

      {/* Filters + Selection Controls */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
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

        {selectedIds.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-drip-text-muted">
              {selectedIds.length} selected
            </span>
            <button
              onClick={clearSelection}
              className="text-xs text-drip-text-muted hover:text-drip-text"
            >
              Clear
            </button>
          </div>
        )}
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
            const isSelected = selectedIds.includes(item.id);
            const isVaulted = item.status === "vaulted";

            return (
              <div
                key={item.id}
                onClick={() => isVaulted && toggleSelect(item.id)}
                className={`bg-drip-surface rounded-xl border overflow-hidden transition-all ${
                  isVaulted ? "cursor-pointer" : ""
                } ${
                  isSelected
                    ? "border-drip-accent ring-1 ring-drip-accent/30"
                    : "border-drip-border"
                }`}
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

                  {/* Selection Checkbox */}
                  {isVaulted && (
                    <div
                      className={`absolute top-2.5 left-2.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-drip-accent border-drip-accent"
                          : "bg-black/30 border-white/40 backdrop-blur-sm"
                      }`}
                    >
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-white" />
                      )}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-3.5">
                  <h3 className="text-sm font-semibold text-drip-text mb-1 truncate">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-drip-text-muted mb-2">
                    <span>
                      {item.grader} {item.grade}
                    </span>
                    <span>&middot;</span>
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

      {/* Sticky Redeem Bar */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-drip-surface/95 backdrop-blur-md border-t border-drip-border p-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-drip-text-muted">
                {selectedIds.length} item{selectedIds.length !== 1 ? "s" : ""}{" "}
                selected
              </p>
              <p className="text-lg font-bold text-drip-text">
                ${redeemTotal.toFixed(2)}
                <span className="text-xs font-normal text-drip-text-muted ml-1">
                  shipping + tax
                </span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={clearSelection}
                className="px-4 py-2.5 text-sm font-medium text-drip-text-secondary hover:text-drip-text border border-drip-border rounded-xl hover:bg-drip-surface-hover transition-colors"
              >
                Clear
              </button>
              <button
                onClick={() => setShowRedeemModal(true)}
                className="flex items-center gap-2 bg-drip-accent hover:bg-drip-accent-hover text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
              >
                <Package className="w-4 h-4" />
                Redeem Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Redeem Modal */}
      {showRedeemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => !processing && setShowRedeemModal(false)}
          />

          {/* Modal */}
          <div className="relative bg-drip-surface rounded-2xl border border-drip-border w-full max-w-md max-h-[85vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-drip-border">
              <h2 className="text-lg font-bold text-drip-text">
                Redeem Items
              </h2>
              <button
                onClick={() => !processing && setShowRedeemModal(false)}
                className="p-1.5 text-drip-text-muted hover:text-drip-text hover:bg-drip-surface-hover rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items List */}
            <div className="p-5 space-y-3">
              <p className="text-xs font-medium text-drip-text-muted uppercase tracking-wider">
                Items to ship ({selectedItems.length})
              </p>
              {selectedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 bg-drip-bg rounded-xl p-3 border border-drip-border"
                >
                  <div
                    className={`w-12 h-12 shrink-0 rounded-lg bg-gradient-to-br ${item.image} flex items-center justify-center`}
                  >
                    <Zap className="w-6 h-6 text-white/80" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-drip-text truncate">
                      {item.title}
                    </p>
                    <p className="text-xs text-drip-text-muted">
                      {item.grader} {item.grade}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSelect(item.id);
                      if (selectedItems.length === 1) setShowRedeemModal(false);
                    }}
                    className="p-1 text-drip-text-muted hover:text-drip-red rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div className="mx-5 p-4 bg-drip-bg rounded-xl border border-drip-border">
              <p className="text-xs font-medium text-drip-text-muted uppercase tracking-wider mb-3">
                Cost Breakdown
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-drip-text-secondary">
                    Shipping ({selectedItems.length}{" "}
                    {selectedItems.length === 1 ? "item" : "items"} &times;
                    $4.57)
                  </span>
                  <span className="text-drip-text font-medium">
                    ${shippingTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-drip-text-secondary">Tax (7%)</span>
                  <span className="text-drip-text font-medium">
                    ${taxTotal.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-drip-border pt-2 flex justify-between">
                  <span className="font-semibold text-drip-text">Total</span>
                  <span className="text-lg font-bold text-drip-text">
                    ${redeemTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-5 space-y-3">
              <button
                onClick={handleConfirmRedeem}
                disabled={processing}
                className="w-full flex items-center justify-center gap-2 bg-drip-accent hover:bg-drip-accent-hover disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-colors"
              >
                {processing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    Confirm &amp; Pay ${redeemTotal.toFixed(2)}
                  </>
                )}
              </button>

              <button
                onClick={() => !processing && setShowRedeemModal(false)}
                disabled={processing}
                className="w-full text-sm text-drip-text-muted hover:text-drip-text py-2 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
