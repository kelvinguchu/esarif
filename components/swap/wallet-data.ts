import { WalletInfo } from "./wallet-logo";

// Currency mappings with proper symbols, all standardized to USD
export const currencyRates = {
  // Mobile Money - all using USD
  MPESA: { symbol: "$", name: "USD", rate: 1 },
  EVC: { symbol: "$", name: "USD", rate: 1 },
  "T-PLUS": { symbol: "$", name: "USD", rate: 1 },
  JEEB: { symbol: "$", name: "USD", rate: 1 },
  SAHAL: { symbol: "$", name: "USD", rate: 1 },
  ZAAD: { symbol: "$", name: "USD", rate: 1 },
  // Crypto
  "USDT-TRC20": { symbol: "$", name: "USDT", rate: 1 },
  "USDT-BEP20": { symbol: "$", name: "USDT", rate: 1 },
  "USDC-BEP20": { symbol: "$", name: "USDC", rate: 1 },
};

// Wallet options with actual logos and crypto icons
export const walletOptions: WalletInfo[] = [
  {
    id: "MPESA",
    name: "M-PESA",
    type: "mobile",
    logo: "/logos/mpesa.png",
    description: "Kenyan Mobile Money (USD)",
    color: "#4CAF50",
    isLocalImage: true,
  },
  {
    id: "EVC",
    name: "EVC Plus",
    type: "mobile",
    logo: "/logos/evc.svg",
    description: "Somali Mobile Money (USD)",
    color: "#2196F3",
    isLocalImage: true,
  },
  {
    id: "T-PLUS",
    name: "T-Plus",
    type: "mobile",
    logo: "/logos/tplus.webp",
    description: "Somali Mobile Money (USD)",
    color: "#FF9800",
    isLocalImage: true,
  },
  {
    id: "JEEB",
    name: "JEEB",
    type: "mobile",
    logo: "/logos/jeeb.png",
    description: "Somali Mobile Money (USD)",
    color: "#E91E63",
    isLocalImage: true,
  },
  {
    id: "SAHAL",
    name: "SAHAL",
    type: "mobile",
    logo: "/logos/sahal.png",
    description: "Somali Mobile Money (USD)",
    color: "#9C27B0",
    isLocalImage: true,
  },
  {
    id: "ZAAD",
    name: "ZAAD",
    type: "mobile",
    logo: "/logos/zaad.png",
    description: "Somali Mobile Money (USD)",
    color: "#3F51B5",
    isLocalImage: true,
  },
  {
    id: "USDT-TRC20",
    name: "USDT (TRC20)",
    type: "crypto",
    logo: "usdt",
    description: "Tether on TRON (USD)",
    color: "#26A17B",
    isLocalImage: false,
  },
  {
    id: "USDT-BEP20",
    name: "USDT (BEP20)",
    type: "crypto",
    logo: "usdt",
    description: "Tether on Binance Smart Chain (USD)",
    color: "#F0B90B",
    isLocalImage: false,
  },
  {
    id: "USDC-BEP20",
    name: "USDC (BEP20)",
    type: "crypto",
    logo: "usdc",
    description: "USD Coin on Binance Smart Chain (USD)",
    color: "#2775CA",
    isLocalImage: false,
  },
];

// Helper function to return only a single USD rate for simplicity
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
