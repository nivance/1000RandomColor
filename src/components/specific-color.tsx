"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import randomColor from 'randomcolor';
import ColorCard from '@/components/color-card';

export default function SpecificColor({ color }: { color: string }) {
    const [randomColors, setRandomColors] = useState<string[]>([]);
    const router = useRouter(); 
    
    useEffect(() => {
        try {
            const colors = randomColor({ count: 100, hue: color });
            setRandomColors(colors);
        } catch (err) {
            console.error("Error generating random colors:", err);
            router.push('/404'); // 跳转到 404 页面
        }
    }, [color, router]);

    return (
        <>
            <ColorCard randomColors={randomColors} />
        </>
    );
}