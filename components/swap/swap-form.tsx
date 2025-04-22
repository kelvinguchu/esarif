"use client";

import React from "react";
import { ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BuyForm } from "./buy-form";
import { SellForm } from "./sell-form";
import { TransferForm } from "./transfer-form";
import { SwapProvider, useSwapContext } from "@/context/swap-context";

const SwapFormContent = () => {
  const { mode, handleModeChange, handleSubmit } = useSwapContext();

  return (
    <div className='max-w-2xl mb-4 mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
      {/* Header */}
      <div className='bg-gradient-to-r from-primary/5 to-blue-50/30 px-6 py-4 border-b border-gray-100'>
        <div className='flex items-center gap-3'>
          <div className='bg-gradient-to-r from-primary to-blue-500 rounded-full p-1.5 shadow-sm'>
            <ArrowRightLeft className='h-5 w-5 text-white' />
          </div>
          <h2 className='text-xl font-semibold text-gray-800'>
            e-Sarif Trading
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className='px-2 md:px-6 py-5'>
        <form onSubmit={handleSubmit} className='space-y-6'>
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
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                } border font-medium rounded-md shadow-sm`}>
                Buy
              </Button>
              <Button
                type='button'
                onClick={() => handleModeChange("sell")}
                className={`${
                  mode === "sell"
                    ? "bg-[#00805a] hover:bg-[#00805a]/90 text-white"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                } border font-medium rounded-md shadow-sm`}>
                Sell
              </Button>
              <Button
                type='button'
                onClick={() => handleModeChange("transfer")}
                className={`${
                  mode === "transfer"
                    ? "bg-[#00805a] hover:bg-[#00805a]/90 text-white"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                } border font-medium rounded-md shadow-sm`}>
                Transfer
              </Button>
            </div>
          </div>

          {mode === "buy" && <BuyForm />}
          {mode === "sell" && <SellForm />}
          {mode === "transfer" && <TransferForm />}
        </form>
      </div>
    </div>
  );
};

export const SwapForm = () => {
  return (
    <SwapProvider>
      <SwapFormContent />
    </SwapProvider>
  );
};
