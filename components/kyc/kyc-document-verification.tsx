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
}: Readonly<KycDocumentVerificationProps>) {
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
      id: Math.random().toString(36).substring(2, 11),
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
      <div className='flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-md mt-1 border border-gray-200'>
        <div className='flex items-center space-x-2 sm:space-x-3'>
          <FileText className='h-4 w-4 sm:h-5 sm:w-5 text-blue-500 flex-shrink-0' />
          <div className='min-w-0 overflow-hidden'>
            <p className='text-xs sm:text-sm font-medium text-gray-800 truncate'>
              {file.name}
            </p>
            <p className='text-xs text-gray-500'>
              {(file.size / 1024).toFixed(0)} KB
            </p>
          </div>
        </div>

        <div className='flex items-center flex-shrink-0 ml-2'>
          {file.status === "uploading" ? (
            <>
              <div className='w-16 sm:w-24 bg-gray-200 rounded-full h-1.5 sm:h-2 mr-2 sm:mr-3'>
                <div
                  className='bg-blue-500 h-1.5 sm:h-2 rounded-full'
                  style={{ width: `${file.progress}%` }}
                />
              </div>
              <span className='text-xs text-gray-500 mr-2'>
                {file.progress}%
              </span>
            </>
          ) : file.status === "complete" ? (
            <Check className='h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2' />
          ) : (
            <AlertCircle className='h-4 w-4 sm:h-5 sm:w-5 text-red-500 mr-2' />
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
            className='text-gray-500 hover:text-gray-700'>
            <X className='h-4 w-4 sm:h-5 sm:w-5' />
          </button>
        </div>
      </div>
    );
  };

  return (
    <Card className='border border-gray-200 shadow-md bg-white w-full'>
      <CardHeader className='bg-gray-50 border-b border-gray-200 p-3 sm:p-6'>
        <CardTitle className='text-gray-800 text-lg sm:text-xl'>
          ID Verification
        </CardTitle>
      </CardHeader>
      <CardContent className='p-3 sm:p-6'>
        <form onSubmit={handleSubmit}>
          <Alert className='mb-4 sm:mb-6 bg-blue-50 border-blue-200 py-2 sm:py-3 text-xs sm:text-sm'>
            <AlertCircle className='h-3 w-3 sm:h-4 sm:w-4 text-blue-500' />
            <AlertDescription className='text-blue-700'>
              Please upload clear, high-quality images or PDFs of your
              documents. Files must be less than 5MB.
            </AlertDescription>
          </Alert>

          {errors.general && (
            <Alert className='mb-4 sm:mb-6 bg-red-50 border-red-200 py-2 sm:py-3 text-xs sm:text-sm'>
              <AlertCircle className='h-3 w-3 sm:h-4 sm:w-4 text-red-500' />
              <AlertDescription className='text-red-600'>
                {errors.general}
              </AlertDescription>
            </Alert>
          )}

          <div className='flex flex-col space-y-4 sm:space-y-6'>
            <div>
              <h3 className='text-xs sm:text-sm font-medium mb-2 text-gray-700'>
                ID Card (Government Issued)
              </h3>
              {!documents.idCard ? (
                <label className='flex flex-col items-center justify-center w-full h-24 sm:h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50'>
                  <div className='flex flex-col items-center justify-center pt-3 pb-4 sm:pt-5 sm:pb-6'>
                    <Upload className='h-6 w-6 sm:h-8 sm:w-8 text-gray-400 mb-2' />
                    <p className='text-xs sm:text-sm text-gray-600'>
                      <span className='font-medium'>Click to upload</span> or
                      drag and drop
                    </p>
                    <p className='text-[10px] sm:text-xs text-gray-500 mt-1'>
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
                <p className='text-red-500 text-xs sm:text-sm mt-1'>
                  {errors.idCard}
                </p>
              )}
            </div>

            <div>
              <h3 className='text-xs sm:text-sm font-medium mb-2 text-gray-700'>
                Proof of Address (Utility Bill, Bank Statement)
              </h3>
              {!documents.proofOfAddress ? (
                <label className='flex flex-col items-center justify-center w-full h-24 sm:h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50'>
                  <div className='flex flex-col items-center justify-center pt-3 pb-4 sm:pt-5 sm:pb-6'>
                    <Upload className='h-6 w-6 sm:h-8 sm:w-8 text-gray-400 mb-2' />
                    <p className='text-xs sm:text-sm text-gray-600'>
                      <span className='font-medium'>Click to upload</span> or
                      drag and drop
                    </p>
                    <p className='text-[10px] sm:text-xs text-gray-500 mt-1'>
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
                <p className='text-red-500 text-xs sm:text-sm mt-1'>
                  {errors.proofOfAddress}
                </p>
              )}
            </div>

            <div>
              <h3 className='text-xs sm:text-sm font-medium mb-2 text-gray-700'>
                Passport (Optional)
              </h3>
              {!documents.passport ? (
                <label className='flex flex-col items-center justify-center w-full h-24 sm:h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50'>
                  <div className='flex flex-col items-center justify-center pt-3 pb-4 sm:pt-5 sm:pb-6'>
                    <Upload className='h-6 w-6 sm:h-8 sm:w-8 text-gray-400 mb-2' />
                    <p className='text-xs sm:text-sm text-gray-600'>
                      <span className='font-medium'>Click to upload</span> or
                      drag and drop
                    </p>
                    <p className='text-[10px] sm:text-xs text-gray-500 mt-1'>
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
                <p className='text-red-500 text-xs sm:text-sm mt-1'>
                  {errors.passport}
                </p>
              )}
            </div>
          </div>

          <div className='flex justify-end mt-6 sm:mt-8'>
            <Button
              type='submit'
              className='bg-[#00805a] hover:bg-[#00805a]/90 text-white text-xs sm:text-sm h-8 sm:h-10 py-1.5'>
              Submit Verification
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
