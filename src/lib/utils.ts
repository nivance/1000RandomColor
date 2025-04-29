import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * 从URL中移除协议部分（如 https:// 或 http://）
 * @param url 输入的完整URL
 * @returns 移除协议后的URL
 */
export function removeProtocolFromUrl(url: string): string {
  return url.replace(/^https?:\/\//, '');
}

/**
 * 将HEX颜色字符串转换为RGB格式
 * @param hex HEX颜色字符串（如 #dee05c）
 * @returns RGB格式的字符串（如 rgb(222, 224, 92)）
 */
export function hexToRgb(hex: string): string {
  // 去掉开头的#号（如果有）
  hex = hex.replace(/^#/, '');

  // 将HEX分解为R、G、B
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgb(${r},${g},${b})`;
}