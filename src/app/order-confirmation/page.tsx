"use client";

import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";

export default function OrderConfirmationPage() {
  const orderId = `DRP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      <div className="flex flex-col items-center text-center py-12">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-drip-green/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-drip-green" />
        </div>

        <h1 className="text-3xl font-bold text-drip-text mb-2">
          Order Confirmed!
        </h1>
        <p className="text-drip-text-secondary mb-1">
          Thanks for your purchase. Your order is being processed.
        </p>
        <p className="text-sm text-drip-text-muted mb-8">
          Order ID:{" "}
          <span className="font-mono font-medium text-drip-text">
            {orderId}
          </span>
        </p>

        {/* Order Timeline */}
        <div className="w-full bg-drip-surface rounded-xl border border-drip-border p-6 mb-6 text-left">
          <h2 className="text-sm font-bold text-drip-text mb-4">
            What happens next
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Order Processing",
                desc: "We're preparing your items for shipping",
                time: "Now",
                active: true,
              },
              {
                title: "Authentication & Grading",
                desc: "All items verified for authenticity",
                time: "1-2 days",
                active: false,
              },
              {
                title: "Shipped",
                desc: "Tracking number sent to your email",
                time: "2-3 days",
                active: false,
              },
              {
                title: "Delivered",
                desc: "Items arrive at your door with insurance",
                time: "5-7 days",
                active: false,
              },
            ].map((step, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      step.active ? "bg-drip-green" : "bg-drip-border"
                    }`}
                  />
                  {i < 3 && (
                    <div className="w-px h-full bg-drip-border my-1" />
                  )}
                </div>
                <div className="pb-4">
                  <div className="flex items-center gap-2">
                    <p
                      className={`text-sm font-medium ${
                        step.active ? "text-drip-text" : "text-drip-text-muted"
                      }`}
                    >
                      {step.title}
                    </p>
                    <span className="text-[10px] text-drip-text-muted bg-drip-bg px-2 py-0.5 rounded-full">
                      {step.time}
                    </span>
                  </div>
                  <p className="text-xs text-drip-text-muted mt-0.5">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link
            href="/vault"
            className="flex-1 flex items-center justify-center gap-2 bg-drip-accent hover:bg-drip-accent-hover text-white font-semibold py-3 rounded-xl transition-colors"
          >
            <Package className="w-4 h-4" />
            View My Vault
          </Link>
          <Link
            href="/instant-packs"
            className="flex-1 flex items-center justify-center gap-2 bg-drip-surface hover:bg-drip-surface-hover text-drip-text font-semibold py-3 rounded-xl border border-drip-border transition-colors"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
