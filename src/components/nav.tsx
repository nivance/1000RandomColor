'use client'
import Link from "next/link";
import { useState, useRef } from 'react';
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  return (
    <nav className="w-auto border-gray-300 flex items-center justify-between p-2 px-4" aria-label="Global">
      <div className="hidden lg:flex items-center mr-4">
        <a href={`/`} className="flex items-center" title="Random Color">
          <Image className="h-8" src="/favicon.svg" alt="Random Color logo" width={28} height={28} />
        </a>
        <a href={`/`} className="flex flex-col items-center" title="Random Color">
          <span className="text-gray-700 font-mono font-extrabold">1000 Random Color</span>
        </a>
      </div>

      {/* 桌面端菜单 */}
      <div className="hidden lg:flex items-center justify-center gap-x-8">
        {/* <div className="flex flex-grow justify-start">
          <Link className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="/">Home</Link>
        </div>
        <div className="flex flex-grow justify-start">
          <Link className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="/batch-crop">Batch Crop</Link>
        </div> */}
      </div>
      
      {/* 移动端菜单按钮 */}
      <div className="flex items-center justify-start lg:hidden">
        <Button
          variant="ghost"
          size="sm"
          className="p-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>
      
      <div className="flex place-items-end items-center justify-end space-x-4">
        <a href="https://github.com/nivance/1000RandomColor" target="_blank" className="ml-4" title="Random Color">
          <Image className="h-8" src="/github.svg" alt="Random Color github repo" width={24} height={24} />
        </a>
      </div>
      
      {/* 移动端下拉菜单 */}
      {isMobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="absolute top-14 left-0 right-0 z-20 bg-white dark:bg-gray-800 border-t border-gray-200 shadow-lg py-2"
        >
          <div className="flex flex-col space-y-1 px-4">
            <Link 
              href="/" 
              className="py-2 text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            {/* <Link 
              href="/batch-crop" 
              className="py-2 text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Batch Crop
            </Link> */}
          </div>
        </div>
      )}
    </nav>
  )
}
