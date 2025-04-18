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
    <div className='bg-gradient-to-br from-[#001a38]/90 to-[#00224a]/90 rounded-xl border border-white/10 p-4 shadow-inner shadow-black/10'>
      <h3 className='text-white/90 font-medium mb-4 flex items-center'>
        <div className='p-1 bg-gradient-to-r from-[#002346] to-[#00367a] rounded-full mr-2'>
          <Wallet className='h-4 w-4 text-primary' />
        </div>
        Transaction Summary (USD)
      </h3>
      <div className='space-y-3 text-sm'>
        <div className='flex justify-between'>
          <span className='text-white/70'>Amount:</span>
          <span className='text-white/90 font-medium'>
            ${parseFloat(fromAmount).toFixed(2)}
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='text-white/70'>Service Charge (1%):</span>
          <span className='text-white/90 font-medium'>
            ${serviceFee.toFixed(2)}
          </span>
        </div>
        <div className='h-px bg-white/10 my-3'></div>
        <div className='flex justify-between text-base'>
          <span className='text-white/80 font-medium'>Net Amount:</span>
          <span className='text-white font-semibold'>
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
    <div className='mt-4 p-3 rounded-lg bg-white/5 border border-white/5'>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
        {rates.map((rate, index) => (
          <div key={index} className='bg-white/5 rounded-md p-2 text-center'>
            <div className='text-xs text-white/70'>{rate.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
