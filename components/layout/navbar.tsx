"use client";

import { useEffect, useState } from "react";
import { UserCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export const Navbar = () => {
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    const hour = new Date().getHours();
    let newGreeting = "";

    if (hour < 12) {
      newGreeting = "Good morning";
    } else if (hour < 18) {
      newGreeting = "Good afternoon";
    } else {
      newGreeting = "Good evening";
    }

    setGreeting(newGreeting);
  }, []);

  return (
    <div className='fixed top-0 right-0 z-40 w-full md:w-[calc(100%-16rem)] h-16 bg-white shadow-sm'>
      <div className='h-full flex items-center justify-between px-6 bg-gradient-to-r from-white to-gray-50'>
        <div>
          <h1 className='text-xl font-semibold text-gray-800'>{greeting}</h1>
          <p className='text-sm text-gray-600'>Welcome to e-Sarif</p>
        </div>

        <Link href='/profile'>
          <Avatar className='h-10 w-10 cursor-pointer border-2 border-primary shadow-md hover:border-primary/80 transition-colors'>
            <AvatarImage src='/images/avatar.webp' alt='User profile' />
            <AvatarFallback className='bg-primary/10'>
              <UserCircle className='h-6 w-6 text-primary' />
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </div>
  );
};
