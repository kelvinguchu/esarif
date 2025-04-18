"use client";

import { User } from "lucide-react";
import { WalletInfo } from "./wallet-logo";
import { WalletIcon } from "./wallet-logo";

interface ConfirmationMessageProps {
  estimatedAmount: string;
  toWallet: string;
  selectedWallet?: WalletInfo;
  recipientAccount?: string;
  shouldShowRecipientField: boolean;
  currencySymbol: string;
}

export const ConfirmationMessage = ({
  estimatedAmount,
  toWallet,
  selectedWallet,
  recipientAccount,
  shouldShowRecipientField,
  currencySymbol,
}: ConfirmationMessageProps) => {
  return (
    <div className='rounded-lg bg-gradient-to-br from-[#001a38]/70 to-[#00254d]/70 border border-white/10 p-4 text-center text-white/80 mt-4 shadow-inner'>
      {shouldShowRecipientField && recipientAccount ? (
        <div className='flex flex-col items-center space-y-2'>
          <div className='flex items-center'>
            {selectedWallet && <WalletIcon wallet={selectedWallet} />}
            <p className='ml-2'>
              You will receive{" "}
              <span className='font-semibold text-white'>
                {currencySymbol}
                {estimatedAmount}
              </span>{" "}
            </p>
          </div>
          <div className='rounded-md bg-white/10 px-3 py-2 font-medium text-white flex items-center'>
            <User className='h-4 w-4 mr-2 text-primary/70' /> {recipientAccount}
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-center'>
          {selectedWallet && <WalletIcon wallet={selectedWallet} />}
          <p className='ml-2'>
            You will receive{" "}
            <span className='font-semibold text-white'>
              {currencySymbol}
              {estimatedAmount}
            </span>{" "}
          </p>
        </div>
      )}
    </div>
  );
};
