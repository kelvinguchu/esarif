import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useSwapContext } from "@/context/swap-context"; // Use correct context hook
import { paymentMethods } from "@/lib/swap/data"; // Import paymentMethods
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  ArrowUpRight,
  User,
  CreditCard,
  Send,
  BarChart3,
  Info,
  Copy,
  Check,
} from "lucide-react";

// Define the deposit addresses and network names
const depositAddresses: {
  [key: string]: { address: string; network: string };
} = {
  "USDT-TRC20": {
    address: "TG6NBFZND9BWt2DHPNj1d2eswYYzmZrPSd",
    network: "Tron (TRC20)",
  },
  "USDT-BEP20": {
    address: "0xdea22c5ea0f5089426413827a14621c901be5003",
    network: "BNB Smart Chain (BEP20)",
  },
  "USDC-BEP20": {
    address: "0xdea22c5ea0f5089426413827a14621c901be5003",
    network: "BNB Smart Chain (BEP20)",
  },
  // Add other sellable cryptos here if needed
};

// Define rates (USD per Crypto) - Updated from buy-details
const sellRates: { [key: string]: number } = {
  "USDT-TRC20": 1.0001,
  "USDT-BEP20": 1.0,
  "USDC-BEP20": 0.9998,
};

const SellDetails: React.FC = () => {
  const {
    fromWallet: fromWalletId, // ID of the crypto being sold
    fromAmount, // USD amount user wants to receive
    accountNumber,
    setAccountNumber,
    accountName,
    setAccountName,
  } = useSwapContext();

  const [copySuccess, setCopySuccess] = React.useState(false);

  // Find the crypto details based on the ID from paymentMethods
  const cryptoDetails = paymentMethods.find(
    (p) => p.id === fromWalletId && p.category === "crypto"
  );

  if (
    !cryptoDetails ||
    !fromAmount ||
    fromAmount === "0" ||
    fromAmount === ""
  ) {
    return null; // Don't render if no crypto details found or amount is invalid
  }

  const depositInfo = depositAddresses[cryptoDetails.id];
  const exchangeRate = sellRates[cryptoDetails.id]; // Get the rate: USD per 1 unit of Crypto

  if (!depositInfo || !exchangeRate) {
    // Handle case where selected crypto is not supported for selling or rate is missing
    return (
      <div className='p-4 mt-4 border border-red-200 bg-red-50 rounded-lg'>
        <div className='flex items-center text-red-700 text-base font-semibold mb-2'>
          <Info className='mr-2 h-5 w-5' />
          Unsupported Crypto
        </div>
        <p className='text-red-600 text-sm'>
          Selling {cryptoDetails.name} is not currently supported or rate is
          unavailable.
        </p>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(depositInfo.address);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const amountWantedUSD = parseFloat(fromAmount);
  const serviceFeeRate = 0.01;
  const serviceFeeUSD = amountWantedUSD * serviceFeeRate;
  const totalUSD = amountWantedUSD + serviceFeeUSD;
  const cryptoToSend = totalUSD / exchangeRate;

  return (
    <div className='space-y-8 max-w-3xl mx-auto'>
      <div className='flex items-center justify-center'>
        <h2 className='text-lg font-medium text-gray-800 px-4 py-1 bg-gray-50 rounded-full border border-gray-200'>
          Transaction Details
        </h2>
      </div>

      {/* Payment Details Input Section */}
      <div className='space-y-3 bg-white rounded-xl border border-gray-200 p-4 shadow-sm'>
        <h3 className='text-blue-800 flex items-center text-base font-semibold border-b pb-2 border-blue-50'>
          <User className='mr-2 h-5 w-5 text-blue-600' />
          Your Payment Details
        </h3>

        <div className='space-y-4'>
          <div className='w-full'>
            <Label
              htmlFor='account-name'
              className='text-sm font-medium flex items-center gap-1 text-gray-700'>
              <span>Account Holder Name</span>
              <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='account-name'
              type='text'
              placeholder='John Doe'
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className='mt-1 bg-white border border-gray-200 text-gray-900 rounded-lg shadow-sm transition-all focus:border-blue-400 focus:ring-1 focus:ring-blue-200 h-11 text-sm px-4 w-full'
            />
          </div>
          <div className='w-full'>
            <Label
              htmlFor='account-number'
              className='text-sm font-medium flex items-center gap-1 text-gray-700'>
              <span>Account Number / Phone Number</span>
              <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='account-number'
              type='text'
              placeholder='Enter your account or phone number'
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className='mt-1 bg-white border border-gray-200 text-gray-900 rounded-lg shadow-sm transition-all focus:border-blue-400 focus:ring-1 focus:ring-blue-200 h-11 text-sm px-4 w-full'
            />
          </div>
        </div>
      </div>

      {/* Deposit Information */}
      <div className='space-y-3 bg-white rounded-xl border border-gray-200 p-4 shadow-sm'>
        <h3 className='text-green-800 flex items-center text-base font-semibold border-b pb-2 border-green-50'>
          <Send className='mr-2 h-5 w-5 text-green-600' />
          Deposit Information
        </h3>

        <div className='flex flex-col md:flex-row gap-4'>
          <div className='flex-1 space-y-3'>
            <div className='p-3 bg-green-50 rounded-lg border border-green-100'>
              <p className='mb-2'>
                Deposit{" "}
                <span className='font-mono bg-white px-2 py-1 rounded text-primary border border-primary/20'>
                  {cryptoToSend.toFixed(3)} {cryptoDetails.id}
                </span>{" "}
                to:
              </p>

              <div className='mt-2'>
                <div className='flex items-center space-x-2 mb-1'>
                  <Label
                    htmlFor='deposit-address'
                    className='text-sm text-gray-700 whitespace-nowrap'>
                    Address:
                  </Label>
                  <div className='flex-1 relative'>
                    <div className='flex items-center'>
                      <Input
                        id='deposit-address'
                        readOnly
                        value={depositInfo.address}
                        className='font-mono text-xs sm:text-sm bg-white border border-gray-200 pr-10 h-9'
                      />
                      <button
                        className='absolute right-2 flex items-center justify-center w-6 h-6 text-blue-500 hover:text-blue-700'
                        onClick={handleCopy}>
                        {copySuccess ? (
                          <Check className='h-4 w-4 text-green-500' />
                        ) : (
                          <Copy className='h-4 w-4' />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className='text-xs text-gray-500 mt-1'>
                  Network:{" "}
                  <span className='font-medium'>{depositInfo.network}</span>
                </div>
              </div>
            </div>
          </div>

          <div className='flex justify-center items-center'>
            <div className='p-2 bg-white rounded-xl border border-gray-200 shadow-sm'>
              <QRCodeCanvas
                value={depositInfo.address}
                size={120}
                bgColor='#ffffff'
                fgColor='#000000'
                level='L'
                includeMargin={false}
              />
            </div>
          </div>
        </div>

        <div className='flex items-start mt-2'>
          <Info className='h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0' />
          <p className='text-xs text-gray-600'>
            Ensure you select the correct network ({depositInfo.network}) when
            sending. Sending to the wrong network may result in loss of funds.
          </p>
        </div>
      </div>

      {/* Transaction Summary */}
      <div className='space-y-3 bg-white rounded-xl border border-gray-200 p-4 shadow-sm'>
        <h3 className='text-purple-800 flex items-center text-base font-semibold border-b pb-2 border-purple-50'>
          <BarChart3 className='mr-2 h-5 w-5 text-purple-600' />
          Transaction Summary
        </h3>

        <div className='space-y-2'>
          <div className='grid grid-cols-2 gap-1'>
            <span className='text-gray-600'>Amount you receive:</span>
            <span className='font-medium text-right'>
              ${amountWantedUSD.toFixed(2)}
            </span>
          </div>
          <div className='grid grid-cols-2 gap-1 text-gray-500 text-sm'>
            <span>Service Fee (1%):</span>
            <span className='text-right'>+ ${serviceFeeUSD.toFixed(2)}</span>
          </div>
          <div className='grid grid-cols-2 gap-1 text-gray-500 text-sm'>
            <span>Network:</span>
            <span className='text-right'>{depositInfo.network}</span>
          </div>
          <div className='grid grid-cols-2 gap-1 font-medium border-t pt-2 mt-2'>
            <span>Total USD Value:</span>
            <span className='text-right'>${totalUSD.toFixed(2)}</span>
          </div>
          <div className='grid grid-cols-2 text-[14px] gap-1 bg-purple-50 p-2 rounded'>
            <span className='text-purple-700 flex items-center mb-1 sm:mb-0'>
              Exchange Rate:
            </span>
            <span className='text-purple-700 -ml-6 md:ml-0 text-sm font-medium text-left sm:text-right'>
              1 {cryptoDetails.id} = ${exchangeRate.toFixed(4)}
            </span>
          </div>
          <div className='grid grid-cols-2 text-[14px] gap-1 font-semibold text-lg text-primary border-t pt-3 mt-2'>
            <span className='mb-1 sm:mb-0'>You Send:</span>
            <span className='font-mono text-left sm:text-right'>
              {cryptoToSend.toFixed(3)} {cryptoDetails.id}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellDetails;
