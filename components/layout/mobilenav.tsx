"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FaExchangeAlt, FaHistory, FaIdCard } from "react-icons/fa";

export const MobileNav = () => {
  const pathname = usePathname();

  const routes = [
    {
      icon: FaIdCard,
      label: "KYC",
      href: "/kyc",
    },
    {
      icon: FaExchangeAlt,
      label: "Swap",
      href: "/swap",
      isMain: true,
    },
    {
      icon: FaHistory,
      label: "Transactions",
      href: "/transactions",
    },
  ];

  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 md:hidden px-3 pb-2'>
      <nav className='flex items-center justify-around bg-[#05264c] h-16 relative rounded-full shadow-lg border border-white/10'>
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full",
              pathname === route.href
                ? route.isMain
                  ? "text-white"
                  : "text-[#00805a]"
                : "text-white/60 hover:text-white"
            )}>
            <div className='flex flex-col items-center'>
              {route.isMain ? (
                <div className='relative'>
                  <div className='absolute -top-10 left-1/2 -translate-x-1/2 bg-[#00805a] rounded-full p-4 shadow-[0_0_15px_rgba(0,128,90,0.5)] border-4 border-[#05264c] transition-transform hover:scale-105'>
                    <route.icon className='h-7 w-7 text-white' />
                  </div>
                </div>
              ) : (
                <div
                  className={cn(
                    "rounded-full p-2 transition-colors mb-1",
                    pathname === route.href ? "bg-white/10" : "bg-transparent"
                  )}>
                  <route.icon className='h-5 w-5' />
                </div>
              )}
              <span
                className={cn(
                  "text-xs font-medium transition-colors mt-1",
                  route.isMain && "mt-9",
                  pathname === route.href ? "opacity-100" : "opacity-70"
                )}>
                {route.label}
              </span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
};
