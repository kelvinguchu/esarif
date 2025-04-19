"use client";

import { ArrowLeftRight, BarChart3, Wallet, History } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const TransactionSummary = () => {
  // In a real app, this would be fetched from an API
  const summaryData = {
    totalTransactions: 156,
    tradingVolume: "4,500",
    totalCrypto: "3,200",
    totalFiat: "1,300",
  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8'>
      <Card className='border border-gray-200 bg-white shadow-sm overflow-hidden transform transition-transform hover:translate-y-[-2px]'>
        <div className='h-1 bg-primary w-full'></div>
        <CardContent className='p-5'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-600 text-sm mb-1'>Total Transactions</p>
              <p className='text-gray-800 text-2xl font-semibold'>
                {summaryData.totalTransactions}
              </p>
              <p className='text-primary text-xs mt-1'>All activity</p>
            </div>
            <div className='h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center'>
              <History className='h-5 w-5 text-primary' />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className='border border-gray-200 bg-white shadow-sm overflow-hidden transform transition-transform hover:translate-y-[-2px]'>
        <div className='h-1 bg-blue-500 w-full'></div>
        <CardContent className='p-5'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-600 text-sm mb-1'>Trading Volume</p>
              <p className='text-gray-800 text-2xl font-semibold'>
                ${summaryData.tradingVolume}
              </p>
              <p className='text-blue-500 text-xs mt-1'>Last 30 days</p>
            </div>
            <div className='h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center'>
              <BarChart3 className='h-5 w-5 text-blue-500' />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className='border border-gray-200 bg-white shadow-sm overflow-hidden transform transition-transform hover:translate-y-[-2px]'>
        <div className='h-1 bg-green-500 w-full'></div>
        <CardContent className='p-5'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-600 text-sm mb-1'>Crypto Holdings</p>
              <p className='text-gray-800 text-2xl font-semibold'>
                ${summaryData.totalCrypto}
              </p>
              <p className='text-green-500 text-xs mt-1'>+12% this month</p>
            </div>
            <div className='h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center'>
              <ArrowLeftRight className='h-5 w-5 text-green-500' />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className='border border-gray-200 bg-white shadow-sm overflow-hidden transform transition-transform hover:translate-y-[-2px]'>
        <div className='h-1 bg-purple-500 w-full'></div>
        <CardContent className='p-5'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-600 text-sm mb-1'>Fiat Balance</p>
              <p className='text-gray-800 text-2xl font-semibold'>
                ${summaryData.totalFiat}
              </p>
              <p className='text-purple-500 text-xs mt-1'>
                Available for trading
              </p>
            </div>
            <div className='h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center'>
              <Wallet className='h-5 w-5 text-purple-500' />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
