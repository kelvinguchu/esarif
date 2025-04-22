"use client";

import React from "react";
import {
  RefreshCw,
  CreditCard,
  ArrowDown,
  DollarSign,
  Bitcoin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WalletSelector } from "./wallet-selector";
import { PaymentMethodSelector } from "./payment-method-selector";
import { paymentMethods } from "@/lib/swap/data";
import { useSwapContext } from "@/context/swap-context";
import { BuyDetails } from "./buy-details";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Filter crypto options from paymentMethods
const cryptoPaymentOptions = paymentMethods.filter(
  (method) => method.category === "crypto"
);

export const BuyForm = () => {
  const {
    toWallet, // This is the crypto ID user wants to buy
    setToWallet,
    fromAmount, // This is the USD amount user wants to spend
    handleAmountChange,
    toDrawerOpen,
    setToDrawerOpen,
    selectedBank, // This is the ID of the bank/mobile user pays with
    isLoading,
    stkDialogOpen,
    setStkDialogOpen,
    setIsLoading,
  } = useSwapContext();

  // Define conditions for showing details and enabling button
  const validAmountEntered = fromAmount && parseFloat(fromAmount) > 0;
  const cryptoSelected = Boolean(toWallet);
  const paymentMethodSelected = Boolean(selectedBank); // Explicitly check selectedBank

  // Show details requires: Valid Amount, Crypto selected, Payment Method selected
  const showDetails =
    validAmountEntered && cryptoSelected && paymentMethodSelected;

  const isMpesaSelected = selectedBank === "MPESA"; // Check based on selectedBank

  const handleDialogClose = () => {
    setStkDialogOpen(false);
    setIsLoading(false); // Reset loading when dialog closes
  };

  return (
    <>
      {/* I Want Section - Buy Mode (Crypto Selection) */}
      <div className='space-y-2'>
        <div className='flex items-center gap-2'>
          <label className='text-sm text-gray-700 font-medium'>
            I want to buy
          </label>
        </div>
        <div className='rounded-lg border border-amber-100 overflow-hidden'>
          <div className='bg-amber-50/50 px-3 py-2'>
            <WalletSelector
              label='Buy Crypto' // Updated label
              selected={toWallet} // The crypto to buy
              onSelect={setToWallet}
              type='to' // Keep type if needed internally
              paymentMethodOptions={cryptoPaymentOptions} // Pass filtered crypto options
              showDrawer={toDrawerOpen}
              setShowDrawer={setToDrawerOpen}
            />
          </div>
        </div>
      </div>

      {/* Flow arrow */}
      <div className='flex justify-center my-3'>
        <div className='bg-gray-100 rounded-full p-1.5 shadow-sm'>
          <ArrowDown className='h-4 w-4 text-gray-500' />
        </div>
      </div>

      {/* For Section - Buy Mode (Amount in USD) */}
      <div className='space-y-2'>
        <div className='flex items-center gap-2'>
          <label className='text-sm text-gray-700 font-medium'>
            For (Amount in USD)
          </label>
        </div>
        <div className='relative'>
          <Input
            type='number'
            placeholder='0.00'
            value={fromAmount} // User inputs USD amount to spend
            onChange={handleAmountChange}
            className='bg-white border border-green-100 text-gray-900 rounded-lg shadow-sm transition-all focus:border-green-200 focus:ring-1 focus:ring-green-300/30 h-12 text-lg pl-12'
            min='0'
          />
          <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 flex items-center'>
            <span className='w-6 flex justify-center text-green-600 font-semibold'>
              $
            </span>
          </div>
        </div>
      </div>

      {/* Flow arrow */}
      <div className='flex justify-center my-3'>
        <div className='bg-gray-100 rounded-full p-1.5 shadow-sm'>
          <ArrowDown className='h-4 w-4 text-gray-500' />
        </div>
      </div>

      {/* Payment Method - Buy Mode (How user pays) */}
      <div className='space-y-2'>
        <div className='flex items-center gap-2'>
          <label className='text-sm text-gray-700 font-medium'>
            Payment Method
          </label>
        </div>
        <div className='rounded-lg border border-blue-100 overflow-hidden'>
          <div className='bg-blue-50/50 px-3 py-2'>
            <PaymentMethodSelector />
          </div>
        </div>
      </div>

      {/* Render BuyDetails only when all conditions are met */}
      {showDetails && (
        <div className='mt-8 pt-2'>
          <BuyDetails />
        </div>
      )}

      {/* Action Button */}
      <div className='pt-6'>
        <Button
          type='submit'
          className='w-full bg-[#00805a] hover:bg-[#00805a]/90 text-white font-semibold py-6 rounded-lg shadow-md shadow-[#00805a]/10 transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] border border-[#00805a]/10'
          disabled={Boolean(
            isLoading ||
              !validAmountEntered ||
              !cryptoSelected ||
              !paymentMethodSelected
          )}>
          {isLoading ? (
            <>
              <RefreshCw className='mr-2 h-5 w-5 animate-spin' />
              Processing...
            </>
          ) : isMpesaSelected ? (
            <>Send STK Push</>
          ) : (
            <>Buy Crypto</>
          )}
        </Button>
      </div>

      {/* STK Push Dialog (Rendered based on context state) */}
      <Dialog open={stkDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className='w-[90%] sm:w-full max-w-sm bg-white'>
          <DialogHeader>
            <DialogTitle className='flex items-center gap-2 text-blue-800'>
              STK Push Initiated
            </DialogTitle>
          </DialogHeader>
          <div className='text-xs sm:text-sm text-gray-600 py-3 sm:py-4 px-4 bg-blue-50/50 rounded-lg border border-blue-100 mt-2'>
            <p>
              An STK push will be sent in production. Please enter your PIN on
              your phone.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
