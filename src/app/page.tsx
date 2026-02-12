import Link from "next/link";
import { ArrowRight, Zap, Package, Radio } from "lucide-react";

export default function Home() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-drip-accent/20 via-drip-surface to-drip-pink/10 rounded-2xl border border-drip-border p-8 md:p-12 mb-8 overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold text-drip-text mb-4">
            Shop, Stream &<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-drip-accent to-drip-pink">
              Collect
            </span>
          </h1>
          <p className="text-drip-text-secondary max-w-md mb-6 text-lg">
            Your home for live shoppable events. Rip packs, join breaks, and
            discover rare collectibles.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/instant-packs"
              className="inline-flex items-center gap-2 bg-drip-accent hover:bg-drip-accent-hover text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <Zap className="w-4 h-4" />
              Browse Instant Packs
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#"
              className="inline-flex items-center gap-2 bg-drip-surface-hover hover:bg-drip-border text-drip-text font-semibold px-6 py-3 rounded-xl border border-drip-border transition-colors"
            >
              <Radio className="w-4 h-4 text-drip-red" />
              Watch Live
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/instant-packs"
          className="group bg-drip-card-bg hover:bg-drip-card-hover border border-drip-border hover:border-drip-accent/50 rounded-xl p-6 transition-all"
        >
          <div className="w-12 h-12 bg-drip-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Package className="w-6 h-6 text-drip-accent" />
          </div>
          <h3 className="text-lg font-semibold text-drip-text mb-1">
            Instant Packs
          </h3>
          <p className="text-sm text-drip-text-muted">
            Rip mystery packs instantly. Graded slabs, chase cards, and more.
          </p>
        </Link>

        <Link
          href="#"
          className="group bg-drip-card-bg hover:bg-drip-card-hover border border-drip-border hover:border-drip-green/50 rounded-xl p-6 transition-all"
        >
          <div className="w-12 h-12 bg-drip-green/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Radio className="w-6 h-6 text-drip-green" />
          </div>
          <h3 className="text-lg font-semibold text-drip-text mb-1">
            Live Streams
          </h3>
          <p className="text-sm text-drip-text-muted">
            Join live box breaks and auctions with top sellers.
          </p>
        </Link>

        <Link
          href="/box-break/d88f8f72-44aa-4f07-adca-b0517c999475"
          className="group bg-drip-card-bg hover:bg-drip-card-hover border border-drip-border hover:border-drip-yellow/50 rounded-xl p-6 transition-all"
        >
          <div className="w-12 h-12 bg-drip-yellow/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Zap className="w-6 h-6 text-drip-yellow" />
          </div>
          <h3 className="text-lg font-semibold text-drip-text mb-1">
            Box Breaks
          </h3>
          <p className="text-sm text-drip-text-muted">
            Buy slots in upcoming breaks. Cards shipped to your door.
          </p>
        </Link>
      </div>
    </div>
  );
}
