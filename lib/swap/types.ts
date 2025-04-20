// Swap related type definitions

// Represents a selectable wallet (crypto or mobile)
export type WalletInfo = {
  id: string;
  name: string;
  type: "mobile" | "crypto";
  logo: string; // Path for local images, or identifier for crypto icons (e.g., 'btc')
  description: string;
  color: string; // Primarily for crypto icon background/styling
  isLocalImage: boolean;
};

// Represents a selectable bank, mobile money service, or wallet (for payment methods)
export interface PaymentMethodOption {
  id: string;
  name: string;
  logo: string; // Path to logo image
  description: string;
  category: "bank" | "mobileMoney" | "wallet";
  color?: string; // Optional: Used by original BankOption, kept for potential styling
}

// Represents the structure of currency rate information
// Using a union to handle different rate structures (direct for stable/mobile, USD based for crypto)
type BaseCurrencyInfo = {
  symbol: string;
  name: string;
  type: "mobile" | "crypto";
};
type DirectRate = BaseCurrencyInfo & { rate: number; rateUSD?: never };
type UsdRate = BaseCurrencyInfo & { rate?: never; rateUSD: number };

export type CurrencyRateInfo = DirectRate | UsdRate;

// Helper type for currency IDs derived from currencyRates keys
import { currencyRates } from "./data"; // Import to use keys for type
export type CurrencyId = keyof typeof currencyRates;

// Trading mode type used in forms
export type TradingMode = "buy" | "sell" | "transfer";
