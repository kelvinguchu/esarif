"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  UserCircle,
  Calendar,
  Globe,
  MapPin,
  Briefcase,
  Clock,
  Activity,
  Copy,
  CheckCheck,
  Shield,
  Mail,
  Phone,
  CreditCard,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ProfileInfo() {
  // In a real app, this would come from a database or API
  const user = {
    fullName: "Mohammed Ali",
    username: "mohammed.ali",
    dateOfBirth: "15 March 1985",
    nationality: "Somali",
    address: "123 Main St, Mogadishu, Somalia",
    occupation: "Business Owner",
    joinDate: "January 2023",
    lastLogin: "Today at 09:45 AM",
    sessionCount: 24,
    transactionCount: 42,
    kycLevel: "Full",
    twoFactorEnabled: true,
    emailVerified: true,
    phoneVerified: true,
    accountId: "ESRF-42069-8X",
    transactionVolume: "$12,450.00",
  };

  const [copied, setCopied] = useState(false);

  const copyAccountId = () => {
    navigator.clipboard.writeText(user.accountId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-6'>
      <Card className='border border-gray-200 shadow-sm bg-white'>
        <CardHeader className='bg-gray-50 px-5 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>
          <CardTitle className='text-lg text-gray-800'>
            Personal Information
          </CardTitle>
          <div className='flex items-center gap-2'>
            <Badge
              variant='outline'
              className='bg-primary/5 text-primary border-primary/20 flex items-center gap-1.5'>
              <UserCircle className='h-3.5 w-3.5' />
              <span>Account ID: {user.accountId}</span>
            </Badge>
            <Button
              variant='ghost'
              size='sm'
              className='h-7 w-7 p-0'
              onClick={copyAccountId}>
              {copied ? (
                <CheckCheck className='h-4 w-4 text-green-500' />
              ) : (
                <Copy className='h-4 w-4 text-gray-400 hover:text-gray-600' />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className='p-5'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            <div className='space-y-4'>
              <InfoItem
                label='Full Name'
                value={user.fullName}
                icon={<UserCircle className='h-4 w-4 text-primary/70' />}
              />
              <InfoItem
                label='Date of Birth'
                value={user.dateOfBirth}
                icon={<Calendar className='h-4 w-4 text-primary/70' />}
              />
              <InfoItem
                label='Nationality'
                value={user.nationality}
                icon={<Globe className='h-4 w-4 text-primary/70' />}
              />
              <InfoItem
                label='Address'
                value={user.address}
                icon={<MapPin className='h-4 w-4 text-primary/70' />}
              />
              <InfoItem
                label='Occupation'
                value={user.occupation}
                icon={<Briefcase className='h-4 w-4 text-primary/70' />}
              />
            </div>

            <div className='space-y-4'>
              <InfoItem
                label='Member Since'
                value={user.joinDate}
                icon={<Clock className='h-4 w-4 text-primary/70' />}
              />
              <InfoItem
                label='Last Login'
                value={user.lastLogin}
                icon={<Activity className='h-4 w-4 text-primary/70' />}
              />
              <InfoItem
                label='Transaction Volume'
                value={user.transactionVolume}
                icon={<CreditCard className='h-4 w-4 text-primary/70' />}
                highlight={true}
              />
              <InfoItem
                label='Session Count'
                value={user.sessionCount.toString()}
                icon={<UserCircle className='h-4 w-4 text-primary/70' />}
              />
              <InfoItem
                label='Transaction Count'
                value={user.transactionCount.toString()}
                icon={<Activity className='h-4 w-4 text-primary/70' />}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className='border border-gray-200 shadow-sm bg-white'>
        <CardHeader className='bg-gray-50 px-5 py-4 border-b border-gray-200'>
          <CardTitle className='text-lg text-gray-800'>
            Security Information
          </CardTitle>
        </CardHeader>
        <CardContent className='p-5'>
          <div className='sm:col-span-2 rounded-lg p-0'>
            <h3 className='text-sm font-medium text-gray-700 mb-3 flex items-center'>
              <Shield className='h-4 w-4 mr-1.5 text-primary' />
              Account Security Status
            </h3>
            <div className='flex flex-wrap gap-2.5'>
              {user.emailVerified && (
                <Badge
                  variant='outline'
                  className='bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 px-2.5 py-1 flex items-center gap-1.5'>
                  <Mail className='h-3 w-3' />
                  Email Verified
                </Badge>
              )}
              {user.phoneVerified && (
                <Badge
                  variant='outline'
                  className='bg-green-50 text-green-700 border-green-200 hover:bg-green-100 px-2.5 py-1 flex items-center gap-1.5'>
                  <Phone className='h-3 w-3' />
                  Phone Verified
                </Badge>
              )}
              {user.twoFactorEnabled && (
                <Badge
                  variant='outline'
                  className='bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 px-2.5 py-1 flex items-center gap-1.5'>
                  <Shield className='h-3 w-3' />
                  2FA Enabled
                </Badge>
              )}
              <Badge
                variant='outline'
                className='bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 px-2.5 py-1 flex items-center gap-1.5'>
                <UserCircle className='h-3 w-3' />
                KYC Level: {user.kycLevel}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function InfoItem({
  label,
  value,
  icon,
  highlight = false,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`p-3 rounded-md ${
        highlight
          ? "bg-primary/5 border border-primary/10"
          : "bg-gray-50 border border-gray-100"
      }`}>
      <div className='flex items-center gap-2 mb-1'>
        {icon}
        <p className='text-sm font-medium text-gray-500'>{label}</p>
      </div>
      <p
        className={`${
          highlight ? "text-lg font-medium text-primary" : "text-gray-800"
        }`}>
        {value}
      </p>
    </div>
  );
}
