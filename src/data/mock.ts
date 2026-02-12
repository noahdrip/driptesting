export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  seller: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  category: string;
  tags: string[];
  badge?: string;
  pullsRemaining?: number;
  totalPulls?: number;
  rarity?: string;
  type: "instant-pack" | "box-break";
}

export interface BoxBreakSlot {
  id: string;
  label: string;
  price: number;
  status: "available" | "sold" | "yours";
  buyer?: string;
}

export interface BoxBreakDetail {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: number;
  images: string[];
  seller: {
    name: string;
    avatar: string;
    verified: boolean;
    rating: number;
    totalSales: number;
  };
  category: string;
  tags: string[];
  type: "random-team" | "pick-your-team" | "hit-draft" | "personal";
  totalSlots: number;
  slotsFilled: number;
  slots: BoxBreakSlot[];
  scheduledDate?: string;
  guarantees: string[];
  items: string[];
}

// Color palette for placeholder images
const CARD_COLORS = [
  "from-yellow-500 to-orange-600",
  "from-blue-500 to-purple-600",
  "from-green-500 to-teal-600",
  "from-red-500 to-pink-600",
  "from-indigo-500 to-blue-600",
  "from-purple-500 to-pink-600",
  "from-cyan-500 to-blue-600",
  "from-emerald-500 to-green-600",
  "from-amber-500 to-yellow-600",
  "from-rose-500 to-red-600",
];

export const instantPacks: Product[] = [
  {
    id: "1",
    title: "25th Anniversary Pack",
    price: 23,
    image: CARD_COLORS[0],
    seller: { name: "DripOfficial", avatar: "DO", verified: true },
    category: "Pokemon",
    tags: ["Graded", "Vintage"],
    badge: "HOT",
    pullsRemaining: 47,
    totalPulls: 100,
    type: "instant-pack",
  },
  {
    id: "2",
    title: "PSA 10 Hunt Pack",
    price: 45,
    originalPrice: 55,
    image: CARD_COLORS[1],
    seller: { name: "SlabKings", avatar: "SK", verified: true },
    category: "Pokemon",
    tags: ["PSA", "Chase"],
    badge: "SALE",
    pullsRemaining: 12,
    totalPulls: 50,
    type: "instant-pack",
  },
  {
    id: "3",
    title: "Vintage Holo Pack",
    price: 35,
    image: CARD_COLORS[2],
    seller: { name: "RetroCards", avatar: "RC", verified: false },
    category: "Pokemon",
    tags: ["Vintage", "Holo"],
    pullsRemaining: 89,
    totalPulls: 150,
    type: "instant-pack",
  },
  {
    id: "4",
    title: "NBA Prizm Mystery Pack",
    price: 30,
    image: CARD_COLORS[3],
    seller: { name: "HoopsBreaks", avatar: "HB", verified: true },
    category: "Sports",
    tags: ["Basketball", "Prizm"],
    badge: "NEW",
    pullsRemaining: 200,
    totalPulls: 200,
    type: "instant-pack",
  },
  {
    id: "5",
    title: "One Piece Ultra Rare Pack",
    price: 50,
    originalPrice: 65,
    image: CARD_COLORS[4],
    seller: { name: "AnimeTCG", avatar: "AT", verified: true },
    category: "One Piece",
    tags: ["Ultra Rare", "Chase"],
    badge: "SALE",
    pullsRemaining: 33,
    totalPulls: 75,
    type: "instant-pack",
  },
  {
    id: "6",
    title: "Topps Chrome Baseball Pack",
    price: 28,
    image: CARD_COLORS[5],
    seller: { name: "DiamondBreaks", avatar: "DB", verified: true },
    category: "Sports",
    tags: ["Baseball", "Chrome"],
    pullsRemaining: 150,
    totalPulls: 200,
    type: "instant-pack",
  },
  {
    id: "7",
    title: "Dragon Ball Z Slab Pack",
    price: 40,
    image: CARD_COLORS[6],
    seller: { name: "DBZKing", avatar: "DK", verified: false },
    category: "Dragon Ball Z",
    tags: ["Graded", "Slab"],
    pullsRemaining: 60,
    totalPulls: 80,
    type: "instant-pack",
  },
  {
    id: "8",
    title: "Magic: The Gathering Mythic Pack",
    price: 55,
    image: CARD_COLORS[7],
    seller: { name: "MTGVault", avatar: "MV", verified: true },
    category: "Magic",
    tags: ["Mythic", "Rare"],
    badge: "HOT",
    pullsRemaining: 25,
    totalPulls: 40,
    type: "instant-pack",
  },
  {
    id: "9",
    title: "Football Rookie Chase Pack",
    price: 38,
    image: CARD_COLORS[8],
    seller: { name: "GridironCards", avatar: "GC", verified: true },
    category: "Sports",
    tags: ["Football", "Rookie"],
    badge: "NEW",
    pullsRemaining: 95,
    totalPulls: 120,
    type: "instant-pack",
  },
  {
    id: "10",
    title: "Yu-Gi-Oh! Ghost Rare Pack",
    price: 32,
    image: CARD_COLORS[9],
    seller: { name: "YGOmaster", avatar: "YM", verified: false },
    category: "Yu-Gi-Oh!",
    tags: ["Ghost Rare", "Chase"],
    pullsRemaining: 44,
    totalPulls: 60,
    type: "instant-pack",
  },
  {
    id: "11",
    title: "Celebrations Elite Pack",
    price: 60,
    image: CARD_COLORS[0],
    seller: { name: "DripOfficial", avatar: "DO", verified: true },
    category: "Pokemon",
    tags: ["Celebrations", "Elite"],
    badge: "LIMITED",
    pullsRemaining: 8,
    totalPulls: 25,
    type: "instant-pack",
  },
  {
    id: "12",
    title: "NBA Hoops Blaster Pack",
    price: 18,
    image: CARD_COLORS[3],
    seller: { name: "HoopsBreaks", avatar: "HB", verified: true },
    category: "Sports",
    tags: ["Basketball", "Hoops"],
    pullsRemaining: 300,
    totalPulls: 400,
    type: "instant-pack",
  },
];

