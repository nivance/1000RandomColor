import { Pathnames } from "next-intl/routing";

export const locales = [
  "en",
  "en-US",
  "en-UK",
  // "zh",
  // "zh-CN",
  // "zh-HK",
  // "zh-TW",
  // "id",
  // "pt-br",
  // "es",
  // "uk",
  // "ja",
  // "ko",
  // "ru",
  // "fr",
  // "de",
  // "ar",
  // "fl",
  "it",
];
export const localeNames: any = {
  "en": "English",
  // "zh": "中文",
  // "pt-br": "Português(Brasil)", // 葡萄牙语
  // "es": "Español",    // 西班牙语
  // "uk": "Українська", // 乌克兰语
  // "ja": "日本語",
  // "ko": "한국어",
  // "ru": "Русский",
  // "fr": "Français",
  // "de": "Deutsch",
  // "ar": "اَلْعَرَبِيَّةُ",
  // "fl": "Filipino",
  // "it": "Italiano", // 意大利语
};

export const defaultLocale = "en";

export const localePrefix = "as-needed";

export const localeDetection = false;

export const pathnames = {
  "/": "/",
} satisfies Pathnames<typeof locales>;
