import SpecificColor from '@/components/specific-color';
import { config } from "@/lib/config";
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowLeft, ChevronRight } from 'lucide-react';

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
    <div className="mx-auto w-[90%] lg:w-[80%]">
      <nav className="flex items-center text-lg font-mono text-gray-500 mt-8 border-b border-gray-200 pb-1">
        <Link href="/" className="hover:text-blue-500">Home</Link>
        <ChevronRight className="" size={16} />
        <Link href={color} className="hover:text-blue-500">#{color}</Link>
      </nav>
      <h1 className="text-2xl font-bold text-white text-center mb-4">100 Random {color} Colors</h1>
      <SpecificColor color={color} />
    </div>
  );
}
