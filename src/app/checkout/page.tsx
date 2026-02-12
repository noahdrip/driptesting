"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  Lock,
  ShieldCheck,
  ChevronRight,
  Zap,
  Check,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

type Step = "shipping" | "payment" | "review";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<Step>("shipping");
  const [processing, setProcessing] = useState(false);

  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [payment, setPayment] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    nameOnCard: "",
  });

  const tax = totalPrice * 0.08;
  const orderTotal = totalPrice + tax;

  if (items.length === 0) {
    return (
      <div className="p-4 md:p-6 max-w-4xl">
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <h1 className="text-2xl font-bold text-drip-text mb-2">
            Nothing to check out
          </h1>
          <p className="text-drip-text-secondary mb-6">
            Add some items to your cart first.
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

  const handlePlaceOrder = () => {
    setProcessing(true);
    setTimeout(() => {
      clearCart();
      router.push("/order-confirmation");
    }, 1500);
  };

  const steps: { key: Step; label: string }[] = [
    { key: "shipping", label: "Shipping" },
    { key: "payment", label: "Payment" },
    { key: "review", label: "Review" },
  ];

  const inputClass =
    "w-full bg-drip-bg border border-drip-border rounded-xl px-4 py-2.5 text-sm text-drip-text placeholder-drip-text-muted outline-none focus:border-drip-accent transition-colors";

  return (
    <div className="p-4 md:p-6 max-w-4xl">
      {/* Back */}
      <button
        onClick={() => {
          if (step === "payment") setStep("shipping");
          else if (step === "review") setStep("payment");
          else router.back();
        }}
        className="flex items-center gap-1 text-sm text-drip-text-muted hover:text-drip-text transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        {step === "shipping" ? "Back to cart" : "Back"}
      </button>

      <h1 className="text-2xl font-bold text-drip-text mb-6">Checkout</h1>

      {/* Step Indicator */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => {
          const stepIndex = steps.findIndex((x) => x.key === step);
          const isActive = s.key === step;
          const isComplete = i < stepIndex;
          return (
            <div key={s.key} className="flex items-center gap-2">
              {i > 0 && (
                <ChevronRight className="w-4 h-4 text-drip-text-muted" />
              )}
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-drip-accent/10 text-drip-accent"
                    : isComplete
                    ? "text-drip-green"
                    : "text-drip-text-muted"
                }`}
              >
                {isComplete ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs">
                    {i + 1}
                  </span>
                )}
                {s.label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Area */}
        <div className="lg:col-span-2">
          {/* Shipping Step */}
          {step === "shipping" && (
            <div className="bg-drip-surface rounded-xl border border-drip-border p-6">
              <h2 className="text-lg font-bold text-drip-text mb-4">
                Shipping Information
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-drip-text-secondary mb-1.5">
                      First Name
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="John"
                      value={shipping.firstName}
                      onChange={(e) =>
                        setShipping({ ...shipping, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-drip-text-secondary mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="Doe"
                      value={shipping.lastName}
                      onChange={(e) =>
                        setShipping({ ...shipping, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-drip-text-secondary mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    className={inputClass}
                    placeholder="john@example.com"
                    value={shipping.email}
                    onChange={(e) =>
                      setShipping({ ...shipping, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-drip-text-secondary mb-1.5">
                    Address
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="123 Main St"
                    value={shipping.address}
                    onChange={(e) =>
                      setShipping({ ...shipping, address: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-drip-text-secondary mb-1.5">
                      City
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="New York"
                      value={shipping.city}
                      onChange={(e) =>
                        setShipping({ ...shipping, city: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-drip-text-secondary mb-1.5">
                      State
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="NY"
                      value={shipping.state}
                      onChange={(e) =>
                        setShipping({ ...shipping, state: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-drip-text-secondary mb-1.5">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="10001"
                      value={shipping.zip}
                      onChange={(e) =>
                        setShipping({ ...shipping, zip: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={() => setStep("payment")}
                className="mt-6 w-full bg-drip-accent hover:bg-drip-accent-hover text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {/* Payment Step */}
          {step === "payment" && (
            <div className="bg-drip-surface rounded-xl border border-drip-border p-6">
              <h2 className="text-lg font-bold text-drip-text mb-4">
                Payment Method
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-drip-text-secondary mb-1.5">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="John Doe"
                    value={payment.nameOnCard}
                    onChange={(e) =>
                      setPayment({ ...payment, nameOnCard: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-drip-text-secondary mb-1.5">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="4242 4242 4242 4242"
                      value={payment.cardNumber}
                      onChange={(e) =>
                        setPayment({ ...payment, cardNumber: e.target.value })
                      }
                    />
                    <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-drip-text-muted" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-drip-text-secondary mb-1.5">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="MM / YY"
                      value={payment.expiry}
                      onChange={(e) =>
                        setPayment({ ...payment, expiry: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-drip-text-secondary mb-1.5">
                      CVC
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="123"
                      value={payment.cvc}
                      onChange={(e) =>
                        setPayment({ ...payment, cvc: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 p-3 bg-drip-bg rounded-lg border border-drip-border">
                <Lock className="w-4 h-4 text-drip-text-muted shrink-0" />
                <p className="text-xs text-drip-text-muted">
                  Your payment info is encrypted and secure. We never store your
                  full card number.
                </p>
              </div>

              <button
                onClick={() => setStep("review")}
                className="mt-6 w-full bg-drip-accent hover:bg-drip-accent-hover text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Review Order
              </button>
            </div>
          )}

          {/* Review Step */}
          {step === "review" && (
            <div className="space-y-4">
              {/* Shipping Summary */}
              <div className="bg-drip-surface rounded-xl border border-drip-border p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-drip-text">
                    Shipping
                  </h3>
                  <button
                    onClick={() => setStep("shipping")}
                    className="text-xs text-drip-accent hover:text-drip-accent-hover"
                  >
                    Edit
                  </button>
                </div>
                <p className="text-sm text-drip-text-secondary">
                  {shipping.firstName} {shipping.lastName}
                </p>
                <p className="text-sm text-drip-text-muted">
                  {shipping.address || "123 Main St"}
                  {", "}
                  {shipping.city || "New York"}, {shipping.state || "NY"}{" "}
                  {shipping.zip || "10001"}
                </p>
                <p className="text-sm text-drip-text-muted">
                  {shipping.email || "john@example.com"}
                </p>
              </div>

              {/* Payment Summary */}
              <div className="bg-drip-surface rounded-xl border border-drip-border p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-drip-text">
                    Payment
                  </h3>
                  <button
                    onClick={() => setStep("payment")}
                    className="text-xs text-drip-accent hover:text-drip-accent-hover"
                  >
                    Edit
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-drip-text-muted" />
                  <span className="text-sm text-drip-text-secondary">
                    •••• •••• •••• {payment.cardNumber.slice(-4) || "4242"}
                  </span>
                </div>
              </div>

              {/* Items Summary */}
              <div className="bg-drip-surface rounded-xl border border-drip-border p-4">
                <h3 className="text-sm font-semibold text-drip-text mb-3">
                  Items ({totalItems})
                </h3>
                <div className="space-y-3">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 shrink-0 rounded-lg bg-gradient-to-br ${product.image} flex items-center justify-center`}
                      >
                        <Zap className="w-5 h-5 text-white/80" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-drip-text truncate">
                          {product.title}
                        </p>
                        <p className="text-xs text-drip-text-muted">
                          Qty: {quantity}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-drip-text">
                        ${product.price * quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={processing}
                className="w-full bg-drip-green hover:bg-drip-green/90 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    Place Order — ${orderTotal.toFixed(2)}
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-drip-surface rounded-xl border border-drip-border p-4 sticky top-20">
            <h2 className="text-sm font-bold text-drip-text mb-3">
              Order Summary
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-drip-text-secondary">
                  Subtotal ({totalItems})
                </span>
                <span className="text-drip-text">${totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-drip-text-secondary">Shipping</span>
                <span className="text-drip-green font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-drip-text-secondary">Tax</span>
                <span className="text-drip-text">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-drip-border pt-2 flex justify-between">
                <span className="font-semibold text-drip-text">Total</span>
                <span className="font-bold text-drip-text">
                  ${orderTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
