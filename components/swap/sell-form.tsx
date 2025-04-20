"use client";

import { RefreshCw, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WalletSelector } from "./wallet-selector";
import { PaymentMethodSelector } from "./payment-method-selector";
import { cryptoWallets, paymentMethods } from "@/lib/swap/data";
import { useSwapContext } from "@/context/swap-context";

export const SellForm = () => {
  const {
    fromWallet,
    setFromWallet,
    fromAmount,
    handleAmountChange,
    fromDrawerOpen,
    setFromDrawerOpen,
    selectedBank,
    setSelectedBank,
    bankDrawerOpen,
    setBankDrawerOpen,
    isLoading,
  } = useSwapContext();

  const showPreview = fromAmount && parseFloat(fromAmount) > 0;

  return (
    <>
      {/* I Want Section - Sell Mode */}
      <div className='space-y-3'>
        <label className='text-sm text-gray-600 font-medium ml-1 mb-1 block'>
          I want to sell
        </label>
        <div className='flex flex-col gap-3'>
          <WalletSelector
            label='Sell'
            selected={fromWallet}
            onSelect={setFromWallet}
            type='from'
            walletOptions={cryptoWallets}
            showDrawer={fromDrawerOpen}
            setShowDrawer={setFromDrawerOpen}
          />
        </div>
      </div>

      {/* For Section - Sell Mode */}
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

          {/* Display USD preview */}
          {showPreview && (
            <div className='mt-1 flex items-center gap-1'>
              <div className='p-1 rounded-full bg-[#00805a]/20'>
                <DollarSign className='h-3 w-3 text-[#00805a]' />
              </div>
              <span className='text-xs text-gray-500'>
                {`You will receive $${fromAmount || "0"} USD`}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Payment Method - Sell Mode */}
      <div className='space-y-3'>
        <label className='text-sm text-gray-600 font-medium ml-1 mb-1 block'>
          Receive Payment Via
        </label>
        <div className='flex flex-col gap-3'>
          <PaymentMethodSelector />
        </div>
      </div>

      {/* Action Button */}
      <div className='pt-6'>
        <Button
          type='submit' // Changed to submit
          className='w-full bg-[#00805a] hover:bg-[#00805a]/90 text-white font-semibold py-6 rounded-lg shadow-lg shadow-[#00805a]/20 transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] border border-[#00805a]/10'
          disabled={Boolean(
            isLoading || !fromAmount || parseFloat(fromAmount) <= 0
          )}>
          {isLoading ? (
            <>
              <RefreshCw className='mr-2 h-5 w-5 animate-spin' />
              Processing...
            </>
          ) : (
            "Sell Crypto"
          )}
        </Button>
      </div>
    </>
  );
};
