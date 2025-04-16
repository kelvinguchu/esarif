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

export function KycBasicInfo({ onNext, initialData = {} }: KycBasicInfoProps) {
  const [formData, setFormData] = useState<BasicInfoData>({
    firstName: initialData.firstName || "",
    lastName: initialData.lastName || "",
    dateOfBirth: initialData.dateOfBirth || "",
    nationality: initialData.nationality || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
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
    <Card className='border-none shadow-md bg-[#001a38] w-full'>
      <CardHeader className='bg-[#041c38]/50 border-b border-white/10'>
        <CardTitle className='text-white'>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className='p-6'>
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
            <div className='space-y-2'>
              <Label htmlFor='firstName' className='text-white'>
                First Name
              </Label>
              <Input
                id='firstName'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                className={`bg-[#041c38] text-white border-white/10 ${
                  errors.firstName ? "border-red-500" : ""
                }`}
              />
              {errors.firstName && (
                <p className='text-red-500 text-sm'>{errors.firstName}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='lastName' className='text-white'>
                Last Name
              </Label>
              <Input
                id='lastName'
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                className={`bg-[#041c38] text-white border-white/10 ${
                  errors.lastName ? "border-red-500" : ""
                }`}
              />
              {errors.lastName && (
                <p className='text-red-500 text-sm'>{errors.lastName}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='dateOfBirth' className='text-white'>
                Date of Birth
              </Label>
              <Input
                id='dateOfBirth'
                name='dateOfBirth'
                type='date'
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={`bg-[#041c38] text-white border-white/10 ${
                  errors.dateOfBirth ? "border-red-500" : ""
                }`}
              />
              {errors.dateOfBirth && (
                <p className='text-red-500 text-sm'>{errors.dateOfBirth}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='nationality' className='text-white'>
                Nationality
              </Label>
              <Input
                id='nationality'
                name='nationality'
                value={formData.nationality}
                onChange={handleChange}
                className={`bg-[#041c38] text-white border-white/10 ${
                  errors.nationality ? "border-red-500" : ""
                }`}
              />
              {errors.nationality && (
                <p className='text-red-500 text-sm'>{errors.nationality}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='email' className='text-white'>
                Email Address
              </Label>
              <Input
                id='email'
                name='email'
                type='email'
                value={formData.email}
                onChange={handleChange}
                className={`bg-[#041c38] text-white border-white/10 ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className='text-red-500 text-sm'>{errors.email}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='phone' className='text-white'>
                Phone Number
              </Label>
              <Input
                id='phone'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                className={`bg-[#041c38] text-white border-white/10 ${
                  errors.phone ? "border-red-500" : ""
                }`}
                placeholder='+1 234 567 8900'
              />
              {errors.phone && (
                <p className='text-red-500 text-sm'>{errors.phone}</p>
              )}
            </div>
          </div>

          <Alert className='mb-6 bg-blue-500/10 border-blue-500/20'>
            <AlertCircle className='h-4 w-4 text-blue-400' />
            <AlertDescription className='text-white/90'>
              Please ensure that all information provided matches your official
              documents.
            </AlertDescription>
          </Alert>

          <div className='flex justify-end'>
            <Button
              type='submit'
              className='bg-blue-600 hover:bg-blue-700 text-white'>
              Submit Verification
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
