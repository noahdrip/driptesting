"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  Zap,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, totalItems, totalPrice } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="p-4 md:p-6 max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 bg-drip-surface rounded-2xl flex items-center justify-center mb-4 border border-drip-border">
            <ShoppingCart className="w-10 h-10 text-drip-text-muted" />
          </div>
          <h1 className="text-2xl font-bold text-drip-text mb-2">
            Your cart is empty
          </h1>
          <p className="text-drip-text-secondary mb-6 max-w-sm">
            Browse instant packs and add some items to get started.
          </p>
          <Link
            href="/instant-packs"
            className="bg-drip-accent hover:bg-drip-accent-hover text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Browse Packs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm text-drip-text-muted hover:text-drip-text transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      <h1 className="text-2xl font-bold text-drip-text mb-6">
        Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-3">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex gap-4 bg-drip-surface rounded-xl border border-drip-border p-4"
            >
              {/* Thumbnail */}
              <div
                className={`w-20 h-20 shrink-0 rounded-xl bg-gradient-to-br ${product.image} flex items-center justify-center`}
              >
                <Zap className="w-8 h-8 text-white/80" />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-drip-text truncate">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-xs text-drip-text-muted">
                        {product.seller.name}
                      </span>
                      {product.seller.verified && (
                        <ShieldCheck className="w-3 h-3 text-drip-blue" />
                      )}
                    </div>
                    <p className="text-xs text-drip-text-muted mt-0.5">
                      {product.category}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(product.id)}
                    className="p-1.5 text-drip-text-muted hover:text-drip-red hover:bg-drip-red/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-3">
                  {/* Quantity */}
                  <div className="flex items-center gap-1 bg-drip-bg rounded-lg border border-drip-border">
                    <button
                      onClick={() =>
                        updateQuantity(product.id, quantity - 1)
                      }
                      className="p-1.5 hover:bg-drip-surface-hover rounded-l-lg transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5 text-drip-text-secondary" />
                    </button>
                    <span className="text-sm font-medium text-drip-text w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(product.id, quantity + 1)
                      }
                      className="p-1.5 hover:bg-drip-surface-hover rounded-r-lg transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5 text-drip-text-secondary" />
                    </button>
                  </div>

                  {/* Price */}
                  <p className="text-base font-bold text-drip-text">
                    ${product.price * quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-drip-surface rounded-xl border border-drip-border p-4 sticky top-20">
            <h2 className="text-lg font-bold text-drip-text mb-4">
              Order Summary
            </h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-drip-text-secondary">
                  Subtotal ({totalItems} items)
                </span>
                <span className="text-drip-text">${totalPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-drip-text-secondary">Shipping</span>
                <span className="text-drip-green font-medium">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-drip-text-secondary">Tax</span>
                <span className="text-drip-text">
                  ${(totalPrice * 0.08).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="border-t border-drip-border pt-3 mb-4">
              <div className="flex justify-between">
                <span className="font-semibold text-drip-text">Total</span>
                <span className="text-xl font-bold text-drip-text">
                  ${(totalPrice * 1.08).toFixed(2)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="flex items-center justify-center gap-2 w-full bg-drip-accent hover:bg-drip-accent-hover text-white font-semibold py-3 rounded-xl transition-colors"
            >
              <Lock className="w-4 h-4" />
              Checkout
            </Link>

            <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-drip-text-muted">
              <ShieldCheck className="w-3 h-3" />
              Secure checkout - 100% buyer protection
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
