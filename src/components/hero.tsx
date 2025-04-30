"use client";
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');
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
      </div>
    </section>
  );
}