export const boxBreakDetail: BoxBreakDetail = {
  id: "d88f8f72-44aa-4f07-adca-b0517c999475",
  title: "25th Anniversary Pack",
  description:
    "Guarantees a professionally graded card in every pull! Opportunities to obtain Celebrations, vintage classics or modern bangers.",
  longDescription: `This exclusive 25th Anniversary Pack celebrates 25 years of Pokemon with an incredible mix of cards spanning the entire history of the franchise.

Every single pull guarantees a professionally graded card (PSA, BGS, or CGC). You could pull anything from a vintage Base Set Charizard to a modern Celebrations chase card.

**What's inside:**
- 100% graded cards guaranteed
- Mix of vintage (1999-2005) and modern (2020+) cards
- Chase cards include PSA 10 Base Set holos, Gold Stars, and Celebrations Ultra Premium hits
- Every card ships in a protective case with tracking`,
  price: 23,
  images: [CARD_COLORS[0], CARD_COLORS[1], CARD_COLORS[2]],
  seller: {
    name: "DripOfficial",
    avatar: "DO",
    verified: true,
    rating: 4.9,
    totalSales: 12453,
  },
  category: "Pokemon",
  tags: ["Graded", "Vintage", "Celebrations", "PSA"],
  type: "random-team",
  totalSlots: 20,
  slotsFilled: 14,
  slots: Array.from({ length: 20 }, (_, i) => ({
    id: `slot-${i + 1}`,
    label: `Slot ${i + 1}`,
    price: 23,
    status: i < 14 ? "sold" : "available",
    buyer: i < 14 ? `User${Math.floor(Math.random() * 9000) + 1000}` : undefined,
  })) as BoxBreakSlot[],
  scheduledDate: "2026-02-15T20:00:00Z",
  guarantees: [
    "Professionally graded card in every pull",
    "Free shipping on all items",
    "Cards ship within 3 business days",
    "100% authentic guaranteed",
  ],
  items: [
    "PSA 10 Base Set Charizard (Chase)",
    "PSA 9 Gold Star Umbreon (Chase)",
    "BGS 9.5 Celebrations Charizard",
    "PSA 10 Celebrations Mew",
    "CGC 9 Vintage Holo Blastoise",
    "PSA 8 Vintage Holo Venusaur",
    "Various PSA 7-10 Modern Holos",
    "Various BGS 8-9.5 Vintage Cards",
  ],
};

