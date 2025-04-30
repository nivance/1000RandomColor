"use client";
import { useTranslations } from 'next-intl';
import { config } from '@/lib/config';

export default function HowToUse() {
  const t = useTranslations('howToUse');
  const h2_what_p5 = t('h2_what_p5', { "host": config.baseUrl });
  return (
    <section className="relative">
      <div className="mx-auto w-[80%] py-8 px-5">
        <h2 className="font-mono text-4xl font-bold text-center mb-12">
          {t('h2_what')}
        </h2>
        <p className="font-mono text-lg text-gray-700 dark:text-gray-300 mb-4">
          {t('h2_what_p1')}
        </p>
        <p className="font-mono text-lg text-gray-700 dark:text-gray-300 mb-4">
          {t('h2_what_p2')}
        </p>
        <p className="font-mono text-lg text-gray-700 dark:text-gray-300 mb-4">
          {t('h2_what_p3')}
        </p>
        <p className="font-mono text-lg text-gray-700 dark:text-gray-300 mb-4">
          {t('h2_what_p4')}
        </p>
        <p className="font-mono text-lg text-gray-700 dark:text-gray-300 mb-4">
          {h2_what_p5}
        </p>
      </div>
    </section>
  );
}
