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
  BTC: { symbol: "₿", name: "Bitcoin", rate: 1 / 63000 }, // 1 USD = ~0.000016 BTC
  ETH: { symbol: "Ξ", name: "Ethereum", rate: 1 / 3300 }, // 1 USD = ~0.0003 ETH
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
  {
    id: "BTC",
    name: "Bitcoin",
    type: "crypto",
    logo: "btc",
    description: "Bitcoin",
    color: "#F7931A",
    isLocalImage: false,
  },
  {
    id: "ETH",
    name: "Ethereum",
    type: "crypto",
    logo: "eth",
    description: "Ethereum",
    color: "#627EEA",
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

// Crypto filter for wallet options
export const cryptoWallets = walletOptions.filter(
  (wallet) => wallet.type === "crypto"
);

// Mobile money filter for wallet options
export const mobileWallets = walletOptions.filter(
  (wallet) => wallet.type === "mobile"
);

// List of Somali banks for payment methods
export const somaliaBanks = [
  {
    id: "agro-africa-bank",
    name: "Agro Africa Bank",
    logo: "",
    description: "Banking Services",
    color: "#00805a",
  },
  {
    id: "amal-bank",
    name: "Amal Bank",
    logo: "",
    description: "Banking Services",
    color: "#00805a",
  },
  {
    id: "amana-bank",
    name: "Amana Bank",
    logo: "",
    description: "Banking Services",
    color: "#00805a",
  },
  {
    id: "bushra-business-bank",
    name: "Bushra Business Bank",
    logo: "",
    description: "Banking Services",
    color: "#00805a",
  },
  {
    id: "dahabshiil-bank",
    name: "Dahabshil Bank International",
    logo: "",
    description: "Banking Services",
    color: "#00805a",
  },
  {
    id: "daryeel-bank",
    name: "Daryeel Bank Ltd",
    logo: "",
    description: "Banking Services",
    color: "#00805a",
  },
  {
    id: "galaxy-bank",
    name: "Galaxy International Bank",
    logo: "",
    description: "Banking Services",
    color: "#00805a",
  },
  {
    id: "ibs-bank",
    name: "International Bank of Somalia (IBS)",
    logo: "",
    description: "Banking Services",
    color: "#00805a",
  },
  {
    id: "premier-bank",
    name: "Premier Bank",
    logo: "",
    description: "Banking Services",
    color: "#00805a",
  },
  {
    id: "salaam-bank",
    name: "Salaam Somali Bank",
    logo: "",
    description: "Banking Services",
    color: "#00805a",
  },
  {
    id: "sombank",
    name: "SomBank Ltd",
    logo: "",
    description: "Banking Services",
    color: "#00805a",
  },
  // Mobile Money Services
  {
    id: "evc",
    name: "EVC Plus",
    logo: "",
    description: "Mobile Money Service",
    color: "#2196F3",
  },
  {
    id: "zaad",
    name: "ZAAD",
    logo: "",
    description: "Mobile Money Service",
    color: "#3F51B5",
  },
  {
    id: "sahal",
    name: "SAHAL",
    logo: "",
    description: "Mobile Money Service",
    color: "#9C27B0",
  },
  {
    id: "jeeb",
    name: "JEEB",
    logo: "",
    description: "Mobile Money Service",
    color: "#E91E63",
  },
  {
    id: "tplus",
    name: "Telesom Plus",
    logo: "",
    description: "Mobile Money Service",
    color: "#FF9800",
  },
];
