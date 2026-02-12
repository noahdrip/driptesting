"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  Star,
  Zap,
  ChevronRight,
  Check,
  Info,
  Share2,
  Heart,
  X,
  Lock,
  CreditCard,
  Sparkles,
  Archive,
  RotateCcw,
} from "lucide-react";
import {
  boxBreakDetail,
  instantPacks,
  getRandomPull,
  rarityConfig,
  type PullResult,
} from "@/data/mock";
import ProductCard from "@/components/ProductCard";

type Tab = "details" | "items" | "seller";
type FlowState = "browsing" | "checkout" | "opening" | "result";

export default function BoxBreakPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("details");
  const [activeImage, setActiveImage] = useState(0);

  // Purchase flow state
  const [flowState, setFlowState] = useState<FlowState>("browsing");
  const [processing, setProcessing] = useState(false);
  const [openingPhase, setOpeningPhase] = useState(0);
  const [pulledCard, setPulledCard] = useState<PullResult | null>(null);
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  const detail = boxBreakDetail;

  const tabs: { key: Tab; label: string }[] = [
    { key: "details", label: "Details" },
    { key: "items", label: "Possible Items" },
    { key: "seller", label: "Seller" },
  ];

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  const runOpeningAnimation = useCallback(() => {
    setOpeningPhase(1);
    setTimeout(() => {
      setOpeningPhase(2);
      setTimeout(() => {
        setPulledCard(getRandomPull(detail.category));
        setOpeningPhase(3);
      }, 800);
    }, 1800);
  }, [detail.category]);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setFlowState("opening");
      runOpeningAnimation();
    }, 1500);
  };

  const handleOpenMore = () => {
    setPulledCard(null);
    setOpeningPhase(0);
    setFlowState("checkout");
  };

  const resetFlow = () => {
    setFlowState("browsing");
    setPulledCard(null);
    setOpeningPhase(0);
    setProcessing(false);
    setPaymentForm({ cardNumber: "", expiry: "", cvc: "", name: "" });
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-drip-text-muted mb-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 hover:text-drip-text transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <ChevronRight className="w-3 h-3" />
        <Link
          href="/instant-packs"
          className="hover:text-drip-text transition-colors"
        >
          Instant Packs
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-drip-text truncate">{detail.title}</span>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column - Images */}
        <div className="lg:col-span-2">
          <div
            className={`aspect-square rounded-2xl bg-gradient-to-br ${detail.images[activeImage]} flex items-center justify-center mb-3 border border-drip-border overflow-hidden`}
          >
            <div className="text-white/90 text-center p-6">
              <div className="w-24 h-24 mx-auto mb-4 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                <Zap className="w-12 h-12" />
              </div>
              <p className="text-lg font-bold">{detail.title}</p>
              <p className="text-sm opacity-70 mt-1">{detail.category}</p>
            </div>
          </div>

          <div className="flex gap-2">
            {detail.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`flex-1 aspect-square rounded-xl bg-gradient-to-br ${img} border-2 transition-all ${
                  activeImage === i
                    ? "border-drip-accent"
                    : "border-drip-border hover:border-drip-border-light"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2 mt-3 lg:hidden">
            <button className="p-2.5 bg-drip-surface border border-drip-border rounded-xl hover:bg-drip-surface-hover transition-colors">
              <Heart className="w-5 h-5 text-drip-text-secondary" />
            </button>
            <button className="p-2.5 bg-drip-surface border border-drip-border rounded-xl hover:bg-drip-surface-hover transition-colors">
              <Share2 className="w-5 h-5 text-drip-text-secondary" />
            </button>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-3">
          <div className="mb-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {detail.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 bg-drip-surface-hover text-drip-text-secondary rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-drip-text">
                  {detail.title}
                </h1>
              </div>
              <div className="hidden lg:flex gap-2">
                <button className="p-2.5 bg-drip-surface border border-drip-border rounded-xl hover:bg-drip-surface-hover transition-colors">
                  <Heart className="w-5 h-5 text-drip-text-secondary" />
                </button>
                <button className="p-2.5 bg-drip-surface border border-drip-border rounded-xl hover:bg-drip-surface-hover transition-colors">
                  <Share2 className="w-5 h-5 text-drip-text-secondary" />
                </button>
              </div>
            </div>
            <p className="text-drip-text-secondary mt-2">
              {detail.description}
            </p>
          </div>

          {/* Seller Info */}
          <div className="flex items-center gap-3 bg-drip-surface rounded-xl border border-drip-border p-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-drip-accent to-drip-pink rounded-full flex items-center justify-center text-sm font-bold text-white">
              {detail.seller.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-drip-text">
                  {detail.seller.name}
                </span>
                {detail.seller.verified && (
                  <ShieldCheck className="w-4 h-4 text-drip-blue" />
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-drip-text-muted">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-drip-yellow fill-drip-yellow" />
                  {detail.seller.rating}
                </span>
                <span>{detail.seller.totalSales.toLocaleString()} sales</span>
              </div>
            </div>
            <button className="text-xs font-medium text-drip-accent hover:text-drip-accent-hover transition-colors">
              View Profile
            </button>
          </div>

          {/* Price */}
          <div className="bg-drip-surface rounded-xl border border-drip-border p-4 mb-4">
            <p className="text-sm text-drip-text-muted mb-0.5">
              Price per pull
            </p>
            <p className="text-3xl font-bold text-drip-text mb-3">
              ${detail.price}
              <span className="text-base font-normal text-drip-text-muted ml-1">
                USD
              </span>
            </p>
            <button
              onClick={() => setFlowState("checkout")}
              className="flex items-center justify-center gap-2 w-full bg-drip-accent hover:bg-drip-accent-hover text-white font-semibold py-3 rounded-xl transition-colors"
            >
              <Zap className="w-4 h-4" />
              Buy Now — ${detail.price}
            </button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {detail.guarantees.map((g, i) => (
              <div
                key={i}
                className="flex items-start gap-2 bg-drip-surface rounded-lg border border-drip-border p-2.5"
              >
                <Check className="w-4 h-4 text-drip-green shrink-0 mt-0.5" />
                <span className="text-xs text-drip-text-secondary">{g}</span>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="border-b border-drip-border mb-4">
            <div className="flex gap-0">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
                    activeTab === tab.key
                      ? "text-drip-accent"
                      : "text-drip-text-muted hover:text-drip-text"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.key && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-drip-accent rounded-t" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[200px]">
            {activeTab === "details" && (
              <div className="text-sm text-drip-text-secondary whitespace-pre-line leading-relaxed">
                {detail.longDescription}
              </div>
            )}

            {activeTab === "items" && (
              <div>
                <p className="text-sm text-drip-text-muted mb-3">
                  Items you could pull from this pack:
                </p>
                <div className="space-y-2">
                  {detail.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-drip-surface rounded-lg border border-drip-border p-3"
                    >
                      <div
                        className={`w-8 h-8 rounded-lg bg-gradient-to-br ${
                          i < 2
                            ? "from-drip-yellow to-orange-500"
                            : i < 4
                            ? "from-drip-accent to-drip-pink"
                            : "from-drip-blue to-drip-accent"
                        } flex items-center justify-center`}
                      >
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-drip-text">{item}</p>
                      </div>
                      {i < 2 && (
                        <span className="text-[10px] font-bold text-drip-yellow bg-drip-yellow/10 px-2 py-0.5 rounded-full">
                          CHASE
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "seller" && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-drip-surface rounded-xl border border-drip-border p-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-drip-accent to-drip-pink rounded-full flex items-center justify-center text-xl font-bold text-white">
                    {detail.seller.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-drip-text">
                        {detail.seller.name}
                      </h3>
                      {detail.seller.verified && (
                        <ShieldCheck className="w-5 h-5 text-drip-blue" />
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-drip-text-muted">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-drip-yellow fill-drip-yellow" />
                        {detail.seller.rating} rating
                      </span>
                      <span>
                        {detail.seller.totalSales.toLocaleString()} sales
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-drip-surface rounded-xl border border-drip-border p-4">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-drip-text-muted mt-0.5 shrink-0" />
                    <p className="text-sm text-drip-text-secondary">
                      This seller is verified by Drip. All items are
                      authenticated and shipped with insurance. Seller has
                      maintained a {detail.seller.rating}+ rating across{" "}
                      {detail.seller.totalSales.toLocaleString()} transactions.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Packs */}
      <div className="mt-12 mb-8">
        <h2 className="text-xl font-bold text-drip-text mb-4">
          You might also like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {instantPacks.slice(0, 4).map((pack) => (
            <ProductCard key={pack.id} product={pack} />
          ))}
        </div>
      </div>

      {/* ===== CHECKOUT MODAL ===== */}
      {flowState === "checkout" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => !processing && resetFlow()}
          />
          <div className="relative bg-drip-surface rounded-2xl border border-drip-border w-full max-w-md shadow-2xl overflow-hidden">
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

            <div className="p-5 border-b border-drip-border">
              <div className="flex gap-3">
                <div
                  className={`w-16 h-16 shrink-0 rounded-xl bg-gradient-to-br ${detail.images[0]} flex items-center justify-center`}
                >
                  <Zap className="w-8 h-8 text-white/80" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-drip-text">{detail.title}</p>
                  <p className="text-xs text-drip-text-muted">
                    by {detail.seller.name}
                    {detail.seller.verified && " \u2022 Verified"}
                  </p>
                  <p className="text-lg font-bold text-drip-text mt-1">
                    ${detail.price}
                    <span className="text-xs font-normal text-drip-text-muted ml-1">
                      per pull
                    </span>
                  </p>
                </div>
              </div>
            </div>

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
                    Pay ${detail.price} &amp; Rip
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
      {flowState === "opening" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
          {openingPhase < 3 && (
            <div className="flex flex-col items-center">
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
                <div
                  className={`absolute inset-0 rounded-2xl transition-all duration-1000 ${
                    openingPhase >= 1
                      ? "shadow-[0_0_60px_20px_rgba(139,92,246,0.5)]"
                      : ""
                  }`}
                />
                <div
                  className={`w-48 h-64 rounded-2xl bg-gradient-to-br ${detail.images[0]} flex flex-col items-center justify-center border-2 border-white/20 relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_ease-in-out_infinite] -skew-x-12" />
                  <div className="relative z-10">
                    <div className="w-20 h-20 mx-auto mb-3 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                      <Zap className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-white font-bold text-sm text-center px-4">
                      {detail.title}
                    </p>
                    <p className="text-white/60 text-xs text-center mt-1">
                      {detail.category}
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-8 text-white/70 text-sm font-medium animate-pulse">
                {openingPhase === 1
                  ? "Opening your pack..."
                  : "Revealing card..."}
              </p>
            </div>
          )}

          {openingPhase === 3 && pulledCard && (
            <div className="flex flex-col items-center animate-[fadeInUp_0.6s_ease-out]">
              <div
                className={`absolute inset-0 opacity-20 bg-gradient-radial from-current to-transparent pointer-events-none ${rarityConfig[pulledCard.rarity].color}`}
              />
              <div
                className={`mb-4 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${rarityConfig[pulledCard.rarity].color} bg-white/10 backdrop-blur-sm border border-white/10`}
              >
                <Sparkles className="w-4 h-4 inline mr-1.5 -mt-0.5" />
                {rarityConfig[pulledCard.rarity].label}
              </div>
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
              <div className="mt-5 text-center">
                <p className="text-xs text-white/50 uppercase tracking-wider">
                  Estimated Value
                </p>
                <p className="text-3xl font-bold text-white mt-1">
                  ${pulledCard.estimatedValue}
                </p>
              </div>
              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => router.push("/vault")}
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
              <button
                onClick={resetFlow}
                className="mt-4 text-xs text-white/40 hover:text-white/60 transition-colors"
              >
                Back to pack details
              </button>
            </div>
          )}
        </div>
      )}

      {/* Keyframe animations */}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(-4px) rotate(-1deg); }
          75% { transform: translateX(4px) rotate(1deg); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-200%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
