"use client";

import React from "react";
import { ArrowRightLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BuyForm } from "./buy-form";
import { SellForm } from "./sell-form";
import { TransferForm } from "./transfer-form";
import { SwapProvider, useSwapContext } from "@/context/swap-context";

const SwapFormContent = () => {
  const { mode, handleModeChange, handleSubmit } = useSwapContext();

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

          {mode === "buy" && <BuyForm />}
          {mode === "sell" && <SellForm />}
          {mode === "transfer" && <TransferForm />}
        </form>
      </CardContent>
    </Card>
  );
};

export const SwapForm = () => {
  return (
    <SwapProvider>
      <SwapFormContent />
    </SwapProvider>
  );
};
