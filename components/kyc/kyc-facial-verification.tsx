"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, Check, Loader2, RefreshCw, Video } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FacialVerificationProps {
  onSubmit: (data: FacialData) => void;
  isCompleted?: boolean;
  facialData?: FacialData;
}

export interface FacialData {
  selfieImage?: string;
  videoBlob?: Blob;
  videoUrl?: string;
}

export const KycFacialVerification = ({
  onSubmit,
  isCompleted = false,
  facialData,
}: FacialVerificationProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("photo");
  const [capturedImage, setCapturedImage] = useState<string | undefined>(
    facialData?.selfieImage
  );
  const [videoRecorded, setVideoRecorded] = useState<boolean>(
    !!facialData?.videoUrl
  );
  const [videoUrl, setVideoUrl] = useState<string | undefined>(
    facialData?.videoUrl
  );
  const [videoBlob, setVideoBlob] = useState<Blob | undefined>();
  const [cameraActive, setCameraActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      stopCamera();
      if (timerRef.current) clearInterval(timerRef.current);
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
        audio: activeTab === "video",
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);

        if (activeTab === "video") {
          prepareRecorder(stream);
        }
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
    stopRecording();
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

  const prepareRecorder = (stream: MediaStream) => {
    try {
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });
      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setVideoBlob(blob);
        setVideoUrl(url);
        setVideoRecorded(true);
      };

      mediaRecorderRef.current = mediaRecorder;
    } catch (err) {
      console.error("Error creating media recorder:", err);
      alert("Video recording is not supported in your browser.");
    }
  };

  const startRecording = () => {
    if (mediaRecorderRef.current && streamRef.current) {
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const resetVideo = () => {
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
    setVideoUrl(undefined);
    setVideoBlob(undefined);
    setVideoRecorded(false);
    startCamera();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSubmit = () => {
    if (
      (activeTab === "photo" && !capturedImage) ||
      (activeTab === "video" && !videoBlob)
    ) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      onSubmit({
        selfieImage: capturedImage,
        videoBlob: videoBlob,
        videoUrl: videoUrl,
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleTabChange = (value: string) => {
    // Stop current camera if active
    if (cameraActive) {
      stopCamera();
    }

    setActiveTab(value);
    setCapturedImage(undefined);
    setVideoRecorded(false);
    setVideoUrl(undefined);
    setVideoBlob(undefined);
  };

  return (
    <Card className='border-0 shadow-md bg-[#001a38] w-full'>
      <CardHeader className='bg-[#ebeffb]/10 px-6 py-4'>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='text-white text-lg'>
              Facial Verification
            </CardTitle>
            <CardDescription className='text-white/70 mt-1'>
              Take a selfie or short video for identity verification
            </CardDescription>
          </div>
          {isCompleted && (
            <div className='h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center'>
              <Check className='h-4 w-4 text-green-500' />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className='p-6'>
        {isCompleted ? (
          <div className='flex flex-col space-y-6'>
            <div className='space-y-3'>
              <p className='text-white/50 text-sm'>Verification Method</p>
              <p className='text-white capitalize'>
                {facialData?.selfieImage ? "Photo Selfie" : "Video Recording"}
              </p>
            </div>

            <div className='space-y-3'>
              {facialData?.selfieImage && (
                <>
                  <p className='text-white/50 text-sm'>Captured Selfie</p>
                  <div className='bg-[#041c38] rounded-md overflow-hidden h-64 max-w-sm mx-auto border border-white/10'>
                    <img
                      src={facialData.selfieImage}
                      alt='Selfie'
                      className='w-full h-full object-contain'
                    />
                  </div>
                </>
              )}

              {facialData?.videoUrl && (
                <>
                  <p className='text-white/50 text-sm'>Recorded Video</p>
                  <div className='bg-[#041c38] rounded-md overflow-hidden max-w-sm mx-auto border border-white/10'>
                    <video
                      src={facialData.videoUrl}
                      controls
                      className='w-full h-full'
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className='flex flex-col space-y-6'>
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList className='bg-[#041c38] border-white/10 w-full flex'>
                <TabsTrigger
                  value='photo'
                  className='flex-1 data-[state=active]:bg-primary'>
                  <Camera className='mr-2 h-4 w-4' />
                  Photo Selfie
                </TabsTrigger>
                <TabsTrigger
                  value='video'
                  className='flex-1 data-[state=active]:bg-primary'>
                  <Video className='mr-2 h-4 w-4' />
                  Video Recording
                </TabsTrigger>
              </TabsList>

              <TabsContent value='photo' className='mt-4'>
                <div className='flex flex-col space-y-4'>
                  <div className='bg-[#041c38] rounded-md overflow-hidden border border-white/10 h-64 flex items-center justify-center'>
                    {!cameraActive && !capturedImage && (
                      <div className='text-center p-4'>
                        <Camera className='h-16 w-16 text-white/30 mx-auto mb-4' />
                        <p className='text-white/70 mb-4'>
                          Camera is not active
                        </p>
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
                        className='border-white/10 text-white hover:bg-white/5'>
                        <RefreshCw className='mr-2 h-4 w-4' />
                        Retake
                      </Button>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value='video' className='mt-4'>
                <div className='flex flex-col space-y-4'>
                  <div className='bg-[#041c38] rounded-md overflow-hidden border border-white/10 h-64 flex items-center justify-center'>
                    {!cameraActive && !videoRecorded && (
                      <div className='text-center p-4'>
                        <Video className='h-16 w-16 text-white/30 mx-auto mb-4' />
                        <p className='text-white/70 mb-4'>
                          Camera is not active
                        </p>
                        <Button
                          onClick={startCamera}
                          className='bg-primary hover:bg-primary/90'>
                          Start Camera
                        </Button>
                      </div>
                    )}

                    {cameraActive && !videoRecorded && (
                      <div className='relative w-full h-full'>
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className='w-full h-full object-contain'
                        />
                        {isRecording && (
                          <div className='absolute top-4 right-4 bg-red-500/80 text-white px-2 py-1 rounded-md flex items-center'>
                            <div className='w-3 h-3 rounded-full bg-red-100 mr-2 animate-pulse' />
                            {formatTime(recordingTime)}
                          </div>
                        )}
                      </div>
                    )}

                    {videoRecorded && videoUrl && (
                      <video
                        src={videoUrl}
                        controls
                        className='max-w-full max-h-full'
                      />
                    )}
                  </div>

                  <div className='flex justify-center space-x-4'>
                    {cameraActive && !videoRecorded && !isRecording && (
                      <Button
                        onClick={startRecording}
                        className='bg-primary hover:bg-primary/90'>
                        <Video className='mr-2 h-4 w-4' />
                        Start Recording
                      </Button>
                    )}

                    {cameraActive && isRecording && (
                      <Button onClick={stopRecording} variant='destructive'>
                        Stop Recording
                      </Button>
                    )}

                    {videoRecorded && (
                      <Button
                        onClick={resetVideo}
                        variant='outline'
                        className='border-white/10 text-white hover:bg-white/5'>
                        <RefreshCw className='mr-2 h-4 w-4' />
                        Record Again
                      </Button>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className='pt-4 flex justify-end'>
              <Button
                type='button'
                className='bg-primary hover:bg-primary/90 text-white font-medium'
                onClick={handleSubmit}
                disabled={
                  isSubmitting ||
                  (activeTab === "photo" && !capturedImage) ||
                  (activeTab === "video" && !videoRecorded)
                }>
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
