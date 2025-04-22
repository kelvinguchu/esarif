"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

// Import icons with dynamic imports and disable SSR
const IconComponents = {
  FaIdCard: dynamic(
    () => import("react-icons/fa").then((mod) => mod.FaIdCard),
    { ssr: false }
  ),
  FaExchangeAlt: dynamic(
    () => import("react-icons/fa").then((mod) => mod.FaExchangeAlt),
    { ssr: false }
  ),
  FaHistory: dynamic(
    () => import("react-icons/fa").then((mod) => mod.FaHistory),
    { ssr: false }
  ),
  FaUser: dynamic(() => import("react-icons/fa").then((mod) => mod.FaUser), {
    ssr: false,
  }),
};

export const MobileNav = () => {
  const pathname = usePathname();

  const routes = [
    {
      icon: "FaIdCard",
      label: "KYC",
      href: "/kyc",
      isMain: true,
    },
    {
      icon: "FaExchangeAlt",
      label: "Swap",
      href: "/swap",
      isMain: true,
    },
    {
      icon: "FaHistory",
      label: "Transactions",
      href: "/transactions",
      isMain: true,
    },
    {
      icon: "FaUser",
      label: "My Account",
      href: "/account",
      isMain: true,
    },
  ];

  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 h-16 px-4 pb-4 border-t border-gray-200 bg-white md:hidden'>
      <nav className='grid h-full grid-cols-4'>
        {routes.map((route) => {
          const isActive = pathname === route.href;
          const isMain = route.isMain;

          // Get the component dynamically
          const IconComponent =
            IconComponents[route.icon as keyof typeof IconComponents];

          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 pt-1 transition-colors",
                isActive
                  ? "text-[#00805a]"
                  : isMain
                  ? "text-[#00805a]/80"
                  : "text-gray-500 hover:text-gray-700"
              )}>
              <div
                className={cn(
                  "rounded-full p-2 transition-colors",
                  isMain && !isActive && "bg-[#00805a]/10",
                  isMain && isActive && "bg-[#00805a]"
                )}>
                {IconComponent && (
                  <IconComponent
                    className={cn(
                      "h-5 w-5",
                      isMain && isActive
                        ? "text-white"
                        : isMain && !isActive
                        ? "text-[#00805a]"
                        : isActive
                        ? "text-[#00805a]"
                        : "text-gray-500"
                    )}
                  />
                )}
              </div>
              <span className='text-xs font-medium'>{route.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
