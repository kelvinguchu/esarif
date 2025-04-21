import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useSwapContext } from "@/context/swap-context"; // Use correct context hook
import { paymentMethods } from "@/lib/swap/data"; // Import paymentMethods
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  ArrowUpRight,
  User,
  CreditCard,
  Send,
  BarChart3,
  Info,
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
  "USDT-BEP20": 1.0, // Updated rate
  "USDC-BEP20": 0.9998, // Added rate
};

const SellDetails: React.FC = () => {
  // Get required state and setters from context
  const {
    fromWallet: fromWalletId, // ID of the crypto being sold
    fromAmount, // USD amount user wants to receive
    accountNumber,
    setAccountNumber,
    accountName,
    setAccountName,
  } = useSwapContext();

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
      <Card className='mt-4 border-red-200 bg-red-50 w-full'>
        <CardHeader className='pb-2'>
          <CardTitle className='text-red-700 flex items-center text-base'>
            <Info className='mr-2 h-5 w-5' />
            Unsupported Crypto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-red-600 text-sm'>
            Selling {cryptoDetails.name} is not currently supported or rate is
            unavailable.
          </p>
        </CardContent>
      </Card>
    );
  }

  const amountWantedUSD = parseFloat(fromAmount);
  const serviceFeeRate = 0.01;
  const serviceFeeUSD = amountWantedUSD * serviceFeeRate;
  const totalUSD = amountWantedUSD + serviceFeeUSD;
  const cryptoToSend = totalUSD / exchangeRate;

  return (
    <div className='space-y-6 mt-3 w-full md:max-w-3xl lg:max-w-4xl mx-auto'>
      {/* ADD Payment Details Input Section */}
      <Card className='overflow-hidden border-t-4 border-t-blue-500 shadow-sm w-full'>
        <CardHeader className='bg-gradient-to-r from-blue-50 to-white pb-2'>
          <CardTitle className='text-blue-800 flex items-center text-base'>
            <User className='mr-2 h-5 w-5 text-blue-600' />
            Your Payment Details
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4 pt-4 w-full'>
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
              className='mt-1 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg shadow-sm transition-all focus:border-blue-400 focus:ring-1 focus:ring-blue-200 h-11 text-sm px-4 w-full'
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
              className='mt-1 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg shadow-sm transition-all focus:border-blue-400 focus:ring-1 focus:ring-blue-200 h-11 text-sm px-4 w-full'
            />
          </div>
        </CardContent>
      </Card>

      {/* Deposit Information */}
      <Card className='overflow-hidden border-t-4 border-t-green-500 shadow-sm w-full'>
        <CardHeader className='bg-gradient-to-r from-green-50 to-white pb-2'>
          <CardTitle className='text-green-800 flex items-center text-base'>
            <Send className='mr-2 h-5 w-5 text-green-600' />
            Deposit Information
          </CardTitle>
        </CardHeader>
        <CardContent className='grid grid-cols-1 md:grid-cols-3 gap-4 items-center pt-4 w-full'>
          <div className='md:col-span-2 space-y-3 w-full'>
            <div className='p-3 bg-green-50 rounded-lg border border-green-100 w-full'>
              <p className='mb-2'>
                Please send exactly{" "}
                <span className='font-mono bg-white px-2 py-1 rounded text-primary border border-primary/20'>
                  {cryptoToSend.toFixed(6)} {cryptoDetails.id}
                </span>{" "}
                to:
              </p>
              <Label
                htmlFor='deposit-address'
                className='text-sm text-gray-700'>
                Deposit Address ({depositInfo.network})
              </Label>
              <div className='relative w-full'>
                <Input
                  id='deposit-address'
                  readOnly
                  value={depositInfo.address}
                  className='font-mono text-sm mt-1 bg-white border border-gray-200 pr-10 w-full'
                />
                <button
                  className='absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700'
                  onClick={() => {
                    navigator.clipboard.writeText(depositInfo.address);
                  }}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'>
                    <rect
                      x='9'
                      y='9'
                      width='13'
                      height='13'
                      rx='2'
                      ry='2'></rect>
                    <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className='flex items-start mt-2 w-full'>
              <Info className='h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0' />
              <p className='text-xs text-gray-600'>
                Ensure you select the correct network ({depositInfo.network})
                when sending. Sending to the wrong network may result in loss of
                funds.
              </p>
            </div>
          </div>
          <div className='flex justify-center items-center'>
            <div className='p-2 bg-white rounded-xl border border-gray-200 shadow-sm'>
              <QRCodeCanvas
                value={depositInfo.address}
                size={128} // Adjust size as needed
                bgColor='#ffffff'
                fgColor='#000000'
                level='L'
                includeMargin={false}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Summary */}
      <Card className='overflow-hidden border-t-4 border-t-purple-500 shadow-sm w-full'>
        <CardHeader className='bg-gradient-to-r from-purple-50 to-white pb-2'>
          <CardTitle className='text-purple-800 flex items-center text-base'>
            <BarChart3 className='mr-2 h-5 w-5 text-purple-600' />
            Transaction Summary
          </CardTitle>
        </CardHeader>
        <CardContent className='pt-4 w-full'>
          <div className='bg-white border border-gray-100 rounded-lg p-4 shadow-sm space-y-2 w-full'>
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
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm bg-purple-50 p-2 rounded'>
              <span className='text-purple-700 flex items-center mb-1 sm:mb-0'>
                <ArrowUpRight className='h-3 w-3 mr-1 flex-shrink-0' />
                Exchange Rate:
              </span>
              <span className='text-purple-700 font-medium text-left sm:text-right'>
                1 {cryptoDetails.id} = ${exchangeRate.toFixed(4)}
              </span>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-1 font-semibold text-lg text-primary border-t pt-3 mt-2'>
              <span className='mb-1 sm:mb-0'>You Send:</span>
              <span className='font-mono text-left sm:text-right'>
                {cryptoToSend.toFixed(6)} {cryptoDetails.id}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellDetails;
