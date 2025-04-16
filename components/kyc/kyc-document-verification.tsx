"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Upload, X, FileText, Check } from "lucide-react";

interface DocumentFile {
  id: string;
  name: string;
  type: string;
  size: number;
  status: "uploading" | "complete" | "error";
  progress?: number;
  url?: string;
}

export interface DocumentData {
  idCard?: DocumentFile;
  proofOfAddress?: DocumentFile;
  passport?: DocumentFile;
}

interface KycDocumentVerificationProps {
  onNext: (data: DocumentData) => void;
  onBack: () => void;
  initialData?: Partial<DocumentData>;
}

export function KycDocumentVerification({
  onNext,
  onBack,
  initialData = {},
}: KycDocumentVerificationProps) {
  const [documents, setDocuments] = useState<DocumentData>({
    idCard: initialData.idCard,
    proofOfAddress: initialData.proofOfAddress,
    passport: initialData.passport,
  });

  const [errors, setErrors] = useState<{
    idCard?: string;
    proofOfAddress?: string;
    passport?: string;
    general?: string;
  }>({});

  // Handle file selection
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    documentType: keyof DocumentData
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      setErrors({
        ...errors,
        [documentType]:
          "File type not supported. Please upload JPEG, PNG, or PDF.",
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors({
        ...errors,
        [documentType]: "File size exceeds 5MB limit.",
      });
      return;
    }

    // Clear error if exists
    if (errors[documentType]) {
      setErrors({
        ...errors,
        [documentType]: undefined,
      });
    }

    // Create new file object
    const newFile: DocumentFile = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      size: file.size,
      status: "uploading",
      progress: 0,
    };

    // Update documents state
    setDocuments({
      ...documents,
      [documentType]: newFile,
    });

    // Simulate upload progress
    simulateUpload(documentType, newFile);
  };

  // Simulate file upload with progress
  const simulateUpload = (
    documentType: keyof DocumentData,
    file: DocumentFile
  ) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;

      if (progress >= 100) {
        clearInterval(interval);
        progress = 100;

        // Complete upload after a small delay
        setTimeout(() => {
          setDocuments((prev) => ({
            ...prev,
            [documentType]: {
              ...file,
              status: "complete",
              progress: 100,
              url: URL.createObjectURL(new Blob()), // Mock URL
            },
          }));
        }, 500);
      } else {
        setDocuments((prev) => ({
          ...prev,
          [documentType]: {
            ...file,
            progress,
          },
        }));
      }
    }, 500);
  };

  // Remove uploaded file
  const removeFile = (documentType: keyof DocumentData) => {
    setDocuments({
      ...documents,
      [documentType]: undefined,
    });
  };

  // Validate and proceed to next step
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};

    // Check if ID Card or Passport is uploaded (at least one is required)
    if (!documents.idCard && !documents.passport) {
      newErrors.general = "Please upload either an ID Card or Passport";
    }

    // Check if Proof of Address is uploaded
    if (!documents.proofOfAddress) {
      newErrors.proofOfAddress = "Proof of Address is required";
    }

    // Check if any document is still uploading
    const isUploading = Object.values(documents).some(
      (doc) => doc?.status === "uploading"
    );

    if (isUploading) {
      newErrors.general = "Please wait for all documents to finish uploading";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext(documents);
    }
  };

  // Render file preview/progress
  const renderFilePreview = (file?: DocumentFile) => {
    if (!file) return null;

    return (
      <div className='flex items-center justify-between p-3 bg-[#041c38] rounded-md mt-1 border border-white/10'>
        <div className='flex items-center space-x-3'>
          <FileText className='h-5 w-5 text-blue-400' />
          <div>
            <p className='text-sm font-medium text-white'>{file.name}</p>
            <p className='text-xs text-white/50'>
              {(file.size / 1024).toFixed(0)} KB
            </p>
          </div>
        </div>

        <div className='flex items-center'>
          {file.status === "uploading" ? (
            <>
              <div className='w-24 bg-white/10 rounded-full h-2 mr-3'>
                <div
                  className='bg-blue-500 h-2 rounded-full'
                  style={{ width: `${file.progress}%` }}
                />
              </div>
              <span className='text-xs text-white/50 mr-2'>
                {file.progress}%
              </span>
            </>
          ) : file.status === "complete" ? (
            <Check className='h-5 w-5 text-green-500 mr-2' />
          ) : (
            <AlertCircle className='h-5 w-5 text-red-500 mr-2' />
          )}

          <button
            type='button'
            onClick={() =>
              removeFile(
                file.id === documents.idCard?.id
                  ? "idCard"
                  : file.id === documents.proofOfAddress?.id
                  ? "proofOfAddress"
                  : "passport"
              )
            }
            className='text-white/50 hover:text-white'>
            <X className='h-5 w-5' />
          </button>
        </div>
      </div>
    );
  };

  return (
    <Card className='border-none shadow-md bg-[#001a38] w-full'>
      <CardHeader className='bg-[#041c38]/50 border-b border-white/10'>
        <CardTitle className='text-white'>ID Verification</CardTitle>
      </CardHeader>
      <CardContent className='p-6'>
        <form onSubmit={handleSubmit}>
          <Alert className='mb-6 bg-blue-500/10 border-blue-500/20'>
            <AlertCircle className='h-4 w-4 text-blue-400' />
            <AlertDescription className='text-white/90'>
              Please upload clear, high-quality images or PDFs of your
              documents. Files must be less than 5MB.
            </AlertDescription>
          </Alert>

          {errors.general && (
            <Alert className='mb-6 bg-red-500/10 border-red-500/20'>
              <AlertCircle className='h-4 w-4 text-red-400' />
              <AlertDescription className='text-white/90'>
                {errors.general}
              </AlertDescription>
            </Alert>
          )}

          <div className='space-y-6'>
            <div>
              <h3 className='text-sm font-medium mb-2 text-white'>
                ID Card (Government Issued)
              </h3>
              {!documents.idCard ? (
                <label className='flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-md cursor-pointer hover:bg-[#041c38]'>
                  <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                    <Upload className='h-8 w-8 text-white/30 mb-2' />
                    <p className='text-sm text-white/70'>
                      <span className='font-medium'>Click to upload</span> or
                      drag and drop
                    </p>
                    <p className='text-xs text-white/50 mt-1'>
                      PNG, JPG or PDF (max. 5MB)
                    </p>
                  </div>
                  <input
                    type='file'
                    className='hidden'
                    accept='.jpg,.jpeg,.png,.pdf'
                    onChange={(e) => handleFileChange(e, "idCard")}
                  />
                </label>
              ) : (
                renderFilePreview(documents.idCard)
              )}
              {errors.idCard && (
                <p className='text-red-500 text-sm mt-1'>{errors.idCard}</p>
              )}
            </div>

            <div>
              <h3 className='text-sm font-medium mb-2 text-white'>
                Proof of Address (Utility Bill, Bank Statement)
              </h3>
              {!documents.proofOfAddress ? (
                <label className='flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-md cursor-pointer hover:bg-[#041c38]'>
                  <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                    <Upload className='h-8 w-8 text-white/30 mb-2' />
                    <p className='text-sm text-white/70'>
                      <span className='font-medium'>Click to upload</span> or
                      drag and drop
                    </p>
                    <p className='text-xs text-white/50 mt-1'>
                      PNG, JPG or PDF (max. 5MB)
                    </p>
                  </div>
                  <input
                    type='file'
                    className='hidden'
                    accept='.jpg,.jpeg,.png,.pdf'
                    onChange={(e) => handleFileChange(e, "proofOfAddress")}
                  />
                </label>
              ) : (
                renderFilePreview(documents.proofOfAddress)
              )}
              {errors.proofOfAddress && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.proofOfAddress}
                </p>
              )}
            </div>

            <div>
              <h3 className='text-sm font-medium mb-2 text-white'>
                Passport (Optional)
              </h3>
              {!documents.passport ? (
                <label className='flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-md cursor-pointer hover:bg-[#041c38]'>
                  <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                    <Upload className='h-8 w-8 text-white/30 mb-2' />
                    <p className='text-sm text-white/70'>
                      <span className='font-medium'>Click to upload</span> or
                      drag and drop
                    </p>
                    <p className='text-xs text-white/50 mt-1'>
                      PNG, JPG or PDF (max. 5MB)
                    </p>
                  </div>
                  <input
                    type='file'
                    className='hidden'
                    accept='.jpg,.jpeg,.png,.pdf'
                    onChange={(e) => handleFileChange(e, "passport")}
                  />
                </label>
              ) : (
                renderFilePreview(documents.passport)
              )}
              {errors.passport && (
                <p className='text-red-500 text-sm mt-1'>{errors.passport}</p>
              )}
            </div>
          </div>

          <div className='flex justify-between mt-8'>
            <Button
              type='button'
              variant='outline'
              onClick={onBack}
              className='border-white/10 text-white hover:bg-white/10'>
              Back
            </Button>
            <Button
              type='submit'
              className='bg-indigo-600 hover:bg-indigo-700 text-white'>
              Submit Verification
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
