"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  FaExchangeAlt,
  FaHistory,
  FaIdCard,
  FaUserCircle,
  FaQuestionCircle,
} from "react-icons/fa";

export const MobileNav = () => {
  const pathname = usePathname();

  const routes = [
    {
      icon: FaExchangeAlt,
      label: "Swap",
      href: "/swap",
    },
    {
      icon: FaHistory,
      label: "Transactions",
      href: "/transactions",
    },
    {
      icon: FaIdCard,
      label: "KYC",
      href: "/kyc",
    },
    {
      icon: FaUserCircle,
      label: "Account",
      href: "/account",
    },
    {
      icon: FaQuestionCircle,
      label: "Support",
      href: "/support",
    },
  ];

  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 md:hidden'>
      <nav className='flex items-center justify-around bg-[#05264c] border-t border-white/10 h-16'>
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full",
              pathname === route.href
                ? "text-primary"
                : "text-white/80 hover:text-white"
            )}>
            <route.icon className='h-5 w-5 mb-1' />
            <span className='text-xs'>{route.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};
