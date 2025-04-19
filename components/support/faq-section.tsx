"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "How do I connect a new wallet to e-Sarif?",
    answer:
      "To connect a new wallet, navigate to the Account page and click on 'Connect New Account'. Follow the authentication process for your specific wallet provider. For mobile money services, you'll need to verify via SMS, while cryptocurrency wallets require signature verification.",
  },
  {
    question: "What are the fees for transferring between wallets?",
    answer:
      "e-Sarif charges a flat 1% transaction fee for all cross-wallet transfers. This fee is transparent and calculated based on the transaction amount. There are no hidden charges or additional fees beyond this.",
  },
  {
    question: "How do I complete the KYC verification process?",
    answer:
      "To complete KYC verification, go to your profile settings and select 'Verify Identity'. You'll need to provide basic information, upload a government ID (passport, national ID, driver's license, or birth certificate), complete facial recognition, and submit proof of residence.",
  },
  {
    question: "Is my data safe on e-Sarif?",
    answer:
      "Yes, e-Sarif prioritizes user security through robust authentication, encrypted transactions, and comprehensive KYC verification. We implement industry-standard security protocols to ensure your financial and personal data remains protected.",
  },
  {
    question: "What wallets are currently supported?",
    answer:
      "e-Sarif currently supports multiple mobile money services (Mpesa, EVC, T-Plus, JEEB, SAHAL, ZAAD) and cryptocurrency wallets (USDT TRC20, USDT BEP20, USDC BEP20). We're continuously working to add more wallet options.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can reach our customer support team through multiple channels, including our in-app WhatsApp live chat feature, email support, or by submitting a support ticket through the contact form on the Support page.",
  },
];

export function FAQSection() {
  return (
    <Card className='border border-gray-200 shadow-sm bg-white'>
      <CardHeader className='bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200'>
        <CardTitle className='text-gray-800 text-lg'>
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className='p-3 sm:p-4 md:p-6'>
        <Accordion type='single' collapsible className='w-full'>
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className='border-gray-200 mb-2'>
              <AccordionTrigger className='text-gray-800 hover:text-primary text-left py-3 text-sm sm:text-base font-medium px-3 sm:px-4 bg-gray-50 rounded-md hover:bg-gray-100'>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className='text-gray-600 text-sm sm:text-base mt-1 mb-3 px-3 sm:px-4 py-2 bg-gray-50/50 rounded-md'>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
