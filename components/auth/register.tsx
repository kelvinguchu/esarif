"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Loader2,
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Building,
  Home,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const countries = [
  { value: "kenya", label: "Kenya" },
  { value: "somalia", label: "Somalia" },
  { value: "tanzania", label: "Tanzania" },
  { value: "uganda", label: "Uganda" },
  { value: "ethiopia", label: "Ethiopia" },
  { value: "sudan", label: "Sudan" },
];

const registerSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters",
    }),
    middleName: z.string().optional(),
    lastName: z.string().min(2, {
      message: "Last name must be at least 2 characters",
    }),
    country: z.string({
      required_error: "Please select a country",
    }),
    phoneNumber: z.string().min(10, {
      message: "Phone number must be at least 10 digits",
    }),
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    city: z.string().min(2, {
      message: "City must be at least 2 characters",
    }),
    district: z.string().min(2, {
      message: "District must be at least 2 characters",
    }),
    village: z.string().min(2, {
      message: "Village must be at least 2 characters",
    }),
    terms: z.boolean().refine((value) => value === true, {
      message: "You must agree to the terms and conditions",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const currentYear = new Date().getFullYear();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      country: "",
      phoneNumber: "",
      email: "",
      city: "",
      district: "",
      village: "",
      terms: false,
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log(data);
      toast.success("Registration successful");
      setIsLoading(false);
      router.push("/swap");
    }, 1500);
  }

  return (
    <div className='flex items-center justify-center min-h-screen py-4 px-3 sm:py-6 sm:px-6 bg-gray-50'>
      <div className='w-full max-w-4xl p-4 sm:p-6 md:p-8 rounded-xl shadow-lg bg-white'>
        <div className='text-center mb-6 md:mb-8'>
          <div className='flex justify-center mb-4'>
            <div className='inline-flex px-5 py-2 items-center justify-center rounded-full bg-primary shadow-md'>
              <span className='text-lg sm:text-xl font-bold text-white'>
                e-Sarif
              </span>
            </div>
          </div>
          <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-800'>
            Create Your Account
          </h1>
          <CardDescription className='text-sm text-gray-600 mt-2 px-1'>
            Join e-Sarif to manage all your wallets in one place
          </CardDescription>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6 md:space-y-8'>
            {/* Personal Information Section */}
            <div className='space-y-3 md:space-y-4'>
              <h2 className='text-base sm:text-lg font-semibold text-gray-800'>
                Personal Information
              </h2>
              <div className='grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-800 font-medium text-sm sm:text-base'>
                        First Name
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <User className='absolute left-3 top-1/2 -translate-y-1/2 h-[18px] w-[18px] sm:h-5 sm:w-5 text-gray-500' />
                          <Input
                            placeholder='John'
                            {...field}
                            className='h-11 sm:h-12 pl-9 sm:pl-10 text-sm sm:text-base rounded-lg bg-gray-50 border-gray-200 focus:border-primary focus-visible:ring-1 focus-visible:ring-primary text-gray-800 placeholder:text-gray-500'
                          />
                        </div>
                      </FormControl>
                      <FormMessage className='text-red-600 font-medium text-xs sm:text-sm' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='middleName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-800 font-medium text-sm sm:text-base'>
                        Middle Name (Optional)
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <User className='absolute left-3 top-1/2 -translate-y-1/2 h-[18px] w-[18px] sm:h-5 sm:w-5 text-gray-500' />
                          <Input
                            placeholder='David'
                            {...field}
                            className='h-11 sm:h-12 pl-9 sm:pl-10 text-sm sm:text-base rounded-lg bg-gray-50 border-gray-200 focus:border-primary focus-visible:ring-1 focus-visible:ring-primary text-gray-800 placeholder:text-gray-500'
                          />
                        </div>
                      </FormControl>
                      <FormMessage className='text-red-600 font-medium text-xs sm:text-sm' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-800 font-medium text-sm sm:text-base'>
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <User className='absolute left-3 top-1/2 -translate-y-1/2 h-[18px] w-[18px] sm:h-5 sm:w-5 text-gray-500' />
                          <Input
                            placeholder='Doe'
                            {...field}
                            className='h-11 sm:h-12 pl-9 sm:pl-10 text-sm sm:text-base rounded-lg bg-gray-50 border-gray-200 focus:border-primary focus-visible:ring-1 focus-visible:ring-primary text-gray-800 placeholder:text-gray-500'
                          />
                        </div>
                      </FormControl>
                      <FormMessage className='text-red-600 font-medium text-xs sm:text-sm' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='sm:col-span-2 lg:col-span-1'>
                      <FormLabel className='text-gray-800 font-medium text-sm sm:text-base'>
                        Email
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Mail className='absolute left-3 top-1/2 -translate-y-1/2 h-[18px] w-[18px] sm:h-5 sm:w-5 text-gray-500' />
                          <Input
                            placeholder='john.doe@example.com'
                            {...field}
                            className='h-11 sm:h-12 pl-9 sm:pl-10 text-sm sm:text-base rounded-lg bg-gray-50 border-gray-200 focus:border-primary focus-visible:ring-1 focus-visible:ring-primary text-gray-800 placeholder:text-gray-500'
                          />
                        </div>
                      </FormControl>
                      <FormMessage className='text-red-600 font-medium text-xs sm:text-sm' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='phoneNumber'
                  render={({ field }) => (
                    <FormItem className='sm:col-span-2 lg:col-span-1'>
                      <FormLabel className='text-gray-800 font-medium text-sm sm:text-base'>
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Phone className='absolute left-3 top-1/2 -translate-y-1/2 h-[18px] w-[18px] sm:h-5 sm:w-5 text-gray-500' />
                          <Input
                            placeholder='+254712345678'
                            {...field}
                            className='h-11 sm:h-12 pl-9 sm:pl-10 text-sm sm:text-base rounded-lg bg-gray-50 border-gray-200 focus:border-primary focus-visible:ring-1 focus-visible:ring-primary text-gray-800 placeholder:text-gray-500'
                          />
                        </div>
                      </FormControl>
                      <FormMessage className='text-red-600 font-medium text-xs sm:text-sm' />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Location Information Section */}
            <div className='space-y-3 md:space-y-4'>
              <h2 className='text-base sm:text-lg font-semibold text-gray-800'>
                Location Details
              </h2>
              <div className='grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='country'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-800 font-medium text-sm sm:text-base'>
                        Country
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <div className='relative'>
                            <MapPin className='absolute left-3 top-1/2 -translate-y-1/2 h-[18px] w-[18px] sm:h-5 sm:w-5 text-gray-500 z-10' />
                            <SelectTrigger className='h-11 sm:h-12 pl-9 sm:pl-10 text-sm sm:text-base rounded-lg bg-gray-50 border-gray-200 focus:border-primary focus-visible:ring-1 focus-visible:ring-primary text-gray-800'>
                              <SelectValue placeholder='Select country' />
                            </SelectTrigger>
                          </div>
                        </FormControl>
                        <SelectContent className='bg-white'>
                          {countries.map((country) => (
                            <SelectItem
                              key={country.value}
                              value={country.value}>
                              {country.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className='text-red-600 font-medium text-xs sm:text-sm' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='city'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-800 font-medium text-sm sm:text-base'>
                        City
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Building className='absolute left-3 top-1/2 -translate-y-1/2 h-[18px] w-[18px] sm:h-5 sm:w-5 text-gray-500' />
                          <Input
                            placeholder='Nairobi'
                            {...field}
                            className='h-11 sm:h-12 pl-9 sm:pl-10 text-sm sm:text-base rounded-lg bg-gray-50 border-gray-200 focus:border-primary focus-visible:ring-1 focus-visible:ring-primary text-gray-800 placeholder:text-gray-500'
                          />
                        </div>
                      </FormControl>
                      <FormMessage className='text-red-600 font-medium text-xs sm:text-sm' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='district'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-800 font-medium text-sm sm:text-base'>
                        District
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Building className='absolute left-3 top-1/2 -translate-y-1/2 h-[18px] w-[18px] sm:h-5 sm:w-5 text-gray-500' />
                          <Input
                            placeholder='Westlands'
                            {...field}
                            className='h-11 sm:h-12 pl-9 sm:pl-10 text-sm sm:text-base rounded-lg bg-gray-50 border-gray-200 focus:border-primary focus-visible:ring-1 focus-visible:ring-primary text-gray-800 placeholder:text-gray-500'
                          />
                        </div>
                      </FormControl>
                      <FormMessage className='text-red-600 font-medium text-xs sm:text-sm' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='village'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-800 font-medium text-sm sm:text-base'>
                        Village/Area
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Home className='absolute left-3 top-1/2 -translate-y-1/2 h-[18px] w-[18px] sm:h-5 sm:w-5 text-gray-500' />
                          <Input
                            placeholder='Parklands'
                            {...field}
                            className='h-11 sm:h-12 pl-9 sm:pl-10 text-sm sm:text-base rounded-lg bg-gray-50 border-gray-200 focus:border-primary focus-visible:ring-1 focus-visible:ring-primary text-gray-800 placeholder:text-gray-500'
                          />
                        </div>
                      </FormControl>
                      <FormMessage className='text-red-600 font-medium text-xs sm:text-sm' />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Password Section */}
            <div className='space-y-3 md:space-y-4'>
              <h2 className='text-base sm:text-lg font-semibold text-gray-800'>
                Security
              </h2>
              <div className='grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-800 font-medium text-sm sm:text-base'>
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-[18px] w-[18px] sm:h-5 sm:w-5 text-gray-500' />
                          <Input
                            type='password'
                            placeholder='••••••••'
                            {...field}
                            className='h-11 sm:h-12 pl-9 sm:pl-10 text-sm sm:text-base rounded-lg bg-gray-50 border-gray-200 focus:border-primary focus-visible:ring-1 focus-visible:ring-primary text-gray-800 placeholder:text-gray-500'
                          />
                        </div>
                      </FormControl>
                      <FormMessage className='text-red-600 font-medium text-xs sm:text-sm' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-800 font-medium text-sm sm:text-base'>
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-[18px] w-[18px] sm:h-5 sm:w-5 text-gray-500' />
                          <Input
                            type='password'
                            placeholder='••••••••'
                            {...field}
                            className='h-11 sm:h-12 pl-9 sm:pl-10 text-sm sm:text-base rounded-lg bg-gray-50 border-gray-200 focus:border-primary focus-visible:ring-1 focus-visible:ring-primary text-gray-800 placeholder:text-gray-500'
                          />
                        </div>
                      </FormControl>
                      <FormMessage className='text-red-600 font-medium text-xs sm:text-sm' />
                    </FormItem>
                  )}
                />
              </div>

              <div className='bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-100'>
                <h3 className='text-gray-800 font-semibold mb-2 text-sm'>
                  Password Requirements
                </h3>
                <ul className='space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600'>
                  <li className='flex items-center'>
                    <span className='text-primary mr-2'>✓</span>
                    <span>At least 8 characters long</span>
                  </li>
                  <li className='flex items-center'>
                    <span className='text-primary mr-2'>✓</span>
                    <span>Contains lowercase letters</span>
                  </li>
                  <li className='flex items-center'>
                    <span className='text-primary mr-2'>✓</span>
                    <span>Contains uppercase letters</span>
                  </li>
                  <li className='flex items-center'>
                    <span className='text-primary mr-2'>✓</span>
                    <span>Contains numbers</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Terms and Conditions */}
            <FormField
              control={form.control}
              name='terms'
              render={({ field }) => (
                <FormItem className='rounded-md py-4 px-3 sm:p-4 bg-gray-50 border border-gray-200'>
                  <div className='flex flex-row items-start space-x-3'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className='mt-0.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary'
                      />
                    </FormControl>
                    <div className='flex-1 space-y-1'>
                      <FormLabel className='text-xs sm:text-sm font-normal text-gray-700 inline-flex flex-wrap'>
                        I agree to the
                        <Link
                          href='#'
                          className='text-primary hover:underline font-medium mx-1'>
                          Terms of Service
                        </Link>
                        and
                        <Link
                          href='#'
                          className='text-primary hover:underline font-medium mx-1'>
                          Privacy Policy
                        </Link>
                      </FormLabel>
                      <FormMessage className='text-red-600 font-medium text-xs' />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <Button
              type='submit'
              disabled={isLoading}
              className='w-full h-10 xs:h-11 sm:h-12 text-sm sm:text-base font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg shadow-md hover:shadow-lg transition-all'>
              {isLoading ? (
                <>
                  <Loader2 className='w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin' />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </Form>

        <div className='mt-4 sm:mt-6 md:mt-8 pt-3 sm:pt-4 md:pt-6 border-t text-center'>
          <p className='text-sm text-gray-600'>
            Already have an account?{" "}
            <Link
              href='/login'
              className='font-medium text-primary hover:text-primary/90 hover:underline'>
              Sign in
            </Link>
          </p>
          <p className='text-xs text-gray-500 mt-4'>
            © {currentYear} e-Sarif. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
