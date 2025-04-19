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
import { FaBitcoin, FaEthereum } from "react-icons/fa";
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

// Function to check if a mode matches a specific value (type-safe)
const isModeType = (
  currentMode: TradingMode,
  typeToCheck: TradingMode
): boolean => {
  return currentMode === typeToCheck;
};

// Display crypto amount for buy mode
const BuyPreview = ({
  fromAmount,
  toWallet,
}: {
  fromAmount: string;
  toWallet: string;
}) => {
  if (!fromAmount || parseFloat(fromAmount) <= 0) return null;

  const currencyInfo = currencyRates[toWallet as keyof typeof currencyRates];

  return (
    <div className='mt-1 flex items-center gap-1'>
      <div className='p-1 rounded-full bg-[#00805a]/20'>
        {toWallet === "BTC" ? (
          <FaBitcoin className='h-3 w-3 text-[#F7931A]' />
        ) : toWallet === "ETH" ? (
          <FaEthereum className='h-3 w-3 text-[#627EEA]' />
        ) : (
          <DollarSign className='h-3 w-3 text-[#00805a]' />
        )}
      </div>
      <span className='text-xs text-gray-500'>
        {`You will receive approximately ${currencyInfo?.symbol || ""} ${
          fromAmount
            ? (parseFloat(fromAmount) * (currencyInfo?.rate || 1)).toFixed(8)
            : "0"
        } ${currencyInfo?.name || ""}`}
      </span>
    </div>
  );
};

// Display USD amount for sell mode
const SellPreview = ({ fromAmount }: { fromAmount: string }) => {
  if (!fromAmount || parseFloat(fromAmount) <= 0) return null;

  return (
    <div className='mt-1 flex items-center gap-1'>
      <div className='p-1 rounded-full bg-[#00805a]/20'>
        <DollarSign className='h-3 w-3 text-[#00805a]' />
      </div>
      <span className='text-xs text-gray-500'>
        {`You will receive $${fromAmount || "0"} USD`}
      </span>
    </div>
  );
};

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

  // Check if the transaction involves crypto
  const isCryptoTransaction =
    isModeType(mode, "buy") || isModeType(mode, "sell");

  // Service fee calculation (1%) - Only apply to transfer mode, not crypto transactions
  const serviceFee =
    fromAmount && !isCryptoTransaction ? parseFloat(fromAmount) * 0.01 : 0;

  // Net amount after fee
  const netAmount = fromAmount ? parseFloat(fromAmount) - serviceFee : 0;

  // For crypto transactions, don't apply the fee
  const estimatedAmount = fromAmount
    ? isCryptoTransaction
      ? parseFloat(fromAmount).toFixed(2)
      : netAmount.toFixed(2)
    : "0";

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

    // Get the selected bank's ID for payment method
    const paymentMethod = selectedBank ? selectedBank : somaliaBanks[0].id;

    // Set appropriate defaults based on the selected mode
    if (newMode === "buy") {
      // For buy mode: Use selected bank as payment source, BTC as destination
      setFromWallet(paymentMethod);
      setToWallet("BTC");
    } else if (newMode === "sell") {
      // For sell mode: Use BTC as source, selected bank as destination
      setFromWallet("BTC");
      setToWallet(paymentMethod);
    } else {
      // For transfer mode: Use mobile wallet as source, crypto as destination
      setFromWallet("MPESA");
      setToWallet("USDT-TRC20");
    }

    // When changing to "buy" or "sell" mode, use the selected bank
    if (isModeType(newMode, "buy") || isModeType(newMode, "sell")) {
      // Make sure we're using a recognized bank ID
      const bankExists = somaliaBanks.some((bank) => bank.id === selectedBank);
      if (!bankExists) {
        setSelectedBank(somaliaBanks[0].id);
      }
    }
  };

  return (
    <Card className='border border-gray-200 shadow-lg bg-white rounded-xl overflow-hidden backdrop-blur-sm'>
      <CardHeader className='bg-gradient-to-r from-gray-50 to-white rounded-t-lg px-6 py-4 border-b border-gray-100'>
        <CardTitle className='text-gray-800 text-xl flex items-center gap-2'>
          <div className='bg-gradient-to-r from-primary to-blue-500 rounded-full p-1.5'>
            <ArrowRightLeft className='h-5 w-5 text-white' />
          </div>
          e-Sarif Trading
        </CardTitle>
      </CardHeader>

      <CardContent className='px-6 bg-transparent'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Mode Selector */}
          <div className='space-y-3'>
            <label className='text-sm text-gray-600 font-medium ml-1 mb-1 block'>
              I want to
            </label>
            <div className='grid grid-cols-3 gap-2'>
              <Button
                type='button'
                onClick={() => handleModeChange("buy")}
                className={`${
                  mode === "buy"
                    ? "bg-[#00805a] hover:bg-[#00805a]/90 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                } border border-gray-200 font-medium rounded-md`}>
                Buy
              </Button>
              <Button
                type='button'
                onClick={() => handleModeChange("sell")}
                className={`${
                  mode === "sell"
                    ? "bg-[#00805a] hover:bg-[#00805a]/90 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                } border border-gray-200 font-medium rounded-md`}>
                Sell
              </Button>
              <Button
                type='button'
                onClick={() => handleModeChange("transfer")}
                className={`${
                  mode === "transfer"
                    ? "bg-[#00805a] hover:bg-[#00805a]/90 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                } border border-gray-200 font-medium rounded-md`}>
                Transfer
              </Button>
            </div>
          </div>

          {/* Conditional UI based on the selected mode */}
          {mode === "transfer" ? (
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

                  {/* Use type helper function to check mode type */}
                  {isModeType(mode, "buy") && (
                    <BuyPreview fromAmount={fromAmount} toWallet={toWallet} />
                  )}
                  {isModeType(mode, "sell") && (
                    <SellPreview fromAmount={fromAmount} />
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* I Want Section - Buy/Sell Mode */}
              <div className='space-y-3'>
                <label className='text-sm text-gray-600 font-medium ml-1 mb-1 block'>
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

                  {/* Use type helper function to check mode type */}
                  {isModeType(mode, "buy") && (
                    <BuyPreview fromAmount={fromAmount} toWallet={toWallet} />
                  )}
                  {isModeType(mode, "sell") && (
                    <SellPreview fromAmount={fromAmount} />
                  )}
                </div>
              </div>

              {/* Payment Method - Buy/Sell Mode */}
              <div className='space-y-3'>
                <label className='text-sm text-gray-600 font-medium ml-1 mb-1 block'>
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
            <div className='mt-4 pt-4 border-t border-gray-200'>
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
              className='w-full bg-[#00805a] hover:bg-[#00805a]/90 text-white font-semibold py-6 rounded-lg shadow-lg shadow-[#00805a]/20 transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] border border-[#00805a]/10'
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

          {/* Confirmation Message - Only show for transfer mode */}
          {fromAmount &&
            !isLoading &&
            parseFloat(fromAmount) > 0 &&
            isModeType(mode, "transfer") && (
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
