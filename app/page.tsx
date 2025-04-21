import Link from "next/link";
import { Metadata } from "next";
import { Wallet, RefreshCw, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "e-Sarif | Multi-Wallet Financial Platform",
  description: "Manage your mobile money and crypto wallets in one place.",
};

export default function Home() {
  return (
    <div className='relative min-h-screen w-full overflow-hidden bg-[#05264c]'>
      {/* Animated particles background with improved effects */}
      <div className='absolute inset-0 z-0'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse'></div>
        <div
          className='absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse'
          style={{ animationDelay: "1s", animationDuration: "5s" }}></div>
        <div
          className='absolute top-1/3 right-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse'
          style={{ animationDelay: "2s", animationDuration: "7s" }}></div>
      </div>

      {/* Diagonal split design with image and improved overlay */}
      <div className='absolute inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-[#05264c]/95 to-[#05264c]/80'></div>
        <div
          className='absolute top-0 right-0 bottom-0 left-1/3 md:left-1/2 bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: "url('/images/landing-page.jpg')",
            clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0% 100%)",
          }}>
          <div className='absolute inset-0 bg-[#05264c]/40 backdrop-blur-sm'></div>
        </div>
      </div>

      {/* Floating cards in background with improved styling */}
      <div className='absolute inset-0 z-0 overflow-hidden'>
        <div className='absolute -right-20 top-40 w-80 h-48 bg-white/5 backdrop-blur-lg rounded-2xl rotate-12 border border-white/10 shadow-xl shadow-primary/5'></div>
        <div className='absolute -left-10 bottom-60 w-64 h-40 bg-white/5 backdrop-blur-lg rounded-2xl -rotate-6 border border-white/10 shadow-xl shadow-primary/5'></div>
        <div className='absolute right-40 bottom-20 w-72 h-36 bg-white/5 backdrop-blur-lg rounded-2xl rotate-3 border border-white/10 shadow-xl shadow-primary/5'></div>
      </div>

      {/* Content with improved spacing and alignment */}
      <div className='relative z-10 flex h-screen'>
        {/* Left side content */}
        <div className='w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center'>
          <div className='mb-6 relative'>
            <div className='inline-flex mb-4'>
              <div className='px-6 py-2 rounded-full bg-[#05264c] border border-white/20 shadow-md'>
                <span className='text-xl md:text-2xl font-bold text-primary'>
                  e-Sarif
                </span>
              </div>
            </div>
            <h1 className='text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight'>
              Financial <br />
              <span className='relative'>
                <span className='relative z-10'>Ecosystem</span>
                <span className='absolute -bottom-2 left-0 right-0 h-3 bg-primary/30 z-0'></span>
              </span>{" "}
              <br />
              Reimagined
            </h1>
          </div>

          <p className='text-white/90 text-lg max-w-lg mb-8 leading-relaxed'>
            Blur the boundaries between mobile money and crypto.
            <span className='text-primary font-semibold'> One platform</span>,
            limitless possibilities.
          </p>

          {/* Improved buttons with refined styling */}
          <div className='flex flex-col sm:flex-row gap-5 w-full max-w-md mb-12'>
            <Link href='/login' className='w-full'>
              <button className='w-full h-13 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:translate-y-[2px] flex items-center justify-center'>
                <Wallet className='h-4 w-4 mr-2 opacity-80' />
                <span>Login</span>
              </button>
            </Link>

            <Link href='/register' className='w-full'>
              <button className='w-full h-13 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl transition-all duration-200 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl hover:translate-y-[2px] flex items-center justify-center'>
                <span>Register</span>
              </button>
            </Link>
          </div>

          {/* Stats with improved styling */}
          <div className='flex space-x-6 md:space-x-10 bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10'>
            <div className='flex flex-col items-center'>
              <span className='text-2xl md:text-3xl font-bold text-white'>
                10+
              </span>
              <span className='text-white/70 text-xs md:text-sm'>Wallets</span>
            </div>
            <div className='w-px h-12 bg-white/15'></div>
            <div className='flex flex-col items-center'>
              <span className='text-2xl md:text-3xl font-bold text-white'>
                Low
              </span>
              <span className='text-white/70 text-xs md:text-sm'>Fees</span>
            </div>
            <div className='w-px h-12 bg-white/15'></div>
            <div className='flex flex-col items-center'>
              <span className='text-2xl md:text-3xl font-bold text-white'>
                24/7
              </span>
              <span className='text-white/70 text-xs md:text-sm'>Support</span>
            </div>
          </div>
        </div>

        {/* Right side - Feature cards with improved glassmorphism */}
        <div className='hidden md:flex w-1/2 items-center justify-center p-8'>
          <div className='relative w-full max-w-md' style={{ height: "490px" }}>
            {/* First card - improved glassmorphism */}
            <div className='absolute top-0 left-0 right-0 w-full bg-gradient-to-br from-primary/30 to-blue-500/20 rounded-2xl backdrop-blur-md border border-white/20 p-6 transform hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-xl'>
              <div className='relative'>
                {/* Card background enhancement for better contrast */}
                <div className='absolute -inset-6 bg-bg-[#05264c]/40 rounded-2xl -z-10 backdrop-blur-md'></div>

                <div className='h-11 w-11 rounded-full bg-primary/40 mb-4 flex items-center justify-center shadow-md'>
                  <Wallet className='h-5 w-5 text-white' />
                </div>
                <h3 className='text-xl font-bold text-white mb-2 drop-shadow-sm'>
                  Multiple Wallets
                </h3>
                <p className='text-white/90 text-sm leading-relaxed'>
                  Connect and manage all your financial accounts in one secure
                  dashboard.
                </p>
              </div>
            </div>

            {/* Second card - improved glassmorphism */}
            <div className='absolute top-[170px] left-0 right-0 w-full bg-gradient-to-br from-blue-500/30 to-indigo-500/20 rounded-2xl backdrop-blur-md border border-white/20 p-6 transform hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-xl'>
              <div className='relative'>
                {/* Card background enhancement for better contrast */}
                <div className='absolute -inset-6 bg-bg-[#05264c]/40 rounded-2xl -z-10 backdrop-blur-md'></div>

                <div className='h-11 w-11 rounded-full bg-blue-500/40 mb-4 flex items-center justify-center shadow-md'>
                  <RefreshCw className='h-5 w-5 text-white' />
                </div>
                <h3 className='text-xl font-bold text-white mb-2 drop-shadow-sm'>
                  Seamless Transfers
                </h3>
                <p className='text-white/90 text-sm leading-relaxed'>
                  Move money between wallets with just a few taps, at the lowest
                  rates.
                </p>
              </div>
            </div>

            {/* Third card - improved glassmorphism */}
            <div className='absolute top-[340px] left-0 right-0 w-full bg-gradient-to-br from-indigo-500/30 to-purple-500/20 rounded-2xl backdrop-blur-md border border-white/20 p-6 transform hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-xl'>
              <div className='relative'>
                {/* Card background enhancement for better contrast */}
                <div className='absolute -inset-6 bg-bg-[#05264c]/40 rounded-2xl -z-10 backdrop-blur-md'></div>

                <div className='h-11 w-11 rounded-full bg-indigo-500/40 mb-4 flex items-center justify-center shadow-md'>
                  <BarChart3 className='h-5 w-5 text-white' />
                </div>
                <h3 className='text-xl font-bold text-white mb-2 drop-shadow-sm'>
                  Smart Analytics
                </h3>
                <p className='text-white/90 text-sm leading-relaxed'>
                  Track spending patterns and optimize your financial decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile feature cards with improved glassmorphism */}
      <div className='block md:hidden relative z-10 px-6 pb-12 mt-8'>
        <div className='space-y-4'>
          <div className='w-full bg-gradient-to-r from-primary/30 to-blue-500/20 rounded-xl backdrop-blur-md border border-white/20 p-5 shadow-lg transform transition-transform hover:translate-y-[-2px] relative overflow-hidden'>
            {/* Card background enhancement for better contrast */}
            <div className='absolute inset-0 bg-[#05264c]/30 -z-10 backdrop-blur-sm'></div>

            <div className='h-10 w-10 rounded-full bg-primary/40 mb-3 flex items-center justify-center shadow-md'>
              <Wallet className='h-5 w-5 text-white' />
            </div>
            <h3 className='text-lg font-bold text-white mb-2 drop-shadow-sm'>
              Multiple Wallets
            </h3>
            <p className='text-white/90 text-sm'>
              Connect and manage all your financial accounts in one secure
              dashboard.
            </p>
          </div>

          <div className='w-full bg-gradient-to-r from-blue-500/30 to-indigo-500/20 rounded-xl backdrop-blur-md border border-white/20 p-5 shadow-lg transform transition-transform hover:translate-y-[-2px] relative overflow-hidden'>
            {/* Card background enhancement for better contrast */}
            <div className='absolute inset-0 bbg-[#05264c]/30 -z-10 backdrop-blur-sm'></div>

            <div className='h-10 w-10 rounded-full bg-blue-500/40 mb-3 flex items-center justify-center shadow-md'>
              <RefreshCw className='h-5 w-5 text-white' />
            </div>
            <h3 className='text-lg font-bold text-white mb-2 drop-shadow-sm'>
              Seamless Transfers
            </h3>
            <p className='text-white/90 text-sm'>
              Move money between wallets with just a few taps, at the lowest
              rates.
            </p>
          </div>

          <div className='w-full bg-gradient-to-r from-indigo-500/30 to-purple-500/20 rounded-xl backdrop-blur-md border border-white/20 p-5 shadow-lg transform transition-transform hover:translate-y-[-2px] relative overflow-hidden'>
            {/* Card background enhancement for better contrast */}
            <div className='absolute inset-0 bg-bg-[#05264c]/30 -z-10 backdrop-blur-sm'></div>

            <div className='h-10 w-10 rounded-full bg-indigo-500/40 mb-3 flex items-center justify-center shadow-md'>
              <BarChart3 className='h-5 w-5 text-white' />
            </div>
            <h3 className='text-lg font-bold text-white mb-2 drop-shadow-sm'>
              Smart Analytics
            </h3>
            <p className='text-white/90 text-sm'>
              Track spending patterns and optimize your financial decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
