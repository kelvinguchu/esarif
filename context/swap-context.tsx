"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import type {
  TradingMode,
  // WalletInfo, // Removed
  PaymentMethodOption,
  CurrencyId, // Keep if used
  CurrencyRateInfo, // Keep if used
} from "@/lib/swap/types";
import { paymentMethods, currencyRates, KES_PER_USD } from "@/lib/swap/data"; // Import updated data

// Define the shape of the context state
interface SwapContextState {
  mode: TradingMode;
  setMode: Dispatch<SetStateAction<TradingMode>>;
  fromWallet: string; // ID of the payment method
  setFromWallet: Dispatch<SetStateAction<string>>;
  toWallet: string; // ID of the payment method
  setToWallet: Dispatch<SetStateAction<string>>;
  fromAmount: string;
  setFromAmount: Dispatch<SetStateAction<string>>;
  selectedBank: string; // ID of the bank/mobile/wallet payment method used in Buy/Sell
  setSelectedBank: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  showSummary: boolean; // Keep for transfer mode summary display
  setShowSummary: Dispatch<SetStateAction<boolean>>;
  // Drawer states
  fromDrawerOpen: boolean;
  setFromDrawerOpen: Dispatch<SetStateAction<boolean>>;
  toDrawerOpen: boolean;
  setToDrawerOpen: Dispatch<SetStateAction<boolean>>;
  bankDrawerOpen: boolean;
  setBankDrawerOpen: Dispatch<SetStateAction<boolean>>;
  receivingAddress: string;
  setReceivingAddress: Dispatch<SetStateAction<string>>;
  mpesaUserName: string;
  setMpesaUserName: Dispatch<SetStateAction<string>>;
  stkDialogOpen: boolean;
  setStkDialogOpen: Dispatch<SetStateAction<boolean>>;
  accountNumber: string;
  setAccountNumber: Dispatch<SetStateAction<string>>;
  accountName: string;
  setAccountName: Dispatch<SetStateAction<string>>;
  // Calculated values
  isCryptoTransaction: boolean; // Is the primary asset crypto (Buy/Sell)?
  serviceFee: number; // Fee in USD
  netAmount: number; // Amount after fee in USD
  estimatedAmount: string; // Final amount in target currency (string for display)
  // Handlers
  handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSwapWallets: () => void;
  handleModeChange: (newMode: TradingMode) => void;
  handleSubmit: (e: React.FormEvent) => void;
  // Derived data
  // selectedToWalletInfo?: WalletInfo; // Removed
  selectedToPaymentMethod?: PaymentMethodOption; // Use PaymentMethodOption
  selectedFromPaymentMethod?: PaymentMethodOption; // Added for consistency
}

// Create the context
const SwapContext = createContext<SwapContextState | undefined>(undefined);

