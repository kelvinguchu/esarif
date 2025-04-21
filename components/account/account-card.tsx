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
  category: "mobileMoney" | "crypto" | "bank" | "wallet";
  description: string;
  logo: string;
  accountNumber: string;
  lastUpdated: string;
  color?: string;
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
    <Card className='bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all w-full h-full overflow-hidden'>
      <CardHeader className='bg-gray-50 border-b border-gray-200 flex flex-row items-center justify-between p-3 md:p-4'>
        <div className='flex items-center space-x-2 md:space-x-3'>
          {account.logo ? (
            <div className='h-8 w-8 md:h-10 md:w-10 rounded-full bg-white p-1 flex items-center justify-center overflow-hidden'>
              <img
                src={account.logo}
                alt={account.name}
                className='h-6 w-6 md:h-8 md:w-8 object-contain'
              />
            </div>
          ) : (
            <div
              className={`h-8 w-8 md:h-10 md:w-10 rounded-full ${
                account.color || getLogoColor(account.name)
              } p-2 flex items-center justify-center text-white font-semibold text-xs md:text-sm`}>
              {getInitials(account.name)}
            </div>
          )}
          <div>
            <CardTitle className='text-gray-800 text-base md:text-lg'>
              {account.name}
            </CardTitle>
            <p className='text-gray-500 text-xs'>{account.description}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              className='h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100'>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='bg-white border-gray-200 text-gray-800'>
            <DropdownMenuItem
              className='hover:bg-gray-100 cursor-pointer'
              onClick={copyAccountNumber}>
              <Copy className='mr-2 h-4 w-4' />
              {copied ? "Copied" : "Copy Account Number"}
            </DropdownMenuItem>
            <DropdownMenuItem
              className='hover:bg-gray-100 cursor-pointer text-red-500 hover:text-red-600'
              onClick={() => onDisconnect(account.id)}>
              <Trash className='mr-2 h-4 w-4' /> Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className='p-3 md:p-4'>
        <div className='flex flex-col space-y-3'>
          <div>
            <p className='text-gray-500 text-xs mb-1'>Account Number</p>
            <div className='flex items-center'>
              <p className='text-gray-600 text-xs md:text-sm mr-2 break-all'>
                {account.accountNumber}
              </p>
              <Button
                variant='ghost'
                size='icon'
                className='h-6 w-6 p-0 flex-shrink-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                onClick={copyAccountNumber}>
                <Copy className='h-3.5 w-3.5' />
              </Button>
            </div>
          </div>
          <div className='pt-2'>
            <p className='text-gray-400 text-xs'>
              Last updated: {account.lastUpdated}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
