"use client";

import { useState } from "react";
import { AccountCard, AccountData } from "./account-card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AvailableWallets } from "./available-wallets";

export function ConnectedAccounts() {
  const [activeTab, setActiveTab] = useState("all");
  const [sheetOpen, setSheetOpen] = useState(false);

  // Simulated account data with updated structure
  const [accounts, setAccounts] = useState<AccountData[]>([
    {
      id: "1",
      name: "M-Pesa",
      category: "mobileMoney",
      description: "Kenyan Mobile Money",
      accountNumber: "+254 712 345 678",
      lastUpdated: "Today at 12:45 PM",
      logo: "/logos/mpesa.png",
      color: "#4CAF50",
    },
    {
      id: "2",
      name: "EVC Plus",
      category: "mobileMoney",
      description: "Somali Mobile Money",
      accountNumber: "+252 612 345 678",
      lastUpdated: "Today at 11:30 AM",
      logo: "/logos/evc.svg",
      color: "#2196F3",
    },
    {
      id: "3",
      name: "USDT (TRC20)",
      category: "crypto",
      description: "Tether on TRON",
      accountNumber: "TBs2hdDaJ...4f3Ax2p",
      lastUpdated: "Today at 10:15 AM",
      logo: "/logos/usdt.svg",
      color: "#26A17B",
    },
    {
      id: "4",
      name: "ZAAD",
      category: "mobileMoney",
      description: "Somali Mobile Money",
      accountNumber: "+252 634 567 890",
      lastUpdated: "Today at 09:20 AM",
      logo: "/logos/zaad.png",
      color: "#3F51B5",
    },
    {
      id: "5",
      name: "Premier Bank",
      category: "bank",
      description: "Banking Services",
      accountNumber: "1234567890",
      lastUpdated: "Yesterday at 3:30 PM",
      logo: "/logos/premier-bank.png",
      color: "#FF5722",
    },
    {
      id: "6",
      name: "Salaam Bank",
      category: "bank",
      description: "Banking Services",
      accountNumber: "0987654321",
      lastUpdated: "Yesterday at 2:15 PM",
      logo: "/logos/salaam-bank.jpeg",
      color: "#009688",
    },
  ]);

  const handleDisconnect = (id: string) => {
    setAccounts(accounts.filter((account) => account.id !== id));
  };

  const filteredAccounts =
    activeTab === "all"
      ? accounts
      : accounts.filter((account) => account.category === activeTab);

  const handleOpenSheet = () => {
    setSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setSheetOpen(false);
  };

  return (
    <div className='w-full'>
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-6'>
        <h2 className='text-xl font-semibold text-gray-800 mb-3 md:mb-0'>
          Connected Accounts
        </h2>
        <Button
          className='bg-primary hover:bg-primary/90 whitespace-nowrap text-sm md:text-base'
          onClick={handleOpenSheet}>
          <PlusCircle className='mr-2 h-3 w-3 md:h-4 md:w-4' />
          Connect New Account
        </Button>
      </div>

      <Tabs
        defaultValue='all'
        value={activeTab}
        onValueChange={setActiveTab}
        className='w-full'>
        <TabsList className='bg-gray-50 border border-gray-200 mb-4 md:mb-6 p-0.5 md:p-1 w-full max-w-md overflow-hidden'>
          <TabsTrigger
            value='all'
            className='flex-1 text-gray-700 text-xs md:text-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-gray-500'>
            All Accounts
          </TabsTrigger>
          <TabsTrigger
            value='bank'
            className='flex-1 text-gray-700 text-xs md:text-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-gray-500'>
            Banks
          </TabsTrigger>
          <TabsTrigger
            value='mobileMoney'
            className='flex-1 text-gray-700 text-xs md:text-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-gray-500'>
            Mobile Money
          </TabsTrigger>
          <TabsTrigger
            value='crypto'
            className='flex-1 text-gray-700 text-xs md:text-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-gray-500'>
            Crypto Wallets
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className='mt-0 w-full'>
          {filteredAccounts.length > 0 ? (
            <div className='flex flex-wrap w-full'>
              {filteredAccounts.map((account) => (
                <div
                  key={account.id}
                  className='w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-16px)] py-1 md:p-2 md:min-w-[320px]'>
                  <div className='w-full mx-auto md:w-full'>
                    <AccountCard
                      account={account}
                      onDisconnect={handleDisconnect}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='w-full mx-auto md:w-full flex flex-col items-center justify-center py-8 md:py-12 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden'>
              <p className='text-gray-500 mb-4 text-sm md:text-base'>
                No accounts connected in this category
              </p>
              <Button
                className='bg-primary hover:bg-primary/90 text-sm md:text-base'
                onClick={handleOpenSheet}>
                <PlusCircle className='mr-2 h-3 w-3 md:h-4 md:w-4' />
                Connect New Account
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <AvailableWallets isOpen={sheetOpen} onClose={handleCloseSheet} />
    </div>
  );
}
