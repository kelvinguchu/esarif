"use client";

import React from "react";
import { useSwapContext } from "@/context/swap-context";
import {
  WalletInfo,
  PaymentMethodOption,
  CurrencyId,
  CurrencyRateInfo,
} from "@/lib/swap/types";
import { paymentMethods, currencyRates, cryptoWallets } from "@/lib/swap/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Info, Banknote, Smartphone, Wallet } from "lucide-react";

export const BuyDetails = () => {
  const {
    selectedBank,
    toWallet,
    fromAmount,
    receivingAddress,
    setReceivingAddress,
  } = useSwapContext();

  // Define these first
  const paymentMethod = paymentMethods.find((p) => p.id === selectedBank);
  const cryptoWallet = cryptoWallets.find((w) => w.id === toWallet) as
    | (WalletInfo & { address?: string; networkName?: string })
    | undefined;
  const amount = fromAmount ? parseFloat(fromAmount) : 0;
  const currencyInfo = currencyRates[toWallet as keyof typeof currencyRates]; // Now safe to use toWallet

  // Now calculate dependent values
  const cryptoSymbol =
    currencyInfo?.symbol || cryptoWallet?.id?.split("-")[0] || "Crypto";
  const serviceFeeRate = 0.01; // 1%
  const fiatFee = amount * serviceFeeRate;
  const netFiatAmount = amount - fiatFee;

  // Determine the exchange rate using provided values or fallback
  let exchangeRate: number | undefined;
  switch (toWallet) {
    case "USDT-TRC20":
      exchangeRate = 1.0001;
      break;
    case "USDT-BEP20":
      exchangeRate = 1.0;
      break;
    case "USDC-BEP20":
      exchangeRate = 0.9998;
      break;
    default:
      // Fallback to currencyRates data (checking type and property existence)
      if (currencyInfo) {
        if (
          currencyInfo.type === "crypto" &&
          "rateUSD" in currencyInfo &&
          typeof currencyInfo.rateUSD === "number"
        ) {
          exchangeRate = currencyInfo.rateUSD;
        } else if (
          currencyInfo.type !== "crypto" &&
          "rate" in currencyInfo &&
          typeof currencyInfo.rate === "number"
        ) {
          // This case shouldn't happen in 'buy' mode, but included for robustness
          exchangeRate = currencyInfo.rate;
        }
      }
      break;
  }

  // Calculate final crypto amount using MULTIPLICATION
  const finalCryptoAmount =
    exchangeRate && exchangeRate > 0 ? netFiatAmount * exchangeRate : 0;

  // --- Placeholder Data (Keep for payment instructions) ---
  const genericAccountNumber = "001234567890";
  const companyName = "E-Sarif Ltd.";
  const mpesaPaybill = "254252";
  const genericMobileAccount = "+252 61 1234567";

  if (!paymentMethod || !cryptoWallet || amount <= 0) {
    return null;
  }

  return (
    <div className='space-y-6 mt-6 pt-6 border-t border-gray-200'>
      {/* 1. Payment Instructions */}
      <div className='space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-100'>
        <h3 className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
          {paymentMethod.category === "bank" ? (
            <Banknote className='w-4 h-4' />
          ) : (
            <Smartphone className='w-4 h-4' />
          )}
          Payment Instructions ({paymentMethod.name})
        </h3>

        {/* Bank Instructions */}
        {paymentMethod.category === "bank" && (
          <div className='text-xs text-gray-600 space-y-1'>
            <p>
              Please transfer exactly <strong>${amount.toFixed(2)}</strong> to:
            </p>
            <p>
              <strong>Account Name:</strong> {companyName}
            </p>
            <p>
              <strong>Account Number:</strong> {genericAccountNumber}
            </p>
            <p>
              <strong>Bank:</strong> {paymentMethod.name}
            </p>
            <p className='mt-2 text-blue-600'>
              <Info className='w-3 h-3 inline mr-1' /> Use your Order ID as the
              reference.
            </p>
          </div>
        )}

        {/* MPESA Instructions - Use static text for Account */}
        {paymentMethod.id === "mpesa" && (
          <div className='text-xs text-gray-600 space-y-2'>
            <p>
              Please pay exactly <strong>${amount.toFixed(2)}</strong> via
              M-Pesa using:
            </p>
            <p>
              <strong>Paybill Number:</strong> {mpesaPaybill}
            </p>
            <p>
              <strong>Account:</strong> YOUR NAME
            </p>
          </div>
        )}

        {/* Other Mobile Money Instructions */}
        {paymentMethod.category === "mobileMoney" &&
          paymentMethod.id !== "mpesa" && (
            <div className='text-xs text-gray-600 space-y-1'>
              <p>
                Please send exactly <strong>${amount.toFixed(2)}</strong> to:
              </p>
              <p>
                <strong>Account Number:</strong> {genericMobileAccount}
              </p>
              <p>
                <strong>Network:</strong> {paymentMethod.name}
              </p>
            </div>
          )}
      </div>

      {/* 2. User Receiving Wallet Input */}
      <div className='space-y-2 sm:space-y-3 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-100'>
        <h3 className='text-xs sm:text-sm font-semibold text-blue-800 flex items-center gap-1 sm:gap-2'>
          <Wallet className='w-3 h-3 sm:w-4 sm:h-4' />
          Your Receiving Wallet Address ({cryptoWallet.name})
        </h3>
        <p className='text-[10px] sm:text-xs text-blue-600'>
          Please enter the destination {cryptoWallet.name} address where you
          want to receive your crypto. Ensure it's correct and supports the{" "}
          {cryptoWallet.networkName || "selected"} network.
        </p>
        <Input
          placeholder={`Enter your ${cryptoWallet.name} (${
            cryptoWallet.networkName || cryptoSymbol
          }) address...`}
          value={receivingAddress}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setReceivingAddress(e.target.value)
          }
          className='bg-white border-blue-200 focus:border-blue-400 focus:ring-blue-200 text-xs sm:text-sm h-9 sm:h-10'
        />
      </div>

      {/* 3. Transaction Summary */}
      <div className='space-y-3 p-4 bg-green-50 rounded-lg border border-green-100'>
        <h3 className='text-xs sm:text-sm font-semibold text-green-800'>
          Transaction Summary
        </h3>
        <div className='space-y-2 text-xs text-green-700'>
          <div className='flex flex-wrap justify-between'>
            <span>You Pay:</span>
            <span className='font-medium'>${amount.toFixed(2)} USD</span>
          </div>
          <div className='flex flex-wrap justify-between'>
            <span>Service Fee (1% of payment):</span>
            <span className='font-medium text-red-600'>
              - ${fiatFee.toFixed(2)} USD
            </span>
          </div>
          <div className='flex flex-wrap justify-between border-t border-green-200 pt-1 sm:pt-2 mt-1 sm:mt-2'>
            <span>Amount After Fee:</span>
            <span className='font-medium'>${netFiatAmount.toFixed(2)} USD</span>
          </div>
          <div className='flex justify-between'>
            <span>Exchange Rate Used:</span>
            <span className='font-medium'>
              $1 USD ≈ {exchangeRate?.toFixed(4) || "N/A"} {cryptoSymbol}
            </span>
          </div>
          <div className='pt-2 mt-2 border-t border-green-200 flex justify-between text-sm'>
            <span className='font-semibold text-green-800'>You Receive ≈</span>
            <span className='font-semibold text-green-800'>
              {finalCryptoAmount > 0 ? finalCryptoAmount.toFixed(8) : "0.00"}{" "}
              {cryptoSymbol}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
