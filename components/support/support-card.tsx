"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface SupportCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  action?: React.ReactNode;
}

export function SupportCard({
  title,
  description,
  icon: Icon,
  iconColor = "text-primary",
  action,
}: SupportCardProps) {
  return (
    <Card className='bg-white border border-gray-200 text-gray-800 h-full shadow-sm'>
      <CardHeader className='flex flex-row items-center gap-4 pb-2'>
        <div className={`p-2 rounded-full bg-gray-50 ${iconColor}`}>
          <Icon className='h-6 w-6' />
        </div>
        <div>
          <CardTitle className='text-lg font-medium'>{title}</CardTitle>
          <CardDescription className='text-gray-600'>
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>{action}</CardContent>
    </Card>
  );
}
