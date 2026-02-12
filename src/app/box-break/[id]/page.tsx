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
  Info,
  Share2,
  Heart,
} from "lucide-react";
import { boxBreakDetail, instantPacks } from "@/data/mock";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";

type Tab = "details" | "items" | "seller";

export default function BoxBreakPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("details");
  const [activeImage, setActiveImage] = useState(0);

  const { clearCart, addItem } = useCart();
  const detail = boxBreakDetail;

  const tabs: { key: Tab; label: string }[] = [
    { key: "details", label: "Details" },
    { key: "items", label: "Possible Items" },
    { key: "seller", label: "Seller" },
  ];

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
              Price per pull
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
    </div>
  );
}
