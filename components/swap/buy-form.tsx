"use client";

import React from "react";
import { RefreshCw, DollarSign } from "lucide-react";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WalletSelector } from "./wallet-selector";
import { PaymentMethodSelector } from "./payment-method-selector";
import { CurrencyId, WalletInfo } from "@/lib/swap/types";
import { cryptoWallets, paymentMethods, currencyRates } from "@/lib/swap/data";
import { calculateCryptoBuyAmount } from "@/lib/swap/utils";
import { useSwapContext } from "@/context/swap-context";
import { BuyDetails } from "./buy-details";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

export const BuyForm = () => {
  const {
    toWallet,
    setToWallet,
    fromAmount,
    handleAmountChange,
    toDrawerOpen,
    setToDrawerOpen,
    selectedBank,
    setSelectedBank,
    bankDrawerOpen,
    setBankDrawerOpen,
    isLoading,
    stkDialogOpen,
    setStkDialogOpen,
    setIsLoading,
  } = useSwapContext();

  const showDetails = Boolean(
    selectedBank && toWallet && fromAmount && parseFloat(fromAmount) > 0
  );

  const isMpesaSelected = selectedBank === "mpesa";

  const handleDialogClose = () => {
    setStkDialogOpen(false);
    setIsLoading(false);
  };

  return (
    <>
      {/* I Want Section - Buy Mode */}
      <div className='space-y-3'>
        <label className='text-sm text-gray-600 font-medium ml-1 mb-1 block'>
          I want to buy
        </label>
        <div className='flex flex-col gap-3'>
          <WalletSelector
            label='Buy'
            selected={toWallet}
            onSelect={setToWallet}
            type='to'
            walletOptions={cryptoWallets}
            showDrawer={toDrawerOpen}
            setShowDrawer={setToDrawerOpen}
          />
        </div>
      </div>

      {/* For Section - Buy Mode */}
      <div className='space-y-3'>
        <label className='text-sm text-gray-600 font-medium ml-1 mb-1 block'>
          For
        </label>
        <div className='flex flex-col gap-3'>
          <div className='relative'>
            <Input
              type='number'
              placeholder='0.00'
              value={fromAmount}
              onChange={handleAmountChange}
              className='bg-gray-50 border border-gray-200 text-gray-900 rounded-lg shadow-sm transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/30 h-12 text-lg pl-7'
              min='0'
            />
            <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'>
              $
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method - Buy Mode */}
      <div className='space-y-3'>
        <label className='text-sm text-gray-600 font-medium ml-1 mb-1 block'>
          Payment Method
        </label>
        <div className='flex flex-col gap-3'>
          <PaymentMethodSelector />
        </div>
      </div>

      {/* Render BuyDetails if conditions met */}
      {showDetails && <BuyDetails />}

      {/* Action Button */}
      <div className='pt-6'>
        <Button
          type='submit'
          className='w-full bg-[#00805a] hover:bg-[#00805a]/90 text-white font-semibold py-6 rounded-lg shadow-lg shadow-[#00805a]/20 transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] border border-[#00805a]/10'
          disabled={Boolean(
            isLoading || !fromAmount || parseFloat(fromAmount) <= 0
          )}>
          {isLoading ? (
            <>
              <RefreshCw className='mr-2 h-5 w-5 animate-spin' />
              Processing...
            </>
          ) : isMpesaSelected ? (
            "Send STK Push"
          ) : (
            "Buy Crypto"
          )}
        </Button>
      </div>

      {/* STK Push Dialog (Rendered based on context state) */}
      <Dialog open={stkDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className='w-[90%] sm:w-full max-w-sm'>
          <DialogHeader>
            <DialogTitle>STK Push Initiated</DialogTitle>
          </DialogHeader>
          <p className='text-xs sm:text-sm text-gray-600 py-2 sm:py-4'>
            An STK push will be sent in production.
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
};
