"use client";
import { hexToRgb } from '@/lib/utils';

export default function ColorShow({ color }: { color: string }) {
    const rgb = hexToRgb(color);

    return (
        <div className="flex flex-col lg:flex-row lg:items-stretch items-center justify-center text-white mt-4">
            {/* 左侧颜色展示块 */}
            <div
                className="w-80 h-60 border-4 rounded-md mb-6 lg:mb-0 lg:mr-8 flex-shrink-0"
                style={{ backgroundColor: `#${color}` }}
            />

            {/* 右侧信息块 */}
            <div className="bg-gray-100 text-gray-800 rounded-md shadow-md lg:w-full p-4 flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-12 h-full">
                    {/* Hex */}
                    <div className="flex items-center justify-between">
                        <span className="font-bold">Hex</span>
                        <span className="font-mono flex items-center">#{color}</span>
                    </div>

                    {/* RGB */}
                    <div className="flex items-center justify-between">
                        <span className="font-bold">RGB</span>
                        <span className="font-mono flex items-center">{rgb}</span>
                    </div>

                    {/* RGB Percentages */}
                    <div className="flex items-center justify-between">
                        <span className="font-bold">RGB Percentages</span>
                        <span className="font-mono flex items-center">rgb(35%, 93%, 7%)</span>
                    </div>

                    {/* HSL */}
                    <div className="flex items-center justify-between">
                        <span className="font-bold">HSL</span>
                        <span className="font-mono flex items-center">hsl(101, 86%, 50%)</span>
                    </div>

                    {/* HSV */}
                    <div className="flex items-center justify-between">
                        <span className="font-bold">HSV</span>
                        <span className="font-mono flex items-center">hsv(101, 92%, 93%)</span>
                    </div>

                    {/* LCH */}
                    <div className="flex items-center justify-between">
                        <span className="font-bold">LCH</span>
                        <span className="font-mono flex items-center">83, 106, 132</span>
                    </div>

                    {/* LAB */}
                    <div className="flex items-center justify-between">
                        <span className="font-bold">LAB</span>
                        <span className="font-mono flex items-center">83, -72, 78</span>
                    </div>

                    {/* LUV */}
                    <div className="flex items-center justify-between">
                        <span className="font-bold">LUV</span>
                        <span className="font-mono flex items-center">83, -66, 99</span>
                    </div>

                    {/* XYZ */}
                    <div className="flex items-center justify-between">
                        <span className="font-bold">XYZ</span>
                        <span className="font-mono flex items-center">34, 63, 11</span>
                    </div>
                </div>
            </div>
        </div>
    );
}