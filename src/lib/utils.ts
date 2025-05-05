import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import chroma from 'chroma-js';

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
  const rgbValue = hexToRgbVaule(hex);
  return `rgb(${rgbValue.r},${rgbValue.g},${rgbValue.b})`;
}

function hexToRgbVaule(hex: string) {
  const cleanHex = hex.replace(/^#/, '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return { r, g, b };
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

export function hexToHsl(hex: string): string[] {
  // 去掉开头的#号（如果有）
  hex = hex.replace(/^#/, '');
  const [h, s, l] = chroma(hex).hsl();
  return [`${h.toFixed(2)}`, `${(s * 100).toFixed(2)}%`, `${(l * 100).toFixed(2)}%`];
}

function rgbToHex(r: number, g: number, b: number) {
  const componentToHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  };
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function generateShades(hex: string, numberOfShades: number) {
  const { r, g, b } = hexToRgbVaule(hex);
  const shades = Array.from({ length: numberOfShades }, (_, i) => {
    const shadeFactor = i / numberOfShades;
    const newR = Math.max(0, Math.floor(r * (1 - shadeFactor)));
    const newG = Math.max(0, Math.floor(g * (1 - shadeFactor)));
    const newB = Math.max(0, Math.floor(b * (1 - shadeFactor)));
    return rgbToHex(newR, newG, newB);
  });

  return shades;
}

export function generateTints(hex: string, numberOfTints: number) {
  const { r, g, b } = hexToRgbVaule(hex);
  const tints = [];

  for (let i = 0; i < numberOfTints; i++) {
    const tintFactor = i / numberOfTints;
    const newR = Math.min(255, Math.floor(r + (255 - r) * tintFactor));
    const newG = Math.min(255, Math.floor(g + (255 - g) * tintFactor));
    const newB = Math.min(255, Math.floor(b + (255 - b) * tintFactor));
    tints.push(rgbToHex(newR, newG, newB));
  }

  return tints;
}

/**
 * 计算互补色
 */ 
export function getComplementaryColor(hex: string) {
  // 移除 "#" 符号（如果存在）
  hex = hex.replace("#", "");

  // 确保颜色代码是 6 位
  if (hex.length !== 6) {
    throw new Error("Invalid hex color code. Must be a 6-digit value.");
  }

  // 将十六进制颜色代码转换为 RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // 计算互补色
  const complementaryR = 255 - r;
  const complementaryG = 255 - g;
  const complementaryB = 255 - b;

  // 将互补色转换为十六进制
  const complementaryHex =
    "#" +
    complementaryR.toString(16).padStart(2, "0") +
    complementaryG.toString(16).padStart(2, "0") +
    complementaryB.toString(16).padStart(2, "0");

  return complementaryHex;
}

export function getTriadicColors(hexColor: string) {
  // 移除 "#" 符号（如果存在）
  hexColor = hexColor = hexColor.replace("#", "");

  // 确保颜色代码是 6 位
  if (hexColor.length !== 6) {
    throw new Error("Invalid hex color code. Must be a 6-digit value.");
  }

  // 将十六进制颜色代码转换为 RGB
  const r = parseInt(hexColor.substring(0, 2), 16) / 255;
  const g = parseInt(hexColor.substring(2, 4), 16) / 255;
  const b = parseInt(hexColor.substring(4, 6), 16) / 255;

  // 将 RGB 转换为 HSL
  const [h, s, l] = chroma(hexColor).hsl();

  // 计算三元组色相
  const h1 = (h + 120) % 360;
  const h2 = (h + 240) % 360;

  // 将 HSL 转换为十六进制颜色代码
  const hex1 = hslToHex(h1, s, l);
  const hex2 = hslToHex(h2, s, l);

  return [hex1, "#"+hexColor, hex2];
}

function hslToHex(h: number, s: number, l: number): string {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h / 360 + 1 / 3);
    g = hue2rgb(p, q, h / 360);
    b = hue2rgb(p, q, h / 360 - 1 / 3);
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return "#" + toHex(r) + toHex(g) + toHex(b);
}

export function getTetradicColors(hexColor: string, type = "rectangle") {
  // 移除 "#" 符号（如果存在）
  hexColor = hexColor.replace("#", "");

  // 确保颜色代码是 6 位
  if (hexColor.length !== 6) {
    throw new Error("Invalid hex color code. Must be a 6-digit value.");
  }

  // 将 RGB 转换为 HSL
  const [h, s, l] = chroma(hexColor).hsl();

  let h1, h2, h3;

  // 计算四元组色相
  if (type === "square") {
    h1 = (h + 90) % 360;
    h2 = (h + 180) % 360;
    h3 = (h + 270) % 360;
  } else {
    // 矩形方案
    h1 = (h + 30) % 360; // 原始颜色的邻近色
    h2 = (h + 180) % 360; // 互补色
    h3 = (h2 + 30) % 360; // 互补色的邻近色
  }

  // 将 HSL 转换为十六进制颜色代码
  const hex1 = hslToHex(h1, s, l);
  const hex2 = hslToHex(h2, s, l);
  const hex3 = hslToHex(h3, s, l);

  return ["#" + hexColor, hex1, hex2, hex3];
}


export function getMonochromaticColors(hexColor: string, count = 5) {
  // 移除 "#" 符号（如果存在）
  hexColor = hexColor.replace("#", "");

  // 确保颜色代码是 6 位
  if (hexColor.length !== 6) {
    throw new Error("Invalid hex color code. Must be a 6-digit value.");
  }

  // 将 RGB 转换为 HSL
  const [h, s, l] = chroma(hexColor).hsl();

  const colors = [];
  for (let i = 0; i < count; i++) {
    // 调整亮度和饱和度
    const saturation = Math.max(0, Math.min(1, s + (i - Math.floor(count / 2)) * 0.1));
    const lightness = Math.max(0, Math.min(1, l + (i - Math.floor(count / 2)) * 0.1));

    // 将 HSL 转换为十六进制颜色代码
    const hex = hslToHex(h, saturation, lightness);
    colors.push(hex);
  }

  return colors;
}