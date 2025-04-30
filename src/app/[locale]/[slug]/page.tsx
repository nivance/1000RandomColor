"use client";
import { useEffect, useState } from 'react';
import randomColor from 'randomcolor';
import ColorCard from '@/components/color-card';
import Hero from "@/components/hero";
import FAQs from "@/components/faqs";
import { config } from "@/lib/config";
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const runtime = "edge";

// export async function generateMetadata({ params }: { params: { slug: string, locale: string }}): Promise<Metadata> {
//   const game = getGameByName(params.slug);
//   const canonicalUrl = `${config.baseUrl}/${params.locale !== "en" ? params.locale + "/" : ""}${params.slug}`;
//   const t = await getTranslations('metadata');
//   const title = t("sepc_title", {"game_name": game?.title || ""});
//   return {
//     title: title,
//     description: t("description"),
//     keywords: t("keywords"),
//     icons: [
//       {
//         rel: 'icon',
//         url: '/favicon.ico',
//       },
//     ],
//     alternates: {
//       canonical: canonicalUrl,
//     }
//   };
// }

export default function Page({ params }: { params: { slug: string } }) {
  const color = params.slug;
  const [randomColors, setRandomColors] = useState<string[]>([]);

  useEffect(() => {
    setRandomColors(randomColor({ count: 100, hue: color }));
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold text-white text-center mb-4">100 Random {color} Colors</h1>
      <ColorCard randomColors={randomColors} />
    </>
  );
}
