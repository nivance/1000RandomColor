import Link from 'next/link';
import { hexToRgb } from '@/lib/utils';
import React, { useState } from 'react'

export default function ColorCard({ randomColors }: { randomColors: string[] }) {
    const [copiedCode, setCopiedCode] = useState<string | null>(null)

    const copyToClipboard = (text: string) => {
        const textArea = document.createElement('textarea')
        textArea.value = text
        document.body.appendChild(textArea)
        textArea.select()
        try {
            document.execCommand('copy')
            setCopiedCode(text)
            setTimeout(() => {
                setCopiedCode(null)
            }, 2000)
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
        document.body.removeChild(textArea)
    }

    return (
        <section className="mb-12">
            <div className="mx-auto">
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
                                    className="font-mono text-base text-gray-500 hover:text-black cursor-pointer flex items-center justify-between relative"
                                    title="Click to copy rgb code"
                                    onClick={() => copyToClipboard(color)}
                                >
                                    <span className="text-center flex-grow">{color}</span>
                                    {copiedCode === color && (
                                        <span className="font-bold text-xs text-green-500 px-2 py-1 rounded">
                                            Copied!
                                        </span>
                                    )}
                                </p>
                                <p
                                    className="font-mono text-base text-gray-500 hover:text-black cursor-pointer flex items-center justify-between relative"
                                    title="Click to copy hex code"
                                    onClick={() => copyToClipboard(hexToRgb(color))}
                                >
                                    <span className="text-center flex-grow">{hexToRgb(color)}</span>
                                    {copiedCode === hexToRgb(color) && (
                                        <span className="font-bold text-xs text-green-500 px-2 py-1 rounded">
                                            Copied!
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}