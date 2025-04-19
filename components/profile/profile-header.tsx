"use client";

import { UserCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Calendar } from "lucide-react";

export function ProfileHeader() {
  // In a real app, this would come from a database or API
  const user = {
    name: "Mohammed Ali",
    email: "mohammed.ali@example.com",
    phone: "+252 615 123 456",
    avatar: "/images/avatar.webp",
    kycVerified: true,
    role: "User",
    joined: "Jan 2023",
  };

  return (
    <Card className='border border-gray-200 shadow-sm bg-white overflow-hidden'>
      <CardContent className=''>
        <div className='flex flex-col sm:flex-row'>
          {/* Avatar */}
          <div className='flex-shrink-0 mb-4 sm:mb-0'>
            <Avatar className='h-20 w-20 sm:h-24 sm:w-24 border-2 border-gray-100 shadow-sm'>
              <AvatarImage
                src={user.avatar}
                alt={user.name}
                className='object-cover'
              />
              <AvatarFallback className='bg-primary/20 text-primary'>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* User info */}
          <div className='sm:ml-6 flex flex-col justify-center'>
            <div className='flex items-center flex-wrap gap-2'>
              <h2 className='text-xl sm:text-2xl font-bold text-gray-800'>
                {user.name}
              </h2>
              {user.kycVerified && (
                <Badge
                  variant='outline'
                  className='bg-green-50 text-green-700 border-green-200 flex items-center gap-1'>
                  <ShieldCheck className='h-3 w-3' />
                  <span className='text-xs'>Verified</span>
                </Badge>
              )}
            </div>
            <p className='text-sm text-gray-500 mt-1 flex items-center'>
              <Calendar className='h-3.5 w-3.5 mr-1.5 text-primary/70' />
              Member since {user.joined}
            </p>
          </div>
        </div>

        <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
          <div className='p-3 bg-gray-50 rounded-lg space-y-1'>
            <p className='text-xs font-medium text-gray-500'>Email Address</p>
            <p className='text-sm font-medium text-gray-800'>{user.email}</p>
          </div>
          <div className='p-3 bg-gray-50 rounded-lg space-y-1'>
            <p className='text-xs font-medium text-gray-500'>Phone Number</p>
            <p className='text-sm font-medium text-gray-800'>{user.phone}</p>
          </div>
          <div className='p-3 bg-gray-50 rounded-lg space-y-1'>
            <p className='text-xs font-medium text-gray-500'>Account ID</p>
            <p className='text-sm font-medium text-gray-800'>ESRF-42069-8X</p>
          </div>
          <div className='p-3 bg-gray-50 rounded-lg space-y-1'>
            <p className='text-xs font-medium text-gray-500'>Account Type</p>
            <p className='text-sm font-medium text-gray-800'>{user.role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
