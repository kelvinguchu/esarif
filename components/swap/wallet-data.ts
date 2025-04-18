import { WalletInfo } from "./wallet-logo";

// Currency mappings with proper symbols, formatting and current exchange rates
export const currencyRates = {
  // Mobile Money
  MPESA: { symbol: "KSh", name: "Kenyan Shilling", rate: 128.55 }, // 1 USD = 128.55 KSh (example rate)
  EVC: { symbol: "Sh.So", name: "Somali Shilling", rate: 57300 }, // 1 USD = 57300 Sh.So (example rate)
  "T-PLUS": { symbol: "Sh.So", name: "Somali Shilling", rate: 57300 },
  JEEB: { symbol: "Sh.So", name: "Somali Shilling", rate: 57300 },
  SAHAL: { symbol: "Sh.So", name: "Somali Shilling", rate: 57300 },
  ZAAD: { symbol: "Sh.So", name: "Somali Shilling", rate: 57300 },
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
    name: "Telesom Plus",
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
    logo: "usdt",
    description: "Tether on TRON",
    color: "#26A17B",
    isLocalImage: false,
  },
  {
    id: "USDT-BEP20",
    name: "USDT (BEP20)",
    type: "crypto",
    logo: "usdt",
    description: "Tether on Binance Smart Chain",
    color: "#F0B90B",
    isLocalImage: false,
  },
  {
    id: "USDC-BEP20",
    name: "USDC (BEP20)",
    type: "crypto",
    logo: "usdc",
    description: "USD Coin on Binance Smart Chain",
    color: "#2775CA",
    isLocalImage: false,
  },
];

// Helper function to calculate equivalent rates for popular conversions
export const getEquivalentRates = () => {
  return [
    {
      from: "USD",
      to: "MPESA",
      rate: currencyRates["MPESA"].rate.toFixed(2),
      label: `$1 = ${currencyRates["MPESA"].symbol}${currencyRates[
        "MPESA"
      ].rate.toFixed(2)}`,
    },
    {
      from: "MPESA",
      to: "USD",
      rate: (1 / currencyRates["MPESA"].rate).toFixed(6),
      label: `${currencyRates["MPESA"].symbol}100 = $${(
        100 / currencyRates["MPESA"].rate
      ).toFixed(2)}`,
    },
    {
      from: "EVC",
      to: "USD",
      rate: (1 / currencyRates["EVC"].rate).toFixed(6),
      label: `${currencyRates["EVC"].symbol}1000 = $${(
        1000 / currencyRates["EVC"].rate
      ).toFixed(2)}`,
    },
  ];
};
