"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  SlidersHorizontal,
  ChevronDown,
  Package,
  Search,
  X,
  Lock,
  CreditCard,
  ShieldCheck,
  Zap,
  Sparkles,
  Archive,
  RotateCcw,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import {
  instantPacks,
  categories,
  sortOptions,
  getRandomPull,
  rarityConfig,
  type Product,
  type PullResult,
} from "@/data/mock";

type FlowState = "browsing" | "checkout" | "opening" | "result";

export default function InstantPacksPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("trending");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Purchase flow state
  const [flowState, setFlowState] = useState<FlowState>("browsing");
  const [selectedPack, setSelectedPack] = useState<Product | null>(null);
  const [processing, setProcessing] = useState(false);
  const [openingPhase, setOpeningPhase] = useState(0); // 0=idle, 1=shake, 2=burst, 3=reveal
  const [pulledCard, setPulledCard] = useState<PullResult | null>(null);

  // Payment form
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  const filteredPacks = useMemo(() => {
    let packs = [...instantPacks];
    if (selectedCategory !== "All") {
      packs = packs.filter((p) => p.category === selectedCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      packs = packs.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.seller.name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
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

  const handleBuy = (product: Product) => {
    setSelectedPack(product);
    setFlowState("checkout");
  };

  const handlePay = () => {
    if (!selectedPack) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setFlowState("opening");
      runOpeningAnimation();
    }, 1500);
  };

  const runOpeningAnimation = useCallback(() => {
    // Phase 1: pack appears and shakes
    setOpeningPhase(1);
    setTimeout(() => {
      // Phase 2: burst/rip
      setOpeningPhase(2);
      setTimeout(() => {
        // Phase 3: card reveal
        if (selectedPack) {
          setPulledCard(getRandomPull(selectedPack.category));
        }
        setOpeningPhase(3);
      }, 800);
    }, 1800);
  }, [selectedPack]);

  const handleOpenMore = () => {
    setPulledCard(null);
    setOpeningPhase(0);
    setFlowState("checkout");
  };

  const handleViewVault = () => {
    router.push("/vault");
  };

  const resetFlow = () => {
    setFlowState("browsing");
    setSelectedPack(null);
    setPulledCard(null);
    setOpeningPhase(0);
    setProcessing(false);
    setPaymentForm({ cardNumber: "", expiry: "", cvc: "", name: "" });
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
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

        <div className="flex items-center gap-2 shrink-0">
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
            <ProductCard key={pack.id} product={pack} onBuy={handleBuy} />
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

      {/* ===== CHECKOUT MODAL ===== */}
      {flowState === "checkout" && selectedPack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => !processing && resetFlow()}
          />
          <div className="relative bg-drip-surface rounded-2xl border border-drip-border w-full max-w-md shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-drip-border">
              <h2 className="text-lg font-bold text-drip-text">
                Complete Purchase
              </h2>
              <button
                onClick={() => !processing && resetFlow()}
                className="p-1.5 text-drip-text-muted hover:text-drip-text hover:bg-drip-surface-hover rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Pack Info */}
            <div className="p-5 border-b border-drip-border">
              <div className="flex gap-3">
                <div
                  className={`w-16 h-16 shrink-0 rounded-xl bg-gradient-to-br ${selectedPack.image} flex items-center justify-center`}
                >
                  <Zap className="w-8 h-8 text-white/80" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-drip-text">
                    {selectedPack.title}
                  </p>
                  <p className="text-xs text-drip-text-muted">
                    by {selectedPack.seller.name}
                    {selectedPack.seller.verified && " \u2022 Verified"}
                  </p>
                  <p className="text-lg font-bold text-drip-text mt-1">
                    ${selectedPack.price}
                    <span className="text-xs font-normal text-drip-text-muted ml-1">
                      per pull
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-medium text-drip-text-muted uppercase tracking-wider block mb-1.5">
                  Card Number
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-drip-text-muted" />
                  <input
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    value={paymentForm.cardNumber}
                    onChange={(e) =>
                      setPaymentForm((f) => ({
                        ...f,
                        cardNumber: formatCardNumber(e.target.value),
                      }))
                    }
                    className="w-full bg-drip-bg border border-drip-border rounded-xl py-2.5 pl-10 pr-4 text-sm text-drip-text placeholder-drip-text-muted focus:outline-none focus:border-drip-accent transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-drip-text-muted uppercase tracking-wider block mb-1.5">
                    Expiry
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={paymentForm.expiry}
                    onChange={(e) =>
                      setPaymentForm((f) => ({
                        ...f,
                        expiry: formatExpiry(e.target.value),
                      }))
                    }
                    className="w-full bg-drip-bg border border-drip-border rounded-xl py-2.5 px-4 text-sm text-drip-text placeholder-drip-text-muted focus:outline-none focus:border-drip-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-drip-text-muted uppercase tracking-wider block mb-1.5">
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    value={paymentForm.cvc}
                    onChange={(e) =>
                      setPaymentForm((f) => ({
                        ...f,
                        cvc: e.target.value.replace(/\D/g, "").slice(0, 4),
                      }))
                    }
                    className="w-full bg-drip-bg border border-drip-border rounded-xl py-2.5 px-4 text-sm text-drip-text placeholder-drip-text-muted focus:outline-none focus:border-drip-accent transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-drip-text-muted uppercase tracking-wider block mb-1.5">
                  Name on Card
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={paymentForm.name}
                  onChange={(e) =>
                    setPaymentForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="w-full bg-drip-bg border border-drip-border rounded-xl py-2.5 px-4 text-sm text-drip-text placeholder-drip-text-muted focus:outline-none focus:border-drip-accent transition-colors"
                />
              </div>
            </div>

            {/* Pay Button */}
            <div className="p-5 pt-0 space-y-3">
              <button
                onClick={handlePay}
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
                    <Lock className="w-4 h-4" />
                    Pay ${selectedPack.price} &amp; Rip
                  </>
                )}
              </button>
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-drip-text-muted">
                <ShieldCheck className="w-3 h-3" />
                Secured by Stripe &bull; Instant delivery to your vault
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== PACK OPENING ANIMATION ===== */}
      {flowState === "opening" && selectedPack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
          {/* Phase 1 & 2: Pack shaking and bursting */}
          {openingPhase < 3 && (
            <div className="flex flex-col items-center">
              {/* Pack */}
              <div
                className={`relative transition-all duration-500 ${
                  openingPhase === 1
                    ? "animate-[shake_0.15s_ease-in-out_infinite]"
                    : ""
                } ${
                  openingPhase === 2
                    ? "scale-150 opacity-0"
                    : "scale-100 opacity-100"
                }`}
              >
                {/* Glow ring */}
                <div
                  className={`absolute inset-0 rounded-2xl transition-all duration-1000 ${
                    openingPhase >= 1
                      ? "shadow-[0_0_60px_20px_rgba(139,92,246,0.5)]"
                      : ""
                  }`}
                />

                {/* Pack visual */}
                <div
                  className={`w-48 h-64 rounded-2xl bg-gradient-to-br ${selectedPack.image} flex flex-col items-center justify-center border-2 border-white/20 relative overflow-hidden`}
                >
                  {/* Shimmer overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_ease-in-out_infinite] -skew-x-12" />

                  <div className="relative z-10">
                    <div className="w-20 h-20 mx-auto mb-3 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                      <Zap className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-white font-bold text-sm text-center px-4">
                      {selectedPack.title}
                    </p>
                    <p className="text-white/60 text-xs text-center mt-1">
                      {selectedPack.category}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status text */}
              <p className="mt-8 text-white/70 text-sm font-medium animate-pulse">
                {openingPhase === 1
                  ? "Opening your pack..."
                  : "Revealing card..."}
              </p>
            </div>
          )}

          {/* Phase 3: Card reveal */}
          {openingPhase === 3 && pulledCard && (
            <div className="flex flex-col items-center animate-[fadeInUp_0.6s_ease-out]">
              {/* Rarity burst effect */}
              <div
                className={`absolute inset-0 opacity-20 bg-gradient-radial from-current to-transparent pointer-events-none ${rarityConfig[pulledCard.rarity].color}`}
              />

              {/* Rarity label */}
              <div
                className={`mb-4 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${rarityConfig[pulledCard.rarity].color} bg-white/10 backdrop-blur-sm border border-white/10`}
              >
                <Sparkles className="w-4 h-4 inline mr-1.5 -mt-0.5" />
                {rarityConfig[pulledCard.rarity].label}
              </div>

              {/* Card */}
              <div
                className={`relative w-56 h-72 rounded-2xl bg-gradient-to-br ${pulledCard.image} flex flex-col items-center justify-center border-2 border-white/30 shadow-2xl ${rarityConfig[pulledCard.rarity].glow} shadow-[0_0_80px_20px]`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_ease-in-out_infinite] -skew-x-12 rounded-2xl" />
                <div className="relative z-10 text-center px-4">
                  <div className="w-16 h-16 mx-auto mb-3 bg-white/15 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/25">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-white font-bold text-base mb-1">
                    {pulledCard.title}
                  </p>
                  <p className="text-white/70 text-xs">
                    {pulledCard.grader} {pulledCard.grade}
                  </p>
                </div>
              </div>

              {/* Value */}
              <div className="mt-5 text-center">
                <p className="text-xs text-white/50 uppercase tracking-wider">
                  Estimated Value
                </p>
                <p className="text-3xl font-bold text-white mt-1">
                  ${pulledCard.estimatedValue}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-8 flex gap-3">
                <button
                  onClick={handleViewVault}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl border border-white/20 transition-colors"
                >
                  <Archive className="w-4 h-4" />
                  View in Vault
                </button>
                <button
                  onClick={handleOpenMore}
                  className="flex items-center gap-2 bg-drip-accent hover:bg-drip-accent-hover text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Open More
                </button>
              </div>

              {/* Dismiss hint */}
              <button
                onClick={resetFlow}
                className="mt-4 text-xs text-white/40 hover:text-white/60 transition-colors"
              >
                Back to browsing
              </button>
            </div>
          )}
        </div>
      )}

      {/* Keyframe animations via style tag */}
      <style jsx global>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0) rotate(0deg);
          }
          25% {
            transform: translateX(-4px) rotate(-1deg);
          }
          75% {
            transform: translateX(4px) rotate(1deg);
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-200%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
