"use client";

import { Wallet, RefreshCw } from "lucide-react";

interface TransactionSummaryProps {
  fromAmount: string;
  serviceFee: number;
  netAmount: number;
}

export const TransactionSummary = ({
  fromAmount,
  serviceFee,
  netAmount,
}: TransactionSummaryProps) => {
  return (
    <div className='bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200 p-4 shadow-sm'>
      <h3 className='text-gray-800 font-medium mb-4 flex items-center'>
        <div className='p-1 bg-gradient-to-r from-blue-100 to-green-100 rounded-full mr-2'>
          <Wallet className='h-4 w-4 text-primary' />
        </div>
        Transaction Summary (USD)
      </h3>
      <div className='space-y-3 text-sm'>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Amount:</span>
          <span className='text-gray-800 font-medium'>
            ${parseFloat(fromAmount).toFixed(2)}
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Service Charge (1%):</span>
          <span className='text-gray-800 font-medium'>
            ${serviceFee.toFixed(2)}
          </span>
        </div>
        <div className='h-px bg-gray-200 my-3'></div>
        <div className='flex justify-between text-base'>
          <span className='text-gray-700 font-medium'>Net Amount:</span>
          <span className='text-gray-900 font-semibold'>
            ${netAmount.toFixed(2)}
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
