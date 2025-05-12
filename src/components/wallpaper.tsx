"use client";
import Link from "next/link";
import { Download } from 'lucide-react';
import { useState } from 'react';

export default function Wallpaper({ color }: { color: string }) {
    const [showPreview, setShowPreview] = useState(false);
    const [previewSize, setPreviewSize] = useState({ width: 0, height: 0 });

    const handlePreview = (width: number, height: number) => {
        console.log(width, height);
        setPreviewSize({ width, height });
        setShowPreview(true);
    };

    return (
        <div className="mt-8 wallpaper">
            <h2 className="text-2xl font-mono text-gray-700 font-bold border-b-2 text-start mb-4">Shareable Images & Wallpapers</h2>
            <p className='font-mono text-base text-start text-gray-700'>1111-High-resolution images of the hex color #{color}, perfect for sharing on social or using as a wallpaper.</p>
            <div className="flex justify-center items-center flex-wrap gap-4 mt-4">
                <div
                    className="h-48 w-24 rounded-md cursor-pointer"
                    style={{ backgroundColor: `#${color}` }}
                    onClick={() => handlePreview(321, 695)}
                />
                <div
                    className="h-48 w-48 rounded-md cursor-pointer"
                    style={{ backgroundColor: `#${color}` }}
                    onClick={() => handlePreview(600, 600)}
                />
                <div
                    className="h-48 w-96 rounded-md cursor-pointer"
                    style={{ backgroundColor: `#${color}` }}
                    onClick={() => handlePreview(960, 540)}
                />
            </div>

            {/* 预览模态框 */}
            {showPreview && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                    onClick={() => setShowPreview(false)}
                >
                    <div
                        className="relative insert-0 rounded-lg"
                        style={{
                            width: `${previewSize.width}px`,
                            height: `${previewSize.height}px`,
                            backgroundColor: `#${color}`
                        }}
                    >
                    </div>
                </div>
            )}
        </div>
    )
}