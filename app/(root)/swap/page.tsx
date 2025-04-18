import { SwapForm } from "@/components/swap/swap-form";

export const metadata = {
  title: "e-Sarif | Swap",
  description: "Transfer funds between mobile money and crypto wallets",
};

function SwapPage() {
  return (
    <div className='max-w-full px-2 md:px-4 relative'>
      {/* Background decorative elements */}
      <div className='absolute top-0 right-0 w-1/2 h-80 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl -z-10 opacity-30'></div>
      <div className='absolute bottom-40 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -z-10 opacity-20'></div>

      <div className='max-w-md mt-4 md:max-w-3xl mx-auto'>
        <SwapForm />
      </div>

      <div className='mt-16 mb-12'>
        <h2 className='text-2xl font-bold text-white mb-8 relative inline-block'>
          How it works
          <span className='absolute -bottom-2 left-0 h-1 w-20 bg-gradient-to-r from-primary to-blue-400 rounded-full'></span>
        </h2>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
          <div className='bg-gradient-to-b from-[#0a2348] to-[#001a38] rounded-xl border border-white/10 overflow-hidden shadow-lg shadow-primary/5 transform transition-transform hover:scale-[1.02] hover:shadow-primary/10'>
            <div className='h-1.5 bg-gradient-to-r from-primary to-blue-400 w-full'></div>
            <div className='p-6'>
              <div className='flex items-center mb-4'>
                <div className='w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-white font-bold mr-4 shadow-md'>
                  1
                </div>
                <h3 className='text-white font-semibold text-lg'>
                  Select Wallets
                </h3>
              </div>
              <p className='text-white/80 leading-relaxed'>
                Choose which wallets you want to transfer between - mobile money
                or crypto
              </p>
            </div>
          </div>

          <div className='bg-gradient-to-b from-[#0a2348] to-[#001a38] rounded-xl border border-white/10 overflow-hidden shadow-lg shadow-primary/5 transform transition-transform hover:scale-[1.02] hover:shadow-primary/10'>
            <div className='h-1.5 bg-gradient-to-r from-primary to-blue-400 w-full'></div>
            <div className='p-6'>
              <div className='flex items-center mb-4'>
                <div className='w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-white font-bold mr-4 shadow-md'>
                  2
                </div>
                <h3 className='text-white font-semibold text-lg'>
                  Enter Amount
                </h3>
              </div>
              <p className='text-white/80 leading-relaxed'>
                Specify how much you want to exchange with real-time rate
                calculations
              </p>
            </div>
          </div>

          <div className='bg-gradient-to-b from-[#0a2348] to-[#001a38] rounded-xl border border-white/10 overflow-hidden shadow-lg shadow-primary/5 transform transition-transform hover:scale-[1.02] hover:shadow-primary/10'>
            <div className='h-1.5 bg-gradient-to-r from-primary to-blue-400 w-full'></div>
            <div className='p-6'>
              <div className='flex items-center mb-4'>
                <div className='w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-white font-bold mr-4 shadow-md'>
                  3
                </div>
                <h3 className='text-white font-semibold text-lg'>
                  Confirm Swap
                </h3>
              </div>
              <p className='text-white/80 leading-relaxed'>
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
