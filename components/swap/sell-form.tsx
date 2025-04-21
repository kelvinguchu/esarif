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

  const showAmountPreview = fromAmount && parseFloat(fromAmount) > 0;
  const showSellDetails = showAmountPreview && fromWallet && toWallet;

  return (
    <>
      {/* I Want Section - Sell Mode */}
      <div className='space-y-3'>
        <div className='flex items-center gap-2 mb-1'>
          <WalletIcon className='h-4 w-4 text-primary' />
          <label className='text-sm text-gray-700 font-medium'>
            I want to sell
          </label>
        </div>
        <div className='p-0.5 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl'>
          <div className='bg-white rounded-lg p-2'>
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
      <div className='flex justify-center my-2'>
        <div className='p-1 bg-gray-100 rounded-full'>
          <ArrowDown className='h-4 w-4 text-gray-400' />
        </div>
      </div>

      {/* For Section - Sell Mode */}
      <div className='space-y-3'>
        <div className='flex items-center gap-2 mb-1'>
          <DollarSign className='h-4 w-4 text-green-600' />
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

      {/* Payment Method - Sell Mode */}
      <div className='space-y-3'>
        <div className='flex items-center gap-2 mb-1'>
          <PiggyBank className='h-4 w-4 text-blue-600' />
          <label className='text-sm text-gray-700 font-medium'>
            Receive Payment Via
          </label>
        </div>
        <div className='p-0.5 bg-gradient-to-r from-blue-100/50 to-blue-50 rounded-xl'>
          <div className='bg-white rounded-lg p-2'>
            <PaymentMethodSelector />
          </div>
        </div>
      </div>

      {/* Sell Details Section - Conditionally Rendered */}
      {showSellDetails && (
        <div className='mt-6 pt-6 border-t border-gray-200 bg-gradient-to-b from-white to-gray-50/30'>
          <SellDetails />
        </div>
      )}

      {/* Action Button */}
      <div className='pt-6'>
        <Button
          type='submit'
          className='w-full bg-[#00805a] hover:bg-[#00805a]/90 text-white font-semibold py-6 rounded-lg shadow-lg shadow-[#00805a]/20 transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] border border-[#00805a]/10'
          disabled={Boolean(
            isLoading || !showAmountPreview || !fromWallet || !toWallet
          )}>
          {isLoading ? (
            <>
              <RefreshCw className='mr-2 h-5 w-5 animate-spin' />
              Processing...
            </>
          ) : (
            <>
              <WalletIcon className='mr-2 h-4 w-4' />
              Sell Crypto
            </>
          )}
        </Button>
      </div>
    </>
  );
};
