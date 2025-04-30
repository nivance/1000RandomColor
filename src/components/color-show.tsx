"use client";
import { hexToRgb } from '@/lib/utils';

export default function ColorShow({ color }: { color: string }) {
    const rgb = hexToRgb(color);
    return (
        <>
            <div className="flex flex-col items-center justify-center text-white mt-4">
                <div className="w-80 h-40 border-4 rounded-md"
                    style={{ backgroundColor: `#${color}` }}
                />
                <div className="flex justify-between w-64 text-lg">
                    <div className="flex flex-col items-center cursor-pointer"
                        title="Click to copy hex code"
                        onClick={() => navigator.clipboard.writeText(color)}
                    >
                        <span className="text-indigo-700 font-bold">hex</span>
                        <span className="font-mono text-yellow-700">#{color}</span>
                    </div>

                    <div className="flex flex-col items-center"
                        title="Click to copy rgb code"
                        onClick={() => navigator.clipboard.writeText(rgb)}
                    >
                        <span className="text-indigo-700 font-bold">rgb</span>
                        <span className="font-mono text-yellow-700">{rgb}</span>
                    </div>
                </div>
            </div>
        </>
    );
}