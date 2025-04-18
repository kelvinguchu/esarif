"use client";

import { useState } from "react";
import { ArrowDown, RefreshCw, ArrowRightLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WalletSelector } from "./wallet-selector";
import { TransactionSummary } from "./transaction-summary";
import { ConfirmationMessage } from "./confirmation-message";
import {
  walletOptions,
  currencyRates,
  getEquivalentRates,
} from "./wallet-data";

export const SwapForm = () => {
  const [fromWallet, setFromWallet] = useState("MPESA");
  const [toWallet, setToWallet] = useState("USDT-TRC20");
  const [fromAmount, setFromAmount] = useState("");
  const [recipientAccount, setRecipientAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [fromDrawerOpen, setFromDrawerOpen] = useState(false);
  const [toDrawerOpen, setToDrawerOpen] = useState(false);

  // Service fee calculation (1%)
  const serviceFee = fromAmount ? parseFloat(fromAmount) * 0.01 : 0;

  // Net amount after fee
  const netAmount = fromAmount ? parseFloat(fromAmount) - serviceFee : 0;

  // Since everything is now in USD, the estimated amount is the same as netAmount
  const estimatedAmount = fromAmount ? netAmount.toFixed(2) : "0";

  // Get equivalent rates
  const equivalentRates = getEquivalentRates();

  const selectedFromWallet = walletOptions.find(
    (wallet) => wallet.id === fromWallet
  );
  const selectedToWallet = walletOptions.find(
    (wallet) => wallet.id === toWallet
  );

  // Handle amount change with conversion preview
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromAmount(value);

    // When amount changes, we can show the summary after a valid amount is entered
    if (value && parseFloat(value) > 0) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Show success message or handle next steps
    }, 1500);
  };

  // Recipient field no longer needed
  const shouldShowRecipientField = false;

  return (
    <Card className='border border-white/10 shadow-xl bg-gradient-to-b from-[#0a2348] to-[#001a38] rounded-xl overflow-hidden backdrop-blur-sm'>
      <CardHeader className='bg-gradient-to-r from-[#ebeffb]/10 to-[#ebeffb]/5 rounded-t-lg px-6 py-4 border-b border-white/5'>
        <CardTitle className='text-white text-xl flex items-center gap-2'>
          <div className='bg-gradient-to-r from-primary to-blue-500 rounded-full p-1.5'>
            <ArrowRightLeft className='h-5 w-5 text-white' />
          </div>
          Cross-Wallet Swap
        </CardTitle>
      </CardHeader>

      <CardContent className='pt-6 px-6 bg-transparent'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* From Section */}
          <div className='space-y-3'>
            <label className='text-sm text-white/60 font-medium ml-1 mb-1 block'>
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
                  className='bg-[#001a38]/80 border border-white/10 text-white rounded-lg shadow-inner shadow-black/20 transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/30 h-12 text-lg pl-7'
                  min='0'
                />
                <div className='absolute left-3 top-1/2 -translate-y-1/2 text-white/80'>
                  $
                </div>
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <div className='flex justify-center'>
            <div className='p-1.5 bg-gradient-to-br from-primary/80 to-blue-500/80 rounded-full shadow-lg'>
              <Button
                type='button'
                variant='outline'
                size='icon'
                className='rounded-full border-0 h-12 w-12 bg-[#001a38] hover:bg-[#0a2348] text-white transition-all duration-300 hover:scale-105'
                onClick={handleSwapWallets}>
                <ArrowDown className='h-6 w-6' />
              </Button>
            </div>
          </div>

          {/* To Section */}
          <div className='space-y-3'>
            <label className='text-sm text-white/60 font-medium ml-1 mb-1 block'>
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
                  className='w-full bg-[#001a38]/60 border border-white/10 text-white/80 rounded-lg shadow-inner shadow-black/20 h-12 text-lg pl-7'
                />
                <div className='absolute left-3 top-1/2 -translate-y-1/2 text-white/80'>
                  $
                </div>           
              </div>
            </div>
          </div>

          {/* Transaction Summary - conditionally rendered */}
          {showSummary && (
            <div className='mt-4 pt-4 border-t border-white/10'>
              <TransactionSummary
                fromAmount={fromAmount}
                serviceFee={serviceFee}
                netAmount={netAmount}
              />
            </div>
          )}

          {/* Action Button */}
          <div className='pt-6'>
            <Button
              type='submit'
              className='w-full bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 text-white font-semibold py-6 rounded-lg shadow-lg shadow-primary/20 transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] border border-white/10'
              disabled={Boolean(
                isLoading || !fromAmount || parseFloat(fromAmount) <= 0
              )}>
              {isLoading ? (
                <>
                  <RefreshCw className='mr-2 h-5 w-5 animate-spin' />
                  Processing...
                </>
              ) : (
                "Swap Now"
              )}
            </Button>
          </div>

          {/* Confirmation Message */}
          {fromAmount && !isLoading && parseFloat(fromAmount) > 0 && (
            <ConfirmationMessage
              estimatedAmount={estimatedAmount}
              toWallet={toWallet}
              selectedWallet={selectedToWallet}
              recipientAccount={recipientAccount}
              shouldShowRecipientField={shouldShowRecipientField}
              currencySymbol='$'
            />
          )}
        </form>
      </CardContent>
    </Card>
  );
};
