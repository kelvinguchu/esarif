"use client";

import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { WalletInfo } from "./wallet-logo";

interface RecipientInputProps {
  recipientAccount: string;
  setRecipientAccount: (value: string) => void;
  selectedWallet?: WalletInfo;
}

export const RecipientInput = ({
  recipientAccount,
  setRecipientAccount,
  selectedWallet,
}: RecipientInputProps) => {
  return (
    <div className='space-y-2 pt-1'>
      <label className='text-sm text-gray-600 font-medium ml-1 mb-1 block'>
        Recipient Account Number
      </label>
      <div className='relative'>
        <Input
          type='text'
          placeholder={`Enter ${selectedWallet?.name} phone number`}
          value={recipientAccount}
          onChange={(e) => setRecipientAccount(e.target.value)}
          className='w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg shadow-sm pl-10 transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/30 h-12'
        />
        <User className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
      </div>
    </div>
  );
};