export interface VaultItem {
  id: string;
  title: string;
  image: string;
  category: string;
  grade: string;
  grader: string;
  estimatedValue: number;
  packTitle: string;
  pulledAt: string;
  status: "vaulted" | "redeemed" | "shipping";
}

const CARD_COLORS_VAULT = [
  "from-yellow-500 to-orange-600",
  "from-blue-500 to-purple-600",
  "from-green-500 to-teal-600",
  "from-red-500 to-pink-600",
  "from-indigo-500 to-blue-600",
  "from-purple-500 to-pink-600",
];

export const vaultItems: VaultItem[] = [
  {
    id: "v1",
    title: "Charizard Base Set Holo",
    image: CARD_COLORS_VAULT[0],
    category: "Pokemon",
    grade: "PSA 8",
    grader: "PSA",
    estimatedValue: 420,
    packTitle: "25th Anniversary Pack",
    pulledAt: "2026-02-10T14:30:00Z",
    status: "vaulted",
  },
  {
    id: "v2",
    title: "Celebrations Mew",
    image: CARD_COLORS_VAULT[1],
    category: "Pokemon",
    grade: "PSA 10",
    grader: "PSA",
    estimatedValue: 85,
    packTitle: "25th Anniversary Pack",
    pulledAt: "2026-02-09T18:00:00Z",
    status: "vaulted",
  },
  {
    id: "v3",
    title: "Luka Doncic Prizm Silver",
    image: CARD_COLORS_VAULT[3],
    category: "Sports",
    grade: "BGS 9.5",
    grader: "BGS",
    estimatedValue: 310,
    packTitle: "NBA Prizm Mystery Pack",
    pulledAt: "2026-02-08T11:00:00Z",
    status: "shipping",
  },
  {
    id: "v4",
    title: "Vintage Holo Blastoise",
    image: CARD_COLORS_VAULT[2],
    category: "Pokemon",
    grade: "CGC 9",
    grader: "CGC",
    estimatedValue: 195,
    packTitle: "Vintage Holo Pack",
    pulledAt: "2026-02-07T09:15:00Z",
    status: "vaulted",
  },
  {
    id: "v5",
    title: "One Piece Luffy Manga Rare",
    image: CARD_COLORS_VAULT[4],
    category: "One Piece",
    grade: "PSA 10",
    grader: "PSA",
    estimatedValue: 150,
    packTitle: "One Piece Ultra Rare Pack",
    pulledAt: "2026-02-05T16:45:00Z",
    status: "redeemed",
  },
  {
    id: "v6",
    title: "Topps Chrome Yordan Alvarez RC",
    image: CARD_COLORS_VAULT[5],
    category: "Sports",
    grade: "PSA 9",
    grader: "PSA",
    estimatedValue: 75,
    packTitle: "Topps Chrome Baseball Pack",
    pulledAt: "2026-02-04T20:00:00Z",
    status: "vaulted",
  },
];

// Purchase history (instant packs + stream purchases)
export interface Purchase {
  id: string;
  packTitle: string;
  packImage: string;
  category: string;
  seller: string;
  price: number;
  quantity: number;
  purchasedAt: string;
  source: "instant-pack" | "stream";
  cardPulled?: string;
}

