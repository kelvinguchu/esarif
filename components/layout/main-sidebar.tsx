"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeftRight,
  CreditCard,
  HelpCircle,
  Settings,
  UserCheck,
} from "lucide-react";

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
      icon: ArrowLeftRight,
      label: "Swap",
      href: "/swap",
    },
    {
      icon: CreditCard,
      label: "Transactions",
      href: "/transactions",
    },
    {
      icon: UserCheck,
      label: "KYC",
      href: "/kyc",
    },
    {
      icon: Settings,
      label: "Account",
      href: "/account",
    },
    {
      icon: HelpCircle,
      label: "Support",
      href: "/support",
    },
  ];

  return (
    <Sidebar
      className='md:flex fixed inset-y-0 z-50 bg-[#05264c] shadow-md w-64'
      variant='inset'>
      <SidebarHeader className='py-4 h-16'>
        <Link href='/swap' className='flex items-center gap-2 px-6'>
          <div className='p-2 bg-primary rounded-md shadow-md'>
            <ArrowLeftRight className='h-6 w-6 text-white' />
          </div>
          <span className='font-bold text-xl text-white'>e-Sarif</span>
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
                        : "bg-transparent text-white !important hover:bg-white/5"
                    }>
                    <Link
                      href={route.href}
                      className='flex items-center py-2.5 px-4 rounded-lg text-white'>
                      <route.icon className='h-5 w-5 mr-3 text-white' />
                      <span className='text-white text-opacity-100 font-medium'>
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
          <p className='text-white/60 text-xs'>
            &copy; {new Date().getFullYear()} e-Sarif
          </p>
        </div>
      </SidebarFooter>

      <style jsx global>{`
        [data-sidebar="menu-button"] {
          color: white !important;
        }
        [data-sidebar="menu-button"] span {
          color: white !important;
        }
        [data-sidebar="menu-button"] svg {
          color: white !important;
        }
      `}</style>
    </Sidebar>
  );
};
