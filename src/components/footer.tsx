"use client";
import Link from "next/link";
import { config } from "@/lib/config";
import { navigation } from "@/lib/config";
import { removeProtocolFromUrl } from "@/lib/utils";

export default function Footer() {
  const siteName = removeProtocolFromUrl(config.baseUrl);

  return (
    <footer className="border-spacing-0 border-t border-gray-200 px-6 py-4">
      <div className="flex justify-center items-center gap-4">
        <p className="font-mono text-sm pr-20">
          ©Copyright {new Date().getFullYear()}{" "}
          <a
            href={config.baseUrl}
            target="_blank"
            className="text-gray-600 hover:text-blue-500 hidden md:inline-block"
          >
            {siteName}
          </a>{" "}
          All rights reserved.
        </p>
        <div className="flex justify-center items-center gap-4">
          {navigation.legal.map((item) => {
            return (
                <Link
                  key={item.name}
                  href={`${item.href}`}
                  className="text-sm font-mono whitespace-nowrap hover:underline hover:text-blue-500"
                >
                  {item.name}
                </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
