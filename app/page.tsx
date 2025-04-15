import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaWallet, FaExchangeAlt, FaCoins } from "react-icons/fa";

export default function Home() {
  // Calculate current year for copyright
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full min-h-screen bg-[url('/images/landing-page.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
      {/* Background Overlay */}
      <div className='absolute inset-0 bg-background/90 z-0'></div>

      {/* Ambient Effects */}
      <div className='fixed -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl animate-pulse-slow'></div>
      <div className='fixed -bottom-40 -left-20 w-80 h-80 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000'></div>

      {/* Content container */}
      <div className='relative z-10'>
        <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-screen flex flex-col'>
          {/* Logo Header */}
          <header className='flex items-center gap-3 mb-6 md:mb-10'>
            <div className='w-12 h-12 rounded-xl bg-primary/90 flex items-center justify-center shadow-lg backdrop-blur-md'>
              <FaWallet className='text-white text-xl' />
            </div>
            <h2 className='text-2xl font-bold text-white tracking-tight ml-2'>
              e - <span className='text-primary'>Sarif</span>
            </h2>
          </header>

          {/* Main Content */}
          <main className='flex-1 flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 py-4 md:py-8'>
            {/* Left Content - Hero Section */}
            <div className='w-full lg:w-1/2 flex flex-col items-center lg:items-start'>
              <h1 className='font-bold tracking-tight mb-4 text-center lg:text-left'>
                <span className='text-4xl sm:text-5xl text-white leading-tight block'>
                  Connecting Your
                </span>
                <span className='text-4xl sm:text-5xl text-primary leading-tight block mt-2'>
                  Financial
                </span>
                <span className='text-4xl sm:text-5xl text-primary leading-tight block'>
                  Ecosystem
                </span>
              </h1>

              <p className='text-gray-300 text-base sm:text-lg mb-4 max-w-lg text-center lg:text-left'>
                Seamlessly manage your mobile wallets and cryptocurrencies in
                one unified platform.
              </p>

              <p className='text-gray-400 text-sm sm:text-base mb-6 max-w-md text-center lg:text-left'>
                Secure. Fast. All in one place.
              </p>

              {/* CTA Buttons */}
              <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md'>
                <Button
                  asChild
                  className='w-full sm:w-auto px-6 py-3 h-12 rounded-xl font-medium text-base shadow-lg bg-primary hover:bg-primary/90 transition-all hover:translate-y-[-2px] hover:shadow-primary/20 hover:shadow-xl'>
                  <Link href='/login'>Sign In</Link>
                </Button>
                <Button
                  asChild
                  variant='outline'
                  className='w-full sm:w-auto px-6 py-3 h-12 rounded-xl font-medium text-base shadow-md text-white border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all hover:translate-y-[-2px]'>
                  <Link href='/register'>Create Account</Link>
                </Button>
              </div>
            </div>

            {/* Right Content - Feature Cards */}
            <div className='w-full lg:w-1/2 flex flex-col lg:mt-0'>
              <div className='space-y-4'>
                {/* Feature Cards */}
                <div className='p-4 rounded-xl bg-background/30 backdrop-blur-md border border-white/10 shadow-lg hover:shadow-xl transition-all'>
                  <div className='flex items-start gap-4'>
                    <div className='w-10 h-10 rounded-lg bg-primary/30 flex items-center justify-center shrink-0'>
                      <FaWallet className='text-primary text-lg' />
                    </div>
                    <div className='flex-1'>
                      <h3 className='text-white font-semibold text-lg mb-1'>
                        Mobile Wallets
                      </h3>
                      <p className='text-gray-300 text-sm'>
                        Connect your Mpesa, EVC, ZAAD and more in one place
                      </p>
                    </div>
                  </div>
                </div>

                <div className='p-4 rounded-xl bg-background/30 backdrop-blur-md border border-white/10 shadow-lg hover:shadow-xl transition-all'>
                  <div className='flex items-start gap-4'>
                    <div className='w-10 h-10 rounded-lg bg-blue-500/30 flex items-center justify-center shrink-0'>
                      <FaCoins className='text-blue-400 text-lg' />
                    </div>
                    <div className='flex-1'>
                      <h3 className='text-white font-semibold text-lg mb-1'>
                        Crypto Support
                      </h3>
                      <p className='text-gray-300 text-sm'>
                        USDT TRC20, USDT BEP20, USDC and more
                      </p>
                    </div>
                  </div>
                </div>

                <div className='p-4 rounded-xl bg-background/30 backdrop-blur-md border border-white/10 shadow-lg hover:shadow-xl transition-all'>
                  <div className='flex items-start gap-4'>
                    <div className='w-10 h-10 rounded-lg bg-green-500/30 flex items-center justify-center shrink-0'>
                      <FaExchangeAlt className='text-green-400 text-lg' />
                    </div>
                    <div className='flex-1'>
                      <h3 className='text-white font-semibold text-lg mb-1'>
                        Seamless Swaps
                      </h3>
                      <p className='text-gray-300 text-sm'>
                        Transfer between wallets with just 1% transaction fee
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className='w-full py-4 text-center mt-auto mb-4'>
            <p className='text-gray-400 text-sm font-medium'>
              © {currentYear} e-Sarif. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
