"use client";
import { useEffect, useState } from 'react';
import randomColor from 'randomcolor';
import { hexToRgb } from '@/lib/utils';

export default function RandomColor() {
    const [randomColors, setRandomColors] = useState<string[]>([]);

    useEffect(() => {
        // 仅在客户端生成随机颜色
        const colors = Array.from({ length: 1000 }, () => randomColor());
        setRandomColors(colors);
    }, []);

    console.log("randomColors length: " + randomColors.length);
    return (
        <section className="mb-12">
            <h1 className="text-2xl font-bold text-white text-center mb-4">1000 Random Color</h1>
            <div className="mx-auto w-[80%]">
                <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4" style={{ rowGap: '2px' }}>
                    {randomColors.map((color, index) => (
                        <div key={index} className="p-1 rounded border border-gray-300">
                            <div
                                className="h-12 rounded-t"
                                style={{ backgroundColor: color }}
                            ></div>
                            <div className="text-center mt-1">
                                <p className="font-mono text-xs text-gray-700">{color}</p> 
                                <p className="font-mono text-xs text-gray-700">{hexToRgb(color)}</p>
                            </div>
                        </div>
                    ))}
                </div>  
            </div>
        </section>
    );
}