"use client";

import {
  RefreshCw,
  DollarSign,
  Wallet as WalletIcon,
  PiggyBank,
  ArrowDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WalletSelector } from "./wallet-selector";
import { PaymentMethodSelector } from "./payment-method-selector";
import SellDetails from "./sell-details";
import { paymentMethods } from "@/lib/swap/data";
import { useSwapContext } from "@/context/swap-context";
import { PaymentMethodOption } from "@/lib/swap/types";

// Filter crypto options from paymentMethods
const cryptoPaymentOptions = paymentMethods.filter(
  (method) => method.category === "crypto"
);

export const SellForm = () => {
  const {
    fromWallet,
    setFromWallet,
    fromAmount,
    handleAmountChange,
    fromDrawerOpen,
    setFromDrawerOpen,
    isLoading,
    selectedBank,
    toWallet,
  } = useSwapContext();

  const validAmount = fromAmount && parseFloat(fromAmount) > 0;
  const validPaymentMethod = Boolean(selectedBank);

  // Only show details when both amount and payment method are provided
  const showSellDetails = validAmount && fromWallet && validPaymentMethod;

  return (
    <>
      {/* I Want Section - Sell Mode */}
      <div className='space-y-2'>
        <div className='flex items-center gap-2'>
          <label className='text-sm text-gray-700 font-medium'>
            I want to sell
          </label>
        </div>
        <div className='rounded-lg border border-primary/20 overflow-hidden'>
          <div className='bg-primary/5 px-3 py-2'>
            <WalletSelector
              label='Sell Crypto'
              selected={fromWallet}
              onSelect={setFromWallet}
              type='from'
              paymentMethodOptions={cryptoPaymentOptions}
              showDrawer={fromDrawerOpen}
              setShowDrawer={setFromDrawerOpen}
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

      {/* For Section - Sell Mode */}
      <div className='space-y-2'>
        <div className='flex items-center gap-2'>
          <label className='text-sm text-gray-700 font-medium'>
            For (USD amount)
          </label>
        </div>
        <div className='relative'>
          <Input
            type='number'
            placeholder='0.00'
            value={fromAmount}
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

      {/* Payment Method - Sell Mode */}
      <div className='space-y-2'>
        <div className='flex items-center gap-2'>
          <label className='text-sm text-gray-700 font-medium'>
            Receive Payment Via
          </label>
        </div>
        <div className='rounded-lg border border-blue-100 overflow-hidden'>
          <div className='bg-blue-50/50 px-3 py-2'>
            <PaymentMethodSelector />
          </div>
        </div>
      </div>

      {/* Sell Details Section - Conditionally Rendered */}
      {showSellDetails && (
        <div className='mt-8 pt-2'>
          <SellDetails />
        </div>
      )}

      {/* Action Button */}
      <div className='pt-6'>
        <Button
          type='submit'
          className='w-full bg-[#00805a] hover:bg-[#00805a]/90 text-white font-semibold py-6 rounded-lg shadow-md shadow-[#00805a]/10 transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] border border-[#00805a]/10'
          disabled={Boolean(
            isLoading || !validAmount || !fromWallet || !validPaymentMethod
          )}>
          {isLoading ? (
            <>
              <RefreshCw className='mr-2 h-5 w-5 animate-spin' />
              Processing...
            </>
          ) : (
            <>Sell Crypto</>
          )}
        </Button>
      </div>
    </>
  );
};
