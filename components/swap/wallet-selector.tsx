"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { WalletInfo, WalletLogo } from "./wallet-logo";
import { useMediaQuery } from "@/hooks/use-media-query";

interface WalletSelectorProps {
  label: string;
  selected: string;
  onSelect: (value: string) => void;
  type: "from" | "to";
  walletOptions: WalletInfo[];
  showDrawer: boolean;
  setShowDrawer: (value: boolean) => void;
}

export const WalletSelector = ({
  label,
  selected,
  onSelect,
  type,
  walletOptions,
  showDrawer,
  setShowDrawer,
}: WalletSelectorProps) => {
  const selectedWallet = walletOptions.find((wallet) => wallet.id === selected);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Handle drawer state changes - simplified to use the external state directly
  const handleOpenChange = (open: boolean) => {
    setShowDrawer(open);
  };

  const content = (
    <div className='p-4 divide-y divide-gray-200'>
      <div className='pb-2 text-gray-700 font-medium'>
        Select {label} Wallet
      </div>
      {walletOptions.map((wallet) => (
        <div
          key={wallet.id}
          className={`flex items-center justify-between py-3 px-3 my-1 rounded-lg cursor-pointer transition-all ${
            wallet.id === selected
              ? "bg-gray-100 shadow-sm"
              : "hover:bg-gray-50"
          }`}
          onClick={() => {
            onSelect(wallet.id);
            setShowDrawer(false);
          }}>
          <div className='flex items-center gap-3'>
            <div
              className='w-10 h-10 rounded-full flex items-center justify-center bg-white'
              style={{
                boxShadow:
                  wallet.id === selected ? `0 0 0 2px ${wallet.color}` : "none",
                background: wallet.isLocalImage ? "white" : `${wallet.color}20`,
              }}>
              <WalletLogo wallet={wallet} />
            </div>
            <div>
              <div className='text-gray-800 font-medium'>{wallet.name}</div>
              <div className='text-gray-500 text-sm'>{wallet.description}</div>
            </div>
          </div>
          {wallet.id === selected && <Check className='h-5 w-5 text-primary' />}
        </div>
      ))}
    </div>
  );

  // Render either Drawer (mobile) or Sheet (desktop)
  return isMobile ? (
    <Drawer open={showDrawer} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <button
          type='button'
          className='flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-800 rounded-lg p-3 shadow-sm w-full transition-all hover:border-primary/30 group'
          onClick={() => setShowDrawer(true)}>
          <div
            className='w-10 h-10 rounded-full flex items-center justify-center overflow-hidden group-hover:ring-2 group-hover:ring-primary/30 transition-all'
            style={{
              background: selectedWallet?.isLocalImage
                ? "white"
                : `${selectedWallet?.color}20`,
            }}>
            {selectedWallet && <WalletLogo wallet={selectedWallet} />}
          </div>
          <div className='flex-1 text-left'>
            <div className='text-gray-800 font-medium'>
              {selectedWallet?.name}
            </div>
            <div className='text-gray-500 text-xs'>
              {selectedWallet?.description}
            </div>
          </div>
          <ChevronDown className='h-4 w-4 text-gray-400' />
        </button>
      </DrawerTrigger>
      <DrawerContent className='bg-white border-t border-gray-200 rounded-t-xl p-0'>
        <DrawerHeader className='bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 p-4 sticky top-0 z-10'>
          <DrawerTitle className='text-gray-800'>
            Select {label} Wallet
          </DrawerTitle>
        </DrawerHeader>
        <div className='max-h-[65vh] overflow-y-auto py-2 custom-scrollbar'>
          {content}
        </div>
        <DrawerFooter className='border-t border-gray-200 sticky bottom-0 bg-white z-10'>
          <Button
            variant='outline'
            className='w-full bg-transparent border-gray-200 text-gray-700 hover:bg-gray-50'
            onClick={() => setShowDrawer(false)}>
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type='button'
          className='flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-800 rounded-lg p-3 shadow-sm w-full transition-all hover:border-primary/30 group'>
          <div
            className='w-10 h-10 rounded-full flex items-center justify-center overflow-hidden group-hover:ring-2 group-hover:ring-primary/30 transition-all'
            style={{
              background: selectedWallet?.isLocalImage
                ? "white"
                : `${selectedWallet?.color}20`,
            }}>
            {selectedWallet && <WalletLogo wallet={selectedWallet} />}
          </div>
          <div className='flex-1 text-left'>
            <div className='text-gray-800 font-medium'>
              {selectedWallet?.name}
            </div>
            <div className='text-gray-500 text-xs'>
              {selectedWallet?.description}
            </div>
          </div>
          <ChevronDown className='h-4 w-4 text-gray-400' />
        </button>
      </SheetTrigger>
      <SheetContent
        side='right'
        className='w-[400px] bg-white border-l border-gray-200 p-0'>
        <SheetHeader className='bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 p-4 sticky top-0 z-10'>
          <SheetTitle className='text-gray-800'>
            Select {label} Wallet
          </SheetTitle>
        </SheetHeader>
        <div className='overflow-y-auto py-2 h-[calc(100vh-80px)] custom-scrollbar'>
          {content}
        </div>
      </SheetContent>
    </Sheet>
  );
};
