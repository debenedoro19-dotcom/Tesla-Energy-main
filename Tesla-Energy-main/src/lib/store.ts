"use client";

import {
  Appointment,
  InventoryItem,
  Testimonial,
  SiteSettings,
  InvestmentPackage,
  PaymentMethod,
  PortfolioItem,
  Giveaway,
  Order,
  User,
  ChatMessage,
} from "./types";
import { supabase, isSupabaseConfigured } from "./supabase";

const KEYS = {
  appointments: "tesla_admin_appointments",
  inventory: "tesla_admin_inventory",
  testimonials: "tesla_admin_testimonials",
  settings: "tesla_admin_settings",
  investments: "tesla_admin_investments",
  payments: "tesla_admin_payments",
  portfolio: "tesla_admin_portfolio",
  giveaways: "tesla_admin_giveaways",
  orders: "tesla_admin_orders",
  users: "tesla_admin_users",
  session: "tesla_user_session",
  chat: "tesla_admin_chat",
};

const now = () => new Date().toISOString();

// ---------- Expanded Inventory ----------
const seedInventory: InventoryItem[] = [
    {
    id: "inv-1",
    title: "2026 Tesla Cybertruck AWD",
    category: "Vehicles",
    price: 71985,
    status: "available",
    description: "Dual-motor all-wheel-drive Cybertruck. 123 kWh 800V battery, 11,000 lb towing, stainless steel exoskeleton. FSD available via $99/mo subscription.",
    image: "https://www.image2url.com/r2/default/images/1786470159783-66a72a4e-020d-4781-a285-56cfcf1a2b38.blob?width=800&height=600&quality=70",
    createdAt: now(),
  },
  {
    id: "inv-2",
    title: "2026 Tesla Cybertruck Cyberbeast",
    category: "Vehicles",
    price: 104990,
    status: "available",
    description: "Tri-motor AWD flagship. 0-60 in 2.6s. 123 kWh 800V battery, 11,000 lb towing capacity. Top-of-range performance trim.",
    image: "https://www.image2url.com/r2/default/images/1786467144191-aeb03775-b5c0-482a-9020-b76d899a9d4c.blob?width=800&height=600&quality=70",
    createdAt: now(),
  },
  {
    id: "inv-3",
    title: "Certified Pre-Owned Model S Plaid",
    category: "Vehicles",
    price: 89990,
    status: "available",
    description: "Tri-motor AWD, 1,020 hp, 0-60 in 1.99s. Model S ended production in 2026, so this CPO unit includes Tesla's remaining battery/drive-unit warranty.",
    image: "https://www.image2url.com/r2/default/images/1786467465504-c13a5c2b-73d4-4f7d-8a7f-6063ffe708e4.blob?width=800&height=600&quality=70",
    createdAt: now(),
  },
  {
    id: "inv-4",
    title: "Certified Pre-Owned Model S Long Range",
    category: "Vehicles",
    price: 76990,
    status: "available",
    description: "Dual motor AWD, up to 405 miles range. Final-production-year Model S; premium interior, low mileage.",
    image: "https://www.image2url.com/r2/default/images/1786467918542-c6e31958-4c69-4d12-ae40-f2c9189cdc3d.blob?width=800&height=600&quality=70",
    createdAt: now(),
  },
  {
    id: "inv-5",
    title: "2026 Model 3 Performance",
    category: "Vehicles",
    price: 54990,
    status: "available",
    description: "Adaptive dampers, track mode, carbon spoiler. 0-60 in 2.9s. Dual-motor AWD with ~300+ mile EPA range.",
    image: "https://www.image2url.com/r2/default/images/1786468500259-9f34cfb5-8898-4b28-ab29-d62f9e6931f8.blob?width=800&height=600&quality=70",
    createdAt: now(),
  },
  {
    id: "inv-6",
    title: "2026 Model 3 Long Range AWD",
    category: "Vehicles",
    price: 47990,
    status: "available",
    description: "Dual motor AWD. ~80 kWh battery, up to 363 miles EPA range on the Premium RWD spec sheet. Ventilated seats.",
    image: "https://www.image2url.com/r2/default/images/1786468905092-ae11a824-4b4f-4db1-8a01-6d6f939af804.blob?width=800&height=600&quality=70",
    createdAt: now(),
  },
  {
    id: "inv-7",
    title: "2026 Model 3 Standard",
    category: "Vehicles",
    price: 36990,
    status: "available",
    description: "Entry Model 3. Single-motor RWD, ~70 kWh battery. Most affordable new Tesla; over 300 miles EPA range.",
    image: "https://www.image2url.com/r2/default/images/1786469794686-f2dc9c68-8c30-4774-8a10-f07dcc190f0e.blob?width=800&height=600&quality=70",
    createdAt: now(),
  },
  {
    id: "inv-8",
    title: "Certified Pre-Owned Model X Plaid",
    category: "Vehicles",
    price: 104990,
    status: "available",
    description: "Tri-motor SUV. Falcon Wing doors, seats 6, 0-60 in 2.5s. Model X ended production in 2026 — sold here as CPO.",
    image: "https://www.image2url.com/r2/default/images/1786470504405-a2341c61-81d2-4bb6-a7ae-c510d6c187c4.blob?width=800&height=600&quality=70",
    createdAt: now(),
  },
  {
    id: "inv-9",
    title: "Certified Pre-Owned Model X Long Range",
    category: "Vehicles",
    price: 82990,
    status: "available",
    description: "Dual motor AWD, up to 348 miles. Premium 6- or 7-seat configuration. Final-production-year unit.",
    image: "https://www.image2url.com/r2/default/images/1786471172196-72133d3d-1d83-4cc5-8566-b78ae85f9c03.blob?width=800&height=600&quality=70",
    createdAt: now(),
  },
  {
    id: "inv-10",
    title: "2026 Model Y Performance",
    category: "Vehicles",
    price: 57990,
    status: "available",
    description: "Adaptive suspension, 0-60 in 3.5s. Best-selling EV crossover, now with the 2026 Juniper-refresh interior.",
    image: "https://www.image2url.com/r2/default/images/1786484400051-37ad3aa2-b312-4303-bc1b-4f00ac6efd57.blob?width=800&height=600&quality=70",
    createdAt: now(),
  },
  {
    id: "inv-11",
    title: "2026 Model Y Premium AWD",
    category: "Vehicles",
    price: 49990,
    status: "available",
    description: "Dual motor AWD (Tesla's renamed \"Long Range\" trim). 320+ mile range, spacious cargo, family favorite.",
    image: "https://www.image2url.com/r2/default/images/1786471703882-4a35c159-0cdb-442b-84c7-84bf7144c02e.blob?width=800&height=600&quality=70",
    createdAt: now(),
  },
  {
    id: "inv-12",
    title: "2026 Model Y Standard RWD",
    category: "Vehicles",
    price: 39990,
    status: "available",
    description: "Entry Model Y. Excellent efficiency and value. Full Tesla software suite, FSD available by subscription.",
    image: "https://www.image2url.com/r2/default/images/1786485855509-c43954e6-a8d1-4ddf-845a-63db1071dff0.blob?width=800&height=600&quality=70",
    createdAt: now(),
  },
  {
    id: "inv-13",
    title: "Certified Pre-Owned Model S Dual Motor",
    category: "Vehicles",
    price: 71990,
    status: "available",
    description: "Earlier-generation Long Range Model S. Excellent condition, full service history. Discontinued model, CPO warranty applies.",
    image: "https://www.image2url.com/r2/default/images/1786486264740-be302a34-3436-4ba7-9eba-b7789b768110.blob?width=800&height=600&quality=70",
    createdAt: now(),
  },
  {
    id: "inv-14",
    title: "Certified Pre-Owned Model 3 2023",
    category: "Vehicles",
    price: 29990,
    status: "available",
    description: "Tesla CPO. Remaining battery & drive-unit warranty. Low miles, pre-Highland-refresh body style.",
    image: "https://www.image2url.com/r2/default/images/1786486681258-059b42b8-42cf-4906-b974-66c3bcbc1e0e.blob?width=800&height=600&quality=70",
    createdAt: now(),
  },
  {
    id: "inv-15",
    title: "2026 Cybertruck Premium",
    category: "Vehicles",
    price: 89990,
    status: "available",
    description: "Mid-tier Cybertruck trim between base AWD and Cyberbeast. Dual-motor, 123 kWh 800V battery, full luxury interior package.",
    image: "https://www.image2url.com/r2/default/images/1786487232455-c12686a6-bbea-42c5-95ca-8fd99e9e8029.blob?width=800&height=600&quality=70",
    createdAt: now(),
  },
 
  // ===== ENERGY (2026 installed pricing — federal 30% ITC expired Dec 31, 2025) =====
  {
    id: "inv-20",
    title: "Tesla Powerwall 3 – 13.5 kWh",
    category: "Energy",
    price: 15800,
    status: "available",
    description: "Integrated solar inverter, 11.5 kW continuous power. Fully installed 2026 pricing (no federal tax credit applied). Scalable with expansion packs.",
    image: "https://www.image2url.com/r2/default/images/1786508113941-26d5cf06-c53c-4d52-9c5d-d917f000acdb.blob?width=800&height=600&quality=70",
    createdAt: now(),
  },
  {
    id: "inv-21",
    title: "Tesla Powerwall 3 – Two-Unit System",
    category: "Energy",
    price: 25500,
    status: "available",
    description: "Two Powerwall 3 units, 27 kWh combined, for extended whole-home backup. Shared installation labor and permitting.",
    image: "https://www.image2url.com/r2/default/images/1786508442775-f607fe3b-f58b-4d70-bd4d-675235092260.blob?width=800&height=600&quality=70",
    createdAt: now(),
  },
  {
    id: "inv-22",
    title: "Tesla Solar Roof – 10 kW System",
    category: "Energy",
    price: 44000,
    status: "available",
    description: "Complete Solar Roof installation. Aesthetic glass tiles, Powerwall-compatible. Federal solar tax credit no longer applies as of 2026.",
    image: "https://images.pexels.com/photos/35237908/pexels-photo-35237908.jpeg?auto=compress&cs=tinysrgb&w=800",
    createdAt: now(),
  },
  {
    id: "inv-23",
    title: "Tesla Solar Panels – 8.16 kW",
    category: "Energy",
    price: 17800,
    status: "available",
    description: "High-efficiency black solar panels. Includes inverter and monitoring app access.",
    image: "https://www.image2url.com/r2/default/images/1786508740989-80d99815-2afa-4f81-b71c-f4385b734913.blob?width=800&height=600&quality=70",
    createdAt: now(),
  },
  {
    id: "inv-24",
    title: "Tesla Solar Panels – 12.24 kW",
    category: "Energy",
    price: 27500,
    status: "available",
    description: "Larger residential array for high-consumption homes. Maximum production configuration.",
    image: "https://www.image2url.com/r2/default/images/1786509520959-1a1ca655-7e0e-4a37-89b6-f24bf7c61c16.blob?width=800&height=600&quality=70",
    createdAt: now(),
  },
  {
    id: "inv-25",
    title: "Tesla Megapack 2XL (Commercial)",
    category: "Energy",
    price: 1250000,
    status: "pending",
    description: "Utility-scale battery storage, 3.9 MWh per unit. For commercial and grid-scale applications; pricing quoted per project.",
    image: "https://images.pexels.com/photos/36085816/pexels-photo-36085816.jpeg?auto=compress&cs=tinysrgb&w=800",
    createdAt: now(),
  },
  {
    id: "inv-26",
    title: "Powerwall + Solar Bundle",
    category: "Energy",
    price: 32500,
    status: "available",
    description: "8 kW solar array + single Powerwall 3, installed together. Turnkey energy-independence package; bundled install saves on shared labor/permitting.",
    image: "https://www.image2url.com/r2/default/images/1786509046439-ee327ac0-8c46-43c8-97d5-5ef17e381c2f.blob?width=800&height=600&quality=70",
    createdAt: now(),
  },
  {
    id: "inv-27",
    title: "Tesla Wall Connector",
    category: "Energy",
    price: 475,
    status: "available",
    description: "Official home charging unit. Up to 44 miles of range per hour. Gen 3, Wi-Fi connected.",
    image: "https://www.image2url.com/r2/default/images/1786509753260-e54a4421-d683-4000-aa23-1a60f6a4e2e5.blob?width=800&height=600&quality=70",
    createdAt: now(),
  },
 
  // ===== ROBOTICS (Optimus pricing remains speculative/limited-allocation) =====
  {
    id: "inv-30",
    title: "Optimus Gen 2 – Early Access Unit",
    category: "Robotics",
    price: 35000,
    status: "pending",
    description: "Limited early-access humanoid. Advanced dexterity, vision, and bipedal walking. Allocation-based, not general retail.",
    image: "https://www.image2url.com/r2/default/images/1786510420129-bc62cead-ac7d-4e73-8440-6ab14be72b0f.blob?width=800&height=600&quality=70",
    createdAt: now(),
  },
  {
    id: "inv-31",
    title: "Optimus Gen 2 – Production Allocation",
    category: "Robotics",
    price: 28000,
    status: "available",
    description: "Reserved production slot for the first commercial Optimus deployment wave.",
    image: "https://images.pexels.com/photos/8566474/pexels-photo-8566474.jpeg?auto=compress&cs=tinysrgb&w=800",
    createdAt: now(),
  },
  {
    id: "inv-32",
    title: "Tesla Bot – Research Prototype Access",
    category: "Robotics",
    price: 75000,
    status: "pending",
    description: "Exclusive research-partnership access. Includes training-data package for approved institutional partners.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=70",
    createdAt: now(),
  },
  {
    id: "inv-33",
    title: "Optimus End-Effector Toolkit",
    category: "Robotics",
    price: 4500,
    status: "available",
    description: "Specialized hands and interchangeable tools for industrial Optimus deployments.",
    image: "https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?auto=format&fit=crop&w=800&q=70",
    createdAt: now(),
  },
  {
    id: "inv-34",
    title: "Autonomous Factory Robot Package",
    category: "Robotics",
    price: 120000,
    status: "available",
    description: "Multi-unit industrial automation package pairing robotic arms with Tesla's automation software stack.",
    image: "https://images.pexels.com/photos/34207359/pexels-photo-34207359.jpeg?auto=compress&cs=tinysrgb&w=800",
    createdAt: now(),
  },
];
const seedAppointments: Appointment[] = [
  {
    id: "apt-1",
    name: "James Carter",
    email: "james.carter@email.com",
    phone: "+1 415 555 0192",
    preferredDate: "2026-08-15",
    format: "Virtual",
    status: "pending",
    notes: "Interested in large energy investment + Optimus early access",
    createdAt: now(),
  },
  {
    id: "apt-2",
    name: "Sarah Mitchell",
    email: "s.mitchell@corp.com",
    phone: "+44 20 7946 0958",
    preferredDate: "2026-08-20",
    format: "In-Person",
    status: "approved",
    notes: "High net-worth, wants private discussion on Tesla ecosystem",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

const seedTestimonials: Testimonial[] = [
  { id: "tes-1", name: "Robert Wilson", role: "Investment Manager · London, UK", quote: "The real-time pricing and secure marketplace made trading Tesla inventory seamless. Highly recommend.", rating: 5, approved: true, avatar: "https://i.pravatar.cc/150?u=robert-wilson-tesla", createdAt: now() },
  { id: "tes-2", name: "Jennifer Taylor", role: "Tech Entrepreneur · New York, US", quote: "Early access to robotics listings has been a game changer for my portfolio.", rating: 5, approved: true, avatar: "https://i.pravatar.cc/150?u=jennifer-taylor-tesla", createdAt: now() },
  { id: "tes-3", name: "Paul Davies", role: "Energy Consultant · Manchester, UK", quote: "From Powerwall to vehicles, everything is verified and the support is outstanding.", rating: 5, approved: true, avatar: "https://i.pravatar.cc/150?u=paul-davies-tesla", createdAt: now() },
  { id: "tes-4", name: "Amanda Stewart", role: "Business Owner · California, US", quote: "Zero friction trading experience. Exactly what the market needed for Tesla ecosystem assets.", rating: 5, approved: true, avatar: "https://i.pravatar.cc/150?u=amanda-stewart-tesla", createdAt: now() },
  { id: "tes-5", name: "Christopher Brown", role: "Financial Advisor · Edinburgh, UK", quote: "Professional, secure, and the live market data is incredibly useful for timing entries.", rating: 5, approved: true, avatar: "https://i.pravatar.cc/150?u=chris-brown-tesla", createdAt: now() },
  { id: "tes-6", name: "Michelle Garcia", role: "Property Developer · Texas, US", quote: "The VIP membership and private sessions opened doors I didn’t expect. Worth every penny.", rating: 5, approved: true, avatar: "https://i.pravatar.cc/150?u=michelle-garcia-tesla", createdAt: now() },
];

const seedInvestments: InvestmentPackage[] = [
  {
    id: "invp-1",
    name: "Starter Energy",
    minAmount: 5000,
    expectedReturn: "8–12% p.a.",
    duration: "12 months",
    description: "Entry-level package focused on Tesla energy products and Powerwall allocations.",
    features: ["Powerwall priority access", "Quarterly reports", "Email support"],
    highlighted: false,
    active: true,
    createdAt: now(),
  },
  {
    id: "invp-2",
    name: "Growth Portfolio",
    minAmount: 25000,
    expectedReturn: "12–18% p.a.",
    duration: "24 months",
    description: "Balanced exposure across vehicles, energy systems and early robotics.",
    features: ["Mixed asset allocation", "Monthly performance reports", "Priority support", "VIP webinar access"],
    highlighted: true,
    active: true,
    createdAt: now(),
  },
  {
    id: "invp-3",
    name: "Private Elite",
    minAmount: 100000,
    expectedReturn: "Custom",
    duration: "36+ months",
    description: "Bespoke high-net-worth package with private session eligibility and Optimus early access.",
    features: ["Dedicated account manager", "Private Elon session eligibility", "Optimus allocation priority", "Custom reporting"],
    highlighted: false,
    active: true,
    createdAt: now(),
  },
];

const seedPayments: PaymentMethod[] = [
  { id: "pay-1", name: "Bank Wire Transfer", type: "Bank", details: "USD · SWIFT available", instructions: "Contact support after selecting this method. Full banking details will be provided securely.", active: true, createdAt: now() },
  { id: "pay-2", name: "Cryptocurrency", type: "Crypto", details: "USDT (TRC20 / ERC20) · BTC", instructions: "Send only to the wallet address provided after your application is approved. Always verify the address.", active: true, createdAt: now() },
  { id: "pay-3", name: "Credit / Debit Card", type: "Card", details: "Visa · Mastercard", instructions: "Card payments are processed through a secure payment partner. Fees may apply.", active: true, createdAt: now() },
];

const seedPortfolio: PortfolioItem[] = [
  { id: "port-1", name: "Tesla Inc", symbol: "TSLA", value: "$319.53", change: "−0.63%", changeUp: false, allocation: "32%", createdAt: now() },
  { id: "port-2", name: "Energy Systems", symbol: "PWR", value: "$1.2M", change: "+4.1%", changeUp: true, allocation: "28%", createdAt: now() },
  { id: "port-3", name: "Robotics Allocation", symbol: "OPT", value: "$890K", change: "+11.4%", changeUp: true, allocation: "22%", createdAt: now() },
  { id: "port-4", name: "Cash / Reserves", symbol: "USD", value: "$540K", change: "0.0%", changeUp: true, allocation: "18%", createdAt: now() },
];

const seedGiveaways: Giveaway[] = [
  {
    id: "gw-1",
    title: "Win a 2025 Model 3 Long Range",
    prize: "2025 Tesla Model 3 Long Range AWD",
    description: "Enter for a chance to win a brand new Model 3 Long Range. One winner will be selected after the campaign ends. Includes standard delivery within the continental US.",
    endDate: "2026-12-31",
    entryFee: "Free with any inventory inquiry",
    maxEntries: 5000,
    currentEntries: 1247,
    active: true,
    createdAt: now(),
  },
  {
    id: "gw-2",
    title: "Cybertruck Experience Weekend",
    prize: "Weekend Cybertruck rental + $2,000 credit",
    description: "Win a full weekend with a Cybertruck Foundation Series plus a $2,000 platform credit toward any purchase.",
    endDate: "2026-10-15",
    entryFee: "$25 entry",
    maxEntries: 2000,
    currentEntries: 683,
    active: true,
    createdAt: now(),
  },
];

const defaultSettings: SiteSettings = {
  heroTitle: "Trade Tesla Tomorrow",
  heroSubtitle: "Buy and sell Tesla vehicles, robots, and energy products on the most secure fintech marketplace. Zero friction. Maximum opportunity.",
  tradingVolume: "2.4T+",
  activeTraders: "50K+",
  uptime: "99.9%",
  appointmentFee: "$50,000",
  inventoryTitle: "Live Inventory",
  inventorySubtitle: "Verified Tesla vehicles, energy systems and robotics available now",
  marketTitle: "Live Market Data",
  marketSubtitle: "Real-time prices powered by institutional-grade feeds",
  visionTitle: "The Future Is Now",
  visionSubtitle: "Beyond Earth. Beyond Limits.",
  vipTitle: "Book a Private Session with Elon Musk",
  vipSubtitle: "Discuss investment opportunities, the Tesla ecosystem, and the future of energy, robotics, and space in a private 30-minute session.",
  testimonialsTitle: "Trusted by Traders Worldwide",
  testimonialsSubtitle: "Join thousands of satisfied users from the UK, US, and beyond",
  contactTitle: "Powering Tomorrow’s Wealth, Energy & Innovation",
  contactSubtitle: "Invest smarter. Drive the future. Build sustainable energy.",
  investmentsTitle: "Investment Packages",
  investmentsSubtitle: "Choose the allocation that matches your goals and risk appetite",
  paymentsTitle: "Accepted Payment Methods",
  paymentsSubtitle: "Secure and flexible ways to fund your investments and purchases",
  portfolioTitle: "Platform Portfolio Snapshot",
  portfolioSubtitle: "Illustrative allocation across the Tesla ecosystem",
  giveawayTitle: "Tesla Giveaways",
  giveawaySubtitle: "Enter for a chance to win vehicles and exclusive experiences",
  whatsappNumber: "+2348100000000",
  supportEmail: "support@teslatrade.com",
  adminPassword: "tesla2026",
};

function loadLocal<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    const parsed = JSON.parse(raw) as T;
    // Auto-upgrade inventory / testimonials if old limited or missing avatars
    if (key === KEYS.inventory && Array.isArray(parsed) && Array.isArray(fallback)) {
      if ((parsed as any[]).length < (fallback as any[]).length) {
        localStorage.setItem(key, JSON.stringify(fallback));
        return fallback;
      }
    }
    if (key === KEYS.testimonials && Array.isArray(parsed) && Array.isArray(fallback)) {
      const hasAvatar = (parsed as any[]).some((t) => t.avatar);
      if (!hasAvatar || (parsed as any[]).length < (fallback as any[]).length) {
        localStorage.setItem(key, JSON.stringify(fallback));
        return fallback;
      }
    }
    return parsed;
  } catch {
    return fallback;
  }
}

