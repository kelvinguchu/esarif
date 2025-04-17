"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type WalletType = {
  id: string;
  name: string;
  provider: string;
  description: string;
  color: string;
  logo?: string;
};

interface AvailableWalletsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AvailableWallets({ isOpen, onClose }: AvailableWalletsProps) {
  const mobileMoneyWallets: WalletType[] = [
    {
      id: "mpesa",
      name: "M-Pesa",
      provider: "Safaricom",
      description: "Kenya's leading mobile money service",
      color: "bg-green-500",
      logo: "/logos/mpesa.png",
    },
    {
      id: "evc",
      name: "EVC Plus",
      provider: "Hormuud",
      description: "Electronic Voucher Card from Somalia",
      color: "bg-blue-500",
      logo: "/logos/evc.svg",
    },
    {
      id: "tplus",
      name: "T-Plus",
      provider: "Telesom",
      description: "Telesom's mobile money service",
      color: "bg-purple-500",
      logo: "/logos/tplus.webp",
    },
    {
      id: "jeeb",
      name: "JEEB",
      provider: "JEEB",
      description: "Mobile money platform",
      color: "bg-indigo-500",
      logo: "/logos/jeeb.png",
    },
    {
      id: "sahal",
      name: "SAHAL",
      provider: "SAHAL",
      description: "Digital payment solution",
      color: "bg-cyan-500",
      logo: "/logos/sahal.png",
    },
    {
      id: "zaad",
      name: "ZAAD",
      provider: "Telesom",
      description: "Telesom's mobile money service in Somaliland",
      color: "bg-teal-500",
      logo: "/logos/zaad.png",
    },
  ];

  const cryptoWallets: WalletType[] = [
    {
      id: "usdt-trc20",
      name: "USDT TRC20",
      provider: "Tether",
      description: "Tether on TRON blockchain",
      color: "bg-green-600",
    },
    {
      id: "usdt-bep20",
      name: "USDT BEP20",
      provider: "Tether",
      description: "Tether on Binance Smart Chain",
      color: "bg-green-500",
    },
    {
      id: "usdc-bep20",
      name: "USDC BEP20",
      provider: "USD Coin",
      description: "USD Coin on Binance Smart Chain",
      color: "bg-blue-600",
    },
  ];

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
        className='bg-[#041c38] text-white border-white/10 p-0 min-w-[95vw] md:min-w-[40vw]'
        side='right'>
        <SheetHeader className='p-4 border-b border-white/10'>
          <SheetTitle className='text-white text-xl'>
            Connect New Account
          </SheetTitle>
        </SheetHeader>

        <div className='p-4 overflow-y-auto max-h-[calc(100vh-5rem)]'>
          <div className='mb-6'>
            <h3 className='text-white font-medium mb-3'>
              Mobile Money Services
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
              {mobileMoneyWallets.map((wallet) => (
                <div
                  key={wallet.id}
                  className='w-full cursor-pointer'
                  onClick={() => handleWalletClick(wallet.id)}>
                  <div className='flex items-center p-3 bg-[#001a38] rounded-lg border border-white/5 hover:bg-[#001a38]/80 transition-colors h-full overflow-hidden'>
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
                        className={`h-8 w-8 md:h-10 md:w-10 rounded-full ${wallet.color} p-2 flex items-center justify-center text-white font-semibold flex-shrink-0 text-xs md:text-sm`}>
                        {getInitials(wallet.name)}
                      </div>
                    )}
                    <div className='flex-grow ml-2 md:ml-3 min-w-0'>
                      <h3 className='text-white font-medium text-sm md:text-base truncate'>
                        {wallet.name}
                      </h3>
                      <p className='text-white/60 text-xs truncate'>
                        {wallet.provider}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className='text-white font-medium mb-3'>
              Cryptocurrency Wallets
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
              {cryptoWallets.map((wallet) => (
                <div
                  key={wallet.id}
                  className='w-full cursor-pointer'
                  onClick={() => handleWalletClick(wallet.id)}>
                  <div className='flex items-center p-3 bg-[#001a38] rounded-lg border border-white/5 hover:bg-[#001a38]/80 transition-colors h-full overflow-hidden'>
                    <div
                      className={`h-8 w-8 md:h-10 md:w-10 rounded-full ${wallet.color} p-2 flex items-center justify-center text-white font-semibold flex-shrink-0 text-xs md:text-sm`}>
                      {getInitials(wallet.name)}
                    </div>
                    <div className='flex-grow ml-2 md:ml-3 min-w-0'>
                      <h3 className='text-white font-medium text-sm md:text-base truncate'>
                        {wallet.name}
                      </h3>
                      <p className='text-white/60 text-xs truncate'>
                        {wallet.provider}
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
