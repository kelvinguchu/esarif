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
    <div className='p-4 divide-y divide-white/10'>
      <div className='pb-2 text-white/70 font-medium'>
        Select {label} Wallet
      </div>
      {walletOptions.map((wallet) => (
        <div
          key={wallet.id}
          className={`flex items-center justify-between py-3 px-3 my-1 rounded-lg cursor-pointer transition-all ${
            wallet.id === selected
              ? "bg-[#122a52] shadow-lg"
              : "hover:bg-white/5"
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
              <div className='text-white font-medium'>{wallet.name}</div>
              <div className='text-white/60 text-sm'>{wallet.description}</div>
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
          className='flex items-center gap-2 bg-[#001a38]/80 backdrop-blur-sm border border-white/10 text-white rounded-lg p-3 shadow-inner shadow-black/20 w-full transition-all hover:border-primary/30 group'
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
            <div className='text-white font-medium'>{selectedWallet?.name}</div>
            <div className='text-white/60 text-xs'>
              {selectedWallet?.description}
            </div>
          </div>
          <ChevronDown className='h-4 w-4 text-white/60' />
        </button>
      </DrawerTrigger>
      <DrawerContent className='bg-gradient-to-t from-[#001834] to-[#00295a] border-t border-white/10 rounded-t-xl p-0'>
        <DrawerHeader className='bg-gradient-to-r from-[#002346] to-[#001b35] border-b border-white/10 p-4 sticky top-0 z-10'>
          <DrawerTitle className='text-white'>
            Select {label} Wallet
          </DrawerTitle>
        </DrawerHeader>
        <div className='max-h-[65vh] overflow-y-auto py-2 custom-scrollbar'>
          {content}
        </div>
        <DrawerFooter className='border-t border-white/10 sticky bottom-0 bg-[#001834] z-10'>
          <Button
            variant='outline'
            className='w-full bg-transparent border-white/10 text-white hover:bg-white/10'
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
          className='flex items-center gap-2 bg-[#001a38]/80 backdrop-blur-sm border border-white/10 text-white rounded-lg p-3 shadow-inner shadow-black/20 w-full transition-all hover:border-primary/30 group'>
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
            <div className='text-white font-medium'>{selectedWallet?.name}</div>
            <div className='text-white/60 text-xs'>
              {selectedWallet?.description}
            </div>
          </div>
          <ChevronDown className='h-4 w-4 text-white/60' />
        </button>
      </SheetTrigger>
      <SheetContent
        side='right'
        className='w-[400px] bg-gradient-to-t from-[#001834] to-[#00295a] border-l border-white/10 p-0'>
        <SheetHeader className='bg-gradient-to-r from-[#002346] to-[#001b35] border-b border-white/10 p-4 sticky top-0 z-10'>
          <SheetTitle className='text-white'>Select {label} Wallet</SheetTitle>
        </SheetHeader>
        <div className='overflow-y-auto py-2 h-[calc(100vh-80px)] custom-scrollbar'>
          {content}
        </div>
      </SheetContent>
    </Sheet>
  );
};
