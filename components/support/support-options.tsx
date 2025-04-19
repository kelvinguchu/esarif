"use client";

import { Button } from "@/components/ui/button";
import { SupportCard } from "./support-card";
import { FaWhatsapp } from "react-icons/fa";
import { Mail, Clock, Phone, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SupportOptions() {
  return (
    <Card className='border border-gray-200 shadow-sm bg-white'>
      <CardHeader className='bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200'>
        <CardTitle className='text-gray-800 text-lg'>Support Options</CardTitle>
      </CardHeader>
      <CardContent className='p-3 sm:p-4 md:p-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6'>
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transform transition-transform hover:translate-y-[-2px]'>
            <div className='h-1 bg-[#25D366] w-full'></div>
            <div className='p-3 sm:p-5'>
              <div className='flex items-center mb-2 sm:mb-3'>
                <div className='h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] mr-2 sm:mr-3'>
                  <FaWhatsapp className='h-5 w-5 sm:h-6 sm:w-6' />
                </div>
                <h3 className='text-gray-800 font-medium text-base sm:text-lg'>
                  WhatsApp Support
                </h3>
              </div>
              <p className='text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4'>
                Get instant help via WhatsApp with our support team available
                daily
              </p>
              <Button
                className='w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white text-xs sm:text-sm h-8 sm:h-10'
                onClick={() =>
                  window.open("https://wa.me/1234567890", "_blank")
                }>
                <FaWhatsapp className='mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4' />
                Chat on WhatsApp
              </Button>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transform transition-transform hover:translate-y-[-2px]'>
            <div className='h-1 bg-blue-500 w-full'></div>
            <div className='p-3 sm:p-5'>
              <div className='flex items-center mb-2 sm:mb-3'>
                <div className='h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mr-2 sm:mr-3'>
                  <Mail className='h-4 w-4 sm:h-5 sm:w-5' />
                </div>
                <h3 className='text-gray-800 font-medium text-base sm:text-lg'>
                  Email Support
                </h3>
              </div>
              <p className='text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4'>
                Send us a detailed email and we'll get back to you within 24
                hours
              </p>
              <Button
                className='w-full bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm h-8 sm:h-10'
                onClick={() =>
                  (window.location.href = "mailto:support@esarif.com")
                }>
                <Mail className='mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4' />
                Email Support
              </Button>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transform transition-transform hover:translate-y-[-2px]'>
            <div className='h-1 bg-purple-500 w-full'></div>
            <div className='p-3 sm:p-5'>
              <div className='flex items-center mb-2 sm:mb-3'>
                <div className='h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 mr-2 sm:mr-3'>
                  <MessageSquare className='h-4 w-4 sm:h-5 sm:w-5' />
                </div>
                <h3 className='text-gray-800 font-medium text-base sm:text-lg'>
                  Live Chat
                </h3>
              </div>
              <p className='text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4'>
                Chat directly with our support team for immediate assistance
              </p>
              <Button className='w-full bg-purple-500 hover:bg-purple-600 text-white text-xs sm:text-sm h-8 sm:h-10'>
                <MessageSquare className='mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4' />
                Start Live Chat
              </Button>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transform transition-transform hover:translate-y-[-2px]'>
            <div className='h-1 bg-green-500 w-full'></div>
            <div className='p-3 sm:p-5'>
              <div className='flex items-center mb-2 sm:mb-3'>
                <div className='h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mr-2 sm:mr-3'>
                  <Phone className='h-4 w-4 sm:h-5 sm:w-5' />
                </div>
                <h3 className='text-gray-800 font-medium text-base sm:text-lg'>
                  Phone Support
                </h3>
              </div>
              <p className='text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4'>
                Available 24/7 for urgent matters requiring immediate assistance
              </p>
              <Button
                className='w-full bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm h-8 sm:h-10'
                onClick={() => (window.location.href = "tel:+1234567890")}>
                <Phone className='mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4' />
                Call Support
              </Button>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
          <div className='h-1 bg-amber-500 w-full'></div>
          <div className='p-3 sm:p-5'>
            <div className='flex items-center mb-2 sm:mb-3'>
              <div className='h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 mr-2 sm:mr-3'>
                <Clock className='h-4 w-4 sm:h-5 sm:w-5' />
              </div>
              <h3 className='text-gray-800 font-medium text-base sm:text-lg'>
                Support Hours
              </h3>
            </div>
            <p className='text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4'>
              When you can reach our support team across different channels
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 bg-gray-50 rounded-md p-3 sm:p-4'>
              <div>
                <h4 className='font-medium text-gray-800 text-sm sm:text-base mb-2'>
                  Live Chat & WhatsApp
                </h4>
                <p className='text-gray-600 text-xs sm:text-sm'>
                  Monday - Friday: 8:00 AM - 8:00 PM EAT
                </p>
                <p className='text-gray-600 text-xs sm:text-sm'>
                  Saturday: 9:00 AM - 5:00 PM EAT
                </p>
                <p className='text-gray-600 text-xs sm:text-sm'>
                  Sunday: 12:00 PM - 4:00 PM EAT
                </p>
              </div>
              <div className='mt-3 sm:mt-0'>
                <h4 className='font-medium text-gray-800 text-sm sm:text-base mb-2'>
                  Email Support
                </h4>
                <p className='text-gray-600 text-xs sm:text-sm'>
                  24/7 - Response within 24 hours
                </p>
                <h4 className='font-medium text-gray-800 text-sm sm:text-base mt-3 sm:mt-4 mb-2'>
                  Phone Support
                </h4>
                <p className='text-gray-600 text-xs sm:text-sm'>
                  24/7 for urgent matters only
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
