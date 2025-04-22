"use client";

import Image from "next/image";
import { DollarSign } from "lucide-react";
import type { WalletInfo } from "@/lib/swap/types";

interface WalletLogoProps {
  wallet: WalletInfo;
  size?: number;
}

export const WalletLogo = ({ wallet, size = 32 }: WalletLogoProps) => {
  // Check if the wallet has a logo path
  if (wallet.logo) {
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

  // Fallback icon if no logo is available
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
        background: `${wallet.color || "#ffffff"}`,
      }}>
      <WalletLogo wallet={wallet} size={size * 0.9} />
    </div>
  );
};
