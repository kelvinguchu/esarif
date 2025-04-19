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
    <div className='rounded-lg bg-gradient-to-br from-blue-50 to-green-50 border border-gray-200 p-4 text-center text-gray-700 mt-4 shadow-sm'>
      {shouldShowRecipientField && recipientAccount ? (
        <div className='flex flex-col items-center space-y-2'>
          <div className='flex items-center'>
            {selectedWallet && <WalletIcon wallet={selectedWallet} />}
            <p className='ml-2'>
              You will receive{" "}
              <span className='font-semibold text-gray-900'>
                {currencySymbol}
                {estimatedAmount}
              </span>{" "}
            </p>
          </div>
          <div className='rounded-md bg-white px-3 py-2 font-medium text-gray-800 flex items-center border border-gray-200'>
            <User className='h-4 w-4 mr-2 text-primary/70' /> {recipientAccount}
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-center'>
          {selectedWallet && <WalletIcon wallet={selectedWallet} />}
          <p className='ml-2'>
            You will receive{" "}
            <span className='font-semibold text-gray-900'>
              {currencySymbol}
              {estimatedAmount}
            </span>{" "}
          </p>
        </div>
      )}
    </div>
  );
};
