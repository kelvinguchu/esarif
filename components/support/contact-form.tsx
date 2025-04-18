"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters." }),
  category: z.string().min(1, { message: "Please select a category." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      category: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      setIsSuccess(true);
      form.reset();

      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  }

  return (
    <Card className='border-0 shadow-none bg-transparent'>
      <CardHeader className='bg-[#ebeffb]/10 px-4 sm:px-6 py-3 sm:py-4'>
        <CardTitle className='text-white text-lg'>Contact Support</CardTitle>
      </CardHeader>
      <CardContent className='p-3 sm:p-4 md:p-6'>
        {isSuccess ? (
          <div className='bg-green-500/20 border border-green-500/30 text-green-400 rounded-md p-3 sm:p-4 mb-4 sm:mb-6 text-sm sm:text-base'>
            <CheckCircle className='h-5 w-5 mr-2 text-green-400' />
            Your message has been sent! Our team will get back to you soon.
          </div>
        ) : null}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-3 sm:space-y-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white text-sm sm:text-base mb-1'>
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Your name'
                        {...field}
                        className='bg-[#07335a] border-white/10 text-white text-sm sm:text-base h-9 sm:h-10'
                      />
                    </FormControl>
                    <FormMessage className='text-xs sm:text-sm' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white text-sm sm:text-base mb-1'>
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='your.email@example.com'
                        type='email'
                        {...field}
                        className='bg-[#07335a] border-white/10 text-white text-sm sm:text-base h-9 sm:h-10'
                      />
                    </FormControl>
                    <FormMessage className='text-xs sm:text-sm' />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
              <FormField
                control={form.control}
                name='subject'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white text-sm sm:text-base mb-1'>
                      Subject
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Brief subject of your inquiry'
                        {...field}
                        className='bg-[#07335a] border-white/10 text-white text-sm sm:text-base h-9 sm:h-10'
                      />
                    </FormControl>
                    <FormMessage className='text-xs sm:text-sm' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='category'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white text-sm sm:text-base mb-1'>
                      Category
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className='bg-[#07335a] border-white/10 text-white text-sm sm:text-base h-9 sm:h-10'>
                          <SelectValue placeholder='Select a category' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='bg-[#07335a] border-white/10 text-white'>
                        <SelectItem value='account'>Account Issues</SelectItem>
                        <SelectItem value='wallet'>
                          Wallet Connection
                        </SelectItem>
                        <SelectItem value='transaction'>
                          Transaction Problems
                        </SelectItem>
                        <SelectItem value='swap'>Currency Swap</SelectItem>
                        <SelectItem value='kyc'>KYC Verification</SelectItem>
                        <SelectItem value='other'>Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className='text-xs sm:text-sm' />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white text-sm sm:text-base mb-1'>
                    Message
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Describe your issue or question in detail...'
                      className='min-h-[100px] sm:min-h-[150px] bg-[#07335a] border-white/10 text-white text-sm sm:text-base'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-xs sm:text-sm' />
                </FormItem>
              )}
            />

            <div className='pt-2'>
              <Button
                type='submit'
                className='bg-primary hover:bg-primary/90 w-full sm:w-auto text-sm sm:text-base h-9 sm:h-10'
                disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
