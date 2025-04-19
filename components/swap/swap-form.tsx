"use client";

import { useState } from "react";
import {
  ArrowDown,
  RefreshCw,
  ArrowRightLeft,
  DollarSign,
  Wallet,
  Building,
  CreditCard,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WalletSelector } from "./wallet-selector";
import { BankSelector } from "./bank-selector";
import { TransactionSummary } from "./transaction-summary";
import { ConfirmationMessage } from "./confirmation-message";
import {
  walletOptions,
  currencyRates,
  getEquivalentRates,
  cryptoWallets,
  mobileWallets,
  somaliaBanks,
} from "./wallet-data";

// Trading mode type
type TradingMode = "buy" | "sell" | "transfer";

export const SwapForm = () => {
  // Mode selection state
  const [mode, setMode] = useState<TradingMode>("buy");

  // Common states
  const [fromWallet, setFromWallet] = useState("BTC");
  const [toWallet, setToWallet] = useState("USDT-TRC20");
  const [fromAmount, setFromAmount] = useState("");
  const [recipientAccount, setRecipientAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [fromDrawerOpen, setFromDrawerOpen] = useState(false);
  const [toDrawerOpen, setToDrawerOpen] = useState(false);

  // Bank selection state
  const [selectedBank, setSelectedBank] = useState(somaliaBanks[0].id);
  const [bankDrawerOpen, setBankDrawerOpen] = useState(false);

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

  const selectedBankInfo = somaliaBanks.find(
    (bank) => bank.id === selectedBank
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

  // Recipient field no longer needed for most operations
  const shouldShowRecipientField = false;

  // Handle mode change
  const handleModeChange = (newMode: TradingMode) => {
    setMode(newMode);

    // Reset states when changing modes
    setFromAmount("");
    setShowSummary(false);

    // Set appropriate defaults based on the selected mode
    if (newMode === "buy") {
      setFromWallet("MPESA");
      setToWallet("BTC");
    } else if (newMode === "sell") {
      setFromWallet("BTC");
      setToWallet("MPESA");
    } else {
      setFromWallet("MPESA");
      setToWallet("USDT-TRC20");
    }
  };

  return (
    <Card className='border border-white/10 shadow-xl bg-gradient-to-b from-[#0a2348] to-[#001a38] rounded-xl overflow-hidden backdrop-blur-sm'>
      <CardHeader className='bg-gradient-to-r from-[#ebeffb]/10 to-[#ebeffb]/5 rounded-t-lg px-6 py-4 border-b border-white/5'>
        <CardTitle className='text-white text-xl flex items-center gap-2'>
          <div className='bg-gradient-to-r from-primary to-blue-500 rounded-full p-1.5'>
            <ArrowRightLeft className='h-5 w-5 text-white' />
          </div>
          e-Sarif Trading
        </CardTitle>
      </CardHeader>

      <CardContent className='pt-6 px-6 bg-transparent'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Mode Selector */}
          <div className='space-y-3'>
            <label className='text-sm text-white/60 font-medium ml-1 mb-1 block'>
              I want to
            </label>
            <div className='grid grid-cols-3 gap-2'>
              <Button
                type='button'
                onClick={() => handleModeChange("buy")}
                className={`${
                  mode === "buy"
                    ? "bg-[#00805a] hover:bg-[#00805a]/90"
                    : "bg-[#001a38]/80 hover:bg-[#00805a]/30"
                } text-white border border-white/10 font-medium rounded-md`}>
                Buy
              </Button>
              <Button
                type='button'
                onClick={() => handleModeChange("sell")}
                className={`${
                  mode === "sell"
                    ? "bg-[#00805a] hover:bg-[#00805a]/90"
                    : "bg-[#001a38]/80 hover:bg-[#00805a]/30"
                } text-white border border-white/10 font-medium rounded-md`}>
                Sell
              </Button>
              <Button
                type='button'
                onClick={() => handleModeChange("transfer")}
                className={`${
                  mode === "transfer"
                    ? "bg-[#00805a] hover:bg-[#00805a]/90"
                    : "bg-[#001a38]/80 hover:bg-[#00805a]/30"
                } text-white border border-white/10 font-medium rounded-md`}>
                Transfer
              </Button>
            </div>
          </div>

          {/* Conditional UI based on the selected mode */}
          {mode === "transfer" ? (
            <>
              {/* From Section - Transfer Mode */}
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

              {/* Add USDT to KES rate info when MPESA is selected */}
              {fromWallet === "MPESA" && toWallet.includes("USDT") && (
                <div className='mt-1 p-2 rounded-lg bg-[#001428]/80 border border-white/5 text-xs text-white/70'>
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
                    className='rounded-full border-0 h-12 w-12 bg-[#001a38] hover:bg-[#0a2348] text-white transition-all duration-300 hover:scale-105'
                    onClick={handleSwapWallets}>
                    <ArrowDown className='h-6 w-6' />
                  </Button>
                </div>
              </div>

              {/* To Section - Transfer Mode */}
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
            </>
          ) : (
            <>
              {/* I Want Section - Buy/Sell Mode */}
              <div className='space-y-3'>
                <label className='text-sm text-white/60 font-medium ml-1 mb-1 block'>
                  {mode === "buy" ? "I want to buy" : "I want to sell"}
                </label>
                <div className='flex flex-col gap-3'>
                  <WalletSelector
                    label={mode === "buy" ? "Buy" : "Sell"}
                    selected={mode === "buy" ? toWallet : fromWallet}
                    onSelect={mode === "buy" ? setToWallet : setFromWallet}
                    type={mode === "buy" ? "to" : "from"}
                    walletOptions={cryptoWallets}
                    showDrawer={mode === "buy" ? toDrawerOpen : fromDrawerOpen}
                    setShowDrawer={
                      mode === "buy" ? setToDrawerOpen : setFromDrawerOpen
                    }
                  />
                </div>
              </div>

              {/* For Section - Buy/Sell Mode */}
              <div className='space-y-3'>
                <label className='text-sm text-white/60 font-medium ml-1 mb-1 block'>
                  For
                </label>
                <div className='flex flex-col gap-3'>
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

                  <div className='mt-1 flex items-center gap-1'>
                    <div className='p-1 rounded-full bg-[#00805a]/20'>
                      <DollarSign className='h-3 w-3 text-[#00805a]' />
                    </div>
                    <span className='text-xs text-white/60'>
                      {mode === "buy"
                        ? `You will receive approximately ${
                            fromAmount
                              ? (
                                  parseFloat(fromAmount) *
                                  (currencyRates[
                                    toWallet as keyof typeof currencyRates
                                  ]?.rate || 0)
                                ).toFixed(8)
                              : "0"
                          } ${
                            currencyRates[
                              toWallet as keyof typeof currencyRates
                            ]?.name || ""
                          }`
                        : `You will receive $${fromAmount || "0"} USD`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Method - Buy/Sell Mode */}
              <div className='space-y-3'>
                <label className='text-sm text-white/60 font-medium ml-1 mb-1 block'>
                  Payment Method
                </label>
                <div className='flex flex-col gap-3'>
                  <BankSelector
                    selected={selectedBank}
                    onSelect={setSelectedBank}
                    bankOptions={somaliaBanks}
                    showDrawer={bankDrawerOpen}
                    setShowDrawer={setBankDrawerOpen}
                  />
                </div>
              </div>
            </>
          )}

          {/* Transaction Summary - conditionally rendered only for transfer mode */}
          {showSummary && mode === "transfer" && (
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
              className='w-full bg-[#00805a] hover:bg-[#00805a]/90 text-white font-semibold py-6 rounded-lg shadow-lg shadow-[#00805a]/20 transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] border border-white/10'
              disabled={Boolean(
                isLoading || !fromAmount || parseFloat(fromAmount) <= 0
              )}>
              {isLoading ? (
                <>
                  <RefreshCw className='mr-2 h-5 w-5 animate-spin' />
                  Processing...
                </>
              ) : mode === "buy" ? (
                "Buy Crypto"
              ) : mode === "sell" ? (
                "Sell Crypto"
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
