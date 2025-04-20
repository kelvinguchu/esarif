"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import type {
  TradingMode,
  WalletInfo,
  PaymentMethodOption,
} from "@/lib/swap/types";
import { paymentMethods, walletOptions } from "@/lib/swap/data"; // Import initial data

// Define the shape of the context state
interface SwapContextState {
  mode: TradingMode;
  setMode: Dispatch<SetStateAction<TradingMode>>;
  fromWallet: string;
  setFromWallet: Dispatch<SetStateAction<string>>;
  toWallet: string;
  setToWallet: Dispatch<SetStateAction<string>>;
  fromAmount: string;
  setFromAmount: Dispatch<SetStateAction<string>>;
  selectedBank: string; // Keep bank naming for consistency with existing state usage
  setSelectedBank: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  showSummary: boolean; // Keep for transfer mode
  setShowSummary: Dispatch<SetStateAction<boolean>>;
  // Drawer states (manage them here for simplicity)
  fromDrawerOpen: boolean;
  setFromDrawerOpen: Dispatch<SetStateAction<boolean>>;
  toDrawerOpen: boolean;
  setToDrawerOpen: Dispatch<SetStateAction<boolean>>;
  bankDrawerOpen: boolean;
  setBankDrawerOpen: Dispatch<SetStateAction<boolean>>;
  receivingAddress: string; // Add state for user's receiving address
  setReceivingAddress: Dispatch<SetStateAction<string>>; // Add setter
  mpesaUserName: string; // Add state for MPESA user name
  setMpesaUserName: Dispatch<SetStateAction<string>>; // Add setter
  stkDialogOpen: boolean; // Add state for STK dialog
  setStkDialogOpen: Dispatch<SetStateAction<boolean>>; // Add setter
  // Add calculated values if useful to share
  isCryptoTransaction: boolean;
  serviceFee: number;
  netAmount: number;
  estimatedAmount: string;
  // Add handlers if they need to be shared or modify multiple state pieces
  handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSwapWallets: () => void;
  handleModeChange: (newMode: TradingMode) => void;
  handleSubmit: (e: React.FormEvent) => void;
  // Derived data
  selectedToWalletInfo?: WalletInfo;
}

// Create the context with a default undefined value
const SwapContext = createContext<SwapContextState | undefined>(undefined);

// --- Constants for sessionStorage Keys ---
const BUY_PAYMENT_KEY = "swap_buyPaymentMethod";
const SELL_PAYMENT_KEY = "swap_sellPaymentMethod";

