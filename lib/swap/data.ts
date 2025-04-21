// Swap related static data
import type { CurrencyRateInfo, PaymentMethodOption } from "./types"; // Updated import

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
    type: "mobile", // Keep type for rate calculation? Or derive from paymentMethods? Let's keep for now.
  },
  EVC: { symbol: "$", name: "EVC Plus (USD)", rate: 1.0, type: "mobile" },
  EDAHAB: { symbol: "$", name: "eDahab (USD)", rate: 1.0, type: "mobile" },
  ZAAD: { symbol: "$", name: "ZAAD (USD)", rate: 1.0, type: "mobile" },
  SAHAL: { symbol: "$", name: "SAHAL (USD)", rate: 1.0, type: "mobile" },

  // Crypto (Rate is USD value per 1 unit of Crypto)
  "USDT-TRC20": {
    symbol: "USDT",
    name: "Tether (TRON)",
    type: "crypto",
    rateUSD: 1.0001,
  },
  "USDT-BEP20": {
    symbol: "USDT",
    name: "Tether (BSC)",
    type: "crypto",
    rateUSD: 1.0,
  },
  "USDC-BEP20": {
    symbol: "USDC",
    name: "USD Coin (BSC)",
    type: "crypto",
    rateUSD: 0.9998,
  },
  // Add IDs for other mobile money if needed in rates, e.g., T-Plus, JEEB if rates differ
};

// Type helper for currency IDs
export type CurrencyId = keyof typeof currencyRates;

// --- Wallet Options --- DELETED ---

// --- Payment Methods (Banks, Mobile Money, Wallets, Crypto) ---
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
    id: "MPESA", // Using the same ID as in currencyRates
    name: "M-Pesa",
    logo: "/logos/mpesa.png",
    description: "Kenyan Mobile Money",
    category: "mobileMoney",
    color: "#4CAF50", // Adding color for consistency if needed
  },
  {
    id: "EVC", // Using the same ID as in currencyRates
    name: "EVC Plus",
    logo: "/logos/evc.svg",
    description: "Somali Mobile Money",
    category: "mobileMoney",
    color: "#2196F3",
  },
  {
    id: "EDAHAB", // Using the same ID as in currencyRates
    name: "eDahab",
    logo: "/logos/edahab.png",
    description: "Somali Mobile Money",
    category: "mobileMoney",
    // Add color if available/needed
  },
  {
    id: "ZAAD", // Using the same ID as in currencyRates
    name: "ZAAD",
    logo: "/logos/zaad.png",
    description: "Somali Mobile Money",
    category: "mobileMoney",
    color: "#3F51B5",
  },
  {
    id: "SAHAL", // Using the same ID as in currencyRates
    name: "SAHAL",
    logo: "/logos/sahal.png",
    description: "Somali Mobile Money",
    category: "mobileMoney",
    color: "#9C27B0",
  },

  // Wallets (Digital Wallets category)
  {
    id: "dahab-plus",
    name: "Dahab Plus",
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

  // Crypto (Adding crypto options here)
  {
    id: "USDT-TRC20", // Using the same ID as in currencyRates
    name: "USDT (TRC20)",
    logo: "/logos/usdt.svg", // Reusing logo path
    description: "Tether on TRON",
    category: "crypto",
    color: "#26A17B", // Add color
  },
  {
    id: "USDT-BEP20", // Using the same ID as in currencyRates
    name: "USDT (BEP20)",
    logo: "/logos/usdt.svg", // Reusing logo path
    description: "Tether on Binance Smart Chain",
    category: "crypto",
    color: "#F0B90B", // Add color
  },
  {
    id: "USDC-BEP20", // Using the same ID as in currencyRates
    name: "USDC (BEP20)",
    logo: "/logos/usdc.svg", // Reusing logo path
    description: "USD Coin on Binance Smart Chain",
    category: "crypto",
    color: "#2775CA", // Add color
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
