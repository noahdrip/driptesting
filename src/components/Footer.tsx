import Link from "next/link";
import { Droplets } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-drip-surface border-t border-drip-border mt-auto">
      <div className="max-w-[1440px] mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-drip-accent to-drip-pink rounded-lg flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">drip</span>
            </div>
            <p className="text-sm text-drip-text-muted max-w-xs">
              Shop, Stream and Hangout with your community. Your home for live
              shoppable events.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-drip-text mb-3">
              Explore
            </h4>
            <div className="space-y-2">
              {["Instant Packs", "Live Streams", "Marketplace", "Rewards"].map(
                (item) => (
                  <Link
                    key={item}
                    href="#"
                    className="block text-sm text-drip-text-muted hover:text-drip-text transition-colors"
                  >
                    {item}
                  </Link>
                )
              )}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-drip-text mb-3">
              Sellers
            </h4>
            <div className="space-y-2">
              {[
                "Start Selling",
                "Seller Dashboard",
                "Pricing",
                "Help Center",
              ].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="block text-sm text-drip-text-muted hover:text-drip-text transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-drip-text mb-3">
              Company
            </h4>
            <div className="space-y-2">
              {["About", "Blog", "Careers", "Contact"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="block text-sm text-drip-text-muted hover:text-drip-text transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-drip-border mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-drip-text-muted">
            &copy; 2026 Drip Shop Live. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-drip-text-muted">
            <Link href="#" className="hover:text-drip-text transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-drip-text transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-drip-text transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