// Create the provider component
export const SwapProvider = ({ children }: { children: ReactNode }) => {
  // --- State managed by the provider ---
  const [mode, setMode] = useState<TradingMode>("buy");
  const [fromWallet, setFromWallet] = useState("MPESA");
  const [toWallet, setToWallet] = useState("USDT-TRC20");
  const [fromAmount, setFromAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState<string>(""); // Currently active selection
  // State to remember last selection per mode
  const [lastBuyBank, setLastBuyBank] = useState<string>("");
  const [lastSellBank, setLastSellBank] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [fromDrawerOpen, setFromDrawerOpen] = useState(false);
  const [toDrawerOpen, setToDrawerOpen] = useState(false);
  const [bankDrawerOpen, setBankDrawerOpen] = useState(false);
  const [receivingAddress, setReceivingAddress] = useState(""); // Initialize receiving address state
  const [mpesaUserName, setMpesaUserName] = useState(""); // Initialize MPESA user name state
  const [stkDialogOpen, setStkDialogOpen] = useState(false); // Initialize STK dialog state

  // --- Calculations (derived state) ---
  const isCryptoTransaction = mode === "buy" || mode === "sell";
  // Note: Using utils would be cleaner, but keeping direct calc for now
  const feeAmount = fromAmount ? parseFloat(fromAmount) : 0;
  const serviceFee = isCryptoTransaction ? 0 : feeAmount * 0.01;
  const netAmount = feeAmount - serviceFee;
  const estimatedAmount = fromAmount
    ? isCryptoTransaction
      ? feeAmount.toFixed(2)
      : netAmount.toFixed(2)
    : "0";
  const selectedToWalletInfo = walletOptions.find(
    (wallet) => wallet.id === toWallet
  );

  // --- Handlers (defined within provider to encapsulate state logic) ---
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromAmount(value);
    if (mode === "transfer" && value && parseFloat(value) > 0) {
      setShowSummary(true);
    } else {
      setShowSummary(false);
    }
  };

  const handleSwapWallets = () => {
    const temp = fromWallet;
    setFromWallet(toWallet);
    setToWallet(temp);
  };

  const handleModeChange = (newMode: TradingMode) => {
    // 1. Save current selection if leaving Buy or Sell mode
    if (mode === "buy") {
      setLastBuyBank(selectedBank);
    } else if (mode === "sell") {
      setLastSellBank(selectedBank);
    }

    // 2. Determine the next selectedBank based on the NEW mode
    let nextSelectedBank = ""; // Default for Transfer
    if (newMode === "buy") {
      nextSelectedBank = lastBuyBank; // Restore last Buy selection
    } else if (newMode === "sell") {
      nextSelectedBank = lastSellBank; // Restore last Sell selection
    }

    // 3. Update state
    setMode(newMode);
    setFromAmount("");
    setShowSummary(false);
    setSelectedBank(nextSelectedBank); // Set to restored value or ""
    setReceivingAddress(""); // Clear receiving address on mode change
    setMpesaUserName(""); // Clear MPESA name on mode change
    setStkDialogOpen(false); // Close dialog on mode change

    // 4. Update wallets based on new mode and restored/default bank
    const bankToUse = nextSelectedBank || paymentMethods[0]?.id || ""; // Use restored or default
    if (newMode === "buy") {
      setFromWallet(bankToUse);
      setToWallet("USDT-TRC20");
    } else if (newMode === "sell") {
      setFromWallet("USDT-TRC20");
      setToWallet(bankToUse);
    } else {
      // Transfer mode
      setFromWallet("MPESA");
      setToWallet("USDT-TRC20");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Set loading immediately

    const submissionData = {
      mode,
      fromWallet,
      toWallet,
      fromAmount,
      selectedBank,
      receivingAddress,
      mpesaUserName:
        mode === "buy" && selectedBank === "mpesa" ? mpesaUserName : undefined,
    };
    console.log("Submitting (from context):", submissionData);

    // If MPESA Buy, open the STK dialog instead of finishing immediately
    if (mode === "buy" && selectedBank === "mpesa") {
      console.log("MPESA Buy selected, opening STK dialog...");
      setStkDialogOpen(true);
      // Keep isLoading=true while dialog is open, or handle completion differently
      // For demo, we can let the dialog close reset loading, or just leave it loading
    } else {
      // Simulate non-MPESA submission completion
      setTimeout(() => {
        setIsLoading(false);
        console.log("Submitted! (non-MPESA)");
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
    receivingAddress, // Provide receiving address state
    setReceivingAddress, // Provide setter
    mpesaUserName, // Provide MPESA user name state
    setMpesaUserName, // Provide setter
    stkDialogOpen, // Provide STK dialog state
    setStkDialogOpen, // Provide setter
    isCryptoTransaction,
    serviceFee,
    netAmount,
    estimatedAmount,
    handleAmountChange,
    handleSwapWallets,
    handleModeChange,
    handleSubmit,
    selectedToWalletInfo,
  };

  return <SwapContext.Provider value={value}>{children}</SwapContext.Provider>;
};

// Create a custom hook for easy context access
export const useSwapContext = () => {
  const context = useContext(SwapContext);
  if (context === undefined) {
    throw new Error("useSwapContext must be used within a SwapProvider");
  }
  return context;
};
