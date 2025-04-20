"use client";

import { User } from "lucide-react";
import { WalletInfo } from "@/lib/swap/types";
import { WalletIcon } from "./wallet-logo";
import { formatCurrency } from "@/lib/swap/utils";

interface ConfirmationMessageProps {
  estimatedAmount: string;
  toWallet: string;
  selectedWallet?: WalletInfo;
  currencySymbol: string;
}

export const ConfirmationMessage = ({
  estimatedAmount,
  toWallet,
  selectedWallet,
  currencySymbol,
}: ConfirmationMessageProps) => {
  return (
    <div className='rounded-lg bg-gradient-to-br from-blue-50 to-green-50 border border-gray-200 p-4 text-center text-gray-700 mt-4 shadow-sm'>
      <div className='flex items-center justify-center'>
        {selectedWallet && <WalletIcon wallet={selectedWallet} />}
        <p className='ml-2'>
          You will receive{" "}
          <span className='font-semibold text-gray-900'>
            {formatCurrency(
              parseFloat(estimatedAmount),
              toWallet,
              currencySymbol
            )}
          </span>{" "}
        </p>
      </div>
    </div>
  );
};
