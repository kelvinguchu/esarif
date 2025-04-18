"use client";

import { useState } from "react";
import { Check, File, Loader2, Upload, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDropzone } from "react-dropzone";

interface ProofOfResidenceProps {
  onSubmit: (data: ProofOfResidenceData) => void;
  isCompleted?: boolean;
  proofData?: ProofOfResidenceData;
}

export interface ProofOfResidenceData {
  documentType: string;
  fileName?: string;
  fileUrl?: string;
  fileData?: File;
}

const DOCUMENT_TYPES = [
  { value: "bank_statement", label: "Bank Statement" },
  { value: "utility_bill", label: "Utility Bill" },
  { value: "tax_document", label: "Tax Document" },
  { value: "rental_agreement", label: "Rental Agreement" },
  { value: "government_letter", label: "Government Letter" },
];

export const KycProofOfResidence = ({
  onSubmit,
  isCompleted = false,
  proofData,
}: ProofOfResidenceProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [documentType, setDocumentType] = useState<string>(
    proofData?.documentType ?? ""
  );
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | undefined>(
    proofData?.fileUrl
  );
  const [fileName, setFileName] = useState<string | undefined>(
    proofData?.fileName
  );
  const [fileError, setFileError] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    setFileError(null);
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];

      // Check file type
      const validTypes = ["application/pdf", "image/jpeg", "image/png"];
      if (!validTypes.includes(selectedFile.type)) {
        setFileError(
          "Invalid file type. Please upload a PDF or image file (JPEG, PNG)."
        );
        return;
      }

      // Check file size (limit to 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setFileError("File size exceeds 5MB limit.");
        return;
      }

      setFile(selectedFile);
      setFileName(selectedFile.name);

      // Create URL for preview if it's an image
      if (selectedFile.type.startsWith("image/")) {
        const url = URL.createObjectURL(selectedFile);
        setFileUrl(url);
      } else {
        setFileUrl(undefined);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  const removeFile = () => {
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }
    setFile(null);
    setFileName(undefined);
    setFileUrl(undefined);
    setFileError(null);
  };

  const handleDocumentTypeChange = (value: string) => {
    setDocumentType(value);
  };

  const handleSubmit = () => {
    if (!documentType || !file) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      onSubmit({
        documentType,
        fileName,
        fileUrl,
        fileData: file,
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Card className='border border-gray-200 shadow-md bg-white w-full'>
      <CardHeader className='bg-gray-50 border-b border-gray-200 px-6 py-4'>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='text-gray-800 text-lg'>
              Proof of Residence
            </CardTitle>
            <CardDescription className='text-gray-500 mt-1'>
              Upload a document that verifies your current residence address
            </CardDescription>
          </div>
          {isCompleted && (
            <div className='h-8 w-8 rounded-full bg-green-100 flex items-center justify-center'>
              <Check className='h-4 w-4 text-green-500' />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className='p-6'>
        {isCompleted ? (
          <div className='flex flex-col space-y-6'>
            <div className='space-y-3'>
              <p className='text-gray-500 text-sm'>Document Type</p>
              <p className='text-gray-800'>
                {DOCUMENT_TYPES.find((d) => d.value === proofData?.documentType)
                  ?.label ?? proofData?.documentType}
              </p>
            </div>

            <div className='space-y-3'>
              <p className='text-gray-500 text-sm'>Uploaded Document</p>
              <div className='bg-gray-50 rounded-md border border-gray-200 p-4 flex items-center'>
                <File className='h-8 w-8 text-primary mr-3' />
                <div>
                  <p className='text-gray-800 font-medium'>
                    {proofData?.fileName}
                  </p>
                  <p className='text-gray-500 text-sm'>
                    Document successfully uploaded
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex flex-col space-y-6'>
            <div>
              <label
                htmlFor='document-type'
                className='block text-gray-700 mb-2'>
                Document Type
              </label>
              <Select
                value={documentType}
                onValueChange={handleDocumentTypeChange}>
                <SelectTrigger
                  id='document-type'
                  className='bg-gray-50 border-gray-200 text-gray-800'>
                  <SelectValue placeholder='Select a document type' />
                </SelectTrigger>
                <SelectContent className='bg-white border-gray-200'>
                  {DOCUMENT_TYPES.map((type) => (
                    <SelectItem
                      key={type.value}
                      value={type.value}
                      className='text-gray-800'>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className='block text-gray-700 mb-2'>
                Upload Document
              </label>

              {!file ? (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed border-gray-300 rounded-md p-6 cursor-pointer transition-colors ${
                    isDragActive ? "bg-gray-100" : "bg-gray-50"
                  }`}>
                  <input {...getInputProps()} />
                  <div className='text-center'>
                    <Upload className='h-10 w-10 text-gray-400 mx-auto mb-4' />
                    {isDragActive ? (
                      <p className='text-gray-800 font-medium'>
                        Drop the file here...
                      </p>
                    ) : (
                      <>
                        <p className='text-gray-800 font-medium mb-1'>
                          Drag & drop a file here, or click to select
                        </p>
                        <p className='text-gray-500 text-sm'>
                          Supported formats: PDF, JPEG, PNG (max 5MB)
                        </p>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className='bg-gray-50 rounded-md border border-gray-200 p-4'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <File className='h-8 w-8 text-primary mr-3' />
                      <div>
                        <p className='text-gray-800 font-medium'>{fileName}</p>
                        <p className='text-gray-500 text-sm'>
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={removeFile}
                      className='h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100'>
                      <X className='h-4 w-4' />
                    </Button>
                  </div>

                  {fileUrl && (
                    <div className='mt-4 max-h-48 overflow-hidden rounded border border-gray-200'>
                      <img
                        src={fileUrl}
                        alt='Document preview'
                        className='max-w-full object-contain'
                      />
                    </div>
                  )}
                </div>
              )}

              {fileError && (
                <p className='text-red-500 mt-2 text-sm'>{fileError}</p>
              )}
            </div>

            <div className='pt-4 flex justify-end'>
              <Button
                type='button'
                className='bg-primary hover:bg-primary/90 text-white font-medium'
                onClick={handleSubmit}
                disabled={isSubmitting || !documentType || !file}>
                {isSubmitting ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Submitting...
                  </>
                ) : (
                  "Submit & Continue"
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
