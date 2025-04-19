"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LogOut,
  Lock,
  User,
  Bell,
  MessageSquare,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ActionLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  external?: boolean;
  onClick?: () => void;
}

function ActionLink({
  href,
  icon,
  label,
  active = false,
  external = false,
  onClick,
}: ActionLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-gray-100",
        active ? "bg-gray-100 text-primary font-medium" : "text-gray-700"
      )}>
      <div className='flex-shrink-0'>{icon}</div>
      <span className='text-sm'>{label}</span>
    </Link>
  );
}

export function ProfileActions() {
  const pathname = usePathname();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  return (
    <div className='bg-white border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200'>
      <div className='p-1.5'>
        <ActionLink
          href='/profile'
          icon={<User className='h-5 w-5 text-primary' />}
          label='Personal Information'
          active={pathname === "/profile"}
        />
        <ActionLink
          href='/account'
          icon={<CreditCard className='h-5 w-5 text-primary' />}
          label='Account'
          active={pathname === "/account"}
        />
        <ActionLink
          href='/profile'
          icon={<Lock className='h-5 w-5 text-primary' />}
          label='Security Settings'
          active={false}
        />
        <ActionLink
          href='/profile'
          icon={<Bell className='h-5 w-5 text-primary' />}
          label='Notifications'
          active={false}
        />
      </div>

      <div className='p-1.5'>
        <ActionLink
          href='/support'
          icon={<MessageSquare className='h-5 w-5 text-primary' />}
          label='Support'
          active={pathname === "/support"}
        />
      </div>

      <div className='p-1.5'>
        <button
          className='w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-sm'
          onClick={() => setShowLogoutConfirm(true)}>
          <LogOut className='h-5 w-5 flex-shrink-0' />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
