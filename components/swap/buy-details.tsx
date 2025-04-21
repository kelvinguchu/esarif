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
  Send,
  BarChart3,
  ShieldCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className='space-y-6 mt-3 w-full md:max-w-3xl lg:max-w-4xl mx-auto'>
      {/* Payment Instructions Card */}
      <Card className='overflow-hidden border-t-4 border-t-blue-500 shadow-sm w-full'>
        <CardHeader className='bg-gradient-to-r from-blue-50 to-white pb-2'>
          <CardTitle className='text-blue-800 flex items-center text-base'>
            {paymentMethod.category === "bank" ? (
              <Banknote className='mr-2 h-5 w-5 text-blue-600' />
            ) : (
              <Smartphone className='mr-2 h-5 w-5 text-blue-600' />
            )}
            Payment Instructions
          </CardTitle>
        </CardHeader>
        <CardContent className='pt-4'>
          <div className='p-3 bg-blue-50/50 rounded-lg border border-blue-100 space-y-3 w-full'>
            <div className='flex items-center gap-2 text-sm font-medium text-blue-700 mb-1'>
              <CreditCard className='h-4 w-4' />
              <span>{paymentMethod.name}</span>
            </div>

            {paymentMethod.category === "bank" && (
              <div className='text-sm text-gray-700 space-y-2 w-full'>
                <div className='flex items-center gap-2 bg-white p-2 rounded-md border border-gray-100 w-full'>
                  <ArrowRight className='h-4 w-4 text-blue-500 flex-shrink-0' />
                  <p>
                    Transfer exactly{" "}
                    <span className='font-mono font-bold text-blue-700'>
                      ${amount.toFixed(2)}
                    </span>{" "}
                    to:
                  </p>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 w-full'>
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
                <div className='flex items-start mt-2 bg-yellow-50 p-2 rounded-md border border-yellow-100 w-full'>
                  <Info className='w-4 h-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0' />
                  <p className='text-xs text-gray-700'>
                    Use your Order ID as the reference for this transaction.
                  </p>
                </div>
              </div>
            )}

            {paymentMethod.id === "MPESA" && (
              <div className='text-sm text-gray-700 space-y-2 w-full'>
                <div className='flex items-center gap-2 bg-white p-2 rounded-md border border-gray-100 w-full'>
                  <ArrowRight className='h-4 w-4 text-green-500 flex-shrink-0' />
                  <p>
                    Pay exactly{" "}
                    <span className='font-mono font-bold text-green-700'>
                      ${amount.toFixed(2)}
                    </span>{" "}
                    via M-Pesa
                  </p>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 w-full'>
                  <div className='bg-white p-2 rounded-md border border-gray-100'>
                    <p className='text-xs text-gray-500 mb-1'>Paybill Number</p>
                    <p className='font-mono font-medium'>{mpesaPaybill}</p>
                  </div>
                  <div className='bg-white p-2 rounded-md border border-gray-100'>
                    <p className='text-xs text-gray-500 mb-1'>Account</p>
                    <p className='font-medium'>YOUR NAME</p>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod.category === "mobileMoney" &&
              paymentMethod.id !== "MPESA" && (
                <div className='text-sm text-gray-700 space-y-2 w-full'>
                  <div className='flex items-center gap-2 bg-white p-2 rounded-md border border-gray-100 w-full'>
                    <ArrowRight className='h-4 w-4 text-blue-500 flex-shrink-0' />
                    <p>
                      Send exactly{" "}
                      <span className='font-mono font-bold text-blue-700'>
                        ${amount.toFixed(2)}
                      </span>{" "}
                      to:
                    </p>
                  </div>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 w-full'>
                    <div className='bg-white p-2 rounded-md border border-gray-100'>
                      <p className='text-xs text-gray-500 mb-1'>
                        Account Number
                      </p>
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
        </CardContent>
      </Card>

      {/* Wallet Address Card */}
      <Card className='overflow-hidden border-t-4 border-t-purple-500 shadow-sm w-full'>
        <CardHeader className='bg-gradient-to-r from-purple-50 to-white pb-2'>
          <CardTitle className='text-purple-800 flex items-center text-base'>
            <Wallet className='mr-2 h-5 w-5 text-purple-600' />
            Your Receiving Wallet Address
          </CardTitle>
        </CardHeader>
        <CardContent className='pt-4 w-full'>
          <div className='space-y-3 w-full'>
            <div className='flex items-center gap-2 bg-purple-50 rounded-md p-2 border border-purple-100 w-full'>
              <ShieldCheck className='h-4 w-4 text-purple-600' />
              <p className='text-sm text-purple-800 font-medium'>
                {cryptoDetails.name} ({networkName ?? "Network"})
              </p>
            </div>
            <p className='text-xs text-gray-600 bg-gray-50 p-2 rounded-md border border-gray-100 w-full'>
              Please enter the destination {cryptoDetails.name} address where
              you want to receive your crypto. Ensure it's correct and supports
              the {networkName ?? "selected"} network.
            </p>
            <Input
              placeholder={`Enter your ${cryptoDetails.name} (${
                networkName ?? cryptoSymbol
              }) address...`}
              value={receivingAddress}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setReceivingAddress(e.target.value)
              }
              className='font-mono bg-white border-purple-200 focus:border-purple-400 focus:ring-purple-200 text-sm h-10 w-full'
            />
            <div className='flex items-start mt-1 w-full'>
              <Info className='h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0' />
              <p className='text-xs text-gray-600'>
                Double-check your wallet address. Transactions sent to incorrect
                addresses cannot be recovered.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Summary Card */}
      <Card className='overflow-hidden border-t-4 border-t-green-500 shadow-sm w-full'>
        <CardHeader className='bg-gradient-to-r from-green-50 to-white pb-2'>
          <CardTitle className='text-green-800 flex items-center text-base'>
            <BarChart3 className='mr-2 h-5 w-5 text-green-600' />
            Transaction Summary
          </CardTitle>
        </CardHeader>
        <CardContent className='pt-4 w-full'>
          <div className='bg-white border border-gray-100 rounded-lg p-4 shadow-sm space-y-2 w-full'>
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
              <span className='text-gray-600'>Amount Used for Conversion:</span>
              <span className='font-medium text-right'>
                ${netFiatAmount.toFixed(2)} USD
              </span>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm bg-green-50 p-2 mt-1 rounded-md'>
              <span className='text-green-700 flex items-center gap-1 mb-1 sm:mb-0'>
                <ArrowRight className='h-3 w-3 flex-shrink-0' />
                <span>Exchange Rate:</span>
              </span>
              <span className='text-green-700 font-medium text-left sm:text-right'>
                {exchangeRate
                  ? `1 ${cryptoSymbol} = $${exchangeRate.toFixed(4)} USD`
                  : "N/A"}
              </span>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-1 pt-3 mt-2 border-t border-gray-200'>
              <span className='font-semibold text-green-800 mb-1 sm:mb-0'>
                You Receive:
              </span>
              <span className='font-mono font-semibold text-green-800 text-left sm:text-right'>
                {finalCryptoAmount > 0 ? finalCryptoAmount.toFixed(8) : "0.00"}{" "}
                {cryptoSymbol}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
