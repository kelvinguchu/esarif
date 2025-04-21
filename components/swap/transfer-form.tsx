"use client";

import React, { useState } from "react";
import {
  ArrowDown,
  RefreshCw,
  Smartphone,
  Wallet,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WalletSelector } from "./wallet-selector";
import { TransactionSummary } from "./transaction-summary";
import { ConfirmationMessage } from "./confirmation-message";
import { PaymentMethodOption } from "@/lib/swap/types";
import { paymentMethods, KES_PER_USD } from "@/lib/swap/data";
import { useSwapContext } from "@/context/swap-context";
import {
  isMpesa,
  getCurrencySymbol,
  convertCurrency,
  getExchangeInfo,
} from "@/lib/swap/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the category type based on PaymentMethodOption
type PaymentCategory = Extract<
  PaymentMethodOption["category"],
  "mobileMoney" | "bank" | "wallet"
>;

// Updated categories for non-crypto transfer options only
const categories: {
  id: PaymentCategory;
  name: string;
  icon: React.FC<any>;
}[] = [
  { id: "mobileMoney", name: "Mobile Money", icon: Smartphone },
  { id: "bank", name: "Bank Account", icon: Building },
  { id: "wallet", name: "Digital Wallet", icon: Wallet },
];

export const TransferForm = () => {
  const {
    fromWallet,
    setFromWallet,
    toWallet,
    setToWallet,
    fromAmount,
    handleAmountChange,
    handleSwapWallets,
    estimatedAmount,
    showSummary,
    serviceFee,
    netAmount,
    fromDrawerOpen,
    setFromDrawerOpen,
    toDrawerOpen,
    setToDrawerOpen,
    isLoading,
    selectedToPaymentMethod,
  } = useSwapContext();

  const [fromCategory, setFromCategory] = useState<PaymentCategory | null>(
    null
  );
  const [toCategory, setToCategory] = useState<PaymentCategory | null>(null);

  // Filter payment options to include only banks, mobile money, and digital wallets
  const transferPaymentOptions = paymentMethods.filter(
    (option) =>
      option.category === "mobileMoney" ||
      option.category === "bank" ||
      option.category === "wallet"
  );

  const fromDrawerOptions = transferPaymentOptions.filter(
    (option) => !fromCategory || option.category === fromCategory
  );
  const toDrawerOptions = transferPaymentOptions.filter(
    (option) => !toCategory || option.category === toCategory
  );

  // Modified function to handle category changes and prevent showing the placeholder
  const handleCategoryChange = (
    newCategory: PaymentCategory | null,
    setCategory: React.Dispatch<React.SetStateAction<PaymentCategory | null>>,
    currentWalletId: string,
    setWalletId: React.Dispatch<React.SetStateAction<string>>,
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    // Update the selected category state
    setCategory(newCategory);

    if (!newCategory) return;

    // If current selection doesn't match the new category, clear it
    if (currentWalletId) {
      const currentOption = transferPaymentOptions.find(
        (w) => w.id === currentWalletId
      );
      if (!currentOption || currentOption.category !== newCategory) {
        // Clear the selection - don't auto-select anything
        setWalletId("");
      }
    }

    // Always open the drawer when category is selected
    setDrawerOpen(true);
  };

  // Simple fee calculation for transfer (1% fee)
  const amount = fromAmount ? parseFloat(fromAmount) : 0;

  // Get exchange info using the utility function
  const exchangeInfo = getExchangeInfo(fromWallet, toWallet);

  // Currency symbols from utility function
  const fromCurrencySymbol = getCurrencySymbol(fromWallet);
  const toCurrencySymbol = getCurrencySymbol(toWallet);

  // Calculate converted amount manually to ensure consistency
  const convertedNetAmount = convertCurrency(netAmount, fromWallet, toWallet);

  // Construct the object expected by ConfirmationMessage
  const confirmationWalletProp = selectedToPaymentMethod
    ? {
        id: selectedToPaymentMethod.id,
        name: selectedToPaymentMethod.name,
        // Map category back to the old 'type' field and cast
        type: "mobile" as "mobile", // Always mobile for non-crypto
        logo: selectedToPaymentMethod.logo,
        description: selectedToPaymentMethod.description,
        color: selectedToPaymentMethod.color || "#cccccc",
        isLocalImage: true, // Always true for non-crypto
      }
    : undefined;

  return (
    <>
      {/* From Section */}
      <div className='space-y-3'>
        <label className='text-sm text-gray-600 font-medium ml-1 mb-1 block'>
          From
        </label>
        <Select
          value={fromCategory ?? ""}
          onValueChange={(value) =>
            handleCategoryChange(
              value as PaymentCategory,
              setFromCategory,
              fromWallet,
              setFromWallet,
              setFromDrawerOpen
            )
          }>
          <SelectTrigger className='w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg p-3 shadow-sm h-12'>
            <SelectValue placeholder='Select category...' />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                <div className='flex items-center gap-2'>
                  <cat.icon className='h-5 w-5' />
                  {cat.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {fromCategory && (
          <WalletSelector
            label='Source'
            selected={fromWallet}
            onSelect={setFromWallet}
            type='from'
            paymentMethodOptions={fromDrawerOptions}
            showDrawer={fromDrawerOpen}
            setShowDrawer={setFromDrawerOpen}
          />
        )}

        <div className='relative'>
          <Input
            type='number'
            placeholder='0.00'
            value={fromAmount}
            onChange={handleAmountChange}
            className='bg-gray-50 border border-gray-200 text-gray-900 rounded-lg shadow-sm transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/30 h-12 text-lg pl-12'
            min='0'
          />
          <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 flex items-center'>
            <span className='w-6'>{fromCurrencySymbol}</span>
          </div>
          {isMpesa(fromWallet) && (
            <div className='absolute right-3 top-1/2 -translate-y-1/2 flex items-center'>
              <span className='text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-full'>
                KES
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Swap Button */}
      <div className='flex justify-center'>
        <div className='p-1.5 bg-gradient-to-br from-[#00805a]/80 to-[#00805a]/60 rounded-full shadow-lg'>
          <Button
            type='button'
            variant='outline'
            size='icon'
            className='rounded-full border-0 h-12 w-12 bg-white hover:bg-gray-50 text-gray-700 transition-all duration-300 hover:scale-105'
            onClick={handleSwapWallets}>
            <ArrowDown className='h-6 w-6' />
          </Button>
        </div>
      </div>

      {/* To Section */}
      <div className='space-y-3'>
        <label className='text-sm text-gray-600 font-medium ml-1 mb-1 block'>
          To
        </label>
        <Select
          value={toCategory ?? ""}
          onValueChange={(value) =>
            handleCategoryChange(
              value as PaymentCategory,
              setToCategory,
              toWallet,
              setToWallet,
              setToDrawerOpen
            )
          }>
          <SelectTrigger className='w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg p-3 shadow-sm h-12'>
            <SelectValue placeholder='Select category...' />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                <div className='flex items-center gap-2'>
                  <cat.icon className='h-5 w-5' />
                  {cat.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {toCategory && (
          <WalletSelector
            label='Destination'
            selected={toWallet}
            onSelect={setToWallet}
            type='to'
            paymentMethodOptions={toDrawerOptions}
            showDrawer={toDrawerOpen}
            setShowDrawer={setToDrawerOpen}
          />
        )}

        <div className='relative'>
          <Input
            type='text'
            placeholder='0.00'
            value={estimatedAmount}
            readOnly
            className='w-full bg-gray-50 border border-gray-200 text-gray-500 rounded-lg shadow-sm h-12 text-lg pl-12'
          />
          <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 flex items-center'>
            <span className='w-6'>{toCurrencySymbol}</span>
          </div>
          {isMpesa(fromWallet) !== isMpesa(toWallet) && (
            <div className='absolute right-3 top-1/2 -translate-y-1/2 flex items-center'>
              <span className='text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-full'>
                {isMpesa(toWallet) ? "KES" : "USD"}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Transaction Summary - Enhanced with detailed exchange info */}
      {showSummary && fromWallet && toWallet && (
        <div className='mt-4 pt-4 border-t border-gray-200'>
          <TransactionSummary
            fromAmount={fromAmount}
            serviceFee={serviceFee}
            netAmount={convertedNetAmount}
            fromWallet={fromWallet}
            toWallet={toWallet}
            exchangeRate={exchangeInfo.rate}
            exchangeInfo={exchangeInfo.description}
          />
        </div>
      )}

      {/* Action Button */}
      <div className='pt-6'>
        <Button
          type='submit'
          className='w-full bg-[#00805a] hover:bg-[#00805a]/90 text-white font-semibold py-6 rounded-lg shadow-lg shadow-[#00805a]/20 transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] border border-[#00805a]/10'
          disabled={Boolean(
            isLoading ||
              !fromAmount ||
              parseFloat(fromAmount) <= 0 ||
              !fromWallet ||
              !toWallet
          )}>
          {isLoading ? (
            <>
              <RefreshCw className='mr-2 h-5 w-5 animate-spin' />
              Processing...
            </>
          ) : (
            "Transfer Funds"
          )}
        </Button>
      </div>
    </>
  );
};
