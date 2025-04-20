"use client";

import Image from "next/image";
import { DollarSign, CircleDollarSign } from "lucide-react";
import type { WalletInfo } from "@/lib/swap/types";

interface WalletLogoProps {
  wallet: WalletInfo;
  size?: number;
}

export const WalletLogo = ({ wallet, size = 32 }: WalletLogoProps) => {
  if (wallet.isLocalImage && wallet.logo) {
    return (
      <Image
        src={wallet.logo}
        alt={wallet.name}
        width={size}
        height={size}
        className='object-contain rounded-full'
      />
    );
  }

  console.warn(
    `WalletLogo: Missing or non-local logo for ${wallet.id}. Falling back to default icon.`
  );
  return (
    <div
      className='flex items-center justify-center w-full h-full rounded-full'
      style={{ backgroundColor: wallet.color || "#cccccc" }}>
      <DollarSign className='h-[60%] w-[60%] text-white' />
    </div>
  );
};

// Render wallet icon with container
export const WalletIcon = ({ wallet, size = 24 }: WalletLogoProps) => {
  if (!wallet) return null;

  return (
    <div
      className={`rounded-full flex items-center justify-center overflow-hidden p-0.5`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: wallet.isLocalImage ? "white" : `${wallet.color}`,
      }}>
      <WalletLogo wallet={wallet} size={size * 0.9} />
    </div>
  );
};
