"use client";

import Image from "next/image";
import { DollarSign, CircleDollarSign } from "lucide-react";
import { FaBitcoin, FaEthereum } from "react-icons/fa";

export type WalletInfo = {
  id: string;
  name: string;
  type: "mobile" | "crypto";
  logo: string;
  description: string;
  color: string;
  isLocalImage: boolean;
};

interface WalletLogoProps {
  wallet: WalletInfo;
  size?: number;
}

export const WalletLogo = ({ wallet, size = 32 }: WalletLogoProps) => {
  if (wallet.isLocalImage) {
    return (
      <Image
        src={wallet.logo}
        alt={wallet.name}
        width={size}
        height={size}
        className='object-contain rounded-full'
      />
    );
  } else if (wallet.logo === "usdt") {
    return (
      <div className='flex items-center justify-center w-full h-full bg-[#26A17B] rounded-full'>
        <DollarSign className='h-[60%] w-[60%] text-white' />
      </div>
    );
  } else if (wallet.logo === "usdc") {
    return (
      <div className='flex items-center justify-center w-full h-full bg-[#2775CA] rounded-full'>
        <DollarSign className='h-[60%] w-[60%] text-white' />
      </div>
    );
  } else if (wallet.logo === "btc") {
    return (
      <div className='flex items-center justify-center w-full h-full bg-[#F7931A] rounded-full'>
        <FaBitcoin className='h-[65%] w-[65%] text-white' />
      </div>
    );
  } else if (wallet.logo === "eth") {
    return (
      <div className='flex items-center justify-center w-full h-full bg-[#627EEA] rounded-full'>
        <FaEthereum className='h-[65%] w-[65%] text-white' />
      </div>
    );
  }

  return (
    <CircleDollarSign
      className={`h-[${size}px] w-[${size}px] text-${wallet.color}`}
    />
  );
};

// Render wallet icon with container
export const WalletIcon = ({ wallet, size = 24 }: WalletLogoProps) => {
  if (!wallet) return null;

  return (
    <div
      className={`w-${size / 4} h-${
        size / 4
      } rounded-full flex items-center justify-center overflow-hidden p-0.5`}
      style={{
        background: wallet.isLocalImage ? "white" : `${wallet.color}`,
      }}>
      <WalletLogo wallet={wallet} size={size} />
    </div>
  );
};
