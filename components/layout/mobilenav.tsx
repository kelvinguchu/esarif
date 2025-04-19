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
    <div className='fixed bottom-0 left-0 right-0 z-50 md:hidden'>
      <nav className='flex items-center justify-around bg-[#05264c] border-t border-white/10 h-16 relative'>
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full",
              route.isMain && "relative -mt-5",
              pathname === route.href
                ? route.isMain
                  ? "text-white"
                  : "text-primary"
                : "text-white/80 hover:text-white"
            )}>
            {route.isMain ? (
              <div className='absolute -top-5 bg-gradient-to-r from-primary to-blue-500 rounded-full p-3 shadow-lg border-4 border-[#05264c]'>
                <route.icon className='h-6 w-6 text-white' />
              </div>
            ) : (
              <route.icon className='h-5 w-5 mb-1' />
            )}
            <span className={cn("text-xs", route.isMain && "mt-5")}>
              {route.label}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
};
