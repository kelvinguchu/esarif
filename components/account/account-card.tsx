"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, MoreHorizontal, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface AccountData {
  id: string;
  name: string;
  type: "mobile-money" | "crypto";
  provider: string;
  balance: number;
  currency: string;
  accountNumber: string;
  lastUpdated: string;
  connected: boolean;
  logoUrl: string;
}

interface AccountCardProps {
  account: AccountData;
  onDisconnect: (id: string) => void;
}

export function AccountCard({ account, onDisconnect }: AccountCardProps) {
  const [copied, setCopied] = useState(false);

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(account.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCurrency = (amount: number, currency: string) => {
    try {
      // Use a standard currency code for non-standard currencies
      const validCurrency = currency === "SLSH" ? "SOS" : currency;

      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: validCurrency,
        maximumFractionDigits: validCurrency === "USD" ? 2 : 0,
      }).format(amount);
    } catch (error) {
      // Fallback for invalid currency codes
      return amount.toLocaleString() + " " + currency;
    }
  };

  // Get initials for the logo placeholder
  const getInitials = (name: string) => {
    return name.substring(0, 2).toUpperCase();
  };

  // Get a color based on the account name (simple hash)
  const getLogoColor = (name: string) => {
    const colors = [
      "bg-blue-500",
      "bg-indigo-500",
      "bg-purple-500",
      "bg-green-500",
      "bg-teal-500",
      "bg-cyan-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <Card className='bg-[#001a38] border-0 shadow-md hover:shadow-lg transition-all w-full h-full overflow-hidden'>
      <CardHeader className='bg-[#041c38]/50 border-b border-white/10 flex flex-row items-center justify-between p-3 md:p-4'>
        <div className='flex items-center space-x-2 md:space-x-3'>
          {account.logoUrl ? (
            <div className='h-8 w-8 md:h-10 md:w-10 rounded-full bg-white p-1 flex items-center justify-center overflow-hidden'>
              <img
                src={account.logoUrl}
                alt={account.name}
                className='h-6 w-6 md:h-8 md:w-8 object-contain'
              />
            </div>
          ) : (
            <div
              className={`h-8 w-8 md:h-10 md:w-10 rounded-full ${getLogoColor(
                account.name
              )} p-2 flex items-center justify-center text-white font-semibold text-xs md:text-sm`}>
              {getInitials(account.name)}
            </div>
          )}
          <div>
            <CardTitle className='text-white text-base md:text-lg'>
              {account.name}
            </CardTitle>
            <p className='text-white/60 text-xs'>{account.provider}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              className='h-8 w-8 text-white/70 hover:text-white hover:bg-white/10'>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='bg-[#05264c] border-white/10 text-white'>
            <DropdownMenuItem
              className='hover:bg-white/10 cursor-pointer'
              onClick={copyAccountNumber}>
              <Copy className='mr-2 h-4 w-4' />
              {copied ? "Copied" : "Copy Account Number"}
            </DropdownMenuItem>
            <DropdownMenuItem
              className='hover:bg-white/10 cursor-pointer text-red-400 hover:text-red-300'
              onClick={() => onDisconnect(account.id)}>
              <Trash className='mr-2 h-4 w-4' /> Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className='p-3 md:p-4'>
        <div className='flex flex-col space-y-3'>
          <div>
            <p className='text-white/50 text-xs mb-1'>Balance</p>
            <p className='text-white text-lg md:text-xl font-semibold'>
              {formatCurrency(account.balance, account.currency)}
            </p>
          </div>
          <div>
            <p className='text-white/50 text-xs mb-1'>Account Number</p>
            <div className='flex items-center'>
              <p className='text-white/80 text-xs md:text-sm mr-2 break-all'>
                {account.accountNumber}
              </p>
              <Button
                variant='ghost'
                size='icon'
                className='h-6 w-6 p-0 flex-shrink-0 text-white/50 hover:text-white hover:bg-white/10'
                onClick={copyAccountNumber}>
                <Copy className='h-3.5 w-3.5' />
              </Button>
            </div>
          </div>
          <div className='pt-2'>
            <p className='text-white/50 text-xs'>
              Last updated: {account.lastUpdated}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
