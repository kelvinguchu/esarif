"use client";

import { useEffect, useState } from "react";
import { UserCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    <div className='fixed top-0 right-0 z-40 w-full  md:w-[calc(100%-16rem)] h-16 bg-[#05264c] shadow-md'>
      <div className='h-full flex items-center justify-between px-6 bg-gradient-to-r from-[#05264c] to-[#05264c]/95'>
        <div>
          <h1 className='text-xl font-semibold text-white'>{greeting}</h1>
          <p className='text-sm text-white/80'>Welcome to e-Sarif</p>
        </div>

        <Avatar className='h-10 w-10 cursor-pointer border-2 border-primary shadow-lg'>
          <AvatarImage src='/images/avatar.png' alt='User profile' />
          <AvatarFallback className='bg-primary/20'>
            <UserCircle className='h-6 w-6 text-white' />
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
