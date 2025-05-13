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

    const handleDownload = (e: React.MouseEvent) => {
        e.stopPropagation(); // 防止关闭模态框
        
        // 创建 canvas
        const canvas = document.createElement('canvas');
        canvas.width = previewSize.width * 4;
        canvas.height = previewSize.height * 4;
        
        // 绘制颜色
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.fillStyle = `#${color}`;
            ctx.fillRect(0, 0, canvas.width , canvas.height );
            
            // 创建下载链接
            const link = document.createElement('a');
            link.download = `wallpaper-${color}-${canvas.width}x${canvas.height}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    };

    return (
        <div className="mt-8 wallpaper" id="wallpapers">
            <h2 className="text-2xl font-mono text-gray-700 font-bold border-b-2 text-start mb-4">Shareable Images & Wallpapers</h2>
            <p className='font-mono text-base text-start text-gray-700'>High-resolution images of the hex color #{color}, perfect for sharing on social or using as a wallpaper.</p>
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
                        className="relative rounded-lg"
                        style={{
                            width: `${previewSize.width}px`,
                            height: `${previewSize.height}px`,
                            backgroundColor: `#${color}`
                        }}
                    >
                        <button
                            className="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                            onClick={handleDownload}
                            title="Download Wallpaper"
                        >
                            <Download className="w-6 h-6 text-gray-700" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}