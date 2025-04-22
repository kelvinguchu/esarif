"use client";

import React from "react";
import { useSwapContext } from "@/context/swap-context";
import { paymentMethods, currencyRates } from "@/lib/swap/data";
import { Input } from "@/components/ui/input";
import {
  Info,
  Banknote,
  Smartphone,
  Wallet,
  ArrowRight,
  CreditCard,
  BarChart3,
  ShieldCheck,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const BuyDetails = () => {
  const {
    selectedBank,
    toWallet,
    fromAmount,
    receivingAddress,
    setReceivingAddress,
    estimatedAmount,
    netAmount,
    serviceFee,
  } = useSwapContext();

  const paymentMethod = paymentMethods.find((p) => p.id === selectedBank);
  const cryptoDetails = paymentMethods.find(
    (p) => p.id === toWallet && p.category === "crypto"
  );

  const amount = fromAmount ? parseFloat(fromAmount) : 0;
  const currencyInfo = currencyRates[toWallet as keyof typeof currencyRates];

  const cryptoSymbol =
    currencyInfo?.symbol || cryptoDetails?.name.split(" ")[0] || "Crypto";
  const networkName = cryptoDetails?.id.includes("-")
    ? cryptoDetails?.id.split("-")[1]
    : cryptoDetails?.category;

  const fiatFee = serviceFee;
  const netFiatAmount = netAmount;
  const finalCryptoAmount = parseFloat(estimatedAmount);

  let exchangeRate: number | undefined;
  if (currencyInfo) {
    if ("rateUSD" in currencyInfo && typeof currencyInfo.rateUSD === "number") {
      exchangeRate = currencyInfo.rateUSD;
    } else if (
      "rate" in currencyInfo &&
      typeof currencyInfo.rate === "number"
    ) {
      exchangeRate = currencyInfo.rate;
    }
  }

  const genericAccountNumber = "001234567890";
  const companyName = "E-Sarif Ltd.";
  const mpesaPaybill = "254252";
  const genericMobileAccount = "+252 61 1234567";

  if (!paymentMethod || !cryptoDetails || amount <= 0) {
    return null;
  }

  return (
    <div className='space-y-8 max-w-3xl mx-auto'>
      <div className='flex items-center justify-center'>
        <h2 className='text-lg font-medium text-gray-800 px-4 py-1 bg-gray-50 rounded-full border border-gray-200'>
          Transaction Details
        </h2>
      </div>

      {/* Payment Instructions Section */}
      <div className='space-y-3 bg-white rounded-xl border border-gray-200 p-4 shadow-sm'>
        <h3 className='text-blue-800 flex items-center text-base font-semibold border-b pb-2 border-blue-50'>
          {paymentMethod.category === "bank" ? (
            <Banknote className='mr-2 h-5 w-5 text-blue-600' />
          ) : (
            <Smartphone className='mr-2 h-5 w-5 text-blue-600' />
          )}
          Payment Instructions
        </h3>

        <div className='bg-blue-50/50 rounded-lg border border-blue-100 p-3 space-y-3'>
          <div className='flex items-center gap-2 text-sm font-medium text-blue-700'>
            <CreditCard className='h-4 w-4' />
            <span>{paymentMethod.name}</span>
          </div>

          {paymentMethod.category === "bank" && (
            <div className='text-sm text-gray-700 space-y-2'>
              <div className='flex items-center gap-2 bg-white p-2 rounded-md border border-gray-100'>
                <ArrowRight className='h-4 w-4 text-blue-500 flex-shrink-0' />
                <p>
                  Transfer exactly{" "}
                  <span className='font-mono font-bold text-blue-700'>
                    ${amount.toFixed(2)}
                  </span>{" "}
                  to:
                </p>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3'>
                <div className='bg-white p-2 rounded-md border border-gray-100'>
                  <p className='text-xs text-gray-500 mb-1'>Account Name</p>
                  <p className='font-medium'>{companyName}</p>
                </div>
                <div className='bg-white p-2 rounded-md border border-gray-100'>
                  <p className='text-xs text-gray-500 mb-1'>Account Number</p>
                  <p className='font-mono'>{genericAccountNumber}</p>
                </div>
                <div className='bg-white p-2 rounded-md border border-gray-100'>
                  <p className='text-xs text-gray-500 mb-1'>Bank</p>
                  <p className='font-medium'>{paymentMethod.name}</p>
                </div>
              </div>
              <div className='flex items-start mt-2 bg-yellow-50 p-2 rounded-md border border-yellow-100'>
                <Info className='w-4 h-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0' />
                <p className='text-xs text-gray-700'>
                  Use your Order ID as the reference for this transaction.
                </p>
              </div>
            </div>
          )}

          {paymentMethod.id === "MPESA" && (
            <div className='text-sm text-gray-700 space-y-2'>
              <div className='flex items-center gap-2 bg-white p-2 rounded-md border border-gray-100'>
                <Info className='h-4 w-4 text-green-500 flex-shrink-0' />
                <p>You will be prompted an STK push.</p>
              </div>
            </div>
          )}

          {paymentMethod.category === "mobileMoney" &&
            paymentMethod.id !== "MPESA" && (
              <div className='text-sm text-gray-700 space-y-2'>
                <div className='flex items-center gap-2 bg-white p-2 rounded-md border border-gray-100'>
                  <ArrowRight className='h-4 w-4 text-blue-500 flex-shrink-0' />
                  <p>
                    Send exactly{" "}
                    <span className='font-mono font-bold text-blue-700'>
                      ${amount.toFixed(2)}
                    </span>{" "}
                    to:
                  </p>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2'>
                  <div className='bg-white p-2 rounded-md border border-gray-100'>
                    <p className='text-xs text-gray-500 mb-1'>Account Number</p>
                    <p className='font-mono'>{genericMobileAccount}</p>
                  </div>
                  <div className='bg-white p-2 rounded-md border border-gray-100'>
                    <p className='text-xs text-gray-500 mb-1'>Network</p>
                    <p className='font-medium'>{paymentMethod.name}</p>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>

      {/* Wallet Address Section */}
      <div className='space-y-3 bg-white rounded-xl border border-gray-200 p-4 shadow-sm'>
        <h3 className='text-purple-800 flex items-center text-base font-semibold border-b pb-2 border-purple-50'>
          <Wallet className='mr-2 h-5 w-5 text-purple-600' />
          Your Receiving Wallet Address
        </h3>

        <div className='space-y-3'>
          <div className='flex items-center gap-2 bg-purple-50 rounded-md p-2 border border-purple-100'>
            <ShieldCheck className='h-4 w-4 text-purple-600' />
            <p className='text-sm text-purple-800 font-medium'>
             Network {cryptoDetails.name} 
            </p>
          </div>
          <p className='text-xs text-gray-600 bg-gray-50 p-2 rounded-md border border-gray-100'>
           Enter the destination {cryptoDetails.name} address:
          </p>
          <Input
            placeholder={`Enter your address...`}
            value={receivingAddress}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setReceivingAddress(e.target.value)
            }
            className='font-mono bg-white border-purple-200 focus:border-purple-400 focus:ring-purple-200 text-sm h-10'
          />
          <div className='flex items-start mt-1'>
            <Info className='h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0' />
            <p className='text-xs text-gray-600'>
              Double-check your wallet address. Transactions sent to incorrect
              addresses cannot be recovered.
            </p>
          </div>
        </div>
      </div>

      {/* Transaction Summary Section */}
      <div className='space-y-3 bg-white rounded-xl border border-gray-200 p-4 shadow-sm'>
        <h3 className='text-green-800 flex items-center text-base font-semibold border-b pb-2 border-green-50'>
          <BarChart3 className='mr-2 h-5 w-5 text-green-600' />
          Transaction Summary
        </h3>

        <div className='space-y-2'>
          <div className='grid grid-cols-2 gap-1 text-sm'>
            <span className='text-gray-600'>You Pay:</span>
            <span className='font-medium text-right'>
              ${amount.toFixed(2)} USD
            </span>
          </div>
          <div className='grid grid-cols-2 gap-1 text-sm'>
            <span className='text-gray-600'>Service Fee:</span>
            <span className='text-red-600 font-medium text-right'>
              - ${fiatFee.toFixed(2)} USD
            </span>
          </div>
          <div className='grid grid-cols-2 gap-1 text-sm border-t border-gray-200 pt-2 mt-2'>
            <span className='text-gray-600'>Net Amount:</span>
            <span className='font-medium text-right'>
              ${netFiatAmount.toFixed(2)} USD
            </span>
          </div>
          <div className='grid grid-cols-2 gap-1 text-sm bg-green-50 py-2 px-1 mt-1 rounded-md'>
            <span className='text-green-700 flex items-center gap-1 mb-1 sm:mb-0'>
              <span>Exchange Rate:</span>
            </span>
            <span className='text-green-700 font-medium text-left sm:text-right'>
              {exchangeRate
                ? `1 ${cryptoSymbol} = $${exchangeRate.toFixed(4)} USD`
                : "N/A"}
            </span>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-1 pt-3 mt-2 border-t border-gray-200'>
            <span className='font-mono font-semibold text-green-800 text-left sm:text-right'>
              You Receive:{" "}
              {finalCryptoAmount > 0 ? finalCryptoAmount.toFixed(8) : "0.00"}{" "}
              {cryptoSymbol}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
