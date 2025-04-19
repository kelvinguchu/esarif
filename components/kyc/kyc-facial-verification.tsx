"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, Check, Loader2, RefreshCw } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FacialVerificationProps {
  onSubmit: (data: FacialData) => void;
  isCompleted?: boolean;
  facialData?: FacialData;
}

export interface FacialData {
  selfieImage?: string;
}

export const KycFacialVerification = ({
  onSubmit,
  isCompleted = false,
  facialData,
}: FacialVerificationProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | undefined>(
    facialData?.selfieImage
  );
  const [cameraActive, setCameraActive] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert(
        "Unable to access camera. Please ensure camera permissions are enabled."
      );
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current && streamRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      // Set canvas size to match video dimensions
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the current video frame to the canvas
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas to data URL (base64 string)
        const dataUrl = canvas.toDataURL("image/jpeg");
        setCapturedImage(dataUrl);

        // Stop the camera after capturing
        stopCamera();
      }
    }
  };

  const retakePhoto = () => {
    setCapturedImage(undefined);
    startCamera();
  };

  const handleSubmit = () => {
    if (!capturedImage) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      onSubmit({
        selfieImage: capturedImage,
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
              Facial Verification
            </CardTitle>
            <CardDescription className='text-gray-500 mt-1'>
              Take a selfie for identity verification
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
              <p className='text-gray-500 text-sm'>Verification Method</p>
              <p className='text-gray-800'>Photo Selfie</p>
            </div>

            <div className='space-y-3'>
              {facialData?.selfieImage && (
                <>
                  <p className='text-gray-500 text-sm'>Captured Selfie</p>
                  <div className='bg-gray-50 rounded-md overflow-hidden h-64 max-w-sm mx-auto border border-gray-200'>
                    <img
                      src={facialData.selfieImage}
                      alt='Selfie'
                      className='w-full h-full object-contain'
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className='flex flex-col space-y-6'>
            <div className='flex flex-col space-y-4'>
              <div className='bg-gray-50 rounded-md overflow-hidden border border-gray-200 h-64 flex items-center justify-center'>
                {!cameraActive && !capturedImage && (
                  <div className='text-center p-4'>
                    <Camera className='h-16 w-16 text-gray-400 mx-auto mb-4' />
                    <p className='text-gray-500 mb-4'>Camera is not active</p>
                    <Button
                      onClick={startCamera}
                      className='bg-primary hover:bg-primary/90'>
                      Start Camera
                    </Button>
                  </div>
                )}

                {cameraActive && !capturedImage && (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className='max-w-full max-h-full'
                  />
                )}

                {capturedImage && (
                  <img
                    src={capturedImage}
                    alt='Captured selfie'
                    className='max-w-full max-h-full'
                  />
                )}

                {/* Hidden canvas for taking photo */}
                <canvas ref={canvasRef} className='hidden' />
              </div>

              <div className='flex justify-center space-x-4'>
                {cameraActive && !capturedImage && (
                  <Button
                    onClick={capturePhoto}
                    className='bg-primary hover:bg-primary/90'>
                    <Camera className='mr-2 h-4 w-4' />
                    Take Photo
                  </Button>
                )}

                {capturedImage && (
                  <Button
                    onClick={retakePhoto}
                    variant='outline'
                    className='border-gray-300 text-gray-700 hover:bg-gray-50'>
                    <RefreshCw className='mr-2 h-4 w-4' />
                    Retake
                  </Button>
                )}
              </div>
            </div>

            <div className='pt-4 flex justify-end'>
              <Button
                type='button'
                className='bg-primary hover:bg-primary/90 text-white font-medium'
                onClick={handleSubmit}
                disabled={isSubmitting || !capturedImage}>
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
