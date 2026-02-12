"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  Star,
  Zap,
  ChevronRight,
  Check,
  Lock,
  Gift,
  Info,
  Share2,
  Heart,
} from "lucide-react";
import { boxBreakDetail, instantPacks } from "@/data/mock";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";

type Tab = "slots" | "details" | "items" | "seller";

export default function BoxBreakPage() {
  const router = useRouter();
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("slots");
  const [activeImage, setActiveImage] = useState(0);

  const { clearCart, addItem } = useCart();
  const detail = boxBreakDetail;

  const toggleSlot = (slotId: string) => {
    setSelectedSlots((prev) =>
      prev.includes(slotId)
        ? prev.filter((id) => id !== slotId)
        : [...prev, slotId]
    );
  };

  const totalPrice = selectedSlots.length * detail.price;

  const tabs: { key: Tab; label: string }[] = [
    { key: "slots", label: "Slots" },
    { key: "details", label: "Details" },
    { key: "items", label: "Possible Items" },
    { key: "seller", label: "Seller" },
  ];

  return (
    <div className="p-4 md:p-6 max-w-6xl">
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
          {/* Main Image */}
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

          {/* Thumbnail Strip */}
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

          {/* Action Buttons (mobile) */}
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
          {/* Header */}
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
              {/* Desktop action buttons */}
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
              Price per slot
            </p>
            <p className="text-3xl font-bold text-drip-text mb-3">
              ${detail.price}
              <span className="text-base font-normal text-drip-text-muted ml-1">
                USD
              </span>
            </p>
            <button
              onClick={() => {
                clearCart();
                const pack = instantPacks.find((p) => p.id === detail.id) ?? {
                  id: detail.id,
                  title: detail.title,
                  price: detail.price,
                  image: detail.images[0],
                  seller: detail.seller,
                  category: detail.category,
                  tags: detail.tags,
                  type: "instant-pack" as const,
                };
                addItem(pack, 1);
                router.push("/checkout");
              }}
              className="flex items-center justify-center gap-2 w-full bg-drip-accent hover:bg-drip-accent-hover text-white font-semibold py-3 rounded-xl transition-colors"
            >
              <Zap className="w-4 h-4" />
              Buy Now — ${detail.price}
            </button>
            <p className="text-[10px] text-drip-text-muted text-center mt-2">
              Or select multiple slots below
            </p>
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
            {activeTab === "slots" && (
              <div>
                <p className="text-sm text-drip-text-muted mb-3">
                  Select available slots to purchase. Each slot gives you one
                  random pull.
                </p>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {detail.slots.map((slot) => {
                    const isSelected = selectedSlots.includes(slot.id);
                    const isSold = slot.status === "sold";

                    return (
                      <button
                        key={slot.id}
                        onClick={() => !isSold && toggleSlot(slot.id)}
                        disabled={isSold}
                        className={`relative rounded-xl p-3 text-center transition-all border ${
                          isSold
                            ? "bg-drip-bg border-drip-border opacity-50 cursor-not-allowed"
                            : isSelected
                            ? "bg-drip-accent/10 border-drip-accent text-drip-accent"
                            : "bg-drip-surface border-drip-border hover:border-drip-border-light hover:bg-drip-surface-hover cursor-pointer"
                        }`}
                      >
                        {isSold && (
                          <Lock className="w-3.5 h-3.5 mx-auto mb-1 text-drip-text-muted" />
                        )}
                        {!isSold && isSelected && (
                          <Check className="w-3.5 h-3.5 mx-auto mb-1 text-drip-accent" />
                        )}
                        {!isSold && !isSelected && (
                          <Gift className="w-3.5 h-3.5 mx-auto mb-1 text-drip-text-muted" />
                        )}
                        <p className="text-xs font-medium">{slot.label}</p>
                        <p className="text-[10px] text-drip-text-muted">
                          {isSold ? "Sold" : `$${slot.price}`}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

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

      {/* Sticky Purchase Bar */}
      {selectedSlots.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-drip-surface/95 backdrop-blur-md border-t border-drip-border p-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-drip-text-muted">
                {selectedSlots.length} slot
                {selectedSlots.length !== 1 ? "s" : ""} selected
              </p>
              <p className="text-xl font-bold text-drip-text">
                ${totalPrice}
                <span className="text-sm font-normal text-drip-text-muted ml-1">
                  total
                </span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedSlots([])}
                className="px-4 py-2.5 text-sm font-medium text-drip-text-secondary hover:text-drip-text border border-drip-border rounded-xl hover:bg-drip-surface-hover transition-colors"
              >
                Clear
              </button>
              <button
                onClick={() => {
                  clearCart();
                  const pack = instantPacks.find((p) => p.id === detail.id) ?? {
                    id: detail.id,
                    title: detail.title,
                    price: detail.price,
                    image: detail.images[0],
                    seller: detail.seller,
                    category: detail.category,
                    tags: detail.tags,
                    type: "instant-pack" as const,
                  };
                  addItem(pack, selectedSlots.length);
                  router.push("/checkout");
                }}
                className="flex items-center gap-2 bg-drip-accent hover:bg-drip-accent-hover text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
              >
                <Zap className="w-4 h-4" />
                Buy Now — ${totalPrice}
              </button>
            </div>
          </div>
        </div>
      )}

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
    </div>
  );
}
