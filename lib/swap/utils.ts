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
 * Checks if a wallet ID represents MPESA (KES currency)
 */
export const isMpesa = (walletId: string): boolean => {
  return walletId === "MPESA";
};

/**
 * Gets the appropriate currency symbol for a wallet
 */
export const getCurrencySymbol = (walletId: string): string => {
  if (!walletId) return "$";
  const rateInfo = currencyRates[walletId as keyof typeof currencyRates];
  if (rateInfo?.symbol) return rateInfo.symbol;
  return "$";
};

/**
 * Converts an amount from one currency to another based on wallet IDs
 * @param amount The amount to convert
 * @param fromWalletId Source wallet ID
 * @param toWalletId Destination wallet ID
 * @returns Converted amount
 */
export const convertCurrency = (
  amount: number,
  fromWalletId: string,
  toWalletId: string
): number => {
  if (!amount || fromWalletId === toWalletId) return amount;

  // MPESA (KES) to USD-based wallet
  if (isMpesa(fromWalletId) && !isMpesa(toWalletId)) {
    return amount / KES_PER_USD; // Convert KES to USD
  }

  // USD-based wallet to MPESA (KES)
  if (!isMpesa(fromWalletId) && isMpesa(toWalletId)) {
    return amount * KES_PER_USD; // Convert USD to KES
  }

  // Same currency type or other cases
  return amount;
};

/**
 * Generates detailed exchange rate information between two wallets
 */
export const getExchangeInfo = (fromWalletId: string, toWalletId: string) => {
  if (!fromWalletId || !toWalletId || fromWalletId === toWalletId) {
    return {
      rate: 1.0,
      fromSymbol: getCurrencySymbol(fromWalletId),
      toSymbol: getCurrencySymbol(toWalletId),
      fromCurrency: isMpesa(fromWalletId) ? "KES" : "USD",
      toCurrency: isMpesa(toWalletId) ? "KES" : "USD",
    };
  }

  // MPESA to USD-based wallet
  if (isMpesa(fromWalletId) && !isMpesa(toWalletId)) {
    return {
      rate: 1 / KES_PER_USD, // How many USD per 1 KES
      fromSymbol: "KSh",
      toSymbol: "$",
      fromCurrency: "KES",
      toCurrency: "USD",
      description: `Converting from Kenyan Shillings to USD (1 KSh = ${(
        1 / KES_PER_USD
      ).toFixed(6)} USD)`,
    };
  }

  // USD-based wallet to MPESA
  if (!isMpesa(fromWalletId) && isMpesa(toWalletId)) {
    return {
      rate: KES_PER_USD, // How many KES per 1 USD
      fromSymbol: "$",
      toSymbol: "KSh",
      fromCurrency: "USD",
      toCurrency: "KES",
      description: `Converting from USD to Kenyan Shillings (1 USD = ${KES_PER_USD.toFixed(
        2
      )} KSh)`,
    };
  }

  // Default case: same currency type (either both USD-based or another case)
  return {
    rate: 1.0,
    fromSymbol: getCurrencySymbol(fromWalletId),
    toSymbol: getCurrencySymbol(toWalletId),
    fromCurrency: "USD",
    toCurrency: "USD",
    description: "Same currency type, no conversion needed",
  };
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
