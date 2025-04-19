"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export interface BasicInfoData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  email: string;
  phone: string;
}

interface KycBasicInfoProps {
  onNext: (data: BasicInfoData) => void;
  initialData?: Partial<BasicInfoData>;
}

export function KycBasicInfo({
  onNext,
  initialData = {},
}: Readonly<KycBasicInfoProps>) {
  const [formData, setFormData] = useState<BasicInfoData>({
    firstName: initialData.firstName ?? "",
    lastName: initialData.lastName ?? "",
    dateOfBirth: initialData.dateOfBirth ?? "",
    nationality: initialData.nationality ?? "",
    email: initialData.email ?? "",
    phone: initialData.phone ?? "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof BasicInfoData, string>>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name as keyof BasicInfoData]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BasicInfoData, string>> = {};
    let isValid = true;

    // Validate required fields
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key as keyof BasicInfoData] = "This field is required";
        isValid = false;
      }
    });

    // Validate email format
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Validate phone number (simple check)
    if (formData.phone && !/^\+?[0-9\s]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onNext(formData);
    }
  };

  return (
    <Card className='border border-gray-200 shadow-md bg-white w-full overflow-hidden'>
      <div className='h-1 w-full bg-[#00805a]'></div>
      <CardHeader className='bg-gray-50 border-b border-gray-200 p-4'>
        <CardTitle className='text-gray-800 text-lg sm:text-xl'>
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className='p-3 sm:p-6'>
        <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-6'>
          <div className='flex flex-col md:flex-row md:flex-wrap gap-3 sm:gap-4 mb-2 sm:mb-4'>
            <div className='space-y-1.5 sm:space-y-2 w-full md:w-[calc(50%-8px)]'>
              <Label
                htmlFor='firstName'
                className='text-gray-700 text-sm sm:text-base'>
                First Name
              </Label>
              <Input
                id='firstName'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                className={`bg-gray-50 text-gray-900 border-gray-200 focus:border-[#00805a] focus:ring-[#00805a]/20 text-sm sm:text-base h-9 sm:h-10 ${
                  errors.firstName ? "border-red-500" : ""
                }`}
              />
              {errors.firstName && (
                <p className='text-red-500 text-xs sm:text-sm mt-1'>
                  {errors.firstName}
                </p>
              )}
            </div>

            <div className='space-y-1.5 sm:space-y-2 w-full md:w-[calc(50%-8px)]'>
              <Label
                htmlFor='lastName'
                className='text-gray-700 text-sm sm:text-base'>
                Last Name
              </Label>
              <Input
                id='lastName'
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                className={`bg-gray-50 text-gray-900 border-gray-200 focus:border-[#00805a] focus:ring-[#00805a]/20 text-sm sm:text-base h-9 sm:h-10 ${
                  errors.lastName ? "border-red-500" : ""
                }`}
              />
              {errors.lastName && (
                <p className='text-red-500 text-xs sm:text-sm mt-1'>
                  {errors.lastName}
                </p>
              )}
            </div>

            <div className='space-y-1.5 sm:space-y-2 w-full md:w-[calc(50%-8px)]'>
              <Label
                htmlFor='dateOfBirth'
                className='text-gray-700 text-sm sm:text-base'>
                Date of Birth
              </Label>
              <Input
                id='dateOfBirth'
                name='dateOfBirth'
                type='date'
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={`bg-gray-50 text-gray-900 border-gray-200 focus:border-[#00805a] focus:ring-[#00805a]/20 text-sm sm:text-base h-9 sm:h-10 ${
                  errors.dateOfBirth ? "border-red-500" : ""
                }`}
              />
              {errors.dateOfBirth && (
                <p className='text-red-500 text-xs sm:text-sm mt-1'>
                  {errors.dateOfBirth}
                </p>
              )}
            </div>

            <div className='space-y-1.5 sm:space-y-2 w-full md:w-[calc(50%-8px)]'>
              <Label
                htmlFor='nationality'
                className='text-gray-700 text-sm sm:text-base'>
                Nationality
              </Label>
              <Input
                id='nationality'
                name='nationality'
                value={formData.nationality}
                onChange={handleChange}
                className={`bg-gray-50 text-gray-900 border-gray-200 focus:border-[#00805a] focus:ring-[#00805a]/20 text-sm sm:text-base h-9 sm:h-10 ${
                  errors.nationality ? "border-red-500" : ""
                }`}
              />
              {errors.nationality && (
                <p className='text-red-500 text-xs sm:text-sm mt-1'>
                  {errors.nationality}
                </p>
              )}
            </div>

            <div className='space-y-1.5 sm:space-y-2 w-full md:w-[calc(50%-8px)]'>
              <Label
                htmlFor='email'
                className='text-gray-700 text-sm sm:text-base'>
                Email Address
              </Label>
              <Input
                id='email'
                name='email'
                type='email'
                value={formData.email}
                onChange={handleChange}
                className={`bg-gray-50 text-gray-900 border-gray-200 focus:border-[#00805a] focus:ring-[#00805a]/20 text-sm sm:text-base h-9 sm:h-10 ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className='text-red-500 text-xs sm:text-sm mt-1'>
                  {errors.email}
                </p>
              )}
            </div>

            <div className='space-y-1.5 sm:space-y-2 w-full md:w-[calc(50%-8px)]'>
              <Label
                htmlFor='phone'
                className='text-gray-700 text-sm sm:text-base'>
                Phone Number
              </Label>
              <Input
                id='phone'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                className={`bg-gray-50 text-gray-900 border-gray-200 focus:border-[#00805a] focus:ring-[#00805a]/20 text-sm sm:text-base h-9 sm:h-10 ${
                  errors.phone ? "border-red-500" : ""
                }`}
                placeholder='+1 234 567 8900'
              />
              {errors.phone && (
                <p className='text-red-500 text-xs sm:text-sm mt-1'>
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          <Alert className='bg-[#00805a]/5 border-[#00805a]/20 py-2 sm:py-3 text-xs sm:text-sm'>
            <AlertCircle className='h-3 w-3 sm:h-4 sm:w-4 text-[#00805a]' />
            <AlertDescription className='text-gray-700'>
              Please ensure that all information provided matches your official
              documents.
            </AlertDescription>
          </Alert>

          <div className='flex justify-end pt-2 sm:pt-4'>
            <Button
              type='submit'
              className='bg-[#00805a] hover:bg-[#00805a]/90 text-white font-medium text-xs sm:text-sm py-2 sm:py-3 px-3 sm:px-4 h-auto w-full sm:w-auto rounded-md'>
              Submit Verification
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