function saveLocal<T>(key: string, data: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
}

export function generateId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export const store = {
  // Appointments
  async getAppointments(): Promise<Appointment[]> {
    return loadLocal(KEYS.appointments, seedAppointments);
  },
  async addAppointment(apt: Omit<Appointment, "id" | "createdAt">) {
    const newApt: Appointment = { ...apt, id: generateId("apt"), createdAt: now() };
    const current = loadLocal(KEYS.appointments, seedAppointments);
    saveLocal(KEYS.appointments, [newApt, ...current]);
    return newApt;
  },
  async updateAppointment(id: string, updates: Partial<Appointment>) {
    const current = loadLocal(KEYS.appointments, seedAppointments);
    saveLocal(KEYS.appointments, current.map((a) => (a.id === id ? { ...a, ...updates } : a)));
  },
  async deleteAppointment(id: string) {
    const current = loadLocal(KEYS.appointments, seedAppointments);
    saveLocal(KEYS.appointments, current.filter((a) => a.id !== id));
  },

  // Inventory
  async getInventory(): Promise<InventoryItem[]> {
    return loadLocal(KEYS.inventory, seedInventory);
  },
  async addInventoryItem(item: Omit<InventoryItem, "id" | "createdAt"> & { image?: string }) {
    const newItem: InventoryItem = { ...item, id: generateId("inv"), createdAt: now() };
    const current = loadLocal(KEYS.inventory, seedInventory);
    saveLocal(KEYS.inventory, [newItem, ...current]);
    return newItem;
  },
  async updateInventoryItem(id: string, updates: Partial<InventoryItem>) {
    const current = loadLocal(KEYS.inventory, seedInventory);
    saveLocal(KEYS.inventory, current.map((i) => (i.id === id ? { ...i, ...updates } : i)));
  },
  async deleteInventoryItem(id: string) {
    const current = loadLocal(KEYS.inventory, seedInventory);
    saveLocal(KEYS.inventory, current.filter((i) => i.id !== id));
  },

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return loadLocal(KEYS.testimonials, seedTestimonials);
  },
  async addTestimonial(t: Omit<Testimonial, "id" | "createdAt"> & { avatar?: string }) {
    const newItem: Testimonial = { ...t, id: generateId("tes"), createdAt: now() };
    const current = loadLocal(KEYS.testimonials, seedTestimonials);
    saveLocal(KEYS.testimonials, [newItem, ...current]);
    return newItem;
  },
  async updateTestimonial(id: string, updates: Partial<Testimonial>) {
    const current = loadLocal(KEYS.testimonials, seedTestimonials);
    saveLocal(KEYS.testimonials, current.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  },
  async deleteTestimonial(id: string) {
    const current = loadLocal(KEYS.testimonials, seedTestimonials);
    saveLocal(KEYS.testimonials, current.filter((t) => t.id !== id));
  },

  // Investments
  async getInvestments(): Promise<InvestmentPackage[]> {
    return loadLocal(KEYS.investments, seedInvestments);
  },
  async addInvestment(item: Omit<InvestmentPackage, "id" | "createdAt">) {
    const newItem: InvestmentPackage = { ...item, id: generateId("invp"), createdAt: now() };
    const current = loadLocal(KEYS.investments, seedInvestments);
    saveLocal(KEYS.investments, [newItem, ...current]);
    return newItem;
  },
  async updateInvestment(id: string, updates: Partial<InvestmentPackage>) {
    const current = loadLocal(KEYS.investments, seedInvestments);
    saveLocal(KEYS.investments, current.map((i) => (i.id === id ? { ...i, ...updates } : i)));
  },
  async deleteInvestment(id: string) {
    const current = loadLocal(KEYS.investments, seedInvestments);
    saveLocal(KEYS.investments, current.filter((i) => i.id !== id));
  },

  // Payments
  async getPayments(): Promise<PaymentMethod[]> {
    return loadLocal(KEYS.payments, seedPayments);
  },
  async addPayment(item: Omit<PaymentMethod, "id" | "createdAt">) {
    const newItem: PaymentMethod = { ...item, id: generateId("pay"), createdAt: now() };
    const current = loadLocal(KEYS.payments, seedPayments);
    saveLocal(KEYS.payments, [newItem, ...current]);
    return newItem;
  },
  async updatePayment(id: string, updates: Partial<PaymentMethod>) {
    const current = loadLocal(KEYS.payments, seedPayments);
    saveLocal(KEYS.payments, current.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  },
  async deletePayment(id: string) {
    const current = loadLocal(KEYS.payments, seedPayments);
    saveLocal(KEYS.payments, current.filter((p) => p.id !== id));
  },

  // Portfolio
  async getPortfolio(): Promise<PortfolioItem[]> {
    return loadLocal(KEYS.portfolio, seedPortfolio);
  },
  async addPortfolioItem(item: Omit<PortfolioItem, "id" | "createdAt">) {
    const newItem: PortfolioItem = { ...item, id: generateId("port"), createdAt: now() };
    const current = loadLocal(KEYS.portfolio, seedPortfolio);
    saveLocal(KEYS.portfolio, [newItem, ...current]);
    return newItem;
  },
  async updatePortfolioItem(id: string, updates: Partial<PortfolioItem>) {
    const current = loadLocal(KEYS.portfolio, seedPortfolio);
    saveLocal(KEYS.portfolio, current.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  },
  async deletePortfolioItem(id: string) {
    const current = loadLocal(KEYS.portfolio, seedPortfolio);
    saveLocal(KEYS.portfolio, current.filter((p) => p.id !== id));
  },

  // Giveaways
  async getGiveaways(): Promise<Giveaway[]> {
    return loadLocal(KEYS.giveaways, seedGiveaways);
  },
  async addGiveaway(item: Omit<Giveaway, "id" | "createdAt">) {
    const newItem: Giveaway = { ...item, id: generateId("gw"), createdAt: now() };
    const current = loadLocal(KEYS.giveaways, seedGiveaways);
    saveLocal(KEYS.giveaways, [newItem, ...current]);
    return newItem;
  },
  async updateGiveaway(id: string, updates: Partial<Giveaway>) {
    const current = loadLocal(KEYS.giveaways, seedGiveaways);
    saveLocal(KEYS.giveaways, current.map((g) => (g.id === id ? { ...g, ...updates } : g)));
  },
  async deleteGiveaway(id: string) {
    const current = loadLocal(KEYS.giveaways, seedGiveaways);
    saveLocal(KEYS.giveaways, current.filter((g) => g.id !== id));
  },

  // Settings

  // Orders (product / investment / giveaway applications)
  async getOrders(): Promise<Order[]> {
    return loadLocal(KEYS.orders, [] as Order[]);
  },
  async addOrder(item: Omit<Order, "id" | "createdAt">) {
    const newItem: Order = { ...item, id: generateId("ord"), createdAt: now() };
    const current = loadLocal(KEYS.orders, [] as Order[]);
    saveLocal(KEYS.orders, [newItem, ...current]);
    return newItem;
  },
  async updateOrder(id: string, updates: Partial<Order>) {
    const current = loadLocal(KEYS.orders, [] as Order[]);
    saveLocal(KEYS.orders, current.map((o) => (o.id === id ? { ...o, ...updates } : o)));
  },
  async deleteOrder(id: string) {
    const current = loadLocal(KEYS.orders, [] as Order[]);
    saveLocal(KEYS.orders, current.filter((o) => o.id !== id));
  },


  // Users & Auth
  getUsers(): User[] {
    return loadLocal(KEYS.users, [] as User[]);
  },
  saveUsers(users: User[]) {
    saveLocal(KEYS.users, users);
  },
  registerUser(data: { name: string; email: string; phone: string; password: string }): { ok: boolean; error?: string; user?: User } {
    const users = loadLocal(KEYS.users, [] as User[]);
    if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { ok: false, error: "An account with this email already exists." };
    }
    const user: User = {
      id: generateId("usr"),
      name: data.name,
      email: data.email.toLowerCase(),
      phone: data.phone,
      password: data.password,
      role: "user",
      status: "active",
      createdAt: now(),
      kycStatus: "none",
    };
    saveLocal(KEYS.users, [user, ...users]);
    return { ok: true, user };
  },
  loginUser(email: string, password: string): { ok: boolean; error?: string; user?: User } {
    const users = loadLocal(KEYS.users, [] as User[]);
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) return { ok: false, error: "No account found with this email." };
    if (user.password !== password) return { ok: false, error: "Incorrect password." };
    if (user.status === "suspended") return { ok: false, error: "This account has been suspended. Contact support." };
    const updated = { ...user, lastLogin: now() };
    saveLocal(KEYS.users, users.map((u) => (u.id === user.id ? updated : u)));
    if (typeof window !== "undefined") {
      sessionStorage.setItem(KEYS.session, JSON.stringify({ id: updated.id, email: updated.email, name: updated.name, role: updated.role }));
    }
    return { ok: true, user: updated };
  },
  getSession(): { id: string; email: string; name: string; role: string } | null {
    if (typeof window === "undefined") return null;
    try {
      const raw = sessionStorage.getItem(KEYS.session);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  logoutUser() {
    if (typeof window !== "undefined") sessionStorage.removeItem(KEYS.session);
  },
  updateUser(id: string, updates: Partial<User>) {
    const users = loadLocal(KEYS.users, [] as User[]);
    saveLocal(KEYS.users, users.map((u) => (u.id === id ? { ...u, ...updates } : u)));
  },
  deleteUser(id: string) {
    const users = loadLocal(KEYS.users, [] as User[]);
    saveLocal(KEYS.users, users.filter((u) => u.id !== id));
  },
  getOrdersByEmail(email: string): Order[] {
    const orders = loadLocal(KEYS.orders, [] as Order[]);
    return orders.filter((o) => o.email.toLowerCase() === email.toLowerCase());
  },
  getAppointmentsByEmail(email: string) {
    const apts = loadLocal(KEYS.appointments, [] as any[]);
    return apts.filter((a: any) => (a.email || "").toLowerCase() === email.toLowerCase());
  },


  // Chat
  getChatMessages(): ChatMessage[] {
    return loadLocal(KEYS.chat, [] as ChatMessage[]);
  },
  addChatMessage(msg: Omit<ChatMessage, "id" | "createdAt" | "read">) {
    const newMsg: ChatMessage = {
      ...msg,
      id: generateId("chat"),
      read: msg.from === "support",
      createdAt: now(),
    };
    const current = loadLocal(KEYS.chat, [] as ChatMessage[]);
    saveLocal(KEYS.chat, [...current, newMsg]);
    return newMsg;
  },
  markChatRead(sessionId: string) {
    const current = loadLocal(KEYS.chat, [] as ChatMessage[]);
    saveLocal(
      KEYS.chat,
      current.map((m) =>
        m.sessionId === sessionId && m.from === "user" ? { ...m, read: true } : m
      )
    );
  },
  getChatSessions(): { sessionId: string; name: string; email: string; lastMessage: string; unread: number; updatedAt: string }[] {
    const msgs = loadLocal(KEYS.chat, [] as ChatMessage[]);
    const map = new Map<string, { sessionId: string; name: string; email: string; lastMessage: string; unread: number; updatedAt: string }>();
    for (const m of msgs) {
      const existing = map.get(m.sessionId);
      if (!existing) {
        map.set(m.sessionId, {
          sessionId: m.sessionId,
          name: m.name,
          email: m.email,
          lastMessage: m.message,
          unread: m.from === "user" && !m.read ? 1 : 0,
          updatedAt: m.createdAt,
        });
      } else {
        existing.lastMessage = m.message;
        existing.updatedAt = m.createdAt;
        if (m.from === "user" && !m.read) existing.unread += 1;
      }
    }
    return Array.from(map.values()).sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
  },

  // KYC
  submitKyc(userId: string, data: { kycFullName: string; kycIdType: string; kycIdNumber: string; kycCountry: string; kycAddress: string }) {
    this.updateUser(userId, {
      ...data,
      kycStatus: "pending",
      kycSubmittedAt: now(),
      kycNotes: "",
    });
  },
  reviewKyc(userId: string, status: "approved" | "rejected", notes?: string) {
    this.updateUser(userId, { kycStatus: status, kycNotes: notes || "" });
  },

  getSettings(): SiteSettings {
    const s = loadLocal(KEYS.settings, defaultSettings);
    // Ensure new fields exist for older localStorage data
    return { ...defaultSettings, ...s };
  },
  saveSettings(data: SiteSettings) {
    saveLocal(KEYS.settings, data);
  },
  getAdminPassword(): string {
    const s = this.getSettings();
    return s.adminPassword || "tesla2026";
  },
  setAdminPassword(newPassword: string) {
    const s = this.getSettings();
    s.adminPassword = newPassword;
    this.saveSettings(s);
  },

  resetAll() {
    saveLocal(KEYS.appointments, seedAppointments);
    saveLocal(KEYS.inventory, seedInventory);
    saveLocal(KEYS.testimonials, seedTestimonials);
    saveLocal(KEYS.investments, seedInvestments);
    saveLocal(KEYS.payments, seedPayments);
    saveLocal(KEYS.portfolio, seedPortfolio);
    saveLocal(KEYS.giveaways, seedGiveaways);
    saveLocal(KEYS.orders, []);
    saveLocal(KEYS.chat, []);
    saveLocal(KEYS.settings, defaultSettings);
  },
};
