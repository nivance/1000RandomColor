import Link from 'next/link';
import { hexToRgb } from '@/lib/utils';

export default function ColorCard({ randomColors }: { randomColors: string[] }) {
    return (
        <section className="mb-12">
            <div className="mx-auto w-[80%]">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4" style={{ rowGap: '4px' }}>
                    {randomColors.map((color, index) => (
                        <div key={index} className="p-1 rounded border border-gray-300">
                            <Link href={color.replace(/^#/, '')} key={index} >
                                <div
                                    className="h-20 rounded-t"
                                    style={{ backgroundColor: color }}
                                ></div>
                            </Link>
                            <div className="text-center mt-2">
                                <p
                                    className="font-mono text-base text-gray-700 hover:text-black cursor-pointer"
                                    title="Click to copy rgb code"
                                    onClick={() => navigator.clipboard.writeText(color)}
                                >
                                    {color}
                                </p>
                                <p
                                    className="font-mono text-base text-gray-700 hover:text-black cursor-pointer"
                                    title="Click to copy hex code"
                                    onClick={() => navigator.clipboard.writeText(hexToRgb(color))}
                                >
                                    {hexToRgb(color)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}