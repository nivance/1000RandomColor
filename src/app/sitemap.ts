import { config } from "@/lib/config";
import { navigation } from '@/lib/config';
import { localeNames } from "@/i18n/locale";

export const baseUrl = `${process.env.SITE_URL}`

export default async function sitemap() {

  const mainUrls = Object.keys(localeNames).flatMap((key: string) => {
    const mainUrl = key === 'en' ? `${config.baseUrl}` : `${config.baseUrl}/${key}`;
    return {
      url: mainUrl,
      changeFrequency: 'weekly',
      priority: 1
    };
  });

  const legalUrls = navigation.legal.map((item) => ({
    url: `${config.baseUrl}${item.href}`,
    changeFrequency: 'weekly',
    priority: 0.8
  }))

  return [...mainUrls, ...legalUrls]
}
