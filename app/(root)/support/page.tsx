import { Metadata } from "next";
import { ContactForm } from "@/components/support/contact-form";
import { FAQSection } from "@/components/support/faq-section";
import { SupportOptions } from "@/components/support/support-options";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "e-Sarif | Support",
  description:
    "Get help and support for your e-Sarif account and wallet connections",
};

export default function SupportPage() {
  return (
    <div className='w-full flex flex-col py-2 px-2 sm:px-3 md:px-4 md:py-8'>
      <div className='w-full flex flex-col mb-4 sm:mb-6 md:mb-8'>
        <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1 sm:mb-2'>
          Support Center
        </h1>
      </div>

      <Tabs defaultValue='contact' className='w-full flex flex-col'>
        <TabsList className='bg-gray-50 border border-gray-200 mb-4 sm:mb-6 p-0.5 md:p-1 w-full max-w-md overflow-x-auto scrollbar-hide flex-nowrap'>
          <TabsTrigger
            value='contact'
            className='flex-1 text-gray-700 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-gray-500 min-w-[80px]'>
            Contact Us
          </TabsTrigger>
          <TabsTrigger
            value='support'
            className='flex-1 text-gray-700 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-gray-500 min-w-[80px]'>
            Support Options
          </TabsTrigger>
          <TabsTrigger
            value='faq'
            className='flex-1 text-gray-700 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-gray-500 min-w-[80px]'>
            FAQ
          </TabsTrigger>
        </TabsList>

        <TabsContent value='contact' className='w-full mt-0'>
          <ContactForm />
        </TabsContent>

        <TabsContent value='support' className='w-full mt-0'>
          <SupportOptions />
        </TabsContent>

        <TabsContent value='faq' className='w-full mt-0'>
          <FAQSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