// Provider component
export const SwapProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<TradingMode>("buy");
  const [fromWallet, setFromWallet] = useState<string>(""); // Default buy: crypto
  const [toWallet, setToWallet] = useState<string>(""); // Default buy: bank/mobile
  const [fromAmount, setFromAmount] = useState(""); // Assumed to be in USD for buy/sell/transfer input
  const [selectedBank, setSelectedBank] = useState<string>(""); // For Buy/Sell modes payment selection
  // State to remember last selection per mode
  const [lastBuyBank, setLastBuyBank] = useState<string>("");
  const [lastSellBank, setLastSellBank] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false); // Transfer mode summary visibility
  const [fromDrawerOpen, setFromDrawerOpen] = useState(false);
  const [toDrawerOpen, setToDrawerOpen] = useState(false);
  const [bankDrawerOpen, setBankDrawerOpen] = useState(false);
  const [receivingAddress, setReceivingAddress] = useState("");
  const [mpesaUserName, setMpesaUserName] = useState("");
  const [stkDialogOpen, setStkDialogOpen] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");

  // --- Initialize wallets based on mode ---
  useEffect(() => {
    // Find default crypto (e.g., first one) and default bank/mobile (e.g., first one)
    const defaultCrypto =
      paymentMethods.find((p) => p.category === "crypto")?.id || "";
    const defaultPayment =
      paymentMethods.find(
        (p) =>
          p.category === "bank" ||
          p.category === "mobileMoney" ||
          p.category === "wallet"
      )?.id || "";

    if (mode === "buy") {
      setFromWallet(selectedBank || defaultPayment); // From is payment method
      setToWallet(defaultCrypto); // To is crypto
    } else if (mode === "sell") {
      setFromWallet(defaultCrypto); // From is crypto
      setToWallet(selectedBank || defaultPayment); // To is payment method
    } else {
      // transfer
      setFromWallet("");
      setToWallet("");
    }
    // Clear amount only on mode change, not on selectedBank change
    setFromAmount("");
    setShowSummary(false);
  }, [mode]); // Only rerun when mode changes, not selectedBank

  // This effect updates wallet values when selectedBank changes without clearing the amount
  useEffect(() => {
    if (!selectedBank) return;

    const defaultCrypto =
      paymentMethods.find((p) => p.category === "crypto")?.id || "";

    if (mode === "buy") {
      setFromWallet(selectedBank); // From is payment method
    } else if (mode === "sell") {
      setToWallet(selectedBank); // To is payment method
    }
    // Don't clear amount when only the payment method changes
  }, [selectedBank, mode]);

  // --- Derived State / Calculations ---
  const selectedFromPaymentMethod = paymentMethods.find(
    (p) => p.id === fromWallet
  );
  const selectedToPaymentMethod = paymentMethods.find((p) => p.id === toWallet);

  const isCryptoTransaction = mode === "buy" || mode === "sell"; // True if main transaction involves crypto

  // Calculate fees and amounts (assuming fromAmount is USD)
  const feeAmount = fromAmount ? parseFloat(fromAmount) : 0;
  // Fee logic: 1% for Transfer, 0% for Buy/Sell (adjust if needed)
  const serviceFee = mode === "transfer" ? feeAmount * 0.01 : 0;
  const netAmount = feeAmount - serviceFee; // Net amount in USD

  // Calculate estimated amount in the *target* currency
  const estimatedAmount = (() => {
    if (!fromAmount || parseFloat(fromAmount) <= 0 || !toWallet) return "0.00";

    const amount = parseFloat(fromAmount);
    // Use net amount (after service fee) for more accurate conversion
    const amountAfterFee = amount - serviceFee;

    const targetRateInfo = currencyRates[toWallet as CurrencyId];
    const fromRateInfo = fromWallet
      ? currencyRates[fromWallet as CurrencyId]
      : null;

    if (!targetRateInfo) return amountAfterFee.toFixed(2);

    // For buy mode, convert USD to crypto using the rateUSD
    if (
      mode === "buy" &&
      targetRateInfo.type === "crypto" &&
      "rateUSD" in targetRateInfo
    ) {
      // Calculate how much crypto you get for the USD amount
      // If 1 unit of crypto costs X USD, then amountAfterFee USD gives amountAfterFee/X crypto
      const rate = targetRateInfo.rateUSD;
      if (typeof rate === "number" && rate > 0) {
        return (amountAfterFee / rate).toFixed(8);
      }
    }

    // For sell mode, convert crypto to USD using the rateUSD
    if (
      mode === "sell" &&
      fromRateInfo &&
      fromRateInfo.type === "crypto" &&
      "rateUSD" in fromRateInfo
    ) {
      // Calculate how much USD you get for the crypto amount
      // If 1 unit of crypto is worth X USD, then amount crypto gives amount*X USD
      const rate = fromRateInfo.rateUSD;
      if (typeof rate === "number" && rate > 0) {
        return (amountAfterFee * rate).toFixed(2);
      }
    }

    // Simple direct conversion for MPESA (KES) <-> USD cases
    if (fromWallet && toWallet) {
      // MPESA to other
      if (fromWallet === "MPESA" && toWallet !== "MPESA") {
        return (amountAfterFee / KES_PER_USD).toFixed(2); // KES to USD
      }

      // Other to MPESA
      if (fromWallet !== "MPESA" && toWallet === "MPESA") {
        return (amountAfterFee * KES_PER_USD).toFixed(2); // USD to KES
      }
    }

    // Same currency or direct 1:1 exchange
    return amountAfterFee.toFixed(2);
  })();

  // --- Handlers ---
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromAmount(value);
    // Show summary in transfer mode if amount is valid
    setShowSummary(mode === "transfer" && !!value && parseFloat(value) > 0);
  };

  const handleSwapWallets = () => {
    // Only swap if in transfer mode
    if (mode === "transfer") {
      setFromWallet(toWallet);
      setToWallet(fromWallet);
      // Optionally swap drawer states if needed
      // const tempDrawer = fromDrawerOpen;
      // setFromDrawerOpen(toDrawerOpen);
      // setToDrawerOpen(tempDrawer);
    }
    // Swap doesn't make sense in Buy/Sell as one side is fixed (crypto/payment)
  };

  const handleModeChange = (newMode: TradingMode) => {
    // Save current bank selection if leaving Buy or Sell
    if (mode === "buy") setLastBuyBank(selectedBank);
    else if (mode === "sell") setLastSellBank(selectedBank);

    // Determine the bank for the new mode
    const nextSelectedBank =
      newMode === "buy" ? lastBuyBank : newMode === "sell" ? lastSellBank : "";

    // Update core state
    setMode(newMode);
    setSelectedBank(nextSelectedBank); // Restore or clear bank selection

    // Reset form fields
    setFromAmount("");
    setShowSummary(false);
    setReceivingAddress("");
    setMpesaUserName("");
    setStkDialogOpen(false);
    setAccountNumber("");
    setAccountName("");

    // Set wallets based on the new mode and restored bank
    const defaultCrypto =
      paymentMethods.find((p) => p.category === "crypto")?.id || "";
    const defaultPayment =
      paymentMethods.find(
        (p) =>
          p.category === "bank" ||
          p.category === "mobileMoney" ||
          p.category === "wallet"
      )?.id || "";
    const bankToUse = nextSelectedBank || defaultPayment; // Use restored or default payment

    if (newMode === "buy") {
      setFromWallet(bankToUse); // Buy FROM payment method
      setToWallet(defaultCrypto); // Buy TO crypto
    } else if (newMode === "sell") {
      setFromWallet(defaultCrypto); // Sell FROM crypto
      setToWallet(bankToUse); // Sell TO payment method
    } else {
      // Transfer
      setFromWallet(""); // Clear wallets for transfer
      setToWallet("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const submissionData = {
      mode,
      fromWallet, // ID
      toWallet, // ID
      fromAmount, // Assumed USD
      selectedBank, // Relevant for Buy/Sell payment method
      estimatedAmount, // Calculated target amount
      receivingAddress: mode === "buy" ? receivingAddress : undefined, // Only for buy
      mpesaUserName:
        mode === "buy" && selectedBank === "MPESA" ? mpesaUserName : undefined, // Buy MPESA only
      accountNumber: mode === "sell" ? accountNumber : undefined, // Sell only
      accountName: mode === "sell" ? accountName : undefined, // Sell only
    };
    console.log("Submitting (from context):", submissionData);

    // MPESA Buy STK Push simulation
    if (mode === "buy" && selectedBank === "MPESA") {
      console.log("MPESA Buy selected, opening STK dialog...");
      setStkDialogOpen(true);
      // Keep isLoading=true until dialog interaction/timeout, or handle async push properly
    } else {
      // Simulate other submissions
      setTimeout(() => {
        setIsLoading(false);
        console.log("Submitted!");
      }, 1500);
    }
  };

  // --- Context Value ---
  const value = {
    mode,
    setMode,
    fromWallet,
    setFromWallet,
    toWallet,
    setToWallet,
    fromAmount,
    setFromAmount,
    selectedBank,
    setSelectedBank,
    isLoading,
    setIsLoading,
    showSummary,
    setShowSummary,
    fromDrawerOpen,
    setFromDrawerOpen,
    toDrawerOpen,
    setToDrawerOpen,
    bankDrawerOpen,
    setBankDrawerOpen,
    receivingAddress,
    setReceivingAddress,
    mpesaUserName,
    setMpesaUserName,
    stkDialogOpen,
    setStkDialogOpen,
    // Provide sell payment details state
    accountNumber,
    setAccountNumber,
    accountName,
    setAccountName,
    // Calculated / Derived
    isCryptoTransaction,
    serviceFee,
    netAmount,
    estimatedAmount,
    // Handlers
    handleAmountChange,
    handleSwapWallets,
    handleModeChange,
    handleSubmit,
    // Derived objects
    selectedToPaymentMethod,
    selectedFromPaymentMethod,
  };

  return <SwapContext.Provider value={value}>{children}</SwapContext.Provider>;
};

// Custom hook
export const useSwapContext = () => {
  const context = useContext(SwapContext);
  if (context === undefined) {
    throw new Error("useSwapContext must be used within a SwapProvider");
  }
  return context;
};
