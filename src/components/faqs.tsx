import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from 'next-intl';

export default function FAQs({faqInfo, faqs, faqKeys} : {faqInfo: string, faqs: string, faqKeys: string[]}) {
  const t = useTranslations(faqInfo);
  const faqItem = useTranslations(faqs)
  return (
    <section className="relative py-8">
      <div className="mx-auto px-6 lg:px-8 relative grid gap-12">
        <div className="flex flex-col gap-6 w-full">
          <h2 className="font-mono text-3xl lg:text-4xl font-bold tracking-tighter text-center">{t('title')}</h2>
          <p className="font-mono text-base tracking-tight text-gray-500">{t('desc')}</p>
          <Accordion type="single" collapsible className="w-full text-left">
            {faqKeys.map((key) => (
                <Accordion key={key} type="single" collapsible className="w-full text-left">
                  <AccordionItem value="item-1" className="border-neutral-300">
                    <AccordionTrigger value="" className="font-mono text-left">{faqItem(`${key}.q`)}</AccordionTrigger>
                    <AccordionContent value="" className="font-mono text-gray-600 dark:text-gray-400">{faqItem(`${key}.a`)}</AccordionContent>
                  </AccordionItem>
                </Accordion>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}