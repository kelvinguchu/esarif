import { SwapForm } from "@/components/swap/swap-form";
import { MarketRates } from "@/components/swap/market-rates";

export const metadata = {
  title: "e-Sarif | Swap",
  description: "Transfer funds between mobile money and crypto wallets",
};

function SwapPage() {
  return (
    <div className='max-w-full px-4'>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='md:order-1'>
          <SwapForm />
        </div>
        <div className='md:order-2'>
          <MarketRates />
        </div>
      </div>

      <div className='mt-12 mb-8'>
        <h2 className='text-xl font-semibold text-white mb-6'>How it works</h2>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
          <div className='bg-[#001a38] rounded-lg border border-white/5 overflow-hidden'>
            <div className='h-1 bg-primary w-full'></div>
            <div className='p-5'>
              <div className='flex items-center mb-3'>
                <div className='w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mr-3'>
                  1
                </div>
                <h3 className='text-white font-medium'>Select Wallets</h3>
              </div>
              <p className='text-white/70 text-sm'>
                Choose which wallets you want to transfer between - mobile money
                or crypto
              </p>
            </div>
          </div>

          <div className='bg-[#001a38] rounded-lg border border-white/5 overflow-hidden'>
            <div className='h-1 bg-primary w-full'></div>
            <div className='p-5'>
              <div className='flex items-center mb-3'>
                <div className='w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mr-3'>
                  2
                </div>
                <h3 className='text-white font-medium'>Enter Amount</h3>
              </div>
              <p className='text-white/70 text-sm'>
                Specify how much you want to exchange with real-time rate
                calculations
              </p>
            </div>
          </div>

          <div className='bg-[#001a38] rounded-lg border border-white/5 overflow-hidden'>
            <div className='h-1 bg-primary w-full'></div>
            <div className='p-5'>
              <div className='flex items-center mb-3'>
                <div className='w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mr-3'>
                  3
                </div>
                <h3 className='text-white font-medium'>Confirm Swap</h3>
              </div>
              <p className='text-white/70 text-sm'>
                Review the details and confirm to complete your cross-wallet
                transfer
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SwapPage;
