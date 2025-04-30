"use client";
import { useEffect, useState } from 'react';
import randomColor from 'randomcolor';
import ColorCard from '@/components/color-card';

export default function RandomColor() {
    const [randomColors, setRandomColors] = useState<string[]>([]);

    useEffect(() => {
        setRandomColors(randomColor({ count: 1000}));
    }, []);

    return (
        <>
            <h1 className="text-2xl font-bold text-white text-center mb-4">1000 Random Color</h1>
            <ColorCard randomColors={randomColors} />
        </>
    );
}