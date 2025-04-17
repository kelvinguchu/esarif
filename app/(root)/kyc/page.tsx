"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CheckCircle2,
  UserIcon,
  FileCheck,
  Camera,
  Home,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function KYC() {
  const router = useRouter();

  // Verification status could come from an API or context
  const [verificationStatus, setVerificationStatus] = useState({
    basicInfo: "unverified", // unverified, pending, verified
    idVerification: "unverified",
    facialVerification: "unverified",
    proofOfAddress: "unverified",
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "text-green-500";
      case "pending":
        return "text-amber-500";
      default:
        return "text-gray-400";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "verified":
        return "Verified";
      case "pending":
        return "Pending Review";
      default:
        return "Not Verified";
    }
  };

  return (
    <div className='max-w-full px-3 sm:px-4 py-6 sm:py-8'>
      <div className='flex items-center mb-4 sm:mb-8'>
        <h1 className='text-xl sm:text-2xl font-semibold text-white'>
          KYC Verification
        </h1>
      </div>

      <div className='mb-4 sm:mb-6'>
        <p className='text-white/80 text-sm sm:text-base'>
          Complete the following verification steps.
        </p>
      </div>

      <div className='flex flex-col md:flex-row md:flex-wrap gap-3 sm:gap-6'>
        {/* Basic Information Card */}
        <Card className='bg-[#001a38] border-0 shadow-md hover:shadow-lg transition-all flex flex-col w-full md:w-[calc(50%-12px)]'>
          <CardHeader className='bg-[#041c38]/50 border-b border-white/10 p-3 sm:p-4'>
            <div className='flex justify-between items-center'>
              <CardTitle className='text-white text-base sm:text-lg flex items-center'>
                <UserIcon className='h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 text-blue-400' />
                Basic Information
              </CardTitle>
              <span
                className={`text-xs sm:text-sm font-medium ${getStatusColor(
                  verificationStatus.basicInfo
                )}`}>
                {getStatusLabel(verificationStatus.basicInfo)}
              </span>
            </div>
            <CardDescription className='text-white/70 text-xs sm:text-sm mt-1'>
              Provide your personal details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className='pt-3 sm:pt-4 p-3 sm:p-4 text-white/80 flex-grow text-xs sm:text-sm'>
            <p>This verification includes:</p>
            <ul className='list-disc pl-5 mt-1 sm:mt-2 space-y-0.5 sm:space-y-1'>
              <li>Full legal name</li>
              <li>Date of birth</li>
              <li>Nationality</li>
              <li>Contact information</li>
            </ul>
          </CardContent>
          <CardFooter className='border-t border-white/10 p-3 sm:p-4 mt-auto'>
            <Link href='/kyc/basic-info' className='w-full'>
              <Button className='w-full bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm py-1.5 h-auto sm:h-10'>
                {verificationStatus.basicInfo === "verified"
                  ? "View Submission"
                  : "Complete Verification"}
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* ID Verification Card */}
        <Card className='bg-[#001a38] border-0 shadow-md hover:shadow-lg transition-all flex flex-col w-full md:w-[calc(50%-12px)]'>
          <CardHeader className='bg-[#041c38]/50 border-b border-white/10 p-3 sm:p-4'>
            <div className='flex justify-between items-center'>
              <CardTitle className='text-white text-base sm:text-lg flex items-center'>
                <FileCheck className='h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 text-indigo-400' />
                ID Verification
              </CardTitle>
              <span
                className={`text-xs sm:text-sm font-medium ${getStatusColor(
                  verificationStatus.idVerification
                )}`}>
                {getStatusLabel(verificationStatus.idVerification)}
              </span>
            </div>
            <CardDescription className='text-white/70 text-xs sm:text-sm mt-1'>
              Upload government-issued identification
            </CardDescription>
          </CardHeader>
          <CardContent className='pt-3 sm:pt-4 p-3 sm:p-4 text-white/80 flex-grow text-xs sm:text-sm'>
            <p>This verification includes:</p>
            <ul className='list-disc pl-5 mt-1 sm:mt-2 space-y-0.5 sm:space-y-1'>
              <li>Government-issued ID card, passport, or driver's license</li>
              <li>Document number validation</li>
              <li>Front and back images where applicable</li>
            </ul>
          </CardContent>
          <CardFooter className='border-t border-white/10 p-3 sm:p-4 mt-auto'>
            <Link href='/kyc/document-verification' className='w-full'>
              <Button className='w-full bg-indigo-600 hover:bg-indigo-700 text-xs sm:text-sm py-1.5 h-auto sm:h-10'>
                {verificationStatus.idVerification === "verified"
                  ? "View Submission"
                  : "Complete Verification"}
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Facial Verification Card */}
        <Card className='bg-[#001a38] border-0 shadow-md hover:shadow-lg transition-all flex flex-col w-full md:w-[calc(50%-12px)]'>
          <CardHeader className='bg-[#041c38]/50 border-b border-white/10 p-3 sm:p-4'>
            <div className='flex justify-between items-center'>
              <CardTitle className='text-white text-base sm:text-lg flex items-center'>
                <Camera className='h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 text-violet-400' />
                Facial Verification
              </CardTitle>
              <span
                className={`text-xs sm:text-sm font-medium ${getStatusColor(
                  verificationStatus.facialVerification
                )}`}>
                {getStatusLabel(verificationStatus.facialVerification)}
              </span>
            </div>
            <CardDescription className='text-white/70 text-xs sm:text-sm mt-1'>
              Verify your identity with a photo or video selfie
            </CardDescription>
          </CardHeader>
          <CardContent className='pt-3 sm:pt-4 p-3 sm:p-4 text-white/80 flex-grow text-xs sm:text-sm'>
            <p>This verification includes:</p>
            <ul className='list-disc pl-5 mt-1 sm:mt-2 space-y-0.5 sm:space-y-1'>
              <li>Photo selfie or short video recording</li>
              <li>Face matching with your ID documents</li>
              <li>Liveness detection</li>
            </ul>
          </CardContent>
          <CardFooter className='border-t border-white/10 p-3 sm:p-4 mt-auto'>
            <Link href='/kyc/facial-verification' className='w-full'>
              <Button className='w-full bg-violet-600 hover:bg-violet-700 text-xs sm:text-sm py-1.5 h-auto sm:h-10'>
                {verificationStatus.facialVerification === "verified"
                  ? "View Submission"
                  : "Complete Verification"}
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Proof of Address Card */}
        <Card className='bg-[#001a38] border-0 shadow-md hover:shadow-lg transition-all flex flex-col w-full md:w-[calc(50%-12px)]'>
          <CardHeader className='bg-[#041c38]/50 border-b border-white/10 p-3 sm:p-4'>
            <div className='flex justify-between items-center'>
              <CardTitle className='text-white text-base sm:text-lg flex items-center'>
                <Home className='h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 text-teal-400' />
                Proof of Address
              </CardTitle>
              <span
                className={`text-xs sm:text-sm font-medium ${getStatusColor(
                  verificationStatus.proofOfAddress
                )}`}>
                {getStatusLabel(verificationStatus.proofOfAddress)}
              </span>
            </div>
            <CardDescription className='text-white/70 text-xs sm:text-sm mt-1'>
              Verify your current residential address
            </CardDescription>
          </CardHeader>
          <CardContent className='pt-3 sm:pt-4 p-3 sm:p-4 text-white/80 flex-grow text-xs sm:text-sm'>
            <p>This verification includes:</p>
            <ul className='list-disc pl-5 mt-1 sm:mt-2 space-y-0.5 sm:space-y-1'>
              <li>Utility bill, bank statement, or government letter</li>
              <li>Must be issued within the last 3 months</li>
              <li>Must show your full name and address</li>
            </ul>
          </CardContent>
          <CardFooter className='border-t border-white/10 p-3 sm:p-4 mt-auto'>
            <Link href='/kyc/proof-of-residence' className='w-full'>
              <Button className='w-full bg-teal-600 hover:bg-teal-700 text-xs sm:text-sm py-1.5 h-auto sm:h-10'>
                {verificationStatus.proofOfAddress === "verified"
                  ? "View Submission"
                  : "Complete Verification"}
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
