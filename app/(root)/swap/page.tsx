import { SwapForm } from "@/components/swap/swap-form";

export const metadata = {
  title: "e-Sarif | Swap",
  description: "Transfer funds between mobile money and crypto wallets",
};

function SwapPage() {
  return (
    <div className='max-w-full px-2 md:px-4 relative bg-gradient-to-b from-white to-gray-50 min-h-screen'>
      {/* Background decorative elements */}
      <div className='absolute top-0 right-0 w-1/2 h-80 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl -z-10 opacity-30'></div>
      <div className='absolute bottom-40 left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl -z-10 opacity-20'></div>

      <div className='max-w-md mt-4 md:max-w-3xl mx-auto'>
        <SwapForm />
      </div>
    </div>
  );
}

export default SwapPage;