export const purchases: Purchase[] = [
  {
    id: "p1",
    packTitle: "25th Anniversary Pack",
    packImage: CARD_COLORS[0],
    category: "Pokemon",
    seller: "DripOfficial",
    price: 23,
    quantity: 1,
    purchasedAt: "2026-02-10T14:28:00Z",
    source: "instant-pack",
    cardPulled: "Charizard Base Set Holo",
  },
  {
    id: "p2",
    packTitle: "25th Anniversary Pack",
    packImage: CARD_COLORS[0],
    category: "Pokemon",
    seller: "DripOfficial",
    price: 23,
    quantity: 1,
    purchasedAt: "2026-02-09T17:55:00Z",
    source: "instant-pack",
    cardPulled: "Celebrations Mew",
  },
  {
    id: "p3",
    packTitle: "NBA Prizm Mystery Pack",
    packImage: CARD_COLORS[3],
    category: "Sports",
    seller: "HoopsBreaks",
    price: 30,
    quantity: 2,
    purchasedAt: "2026-02-08T10:45:00Z",
    source: "stream",
    cardPulled: "Luka Doncic Prizm Silver",
  },
  {
    id: "p4",
    packTitle: "Vintage Holo Pack",
    packImage: CARD_COLORS[2],
    category: "Pokemon",
    seller: "RetroCards",
    price: 35,
    quantity: 1,
    purchasedAt: "2026-02-07T09:10:00Z",
    source: "instant-pack",
    cardPulled: "Vintage Holo Blastoise",
  },
  {
    id: "p5",
    packTitle: "One Piece Ultra Rare Pack",
    packImage: CARD_COLORS[4],
    category: "One Piece",
    seller: "AnimeTCG",
    price: 50,
    quantity: 1,
    purchasedAt: "2026-02-05T16:40:00Z",
    source: "stream",
    cardPulled: "One Piece Luffy Manga Rare",
  },
  {
    id: "p6",
    packTitle: "Topps Chrome Baseball Pack",
    packImage: CARD_COLORS[5],
    category: "Sports",
    seller: "DiamondBreaks",
    price: 28,
    quantity: 3,
    purchasedAt: "2026-02-04T19:50:00Z",
    source: "instant-pack",
    cardPulled: "Topps Chrome Yordan Alvarez RC",
  },
  {
    id: "p7",
    packTitle: "PSA 10 Hunt Pack",
    packImage: CARD_COLORS[1],
    category: "Pokemon",
    seller: "SlabKings",
    price: 45,
    quantity: 1,
    purchasedAt: "2026-02-03T13:20:00Z",
    source: "instant-pack",
  },
  {
    id: "p8",
    packTitle: "Football Rookie Chase Pack",
    packImage: CARD_COLORS[8],
    category: "Sports",
    seller: "GridironCards",
    price: 38,
    quantity: 2,
    purchasedAt: "2026-02-01T21:30:00Z",
    source: "stream",
  },
];

// Redemption tracking history
export interface Redemption {
  id: string;
  items: { title: string; grade: string; grader: string; image: string }[];
  status: "processing" | "shipped" | "in-transit" | "delivered";
  requestedAt: string;
  shippedAt?: string;
  deliveredAt?: string;
  trackingNumber?: string;
  carrier?: string;
  shippingCost: number;
  taxCost: number;
  address: string;
}

export const redemptions: Redemption[] = [
  {
    id: "r1",
    items: [
      { title: "One Piece Luffy Manga Rare", grade: "PSA 10", grader: "PSA", image: CARD_COLORS_VAULT[4] },
    ],
    status: "delivered",
    requestedAt: "2026-01-20T10:00:00Z",
    shippedAt: "2026-01-21T15:30:00Z",
    deliveredAt: "2026-01-25T11:00:00Z",
    trackingNumber: "1Z999AA10123456784",
    carrier: "UPS",
    shippingCost: 4.57,
    taxCost: 0.32,
    address: "Los Angeles, CA 90001",
  },
  {
    id: "r2",
    items: [
      { title: "Luka Doncic Prizm Silver", grade: "BGS 9.5", grader: "BGS", image: CARD_COLORS_VAULT[3] },
    ],
    status: "in-transit",
    requestedAt: "2026-02-08T14:00:00Z",
    shippedAt: "2026-02-09T09:00:00Z",
    trackingNumber: "9400111899223100001",
    carrier: "USPS",
    shippingCost: 4.57,
    taxCost: 0.32,
    address: "Los Angeles, CA 90001",
  },
  {
    id: "r3",
    items: [
      { title: "Evolving Skies Rayquaza", grade: "BGS 9", grader: "BGS", image: CARD_COLORS_VAULT[2] },
      { title: "Eevee Heroes Espeon", grade: "PSA 9", grader: "PSA", image: CARD_COLORS_VAULT[1] },
    ],
    status: "shipped",
    requestedAt: "2026-02-10T16:00:00Z",
    shippedAt: "2026-02-11T10:30:00Z",
    trackingNumber: "7489203847561",
    carrier: "FedEx",
    shippingCost: 9.14,
    taxCost: 0.64,
    address: "Los Angeles, CA 90001",
  },
  {
    id: "r4",
    items: [
      { title: "Vivid Voltage Pikachu V", grade: "PSA 8", grader: "PSA", image: CARD_COLORS_VAULT[0] },
    ],
    status: "processing",
    requestedAt: "2026-02-12T08:00:00Z",
    shippingCost: 4.57,
    taxCost: 0.32,
    address: "Los Angeles, CA 90001",
  },
];

