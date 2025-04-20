// Swap related static data
import { WalletInfo, PaymentMethodOption } from "./types";
import type { CurrencyRateInfo } from "./types"; // Add type import

// --- Constants ---
export const KES_PER_USD = 128.55;

// --- Currency Rates ---
// Using CurrencyRateInfo union type from types.ts
export const currencyRates: { [key: string]: CurrencyRateInfo } = {
  // Mobile Money / Fiat (Direct Rate relative to USD for simplicity)
  MPESA: {
    symbol: "KSh",
    name: "Kenyan Shilling",
    rate: 128.55,
    type: "mobile",
  },
  EVC: { symbol: "$", name: "EVC Plus (USD)", rate: 1.0, type: "mobile" },
  EDAHAB: { symbol: "$", name: "eDahab (USD)", rate: 1.0, type: "mobile" },
  ZAAD: { symbol: "$", name: "ZAAD (USD)", rate: 1.0, type: "mobile" },
  SAHAL: { symbol: "$", name: "SAHAL (USD)", rate: 1.0, type: "mobile" },

  // Crypto (Rate is USD value per 1 unit of Crypto)
  // CORRECTED ENTRIES:
  "USDT-TRC20": {
    symbol: "USDT", // Correct symbol
    name: "Tether (TRON)",
    type: "crypto",
    rateUSD: 1.0001, // Correct rate under rateUSD
  },
  "USDT-BEP20": {
    symbol: "USDT", // Correct symbol
    name: "Tether (BSC)",
    type: "crypto",
    rateUSD: 1.0, // Correct rate under rateUSD
  },
  "USDC-BEP20": {
    symbol: "USDC", // Correct symbol
    name: "USD Coin (BSC)",
    type: "crypto",
    rateUSD: 0.9998, // Correct rate under rateUSD
  },
};

// Type helper for currency IDs
export type CurrencyId = keyof typeof currencyRates;

// --- Wallet Options ---
// Note: WalletInfo type will be moved to types.ts
export const walletOptions: WalletInfo[] = [
  {
    id: "MPESA",
    name: "M-PESA",
    type: "mobile",
    logo: "/logos/mpesa.png",
    description: "Kenyan Mobile Money",
    color: "#4CAF50",
    isLocalImage: true,
  },
  {
    id: "EVC",
    name: "EVC Plus",
    type: "mobile",
    logo: "/logos/evc.svg",
    description: "Somali Mobile Money",
    color: "#2196F3",
    isLocalImage: true,
  },
  {
    id: "T-PLUS",
    name: "T-Plus",
    type: "mobile",
    logo: "/logos/tplus.webp",
    description: "Somali Mobile Money",
    color: "#FF9800",
    isLocalImage: true,
  },
  {
    id: "JEEB",
    name: "JEEB",
    type: "mobile",
    logo: "/logos/jeeb.png",
    description: "Somali Mobile Money",
    color: "#E91E63",
    isLocalImage: true,
  },
  {
    id: "SAHAL",
    name: "SAHAL",
    type: "mobile",
    logo: "/logos/sahal.png",
    description: "Somali Mobile Money",
    color: "#9C27B0",
    isLocalImage: true,
  },
  {
    id: "ZAAD",
    name: "ZAAD",
    type: "mobile",
    logo: "/logos/zaad.png",
    description: "Somali Mobile Money",
    color: "#3F51B5",
    isLocalImage: true,
  },
  {
    id: "USDT-TRC20",
    name: "USDT (TRC20)",
    type: "crypto",
    logo: "/logos/usdt.svg",
    description: "Tether on TRON",
    color: "#26A17B",
    isLocalImage: true,
  },
  {
    id: "USDT-BEP20",
    name: "USDT (BEP20)",
    type: "crypto",
    logo: "/logos/usdt.svg",
    description: "Tether on Binance Smart Chain",
    color: "#F0B90B",
    isLocalImage: true,
  },
  {
    id: "USDC-BEP20",
    name: "USDC (BEP20)",
    type: "crypto",
    logo: "/logos/usdc.svg",
    description: "USD Coin on Binance Smart Chain",
    color: "#2775CA",
    isLocalImage: true,
  },
];

