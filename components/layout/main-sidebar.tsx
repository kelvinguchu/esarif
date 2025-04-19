"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaExchangeAlt,
  FaHistory,
  FaIdCard,
  FaUserCircle,
  FaQuestionCircle,
} from "react-icons/fa";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export const MainSidebar = () => {
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
    <Sidebar
      className='md:flex fixed inset-y-0 z-50 bg-white shadow-md w-64 border-r border-gray-100'
      variant='inset'>
      <SidebarHeader className='py-4 h-16'>
        <Link href='/swap' className='flex items-center gap-2 px-6'>
          <div className='p-2 bg-primary rounded-md shadow-md'>
            <FaExchangeAlt className='h-6 w-6 text-white' />
          </div>
          <span className='font-bold text-xl text-gray-800'>e-Sarif</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className='px-2'>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className='space-y-1 mt-2'>
              {routes.map((route) => (
                <SidebarMenuItem key={route.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === route.href}
                    className={
                      pathname === route.href
                        ? "bg-primary/90 text-white !important shadow-md"
                        : "bg-transparent text-gray-700 !important hover:bg-gray-100"
                    }>
                    <Link
                      href={route.href}
                      className='flex items-center py-2.5 px-4 rounded-lg'>
                      <route.icon
                        className={`h-5 w-5 mr-3 ${
                          pathname === route.href
                            ? "text-white"
                            : "text-gray-600"
                        }`}
                      />
                      <span
                        className={
                          pathname === route.href
                            ? "text-white"
                            : "text-gray-700"
                        }>
                        {route.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='mt-auto'>
        <div className='px-6 py-4'>
          <p className='text-gray-500 text-xs'>
            &copy; {new Date().getFullYear()} e-Sarif
          </p>
        </div>
      </SidebarFooter>

      <style jsx global>{`
        [data-sidebar="menu-button"] {
          color: inherit !important;
        }
        [data-sidebar="menu-button"] span {
          color: inherit !important;
        }
        [data-sidebar="menu-button"] svg {
          color: inherit !important;
        }
      `}</style>
    </Sidebar>
  );
};
