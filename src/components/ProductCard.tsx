"use client";

import Link from "next/link";
import { ShieldCheck, Zap } from "lucide-react";
import type { Product } from "@/data/mock";

const badgeColors: Record<string, string> = {
  HOT: "bg-drip-red/90 text-white",
  SALE: "bg-drip-green/90 text-white",
  NEW: "bg-drip-blue/90 text-white",
  LIMITED: "bg-drip-yellow/90 text-black",
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/box-break/${product.id}`}
      className="group block bg-drip-card-bg rounded-xl border border-drip-border hover:border-drip-border-light transition-all duration-200 overflow-hidden hover:shadow-lg hover:shadow-drip-accent/5"
    >
      {/* Image Area */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div
          className={`w-full h-full bg-gradient-to-br ${product.image} flex items-center justify-center`}
        >
          <div className="text-white/90 text-center p-4">
            <div className="w-16 h-16 mx-auto mb-2 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
              <Zap className="w-8 h-8" />
            </div>
            <p className="text-xs font-medium opacity-80">{product.category}</p>
          </div>
        </div>

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-md ${
              badgeColors[product.badge] ?? "bg-drip-accent text-white"
            }`}
          >
            {product.badge}
          </span>
        )}

      </div>

      {/* Content */}
      <div className="p-3.5">
        {/* Seller */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 bg-gradient-to-br from-drip-accent to-drip-pink rounded-full flex items-center justify-center text-[8px] font-bold text-white">
            {product.seller.avatar}
          </div>
          <span className="text-xs text-drip-text-secondary truncate">
            {product.seller.name}
          </span>
          {product.seller.verified && (
            <ShieldCheck className="w-3.5 h-3.5 text-drip-blue shrink-0" />
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-drip-text mb-2 line-clamp-2 group-hover:text-drip-accent transition-colors">
          {product.title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-1.5 py-0.5 bg-drip-surface-hover text-drip-text-secondary rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-drip-text">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-drip-text-muted line-through">
              ${product.originalPrice}
            </span>
          )}
          <span className="text-[10px] text-drip-text-muted ml-auto">
            per pull
          </span>
        </div>
      </div>
    </Link>
  );
}