// Possible pull results when opening a pack (keyed by category)
export interface PullResult {
  title: string;
  grade: string;
  grader: string;
  estimatedValue: number;
  rarity: "common" | "uncommon" | "rare" | "ultra-rare" | "chase";
  image: string;
}

const rarityWeights: PullResult["rarity"][] = [
  "common", "common", "common",
  "uncommon", "uncommon",
  "rare", "rare",
  "ultra-rare",
  "chase",
];

export const pullResultsByCategory: Record<string, PullResult[]> = {
  Pokemon: [
    { title: "Pikachu VMAX Rainbow", grade: "PSA 10", grader: "PSA", estimatedValue: 180, rarity: "ultra-rare", image: CARD_COLORS[0] },
    { title: "Charizard Base Set Holo", grade: "PSA 8", grader: "PSA", estimatedValue: 420, rarity: "chase", image: CARD_COLORS[0] },
    { title: "Umbreon VMAX Alt Art", grade: "BGS 9.5", grader: "BGS", estimatedValue: 310, rarity: "chase", image: CARD_COLORS[1] },
    { title: "Celebrations Mew", grade: "PSA 10", grader: "PSA", estimatedValue: 85, rarity: "rare", image: CARD_COLORS[1] },
    { title: "Blastoise Base Set Holo", grade: "CGC 9", grader: "CGC", estimatedValue: 195, rarity: "ultra-rare", image: CARD_COLORS[2] },
    { title: "Eevee Heroes Espeon", grade: "PSA 9", grader: "PSA", estimatedValue: 65, rarity: "uncommon", image: CARD_COLORS[6] },
    { title: "Vivid Voltage Pikachu V", grade: "PSA 8", grader: "PSA", estimatedValue: 30, rarity: "common", image: CARD_COLORS[8] },
    { title: "Evolving Skies Rayquaza", grade: "BGS 9", grader: "BGS", estimatedValue: 120, rarity: "rare", image: CARD_COLORS[2] },
  ],
  Sports: [
    { title: "Luka Doncic Prizm Silver", grade: "BGS 9.5", grader: "BGS", estimatedValue: 310, rarity: "chase", image: CARD_COLORS[3] },
    { title: "Ja Morant Mosaic Prizm", grade: "PSA 10", grader: "PSA", estimatedValue: 190, rarity: "ultra-rare", image: CARD_COLORS[3] },
    { title: "Wemby Topps Chrome RC", grade: "PSA 10", grader: "PSA", estimatedValue: 450, rarity: "chase", image: CARD_COLORS[5] },
    { title: "Shohei Ohtani Chrome", grade: "PSA 9", grader: "PSA", estimatedValue: 85, rarity: "rare", image: CARD_COLORS[5] },
    { title: "Tyrese Maxey Prizm RC", grade: "BGS 9", grader: "BGS", estimatedValue: 55, rarity: "uncommon", image: CARD_COLORS[8] },
    { title: "Yordan Alvarez Topps RC", grade: "PSA 9", grader: "PSA", estimatedValue: 75, rarity: "rare", image: CARD_COLORS[5] },
    { title: "Anthony Edwards Hoops RC", grade: "PSA 8", grader: "PSA", estimatedValue: 35, rarity: "common", image: CARD_COLORS[3] },
  ],
  Magic: [
    { title: "Black Lotus (Unlimited)", grade: "BGS 7", grader: "BGS", estimatedValue: 8500, rarity: "chase", image: CARD_COLORS[7] },
    { title: "Force of Will (Alliances)", grade: "PSA 9", grader: "PSA", estimatedValue: 320, rarity: "ultra-rare", image: CARD_COLORS[7] },
    { title: "Ragavan Nimble Pilferer", grade: "PSA 10", grader: "PSA", estimatedValue: 95, rarity: "rare", image: CARD_COLORS[7] },
    { title: "Mox Opal (MM2)", grade: "BGS 9.5", grader: "BGS", estimatedValue: 60, rarity: "uncommon", image: CARD_COLORS[7] },
  ],
  "Yu-Gi-Oh!": [
    { title: "Blue-Eyes White Dragon LOB", grade: "PSA 9", grader: "PSA", estimatedValue: 520, rarity: "chase", image: CARD_COLORS[9] },
    { title: "Dark Magician SDY", grade: "PSA 8", grader: "PSA", estimatedValue: 130, rarity: "rare", image: CARD_COLORS[9] },
    { title: "Starlight Rare Ash Blossom", grade: "PSA 10", grader: "PSA", estimatedValue: 280, rarity: "ultra-rare", image: CARD_COLORS[9] },
    { title: "Ghost Rare Ra", grade: "BGS 9", grader: "BGS", estimatedValue: 65, rarity: "uncommon", image: CARD_COLORS[9] },
  ],
  "One Piece": [
    { title: "Luffy Manga Rare OP01", grade: "PSA 10", grader: "PSA", estimatedValue: 390, rarity: "chase", image: CARD_COLORS[4] },
    { title: "Shanks Manga Rare OP01", grade: "PSA 10", grader: "PSA", estimatedValue: 220, rarity: "ultra-rare", image: CARD_COLORS[4] },
    { title: "Nami Alt Art OP03", grade: "PSA 9", grader: "PSA", estimatedValue: 75, rarity: "rare", image: CARD_COLORS[4] },
    { title: "Zoro Leader OP01", grade: "BGS 9.5", grader: "BGS", estimatedValue: 40, rarity: "uncommon", image: CARD_COLORS[4] },
  ],
  "Dragon Ball Z": [
    { title: "SSJ4 Gogeta SCR", grade: "PSA 10", grader: "PSA", estimatedValue: 350, rarity: "chase", image: CARD_COLORS[6] },
    { title: "Goku Black SPR", grade: "BGS 9.5", grader: "BGS", estimatedValue: 120, rarity: "ultra-rare", image: CARD_COLORS[6] },
    { title: "Vegeta Super Rare", grade: "PSA 9", grader: "PSA", estimatedValue: 55, rarity: "rare", image: CARD_COLORS[6] },
    { title: "Broly Promo", grade: "PSA 8", grader: "PSA", estimatedValue: 25, rarity: "common", image: CARD_COLORS[6] },
  ],
};

