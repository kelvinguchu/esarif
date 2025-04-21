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
    fromWallet, // Context now manages fromWallet based on selectedBank for buy mode
  } = useSwapContext();

  // Show details requires: Amount, Payment method selected (fromWallet/selectedBank), Crypto selected (toWallet)
  const showDetails = Boolean(
    fromWallet && toWallet && fromAmount && parseFloat(fromAmount) > 0
  );

  const isMpesaSelected = fromWallet === "MPESA"; // Check based on the actual payment method used (fromWallet)

  const handleDialogClose = () => {
    setStkDialogOpen(false);
    setIsLoading(false); // Reset loading when dialog closes
  };

  return (
    <>
      {/* I Want Section - Buy Mode (Crypto Selection) */}
      <div className='space-y-3'>
        <div className='flex items-center gap-2 mb-1'>
          <Bitcoin className='h-4 w-4 text-amber-500' />
          <label className='text-sm text-gray-700 font-medium'>
            I want to buy
          </label>
        </div>
        <div className='p-0.5 bg-gradient-to-r from-amber-100 to-amber-50 rounded-xl'>
          <div className='bg-white rounded-lg p-2'>
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
      <div className='flex justify-center my-2'>
        <div className='p-1 bg-gray-100 rounded-full'>
          <ArrowDown className='h-4 w-4 text-gray-400' />
        </div>
      </div>

      {/* For Section - Buy Mode (Amount in USD) */}
      <div className='space-y-3'>
        <div className='flex items-center gap-2 mb-1'>
          <DollarSign className='h-4 w-4 text-green-600' />
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
            className='bg-gray-50 border border-gray-200 text-gray-900 rounded-lg shadow-sm transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/30 h-12 text-lg pl-12'
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
      <div className='flex justify-center my-2'>
        <div className='p-1 bg-gray-100 rounded-full'>
          <ArrowDown className='h-4 w-4 text-gray-400' />
        </div>
      </div>

      {/* Payment Method - Buy Mode (How user pays) */}
      <div className='space-y-3'>
        <div className='flex items-center gap-2 mb-1'>
          <CreditCard className='h-4 w-4 text-blue-600' />
          <label className='text-sm text-gray-700 font-medium'>
            Payment Method
          </label>
        </div>
        <div className='p-0.5 bg-gradient-to-r from-blue-100/50 to-blue-50 rounded-xl'>
          <div className='bg-white rounded-lg p-2'>
            <PaymentMethodSelector />
          </div>
        </div>
      </div>

      {/* Render BuyDetails if conditions met */}
      {showDetails && (
        <div className='mt-6 pt-6 border-t border-gray-200 bg-gradient-to-b from-white to-gray-50/30'>
          <BuyDetails />
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
              !fromWallet || // Must select payment method
              !toWallet // Must select crypto to buy
          )}>
          {isLoading ? (
            <>
              <RefreshCw className='mr-2 h-5 w-5 animate-spin' />
              Processing...
            </>
          ) : isMpesaSelected ? (
            <>
              <span className='mr-2'>📱</span>
              Send STK Push
            </>
          ) : (
            <>
              <Bitcoin className='mr-2 h-4 w-4' />
              Buy Crypto
            </>
          )}
        </Button>
      </div>

      {/* STK Push Dialog (Rendered based on context state) */}
      <Dialog open={stkDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className='w-[90%] sm:w-full max-w-sm bg-gradient-to-b from-blue-50 to-white'>
          <DialogHeader>
            <DialogTitle className='flex items-center gap-2 text-blue-800'>
              <span className='text-xl'>📱</span>
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
