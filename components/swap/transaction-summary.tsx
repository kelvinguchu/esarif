"use client";

import { Wallet, ArrowRightLeft } from "lucide-react";
import { formatCurrency } from "@/lib/swap/utils";

interface TransactionSummaryProps {
  fromAmount: string;
  serviceFee: number;
  netAmount: number;
  toWallet?: string;
  fromWallet?: string;
  exchangeRate?: number;
  exchangeInfo?: string;
}

export const TransactionSummary = ({
  fromAmount,
  serviceFee,
  netAmount,
  toWallet = "",
  fromWallet = "",
  exchangeRate,
  exchangeInfo,
}: TransactionSummaryProps) => {
  const isMpesaFrom = fromWallet === "MPESA";
  const isMpesaTo = toWallet === "MPESA";
  const fromSymbol = isMpesaFrom ? "KSh" : "$";
  const toSymbol = isMpesaTo ? "KSh" : "$";

  const isCurrencyConversion = isMpesaFrom !== isMpesaTo;

  const amountValue = parseFloat(fromAmount) || 0;

  return (
    <div className='bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200 p-4 shadow-sm'>
      <h3 className='text-gray-800 font-medium mb-4 flex items-center'>
        <div className='p-1 bg-gradient-to-r from-blue-100 to-green-100 rounded-full mr-2'>
          <Wallet className='h-4 w-4 text-primary' />
        </div>
        Transaction Summary
      </h3>
      <div className='space-y-3 text-sm'>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Amount ({fromSymbol}):</span>
          <span className='text-gray-800 font-medium'>
            {fromSymbol}
            {amountValue.toFixed(2)}
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Service Charge (1%):</span>
          <span className='text-gray-800 font-medium'>
            {fromSymbol}
            {serviceFee.toFixed(2)}
          </span>
        </div>

        {exchangeRate && isCurrencyConversion && (
          <div className='pt-2 border-t border-blue-100 mt-2'>
            <div className='flex justify-between text-xs text-blue-700'>
              <span className='flex items-center'>
                <ArrowRightLeft className='w-3 h-3 mr-1' />
                Exchange Rate:
              </span>
              <span>
                1 {fromSymbol} = {exchangeRate.toFixed(2)} {toSymbol}
              </span>
            </div>
          </div>
        )}

        <div className='h-px bg-gray-200 my-3'></div>
        <div className='flex justify-between text-base'>
          <span className='text-gray-700 font-medium'>
            You Receive ({toSymbol}):
          </span>
          <span className='text-gray-900 font-semibold'>
            {toSymbol}
            {netAmount.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

interface ExchangeRateProps {
  rates: Array<{
    from: string;
    to: string;
    rate: string;
    label: string;
  }>;
}

export const ExchangeRates = ({ rates }: ExchangeRateProps) => {
  return (
    <div className='mt-4 p-3 rounded-lg bg-gray-50 border border-gray-200'>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
        {rates.map((rate, index) => (
          <div key={index} className='bg-white rounded-md p-2 text-center'>
            <div className='text-xs text-gray-600'>{rate.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