export function getRandomPull(category: string): PullResult {
  const pool = pullResultsByCategory[category] ?? pullResultsByCategory["Pokemon"]!;
  const rarity = rarityWeights[Math.floor(Math.random() * rarityWeights.length)];
  const matching = pool.filter((p) => p.rarity === rarity);
  const results = matching.length > 0 ? matching : pool;
  return results[Math.floor(Math.random() * results.length)]!;
}

export const rarityConfig: Record<PullResult["rarity"], { label: string; color: string; glow: string; bg: string }> = {
  common: { label: "Common", color: "text-gray-400", glow: "shadow-gray-400/30", bg: "from-gray-500 to-gray-600" },
  uncommon: { label: "Uncommon", color: "text-green-400", glow: "shadow-green-400/40", bg: "from-green-500 to-emerald-600" },
  rare: { label: "Rare", color: "text-blue-400", glow: "shadow-blue-400/50", bg: "from-blue-500 to-indigo-600" },
  "ultra-rare": { label: "Ultra Rare", color: "text-purple-400", glow: "shadow-purple-500/60", bg: "from-purple-500 to-pink-600" },
  chase: { label: "CHASE HIT", color: "text-yellow-400", glow: "shadow-yellow-400/70", bg: "from-yellow-400 to-orange-500" },
};

export const categories = [
  "All",
  "Pokemon",
  "Sports",
  "Magic",
  "Yu-Gi-Oh!",
  "One Piece",
  "Dragon Ball Z",
];

export const sortOptions = [
  { label: "Trending", value: "trending" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
  { label: "Most Pulls Left", value: "pulls" },
];
