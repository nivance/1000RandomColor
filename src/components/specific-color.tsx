"use client";
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import randomColor from 'randomcolor';
import ColorCard from '@/components/color-card';

export default function SpecificColor({ color }: { color: string }) {
    const [randomColors, setRandomColors] = useState<string[]>([]);

    useEffect(() => {
        try {
            const colors = randomColor({ count: 100, hue: color });
            setRandomColors(colors);
        } catch (err) {
            console.error("Error generating random colors:", err);
            return notFound();
        }
    }, []);

    return (
        <>
            <ColorCard randomColors={randomColors} />
        </>
    );
}