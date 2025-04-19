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
    <div className='w-full px-1 sm:px-4 py-4 sm:py-8'>
      <div className='flex items-center mb-4 sm:mb-8'>
        <h1 className='text-xl sm:text-2xl font-semibold text-gray-800'>
          KYC Verification
        </h1>
      </div>

      <div className='mb-4 sm:mb-6'>
        <p className='text-gray-600 text-sm sm:text-base'>
          Complete the following verification steps.
        </p>
      </div>

      <div className='flex flex-col md:flex-row md:flex-wrap gap-3 sm:gap-6'>
        {/* Basic Information Card */}
        <Card className='bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all flex flex-col w-full md:w-[48%] overflow-hidden'>
          <div className='h-1 w-full bg-[#00805a]'></div>
          <CardHeader className='bg-gray-50 border-b border-gray-200 p-4'>
            <div className='flex justify-between items-center'>
              <CardTitle className='text-gray-800 text-base sm:text-lg flex items-center'>
                <div className='h-9 w-9 mr-3 bg-[#00805a]/10 rounded-full flex items-center justify-center border border-[#00805a]/30'>
                  <UserIcon className='h-4 w-4 text-[#00805a]' />
                </div>
                Basic Information
              </CardTitle>
              <span
                className={`px-2.5 py-1 rounded-md text-xs sm:text-sm font-medium ${
                  verificationStatus.basicInfo === "verified"
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : verificationStatus.basicInfo === "pending"
                    ? "bg-amber-100 text-amber-700 border border-amber-200"
                    : "bg-gray-100 text-gray-600 border border-gray-200"
                }`}>
                {getStatusLabel(verificationStatus.basicInfo)}
              </span>
            </div>
            <CardDescription className='text-gray-500 text-xs sm:text-sm mt-2'>
              Provide your personal details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className='pt-4 p-4 text-gray-600 flex-grow text-sm'>
            <p>This verification includes:</p>
            <ul className='list-disc pl-5 mt-2 space-y-1'>
              <li>Full legal name</li>
              <li>Date of birth</li>
              <li>Nationality</li>
              <li>Contact information</li>
            </ul>
          </CardContent>
          <CardFooter className='border-t border-gray-200 p-4 mt-auto'>
            <Link href='/kyc/basic-info' className='w-full'>
              <Button className='w-full bg-[#00805a] hover:bg-[#00805a]/90 text-white font-medium py-3 h-auto rounded-md'>
                {verificationStatus.basicInfo === "verified"
                  ? "View Submission"
                  : "Complete Verification"}
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* ID Verification Card */}
        <Card className='bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all flex flex-col w-full md:w-[48%] overflow-hidden'>
          <div className='h-1 w-full bg-[#00805a]'></div>
          <CardHeader className='bg-gray-50 border-b border-gray-200 p-4'>
            <div className='flex justify-between items-center'>
              <CardTitle className='text-gray-800 text-base sm:text-lg flex items-center'>
                <div className='h-9 w-9 mr-3 bg-[#00805a]/10 rounded-full flex items-center justify-center border border-[#00805a]/30'>
                  <FileCheck className='h-4 w-4 text-[#00805a]' />
                </div>
                ID Verification
              </CardTitle>
              <span
                className={`px-2.5 py-1 rounded-md text-xs sm:text-sm font-medium ${
                  verificationStatus.idVerification === "verified"
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : verificationStatus.idVerification === "pending"
                    ? "bg-amber-100 text-amber-700 border border-amber-200"
                    : "bg-gray-100 text-gray-600 border border-gray-200"
                }`}>
                {getStatusLabel(verificationStatus.idVerification)}
              </span>
            </div>
            <CardDescription className='text-gray-500 text-xs sm:text-sm mt-2'>
              Upload government-issued identification
            </CardDescription>
          </CardHeader>
          <CardContent className='pt-4 p-4 text-gray-600 flex-grow text-sm'>
            <p>This verification includes:</p>
            <ul className='list-disc pl-5 mt-2 space-y-1'>
              <li>ID card, passport, or driver's license</li>
              <li>Document number validation</li>
              <li>Front and back images where applicable</li>
            </ul>
          </CardContent>
          <CardFooter className='border-t border-gray-200 p-4 mt-auto'>
            <Link href='/kyc/document-verification' className='w-full'>
              <Button className='w-full bg-[#00805a] hover:bg-[#00805a]/90 text-white font-medium py-3 h-auto rounded-md'>
                {verificationStatus.idVerification === "verified"
                  ? "View Submission"
                  : "Complete Verification"}
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Facial Verification Card */}
        <Card className='bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all flex flex-col w-full md:w-[48%] overflow-hidden'>
          <div className='h-1 w-full bg-[#00805a]'></div>
          <CardHeader className='bg-gray-50 border-b border-gray-200 p-4'>
            <div className='flex justify-between items-center'>
              <CardTitle className='text-gray-800 text-base sm:text-lg flex items-center'>
                <div className='h-9 w-9 mr-3 bg-[#00805a]/10 rounded-full flex items-center justify-center border border-[#00805a]/30'>
                  <Camera className='h-4 w-4 text-[#00805a]' />
                </div>
                Facial Verification
              </CardTitle>
              <span
                className={`px-2.5 py-1 rounded-md text-xs sm:text-sm font-medium ${
                  verificationStatus.facialVerification === "verified"
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : verificationStatus.facialVerification === "pending"
                    ? "bg-amber-100 text-amber-700 border border-amber-200"
                    : "bg-gray-100 text-gray-600 border border-gray-200"
                }`}>
                {getStatusLabel(verificationStatus.facialVerification)}
              </span>
            </div>
            <CardDescription className='text-gray-500 text-xs sm:text-sm mt-2'>
              Verify your identity with a selfie
            </CardDescription>
          </CardHeader>
          <CardContent className='pt-4 p-4 text-gray-600 flex-grow text-sm'>
            <p>This verification includes:</p>
            <ul className='list-disc pl-5 mt-2 space-y-1'>
              <li>Photo selfie capture</li>
              <li>Face matching with your ID documents</li>
              <li>Liveness detection</li>
            </ul>
          </CardContent>
          <CardFooter className='border-t border-gray-200 p-4 mt-auto'>
            <Link href='/kyc/facial-verification' className='w-full'>
              <Button className='w-full bg-[#00805a] hover:bg-[#00805a]/90 text-white font-medium py-3 h-auto rounded-md'>
                {verificationStatus.facialVerification === "verified"
                  ? "View Submission"
                  : "Complete Verification"}
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Proof of Address Card */}
        <Card className='bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all flex flex-col w-full md:w-[48%] overflow-hidden'>
          <div className='h-1 w-full bg-[#00805a]'></div>
          <CardHeader className='bg-gray-50 border-b border-gray-200 p-4'>
            <div className='flex justify-between items-center'>
              <CardTitle className='text-gray-800 text-base sm:text-lg flex items-center'>
                <div className='h-9 w-9 mr-3 bg-[#00805a]/10 rounded-full flex items-center justify-center border border-[#00805a]/30'>
                  <Home className='h-4 w-4 text-[#00805a]' />
                </div>
                Proof of Address
              </CardTitle>
              <span
                className={`px-2.5 py-1 rounded-md text-xs sm:text-sm font-medium ${
                  verificationStatus.proofOfAddress === "verified"
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : verificationStatus.proofOfAddress === "pending"
                    ? "bg-amber-100 text-amber-700 border border-amber-200"
                    : "bg-gray-100 text-gray-600 border border-gray-200"
                }`}>
                {getStatusLabel(verificationStatus.proofOfAddress)}
              </span>
            </div>
            <CardDescription className='text-gray-500 text-xs sm:text-sm mt-2'>
              Verify your current residential address
            </CardDescription>
          </CardHeader>
          <CardContent className='pt-4 p-4 text-gray-600 flex-grow text-sm'>
            <p>This verification includes:</p>
            <ul className='list-disc pl-5 mt-2 space-y-1'>
              <li>Utility bill, bank statement, or government letter</li>
              <li>Must be issued within the last 3 months</li>
              <li>Must show your full name and address</li>
            </ul>
          </CardContent>
          <CardFooter className='border-t border-gray-200 p-4 mt-auto'>
            <Link href='/kyc/proof-of-residence' className='w-full'>
              <Button className='w-full bg-[#00805a] hover:bg-[#00805a]/90 text-white font-medium py-3 h-auto rounded-md'>
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
