"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ServiceRate {
  name: string;
  code: string;
  rate: number;
  change?: number;
}

export const MarketRates = () => {
  // Mobile money services
  const [mobileServices] = useState<ServiceRate[]>([
    { name: "Mpesa", code: "MPESA", rate: 0.98 },
    { name: "EVC", code: "EVC", rate: 0.96 },
    { name: "T-Plus", code: "T-PLUS", rate: 0.97 },
    { name: "JEEB", code: "JEEB", rate: 0.95 },
  ]);

  return (
    <Card className='border-0 shadow-none bg-transparent'>
      <CardHeader className='bg-[#ebeffb]/10 rounded-t-lg px-6 py-4'>
        <CardTitle className='text-white text-lg'>Exchange Rates</CardTitle>
      </CardHeader>
      <CardContent className='p-0'>
        <Tabs defaultValue='mobile' className='w-full'>
          <TabsList className='w-full bg-transparent grid grid-cols-2 mb-0 p-0'>
            <TabsTrigger
              value='mobile'
              className='rounded-none border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-white text-white/70 py-3'>
              Mobile Money
            </TabsTrigger>
            <TabsTrigger
              value='crypto'
              className='rounded-none border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-white text-white/70 py-3'>
              Crypto
            </TabsTrigger>
          </TabsList>

          <TabsContent value='mobile' className='mt-0'>
            <div className='divide-y divide-white/10'>
              {mobileServices.map((service) => (
                <div
                  key={service.code}
                  className='flex items-center justify-between py-4 px-6'>
                  <div className='text-white'>{service.code}</div>
                  <div className='text-white/70'>Exchange rate</div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value='crypto' className='mt-0'>
            <div className='divide-y divide-white/10'>
              <div className='flex items-center justify-between py-4 px-6'>
                <div className='text-white'>USDT (TRC20)</div>
                <div className='text-white/70'>Exchange rate</div>
              </div>
              <div className='flex items-center justify-between py-4 px-6'>
                <div className='text-white'>USDT (BEP20)</div>
                <div className='text-white/70'>Exchange rate</div>
              </div>
              <div className='flex items-center justify-between py-4 px-6'>
                <div className='text-white'>USDC (BEP20)</div>
                <div className='text-white/70'>Exchange rate</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
