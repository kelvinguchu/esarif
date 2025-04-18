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
        <Card className='bg-[#051b36] border border-[#1a3c5e]/70 shadow-md hover:shadow-lg transition-all flex flex-col w-full md:w-[48%] overflow-hidden'>
          <div className='h-1 w-full bg-blue-600'></div>
          <CardHeader className='bg-[#072442] border-b border-[#1a3c5e] p-4'>
            <div className='flex justify-between items-center'>
              <CardTitle className='text-white text-base sm:text-lg flex items-center'>
                <div className='h-9 w-9 mr-3 bg-[#0d325b] rounded-full flex items-center justify-center border border-blue-500/30'>
                  <UserIcon className='h-4 w-4 text-blue-400' />
                </div>
                Basic Information
              </CardTitle>
              <span
                className={`px-2.5 py-1 rounded-md text-xs sm:text-sm font-medium ${
                  verificationStatus.basicInfo === "verified"
                    ? "bg-green-900/30 text-green-400 border border-green-500/30"
                    : verificationStatus.basicInfo === "pending"
                    ? "bg-amber-900/30 text-amber-400 border border-amber-500/30"
                    : "bg-slate-800/50 text-gray-400 border border-gray-700"
                }`}>
                {getStatusLabel(verificationStatus.basicInfo)}
              </span>
            </div>
            <CardDescription className='text-white/70 text-xs sm:text-sm mt-2'>
              Provide your personal details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className='pt-4 p-4 text-white/80 flex-grow text-sm'>
            <p>This verification includes:</p>
            <ul className='list-disc pl-5 mt-2 space-y-1'>
              <li>Full legal name</li>
              <li>Date of birth</li>
              <li>Nationality</li>
              <li>Contact information</li>
            </ul>
          </CardContent>
          <CardFooter className='border-t border-[#1a3c5e] p-4 mt-auto'>
            <Link href='/kyc/basic-info' className='w-full'>
              <Button className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 h-auto rounded-md'>
                {verificationStatus.basicInfo === "verified"
                  ? "View Submission"
                  : "Complete Verification"}
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* ID Verification Card */}
        <Card className='bg-[#051b36] border border-[#1a3c5e]/70 shadow-md hover:shadow-lg transition-all flex flex-col w-full md:w-[48%] overflow-hidden'>
          <div className='h-1 w-full bg-indigo-600'></div>
          <CardHeader className='bg-[#072442] border-b border-[#1a3c5e] p-4'>
            <div className='flex justify-between items-center'>
              <CardTitle className='text-white text-base sm:text-lg flex items-center'>
                <div className='h-9 w-9 mr-3 bg-[#0d325b] rounded-full flex items-center justify-center border border-indigo-500/30'>
                  <FileCheck className='h-4 w-4 text-indigo-400' />
                </div>
                ID Verification
              </CardTitle>
              <span
                className={`px-2.5 py-1 rounded-md text-xs sm:text-sm font-medium ${
                  verificationStatus.idVerification === "verified"
                    ? "bg-green-900/30 text-green-400 border border-green-500/30"
                    : verificationStatus.idVerification === "pending"
                    ? "bg-amber-900/30 text-amber-400 border border-amber-500/30"
                    : "bg-slate-800/50 text-gray-400 border border-gray-700"
                }`}>
                {getStatusLabel(verificationStatus.idVerification)}
              </span>
            </div>
            <CardDescription className='text-white/70 text-xs sm:text-sm mt-2'>
              Upload government-issued identification
            </CardDescription>
          </CardHeader>
          <CardContent className='pt-4 p-4 text-white/80 flex-grow text-sm'>
            <p>This verification includes:</p>
            <ul className='list-disc pl-5 mt-2 space-y-1'>
              <li>ID card, passport, or driver's license</li>
              <li>Document number validation</li>
              <li>Front and back images where applicable</li>
            </ul>
          </CardContent>
          <CardFooter className='border-t border-[#1a3c5e] p-4 mt-auto'>
            <Link href='/kyc/document-verification' className='w-full'>
              <Button className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 h-auto rounded-md'>
                {verificationStatus.idVerification === "verified"
                  ? "View Submission"
                  : "Complete Verification"}
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Facial Verification Card */}
        <Card className='bg-[#051b36] border border-[#1a3c5e]/70 shadow-md hover:shadow-lg transition-all flex flex-col w-full md:w-[48%] overflow-hidden'>
          <div className='h-1 w-full bg-violet-600'></div>
          <CardHeader className='bg-[#072442] border-b border-[#1a3c5e] p-4'>
            <div className='flex justify-between items-center'>
              <CardTitle className='text-white text-base sm:text-lg flex items-center'>
                <div className='h-9 w-9 mr-3 bg-[#0d325b] rounded-full flex items-center justify-center border border-violet-500/30'>
                  <Camera className='h-4 w-4 text-violet-400' />
                </div>
                Facial Verification
              </CardTitle>
              <span
                className={`px-2.5 py-1 rounded-md text-xs sm:text-sm font-medium ${
                  verificationStatus.facialVerification === "verified"
                    ? "bg-green-900/30 text-green-400 border border-green-500/30"
                    : verificationStatus.facialVerification === "pending"
                    ? "bg-amber-900/30 text-amber-400 border border-amber-500/30"
                    : "bg-slate-800/50 text-gray-400 border border-gray-700"
                }`}>
                {getStatusLabel(verificationStatus.facialVerification)}
              </span>
            </div>
            <CardDescription className='text-white/70 text-xs sm:text-sm mt-2'>
              Verify your identity with a selfie
            </CardDescription>
          </CardHeader>
          <CardContent className='pt-4 p-4 text-white/80 flex-grow text-sm'>
            <p>This verification includes:</p>
            <ul className='list-disc pl-5 mt-2 space-y-1'>
              <li>Photo selfie capture</li>
              <li>Face matching with your ID documents</li>
              <li>Liveness detection</li>
            </ul>
          </CardContent>
          <CardFooter className='border-t border-[#1a3c5e] p-4 mt-auto'>
            <Link href='/kyc/facial-verification' className='w-full'>
              <Button className='w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-3 h-auto rounded-md'>
                {verificationStatus.facialVerification === "verified"
                  ? "View Submission"
                  : "Complete Verification"}
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Proof of Address Card */}
        <Card className='bg-[#051b36] border border-[#1a3c5e]/70 shadow-md hover:shadow-lg transition-all flex flex-col w-full md:w-[48%] overflow-hidden'>
          <div className='h-1 w-full bg-teal-600'></div>
          <CardHeader className='bg-[#072442] border-b border-[#1a3c5e] p-4'>
            <div className='flex justify-between items-center'>
              <CardTitle className='text-white text-base sm:text-lg flex items-center'>
                <div className='h-9 w-9 mr-3 bg-[#0d325b] rounded-full flex items-center justify-center border border-teal-500/30'>
                  <Home className='h-4 w-4 text-teal-400' />
                </div>
                Proof of Address
              </CardTitle>
              <span
                className={`px-2.5 py-1 rounded-md text-xs sm:text-sm font-medium ${
                  verificationStatus.proofOfAddress === "verified"
                    ? "bg-green-900/30 text-green-400 border border-green-500/30"
                    : verificationStatus.proofOfAddress === "pending"
                    ? "bg-amber-900/30 text-amber-400 border border-amber-500/30"
                    : "bg-slate-800/50 text-gray-400 border border-gray-700"
                }`}>
                {getStatusLabel(verificationStatus.proofOfAddress)}
              </span>
            </div>
            <CardDescription className='text-white/70 text-xs sm:text-sm mt-2'>
              Verify your current residential address
            </CardDescription>
          </CardHeader>
          <CardContent className='pt-4 p-4 text-white/80 flex-grow text-sm'>
            <p>This verification includes:</p>
            <ul className='list-disc pl-5 mt-2 space-y-1'>
              <li>Utility bill, bank statement, or government letter</li>
              <li>Must be issued within the last 3 months</li>
              <li>Must show your full name and address</li>
            </ul>
          </CardContent>
          <CardFooter className='border-t border-[#1a3c5e] p-4 mt-auto'>
            <Link href='/kyc/proof-of-residence' className='w-full'>
              <Button className='w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 h-auto rounded-md'>
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
