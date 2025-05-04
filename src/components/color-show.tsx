"use client";
import { hexToRgb, hexToXyz } from '@/lib/utils';
import chroma from 'chroma-js';
import React, { useState } from 'react'

export default function ColorShow({ color }: { color: string }) {
    const rgb = hexToRgb(color);
    const chromaColor = chroma("#" + color);

    const formatHsv = (hsv: number[]): string => {
        const [h, s, v] = hsv;
        return `hsv(${Math.round(h)}, ${(s * 100).toFixed(0)}%, ${(v * 100).toFixed(0)}%)`;
    };

    const formatHsl = (hsl: number[]): string => {
        const [h, s, l] = hsl;
        return `hsl(${Math.round(h)}, ${(s * 100).toFixed(0)}%, ${(l * 100).toFixed(0)}%)`;
    };

    const hexToRgbPercentages = (hex: string): string => {
        // 将 HEX 转换为 RGB
        const rgb = chroma(hex).rgb(); // 返回 [R, G, B]

        // 转换为百分比并格式化
        const percentages = rgb.map((value) => Math.round((value / 255) * 100));
        return `rgb(${percentages.join('%, ')}%)`;
    };

    const rgbPercentages = hexToRgbPercentages(color);
    const hsl = formatHsl(chromaColor.hsl());
    const hsv = formatHsv(chromaColor.hsv());
    const lab = chromaColor.lab().map((v) => Math.round(v)).join(', ');
    const lch = chromaColor.lch().map((v) => Math.round(v)).join(', ');
    const hcl = chromaColor.hcl().map((v) => Math.round(v)).join(', ');
    const xyz = hexToXyz(color);

    const [copied, setCopied] = useState<boolean>(false)

    const copyToClipboard = (text: string) => {
        const textArea = document.createElement('textarea')
        textArea.value = text
        document.body.appendChild(textArea)
        textArea.select()
        try {
            document.execCommand('copy')
            setCopied(true)
            setTimeout(() => {
                setCopied(false)
            }, 2000)
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
        document.body.removeChild(textArea)
    }

    return (
        <div className="flex flex-col lg:flex-row lg:items-stretch items-center justify-center text-white mt-4">
            {/* 左侧颜色展示块 */}
            <div
                className="w-80 h-60 border-4 rounded-md mb-6 lg:mb-0 lg:mr-8 flex-shrink-0"
                style={{ backgroundColor: `#${color}` }}
            />

            {/* 右侧信息块 */}
            <div className="bg-gray-100 text-gray-800 border-2 rounded-md shadow-md lg:w-full p-4 flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-12 h-full">
                    {/* Hex */}
                    <div className="flex items-center justify-between cursor-pointer"
                        title="Click to copy hex code"
                        onClick={() => copyToClipboard(`#${color}`)}>
                        <span className="font-bold">Hex</span>
                        <span className="font-mono flex items-center">#{color}</span>
                    </div>

                    {/* RGB */}
                    <div className="flex items-center justify-between cursor-pointer"
                        title="Click to copy RGB code"
                        onClick={() => copyToClipboard(rgb)}>
                        <span className="font-bold">RGB</span>
                        <span className="font-mono flex items-center">{rgb}</span>
                    </div>

                    {/* RGB Percentages */}
                    <div className="flex items-center justify-between cursor-pointer"
                        title="Click to copy RGB Percentages"
                        onClick={() => copyToClipboard(rgbPercentages)}>
                        <span className="font-bold">RGB%</span>
                        <span className="font-mono flex items-center">{rgbPercentages}</span>
                    </div>

                    {/* HSL */}
                    <div className="flex items-center justify-between cursor-pointer"
                        title="Click to copy HSL"
                        onClick={() => copyToClipboard(hsl)}>
                        <span className="font-bold">HSL</span>
                        <span className="font-mono flex items-center">{hsl}</span>
                    </div>

                    {/* HSV */}
                    <div className="flex items-center justify-between cursor-pointer"
                        title="Click to copy HSV"
                        onClick={() => copyToClipboard(hsv)}>
                        <span className="font-bold">HSV</span>
                        <span className="font-mono flex items-center">{hsv}</span>
                    </div>

                    {/* LAB */}
                    <div className="flex items-center justify-between cursor-pointer"
                        title="Click to copy LAB"
                        onClick={() => copyToClipboard(lab)}>
                        <span className="font-bold">LAB</span>
                        <span className="font-mono flex items-center">{lab}</span>
                    </div>

                    {/* LCH */}
                    <div className="flex items-center justify-between cursor-pointer"
                        title="Click to copy LCH"
                        onClick={() => copyToClipboard(lch)}>
                        <span className="font-bold">LCH</span>
                        <span className="font-mono flex items-center">{lch}</span>
                    </div>

                    {/* HCL */}
                    <div className="flex items-center justify-between cursor-pointer"
                        title="Click to copy HCL"
                        onClick={() => copyToClipboard(hcl)}>
                        <span className="font-bold">HCL</span>
                        <span className="font-mono flex items-center">{hcl}</span>
                    </div>

                    {/* XYZ */}
                    <div className="flex items-center justify-between cursor-pointer"
                        title="Click to copy XYZ"
                        onClick={() => copyToClipboard(xyz)}>
                        <span className="font-bold">XYZ</span>
                        <span className="font-mono flex items-center">{xyz}</span>
                    </div>

                    {copied && (<div className="flex items-center justify-center">
                        <span className="font-mono font-bold text-green-500 rounded">
                            Copied!
                        </span>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
}