import { TransactionHistory } from "@/components/transactions/transaction-history";
import { TransactionSummary } from "@/components/transactions/transaction-summary";
import { ArrowLeftRight, TrendingUp } from "lucide-react";

export const metadata = {
  title: "e-Sarif | Transactions",
  description: "View and manage your transaction history across wallets",
};

function TransactionsPage() {
  return (
    <div className='max-w-full px-2 sm:px-4 md:px-8 lg:px-10 mt-5'>
      <div className='mb-8'>
        <h1 className='text-2xl md:text-3xl font-bold text-white mb-2'>
          Transactions
        </h1>
        <p className='text-white/70 max-w-3xl'>
          Your transaction history
        </p>
      </div>

      <TransactionSummary />

      <div className='mb-12'>
        <TransactionHistory />
      </div>

      <div className='mb-10'>
        <h2 className='text-xl font-semibold text-white mb-6'>
          Transaction Types
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          <div className='bg-[#001a38] rounded-lg border border-white/5 overflow-hidden'>
            <div className='h-1 bg-primary w-full'></div>
            <div className='p-5'>
              <div className='flex items-center mb-3'>
                <div className='w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3'>
                  <ArrowLeftRight className='h-4 w-4' />
                </div>
                <h3 className='text-white font-medium'>Swaps</h3>
              </div>
              <p className='text-white/70 text-sm'>
                Exchange between different cryptocurrencies or convert between
                crypto and mobile money
              </p>
            </div>
          </div>

          <div className='bg-[#001a38] rounded-lg border border-white/5 overflow-hidden'>
            <div className='h-1 bg-green-500 w-full'></div>
            <div className='p-5'>
              <div className='flex items-center mb-3'>
                <div className='w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mr-3'>
                  <TrendingUp className='h-4 w-4' />
                </div>
                <h3 className='text-white font-medium'>Trading</h3>
              </div>
              <p className='text-white/70 text-sm'>
                Buy and sell cryptocurrencies at competitive rates with
                integrated mobile money accounts
              </p>
            </div>
          </div>

          <div className='bg-[#001a38] rounded-lg border border-white/5 overflow-hidden'>
            <div className='h-1 bg-blue-500 w-full'></div>
            <div className='p-5'>
              <div className='flex items-center mb-3'>
                <div className='w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 mr-3'>
                  <ArrowLeftRight className='h-4 w-4 rotate-90' />
                </div>
                <h3 className='text-white font-medium'>Transfers</h3>
              </div>
              <p className='text-white/70 text-sm'>
                Move funds between different wallets securely with low fees and
                fast confirmation times
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionsPage;
