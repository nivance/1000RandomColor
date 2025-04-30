"use client";
import { useEffect, useState } from 'react';
import randomColor from 'randomcolor';
import ColorCard from '@/components/color-card';

export default function SpecificColor({ color }: { color: string }) {
    const [randomColors, setRandomColors] = useState<string[]>([]);

    useEffect(() => {
        const colors = randomColor({ count: 100, hue: color });
        // console.log("colors.length: " + colors.length);
        setRandomColors(colors);
    }, []);

    return (
        <>
            <ColorCard randomColors={randomColors} />
        </>
    );
}