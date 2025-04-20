"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { WalletInfo } from "@/lib/swap/types";
import { WalletLogo } from "./wallet-logo";
import { GenericSelector } from "./generic-selector";

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
  const selectedWallet = walletOptions.find((w) => w.id === selected);

  // Define how to render a single wallet option in the list
  const renderWalletOption = (wallet: WalletInfo, isSelected: boolean) => (
    <div className='flex items-center gap-3 flex-1'>
      <div
        className='w-10 h-10 rounded-full flex items-center justify-center bg-white'
        style={{
          boxShadow: isSelected ? `0 0 0 2px ${wallet.color}` : "none",
          background: wallet.isLocalImage ? "white" : `${wallet.color}20`,
        }}>
        <WalletLogo wallet={wallet} />
      </div>
      <div>
        <div className='text-gray-800 font-medium'>{wallet.name}</div>
        <div className='text-gray-500 text-sm'>{wallet.description}</div>
      </div>
    </div>
  );

  // Define how to render the trigger button
  const renderWalletTrigger = (selectedWallet: WalletInfo | undefined) => (
    <button
      type='button'
      onClick={() => setShowDrawer(true)}
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
          {selectedWallet?.name || `Select ${label} Wallet`}
        </div>
        <div className='text-gray-500 text-xs'>
          {selectedWallet?.description || "Choose your wallet"}
        </div>
      </div>
      <ChevronDown className='h-4 w-4 text-gray-400' />
    </button>
  );

  return (
    <>
      {renderWalletTrigger(selectedWallet)}

      <GenericSelector<WalletInfo>
        label={`Select ${label} Wallet`}
        options={walletOptions}
        selectedId={selected}
        onSelect={onSelect}
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        renderOption={renderWalletOption}
      />
    </>
  );
};
