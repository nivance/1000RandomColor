import SpecificColor from '@/components/specific-color';
import { config } from "@/lib/config";
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const runtime = "edge";

export async function generateMetadata({ params }: { params: { slug: string, locale: string }}): Promise<Metadata> {
  const canonicalUrl = `${config.baseUrl}/${params.locale !== "en" ? params.locale + "/" : ""}${params.slug}`;
  const t = await getTranslations('metadata');
  const title = t("sepc_title", {"hex_code": params.slug, "host_name": config.baseUrl});
  const description = t("sepc_desc", {"hex_code": params.slug});
  const keywords = t("sepc_keywords", {"hex_code": params.slug});
  return {
    title: title,
    description: description,
    keywords: keywords,
    icons: [
      {
        rel: 'icon',
        url: '/favicon.ico',
      },
    ],
    alternates: {
      canonical: canonicalUrl,
    }
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const color = params.slug;

  return (
    <>
      <h1 className="text-2xl font-bold text-white text-center mb-4">100 Random {color} Colors</h1>
      <SpecificColor color={color} />
    </>
  );
}
