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

/**
 * 将HEX颜色字符串转换为XYZ格式
 * @param hex HEX颜色字符串（如 #dee05c）
 * @returns XYZ格式的字符串（如 xyz(0.4361, 0.4722, 0.0782)）
 */
export function hexToXyz(hex: string): string {
  // 去掉开头的#号（如果有）
  hex = hex.replace(/^#/, '');

  // 将HEX分解为R、G、B
  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;

  // 转换为线性RGB
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  // 转换为XYZ
  const x = (r * 0.4124564 + g * 0.3575761 + b * 0.1804375) * 100;
  const y = (r * 0.2126729 + g * 0.7151522 + b * 0.0721750) * 100;
  const z = (r * 0.0193339 + g * 0.1191920 + b * 0.9503041) * 100;

  // 保留小数点后2位
  return `xyz(${x.toFixed(2)}%, ${y.toFixed(2)}%, ${z.toFixed(2)}%)`;
}

/**
 * 将HEX颜色字符串转换为RGB百分比格式
 * @param hex HEX颜色字符串（如 #dee05c）
 * @returns RGB百分比格式的字符串（如 [87.06%, 87.84%, 36.08%]）
 */
export function hexToRgbPercentages(hex: string): string[] {
  // 去掉开头的#号（如果有）
  hex = hex.replace(/^#/, '');

  // 将HEX分解为R、G、B
  const r = (parseInt(hex.substring(0, 2), 16) / 255) * 100;
  const g = (parseInt(hex.substring(2, 4), 16) / 255) * 100;
  const b = (parseInt(hex.substring(4, 6), 16) / 255) * 100;
  return [`${r.toFixed(2)}%`, `${g.toFixed(2)}%`, `${b.toFixed(2)}%`];
}