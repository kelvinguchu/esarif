"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const currentYear = new Date().getFullYear();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log(data);
      toast.success("Login successful");
      setIsLoading(false);
      router.push("/account");
    }, 1500);
  }

  return (
    <div className='flex items-center justify-center min-h-screen py-4 px-3 sm:py-6 sm:px-6 bg-background'>
      <div className='relative flex flex-col md:flex-row w-full max-w-5xl overflow-hidden rounded-xl shadow-2xl bg-secondary'>
        {/* Left side - Image/Brand - Hidden on mobile, visible from md breakpoint */}
        <div className='relative hidden md:block md:w-1/2 overflow-hidden'>
          <div className='absolute inset-0 bg-primary/20 backdrop-blur-sm z-10'></div>
          <div className='absolute inset-0 flex flex-col items-center justify-center z-20 bg-background/80 p-6 lg:p-10'>
            <div className='px-5 py-3 rounded-full bg-primary/90 flex items-center justify-center mb-6 lg:mb-8 shadow-lg'>
              <span className='text-2xl lg:text-3xl font-bold text-white tracking-tight'>
                e-Sarif
              </span>
            </div>
            <h2 className='text-2xl lg:text-3xl font-bold text-white mb-3 lg:mb-4'>
              Welcome Back
            </h2>
            <p className='text-center text-white/80 mb-6 lg:mb-8 max-w-sm'>
              Access your wallets and manage your finances securely in one
              place.
            </p>
            <div className='grid grid-cols-3 gap-3 lg:gap-4 w-full max-w-xs'>
              <div className='rounded-lg bg-white/10 p-2 backdrop-blur-md border border-white/10 flex items-center justify-center transition-colors hover:bg-white/15'>
                <span className='text-xs text-white font-medium'>Mpesa</span>
              </div>
              <div className='rounded-lg bg-white/10 p-2 backdrop-blur-md border border-white/10 flex items-center justify-center transition-colors hover:bg-white/15'>
                <span className='text-xs text-white font-medium'>EVC</span>
              </div>
              <div className='rounded-lg bg-white/10 p-2 backdrop-blur-md border border-white/10 flex items-center justify-center transition-colors hover:bg-white/15'>
                <span className='text-xs text-white font-medium'>ZAAD</span>
              </div>
              <div className='rounded-lg bg-white/10 p-2 backdrop-blur-md border border-white/10 flex items-center justify-center transition-colors hover:bg-white/15'>
                <span className='text-xs text-white font-medium'>USDT</span>
              </div>
              <div className='rounded-lg bg-white/10 p-2 backdrop-blur-md border border-white/10 flex items-center justify-center transition-colors hover:bg-white/15'>
                <span className='text-xs text-white font-medium'>JEEB</span>
              </div>
              <div className='rounded-lg bg-white/10 p-2 backdrop-blur-md border border-white/10 flex items-center justify-center transition-colors hover:bg-white/15'>
                <span className='text-xs text-white font-medium'>T-Plus</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Brand - Only visible on smaller screens */}
        <div className='md:hidden text-center w-full py-6 bg-gray-50 border-b border-gray-200'>
          <div className='flex justify-center mb-2'>
            <div className='inline-flex px-4 py-2 items-center justify-center rounded-full bg-primary shadow-md'>
              <span className='text-lg font-bold text-white'>e-Sarif</span>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className='w-full md:w-1/2 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col bg-white'>
          <div className='space-y-2 text-center mb-6 md:mb-8'>
            <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-800'>
              Sign In
            </h1>
            <CardDescription className='text-sm text-gray-600 px-1'>
              Enter your credentials to access your account
            </CardDescription>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-5 md:space-y-6'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-800 font-medium text-sm sm:text-base'>
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Mail className='absolute left-3 top-1/2 -translate-y-1/2 h-[18px] w-[18px] sm:h-5 sm:w-5 text-gray-500' />
                        <Input
                          placeholder='name@example.com'
                          {...field}
                          className='h-11 sm:h-12 pl-9 sm:pl-10 text-sm sm:text-base rounded-lg bg-gray-100 border-gray-300 focus:border-primary focus-visible:ring-1 focus-visible:ring-primary text-gray-800 placeholder:text-gray-500'
                        />
                      </div>
                    </FormControl>
                    <FormMessage className='text-red-600 font-medium text-xs sm:text-sm' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex justify-between items-center flex-wrap gap-1'>
                      <FormLabel className='text-gray-800 font-medium text-sm sm:text-base'>
                        Password
                      </FormLabel>
                      <Link
                        href='#'
                        className='text-xs sm:text-sm text-primary hover:text-primary/90 font-medium hover:underline'>
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <div className='relative'>
                        <Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-[18px] w-[18px] sm:h-5 sm:w-5 text-gray-500' />
                        <Input
                          type='password'
                          placeholder='••••••••'
                          {...field}
                          className='h-11 sm:h-12 pl-9 sm:pl-10 text-sm sm:text-base rounded-lg bg-gray-100 border-gray-300 focus:border-primary focus-visible:ring-1 focus-visible:ring-primary text-gray-800 placeholder:text-gray-500'
                        />
                      </div>
                    </FormControl>
                    <FormMessage className='text-red-600 font-medium text-xs sm:text-sm' />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                disabled={isLoading}
                className='w-full h-11 sm:h-12 text-sm sm:text-base font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg transition-all shadow-md hover:shadow-lg mt-2'>
                {isLoading ? (
                  <>
                    <Loader2 className='w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin' />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className='w-4 h-4 ml-2' />
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className='mt-auto pt-6 md:pt-10 text-center'>
            <p className='text-sm text-gray-600'>
              Don't have an account?{" "}
              <Link
                href='/register'
                className='font-medium text-primary hover:text-primary/90 hover:underline'>
                Sign up now
              </Link>
            </p>
            <p className='text-xs text-gray-500 mt-4'>
              © {currentYear} e-Sarif. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
