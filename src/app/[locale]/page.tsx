import RandomColor from '@/components/random-color';
import Hero from '@/components/hero';
import HowToUse from '@/components/how-to-use';
import FAQs from '@/components/faqs';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { config } from '@/lib/config';

export const runtime = "edge";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const parameters = await params;
  const locale = await parameters.locale;
  const t = await getTranslations('metadata');
  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    icons: [
      {
        rel: 'icon',
        url: '/favicon.ico',
      },
    ],
    alternates: {
      canonical: `${config.baseUrl}/${locale !== "en" ? locale : ""}`,
    }
  };
}

export default function Home() {
  return (
    <>
      <main>
        <div className="mx-auto w-[90%] lg:w-[80%]">
          <RandomColor />
          <Hero />
          <HowToUse />
          <FAQs faqInfo='faqInfo' faqs='faqs' faqKeys={['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12', 'q13', 'q14', 'q15', 'q16', 'q17', 'q18', 'q19', 'q20']} />
        </div>
      </main>
    </>
  );
}
