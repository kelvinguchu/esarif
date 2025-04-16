"use client";

import { useState, useEffect, use } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { KycBasicInfo } from "@/components/kyc/kyc-basic-info";
import { KycDocumentVerification } from "@/components/kyc/kyc-document-verification";
import { KycFacialVerification } from "@/components/kyc/kyc-facial-verification";
import { KycProofOfResidence } from "@/components/kyc/kyc-proof-of-residence";
import Link from "next/link";

export default function KycVerificationType({
  params,
}: {
  readonly params: Promise<{ type: string }>;
}) {
  const router = useRouter();
  const [verificationComponent, setVerificationComponent] =
    useState<React.ReactNode | null>(null);
  const [title, setTitle] = useState("Verification");
  const [loading, setLoading] = useState(true);

  const resolvedParams = use(params);

  useEffect(() => {
    const loadComponent = () => {
      setLoading(true);
      const type = resolvedParams.type;
      console.log("Loading component for type:", type);

      setTimeout(() => {
        switch (type) {
          case "basic-info":
            setVerificationComponent(
              <KycBasicInfo onNext={(data) => handleVerificationSubmit(data)} />
            );
            setTitle("Basic Information");
            break;
          case "document-verification":
            setVerificationComponent(
              <KycDocumentVerification
                onNext={(data) => handleVerificationSubmit(data)}
                onBack={() => router.push("/kyc")}
              />
            );
            setTitle("ID Verification");
            break;
          case "facial-verification":
            setVerificationComponent(
              <KycFacialVerification
                onSubmit={(data) => handleVerificationSubmit(data)}
              />
            );
            setTitle("Facial Verification");
            break;
          case "proof-of-residence":
            setVerificationComponent(
              <KycProofOfResidence
                onSubmit={(data) => handleVerificationSubmit(data)}
              />
            );
            setTitle("Proof of Address");
            break;
          default:
            router.push("/kyc");
            break;
        }
        setLoading(false);
      }, 100);
    };

    loadComponent();
  }, [resolvedParams, router]);

  const handleVerificationSubmit = (data: any) => {
    console.log("Submitting verification data:", data);

    setTimeout(() => {
      router.push("/kyc");
    }, 1000);
  };

  return (
    <div className='w-full px-4'>
      <div className='mb-8'>
        <div className='flex items-center'>
          <Link href='/kyc'>
            <Button
              variant='ghost'
              className='p-0 mr-4 text-white/70 hover:text-white hover:bg-transparent'>
              <ArrowLeft className='h-5 w-5 mr-1' />
              <span>Back to Verifications</span>
            </Button>
          </Link>
          <h1 className='text-2xl font-semibold text-white'>{title}</h1>
        </div>
      </div>

      {loading ? (
        <div className='flex justify-center items-center h-64'>
          <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white'></div>
        </div>
      ) : (
        <div className='w-full'>{verificationComponent}</div>
      )}
    </div>
  );
}
