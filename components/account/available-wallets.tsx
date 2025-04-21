"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { paymentMethods } from "@/lib/swap/data";

interface AvailableWalletsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AvailableWallets({ isOpen, onClose }: AvailableWalletsProps) {
  // Filter payment methods by category
  const bankOptions = paymentMethods.filter(
    (wallet) => wallet.category === "bank"
  );

  const mobileMoneyWallets = paymentMethods.filter(
    (wallet) => wallet.category === "mobileMoney"
  );

  const cryptoWallets = paymentMethods.filter(
    (wallet) => wallet.category === "crypto"
  );

  // Get initials for the logo placeholder
  const getInitials = (name: string) => {
    return name.substring(0, 2).toUpperCase();
  };

  const handleWalletClick = (walletId: string) => {
    console.log(`Connecting to wallet: ${walletId}`);
    // Implement wallet connection logic here
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        className='bg-white text-gray-800 border-gray-200 p-0 min-w-[95vw] md:min-w-[40vw]'
        side='right'>
        <SheetHeader className='p-4 border-b border-gray-200'>
          <SheetTitle className='text-gray-800 text-xl'>
            Connect New Account
          </SheetTitle>
        </SheetHeader>

        <div className='p-4 overflow-y-auto max-h-[calc(100vh-5rem)]'>
          <div className='mb-6'>
            <h3 className='text-gray-800 font-medium mb-3'>Banks</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
              {bankOptions.map((wallet) => (
                <div
                  key={wallet.id}
                  className='w-full cursor-pointer'
                  onClick={() => handleWalletClick(wallet.id)}>
                  <div className='flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors h-full overflow-hidden'>
                    {wallet.logo ? (
                      <div className='h-8 w-8 md:h-10 md:w-10 rounded-full bg-white p-1 flex items-center justify-center overflow-hidden flex-shrink-0'>
                        <img
                          src={wallet.logo}
                          alt={wallet.name}
                          className='h-6 w-6 md:h-8 md:w-8 object-contain'
                        />
                      </div>
                    ) : (
                      <div
                        className={`h-8 w-8 md:h-10 md:w-10 rounded-full ${
                          wallet.color || "bg-gray-500"
                        } p-2 flex items-center justify-center text-white font-semibold flex-shrink-0 text-xs md:text-sm`}>
                        {getInitials(wallet.name)}
                      </div>
                    )}
                    <div className='flex-grow ml-2 md:ml-3 min-w-0'>
                      <h3 className='text-gray-800 font-medium text-sm md:text-base truncate'>
                        {wallet.name}
                      </h3>
                      <p className='text-gray-500 text-xs truncate'>
                        {wallet.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='mb-6'>
            <h3 className='text-gray-800 font-medium mb-3'>
              Mobile Money Services
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
              {mobileMoneyWallets.map((wallet) => (
                <div
                  key={wallet.id}
                  className='w-full cursor-pointer'
                  onClick={() => handleWalletClick(wallet.id)}>
                  <div className='flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors h-full overflow-hidden'>
                    {wallet.logo ? (
                      <div className='h-8 w-8 md:h-10 md:w-10 rounded-full bg-white p-1 flex items-center justify-center overflow-hidden flex-shrink-0'>
                        <img
                          src={wallet.logo}
                          alt={wallet.name}
                          className='h-6 w-6 md:h-8 md:w-8 object-contain'
                        />
                      </div>
                    ) : (
                      <div
                        className={`h-8 w-8 md:h-10 md:w-10 rounded-full ${
                          wallet.color || "bg-gray-500"
                        } p-2 flex items-center justify-center text-white font-semibold flex-shrink-0 text-xs md:text-sm`}>
                        {getInitials(wallet.name)}
                      </div>
                    )}
                    <div className='flex-grow ml-2 md:ml-3 min-w-0'>
                      <h3 className='text-gray-800 font-medium text-sm md:text-base truncate'>
                        {wallet.name}
                      </h3>
                      <p className='text-gray-500 text-xs truncate'>
                        {wallet.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className='text-gray-800 font-medium mb-3'>
              Cryptocurrency Wallets
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
              {cryptoWallets.map((wallet) => (
                <div
                  key={wallet.id}
                  className='w-full cursor-pointer'
                  onClick={() => handleWalletClick(wallet.id)}>
                  <div className='flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors h-full overflow-hidden'>
                    {wallet.logo ? (
                      <div className='h-8 w-8 md:h-10 md:w-10 rounded-full bg-white p-1 flex items-center justify-center overflow-hidden flex-shrink-0'>
                        <img
                          src={wallet.logo}
                          alt={wallet.name}
                          className='h-6 w-6 md:h-8 md:w-8 object-contain'
                        />
                      </div>
                    ) : (
                      <div
                        className={`h-8 w-8 md:h-10 md:w-10 rounded-full ${
                          wallet.color || "bg-gray-500"
                        } p-2 flex items-center justify-center text-white font-semibold flex-shrink-0 text-xs md:text-sm`}>
                        {getInitials(wallet.name)}
                      </div>
                    )}
                    <div className='flex-grow ml-2 md:ml-3 min-w-0'>
                      <h3 className='text-gray-800 font-medium text-sm md:text-base truncate'>
                        {wallet.name}
                      </h3>
                      <p className='text-gray-500 text-xs truncate'>
                        {wallet.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
