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
      router.push("/swap");
    }, 1500);
  }

  return (
    <div className='flex items-center justify-center min-h-screen py-2 px-2 sm:py-6 sm:px-6 bg-gray-50'>
      <div className='relative w-full max-w-md min-h-[90vh] overflow-hidden rounded-xl shadow-lg bg-white flex flex-col'>
        {/* Brand Header */}
        <div className='text-center w-full py-6 sm:py-5 bg-white border-b border-gray-200 flex-shrink-0'>
          <div className='inline-flex px-5 py-2 items-center justify-center rounded-full bg-primary shadow-md'>
            <span className='text-base sm:text-lg font-bold text-white'>
              e-Sarif
            </span>
          </div>
        </div>

        {/* Form Container with Centering */}
        <div className='flex-grow flex flex-col justify-center'>
          <div className='w-full px-5 sm:px-6 py-4 flex flex-col'>
            <div className='text-center mb-6 sm:mb-5'>
              <h1 className='text-xl sm:text-2xl font-bold text-gray-800 mb-1'>
                Sign In
              </h1>
              <CardDescription className='text-xs sm:text-sm text-gray-600'>
                Enter your credentials to access your account
              </CardDescription>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='mb-2'>
                      <FormLabel className='text-gray-800 font-medium text-xs sm:text-sm'>
                        Email
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Mail className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-[18px] sm:w-[18px] text-gray-500' />
                          <Input
                            placeholder='name@example.com'
                            {...field}
                            className='h-10 sm:h-11 pl-8 sm:pl-9 text-xs sm:text-sm rounded-lg bg-gray-50 border-gray-200 focus:border-primary focus-visible:ring-1 focus-visible:ring-primary text-gray-800 placeholder:text-gray-500'
                          />
                        </div>
                      </FormControl>
                      <FormMessage className='text-red-600 font-medium text-xs' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem className='mb-3'>
                      <div className='flex justify-between items-center flex-wrap gap-1'>
                        <FormLabel className='text-gray-800 font-medium text-xs sm:text-sm'>
                          Password
                        </FormLabel>
                        <Link
                          href='#'
                          className='text-[10px] sm:text-xs text-primary hover:text-primary/90 font-medium hover:underline'>
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <div className='relative'>
                          <Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-[18px] sm:w-[18px] text-gray-500' />
                          <Input
                            type='password'
                            placeholder='••••••••'
                            {...field}
                            className='h-10 sm:h-11 pl-8 sm:pl-9 text-xs sm:text-sm rounded-lg bg-gray-50 border-gray-200 focus:border-primary focus-visible:ring-1 focus-visible:ring-primary text-gray-800 placeholder:text-gray-500'
                          />
                        </div>
                      </FormControl>
                      <FormMessage className='text-red-600 font-medium text-xs' />
                    </FormItem>
                  )}
                />
                <Button
                  type='submit'
                  disabled={isLoading}
                  className='w-full h-10 sm:h-11 text-xs sm:text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg transition-all shadow-md hover:shadow-lg mt-2'>
                  {isLoading ? (
                    <>
                      <Loader2 className='w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 animate-spin' />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight className='w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2' />
                    </>
                  )}
                </Button>
              </form>
            </Form>

            <div className='mt-5 text-center'>
              <p className='text-xs sm:text-sm text-gray-600'>
                Don't have an account?{" "}
                <Link
                  href='/register'
                  className='font-medium text-primary hover:text-primary/90 hover:underline'>
                  Sign up now
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Footer - Always visible */}
        <div className='flex-shrink-0 py-4 text-center border-t border-gray-200 bg-white'>
          <p className='text-[10px] sm:text-xs text-gray-500'>
            © {currentYear} e-Sarif. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
