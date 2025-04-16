"use client";

import { useState } from "react";
import { ArrowDown, RefreshCw } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SwapForm = () => {
  const [fromWallet, setFromWallet] = useState("MPESA");
  const [toWallet, setToWallet] = useState("USDT-TRC20");
  const [fromAmount, setFromAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // This would be calculated based on actual rates and fees
  const estimatedAmount = fromAmount
    ? (parseFloat(fromAmount) * 0.99).toFixed(2)
    : "0";

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

  return (
    <Card className='border-0 shadow-none bg-transparent'>
      <CardHeader className='bg-[#ebeffb]/10 rounded-t-lg px-6 py-4'>
        <CardTitle className='text-white text-lg'>Cross-Wallet Swap</CardTitle>
      </CardHeader>
      <CardContent className='pt-6 px-6 bg-transparent'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-3'>
            <div className='flex gap-2'>
              <Select value={fromWallet} onValueChange={setFromWallet}>
                <SelectTrigger className='w-[140px] bg-[#001a38] border-0 text-white rounded-md'>
                  <SelectValue placeholder='Select wallet' />
                </SelectTrigger>
                <SelectContent className='bg-[#001a38] border-white/10 text-white'>
                  <SelectGroup>
                    <SelectLabel className='text-white/70'>
                      Mobile Money
                    </SelectLabel>
                    <SelectItem value='MPESA'>Mpesa</SelectItem>
                    <SelectItem value='EVC'>EVC</SelectItem>
                    <SelectItem value='T-PLUS'>T-Plus</SelectItem>
                    <SelectItem value='JEEB'>JEEB</SelectItem>
                    <SelectItem value='SAHAL'>SAHAL</SelectItem>
                    <SelectItem value='ZAAD'>ZAAD</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel className='text-white/70'>Crypto</SelectLabel>
                    <SelectItem value='USDT-TRC20'>USDT (TRC20)</SelectItem>
                    <SelectItem value='USDT-BEP20'>USDT (BEP20)</SelectItem>
                    <SelectItem value='USDC-BEP20'>USDC (BEP20)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Input
                type='number'
                placeholder='0.00'
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                className='flex-1 bg-[#001a38] border-0 text-white rounded-md'
                min='0'
              />
            </div>
          </div>

          <div className='flex justify-center'>
            <Button
              type='button'
              variant='outline'
              size='icon'
              className='rounded-full border border-white/20 bg-[#ebeffb]/10 hover:bg-[#ebeffb]/20 text-white'
              onClick={handleSwapWallets}>
              <ArrowDown className='h-4 w-4' />
            </Button>
          </div>

          <div className='space-y-3'>
            <div className='flex gap-2'>
              <Select value={toWallet} onValueChange={setToWallet}>
                <SelectTrigger className='w-[140px] bg-[#001a38] border-0 text-white rounded-md'>
                  <SelectValue placeholder='Select wallet' />
                </SelectTrigger>
                <SelectContent className='bg-[#001a38] border-white/10 text-white'>
                  <SelectGroup>
                    <SelectLabel className='text-white/70'>
                      Mobile Money
                    </SelectLabel>
                    <SelectItem value='MPESA'>Mpesa</SelectItem>
                    <SelectItem value='EVC'>EVC</SelectItem>
                    <SelectItem value='T-PLUS'>T-Plus</SelectItem>
                    <SelectItem value='JEEB'>JEEB</SelectItem>
                    <SelectItem value='SAHAL'>SAHAL</SelectItem>
                    <SelectItem value='ZAAD'>ZAAD</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel className='text-white/70'>Crypto</SelectLabel>
                    <SelectItem value='USDT-TRC20'>USDT (TRC20)</SelectItem>
                    <SelectItem value='USDT-BEP20'>USDT (BEP20)</SelectItem>
                    <SelectItem value='USDC-BEP20'>USDC (BEP20)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Input
                type='text'
                placeholder='0.00'
                value={estimatedAmount}
                readOnly
                className='flex-1 bg-[#001a38]/70 border-0 text-white/70 rounded-md'
              />
            </div>
          </div>

          <div className='pt-4'>
            <Button
              type='submit'
              className='w-full bg-primary hover:bg-primary/90 text-white font-medium'
              disabled={isLoading}>
              {isLoading ? (
                <>
                  <RefreshCw className='mr-2 h-4 w-4 animate-spin' />
                  Processing...
                </>
              ) : (
                "Swap Now"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
