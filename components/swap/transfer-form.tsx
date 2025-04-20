"use client";

import { ArrowDown, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WalletSelector } from "./wallet-selector";
import { TransactionSummary } from "./transaction-summary";
import { ConfirmationMessage } from "./confirmation-message";
import { WalletInfo } from "@/lib/swap/types";
import { walletOptions } from "@/lib/swap/data";
import { useSwapContext } from "@/context/swap-context";

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
    selectedToWalletInfo,
  } = useSwapContext();

  return (
    <>
      {/* From Section - Transfer Mode */}
      <div className='space-y-3'>
        <label className='text-sm text-gray-600 font-medium ml-1 mb-1 block'>
          From
        </label>
        <div className='flex flex-col gap-3'>
          <WalletSelector
            label='Source'
            selected={fromWallet}
            onSelect={setFromWallet}
            type='from'
            walletOptions={walletOptions}
            showDrawer={fromDrawerOpen}
            setShowDrawer={setFromDrawerOpen}
          />

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

      {/* Add USDT to KES rate info when MPESA is selected */}
      {fromWallet === "MPESA" && toWallet.includes("USDT") && (
        <div className='mt-1 p-2 rounded-lg bg-blue-50 border border-blue-100 text-xs text-blue-700'>
          <div className='flex items-center justify-between'>
            <span>USDT to KES rate:</span>
            <span>1 USDT ≈ 128.55 KSh</span>
          </div>
        </div>
      )}

      {/* Swap Button - Transfer Mode */}
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

      {/* To Section - Transfer Mode */}
      <div className='space-y-3'>
        <label className='text-sm text-gray-600 font-medium ml-1 mb-1 block'>
          To
        </label>
        <div className='flex flex-col gap-3'>
          <WalletSelector
            label='Destination'
            selected={toWallet}
            onSelect={setToWallet}
            type='to'
            walletOptions={walletOptions}
            showDrawer={toDrawerOpen}
            setShowDrawer={setToDrawerOpen}
          />

          <div className='relative'>
            <Input
              type='text'
              placeholder='0.00'
              value={estimatedAmount}
              readOnly
              className='w-full bg-gray-50 border border-gray-200 text-gray-500 rounded-lg shadow-sm h-12 text-lg pl-7'
            />
            <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'>
              $
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Summary */}
      {showSummary && (
        <div className='mt-4 pt-4 border-t border-gray-200'>
          <TransactionSummary
            fromAmount={fromAmount}
            serviceFee={serviceFee}
            netAmount={netAmount}
            toWallet={toWallet}
          />
        </div>
      )}

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
            "Transfer Funds"
          )}
        </Button>
      </div>

      {/* Confirmation Message */}
      {fromAmount && !isLoading && parseFloat(fromAmount) > 0 && (
        <ConfirmationMessage
          estimatedAmount={estimatedAmount}
          toWallet={toWallet}
          selectedWallet={selectedToWalletInfo}
          currencySymbol='$'
        />
      )}
    </>
  );
};