// Helper function to get wallets by type
export const getWalletsByType = (type: "crypto" | "mobile"): WalletInfo[] => {
  return walletOptions.filter((wallet) => wallet.type === type);
};

export const cryptoWallets = getWalletsByType("crypto");
export const mobileWallets = getWalletsByType("mobile");

// --- Bank Options ---
// Replaced somaliaBanks with a categorized paymentMethods array
// Note: PaymentMethodOption type is now imported from types.ts

// Payment Methods (Banks, Mobile Money, Wallets)
export const paymentMethods: PaymentMethodOption[] = [
  // Banks
  {
    id: "premier-bank",
    name: "Premier Bank",
    logo: "/logos/premier-bank.png",
    description: "Banking Services",
    category: "bank",
  },
  {
    id: "salaam-bank",
    name: "Salaam Bank",
    logo: "/logos/salaam-bank.jpeg",
    description: "Banking Services",
    category: "bank",
  },
  {
    id: "sombank",
    name: "SomBank",
    logo: "/logos/sombank.webp",
    description: "Banking Services",
    category: "bank",
  },
  {
    id: "ibs-bank",
    name: "IBS Bank",
    logo: "/logos/ibs-bank.png",
    description: "Banking Services",
    category: "bank",
  },
  {
    id: "dahabshiil-bank",
    name: "Dahabshiil Bank",
    logo: "/logos/dahabshiil-bank.png",
    description: "Banking Services",
    category: "bank",
  },
  {
    id: "my-bank",
    name: "My Bank", // Assuming this logo exists
    logo: "/logos/my-bank.png",
    description: "Banking Services",
    category: "bank",
  },

  // Mobile Money
  {
    id: "mpesa",
    name: "M-Pesa",
    logo: "/logos/mpesa.png",
    description: "Kenyan Mobile Money",
    category: "mobileMoney",
  },
  {
    id: "evc",
    name: "EVC Plus",
    logo: "/logos/evc.svg",
    description: "Somali Mobile Money",
    category: "mobileMoney",
  },
  {
    id: "edahab",
    name: "eDahab",
    logo: "/logos/edahab.png",
    description: "Somali Mobile Money",
    category: "mobileMoney",
  },
  {
    id: "zaad",
    name: "ZAAD",
    logo: "/logos/zaad.png",
    description: "Somali Mobile Money",
    category: "mobileMoney",
  },
  {
    id: "sahal",
    name: "SAHAL",
    logo: "/logos/sahal.png",
    description: "Somali Mobile Money",
    category: "mobileMoney",
  },

  // Wallets
  {
    id: "dahab-plus",
    name: "Dahab Plus", // Assuming this is the correct name for dahab-plus.png
    logo: "/logos/dahab-plus.png",
    description: "Digital Wallet",
    category: "wallet",
  },
  {
    id: "t-plus",
    name: "T-Plus",
    logo: "/logos/tplus.webp",
    description: "Digital Wallet",
    category: "wallet",
  },
  {
    id: "premier-wallet",
    name: "Premier Wallet",
    logo: "/logos/premier-wallet.jpeg",
    description: "Digital Wallet",
    category: "wallet",
  },
];

// Helper to get options by category
export const getPaymentMethodsByCategory = (
  category: PaymentMethodOption["category"]
) => {
  return paymentMethods.filter((method) => method.category === category);
};

// --- Equivalent Rates --- (Kept for now, but might be redundant)
export const getEquivalentRates = () => {
  return [
    {
      from: "All wallets",
      to: "USD",
      rate: "1.00",
      label: "All transactions in USD ($)",
    },
  ];
};
