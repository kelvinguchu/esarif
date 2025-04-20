// Swap related utility functions
import { KES_PER_USD, currencyRates } from "./data";
import type { CurrencyRateInfo, CurrencyId } from "./types";

/**
 * Formats a number as currency based on the wallet ID.
 * If the wallet ID is MPESA, formats as KES.
 * Otherwise, formats as USD with a given symbol.
 */
export const formatCurrency = (
  amount: number,
  walletId: string | CurrencyId,
  currencySymbol: string = "$"
): string => {
  if (walletId === "MPESA") {
    return `KSh ${(amount * KES_PER_USD).toFixed(2)}`;
  } else {
    // Find the specific currency symbol if available
    const rates = currencyRates as Record<string, CurrencyRateInfo>;
    const symbol = rates[walletId]?.symbol || currencySymbol;
    return `${symbol}${amount.toFixed(2)}`;
  }
};

/**
 * Calculates the amount of crypto received when buying with USD.
 */
export const calculateCryptoBuyAmount = (
  usdAmount: number,
  cryptoId: CurrencyId
): number => {
  const rates = currencyRates as Record<string, CurrencyRateInfo>;
  const rateInfo = rates[cryptoId];

  if (!rateInfo || typeof rateInfo.rateUSD !== "number") {
    console.warn(`USD rate for ${cryptoId} not found or invalid.`);
    return 0; // Or handle error appropriately
  }

  if (rateInfo.rateUSD <= 0) {
    console.warn(`Invalid USD rate for ${cryptoId}: ${rateInfo.rateUSD}`);
    return 0;
  }

  return usdAmount / rateInfo.rateUSD;
};

/**
 * Calculates service fee (1% for non-crypto, 0% for crypto).
 */
export const calculateServiceFee = (
  amount: number,
  isCrypto: boolean
): number => {
  return isCrypto ? 0 : amount * 0.01;
};

/**
 * Calculates net amount after service fee.
 */
export const calculateNetAmount = (
  amount: number,
  serviceFee: number
): number => {
  return amount - serviceFee;
};
 