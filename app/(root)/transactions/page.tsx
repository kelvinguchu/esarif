import { TransactionHistory } from "@/components/transactions/transaction-history";

export const metadata = {
  title: "e-Sarif | Transactions",
  description: "View and manage your transaction history across wallets",
};

function TransactionsPage() {
  return (
    <div className='max-w-full px-2 sm:px-4 md:px-8 lg:px-10 mt-5'>
      <div className='mb-8'>
        <h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-2'>
          Transactions
        </h1>
        <p className='text-gray-600 max-w-3xl'>Your transaction history</p>
      </div>
      <div className='mb-12'>
        <TransactionHistory />
      </div>
    </div>
  );
}

export default TransactionsPage;
