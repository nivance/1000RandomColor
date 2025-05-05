import SpecificColor from '@/components/specific-color';
import ColorShow from '@/components/color-show';
import { config } from "@/lib/config";
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import {
  hexToRgb, hexToRgbPercentages, hexToHsl, generateShades, generateTints,
  getComplementaryColor, getTriadicColors, getTetradicColors, getMonochromaticColors
} from '@/lib/utils';

export const runtime = "edge";

export async function generateMetadata({ params }: { params: { slug: string, locale: string } }): Promise<Metadata> {
  const canonicalUrl = `${config.baseUrl}/${params.locale !== "en" ? params.locale + "/" : ""}${params.slug}`;
  const t = await getTranslations('metadata');
  const title = t("sepc_title", { "hex_code": params.slug, "host_name": config.baseUrl });
  const description = t("sepc_desc", { "hex_code": params.slug });
  const keywords = t("sepc_keywords", { "hex_code": params.slug });
  return {
    title: title,
    description: description,
    keywords: keywords,
    icons: [
      {
        rel: 'icon',
        url: '/favicon.ico',
      },
    ],
    alternates: {
      canonical: canonicalUrl,
    }
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const color = params.slug;
  const rgbPercentages = hexToRgbPercentages(color);
  const hsl = hexToHsl(color);
  const rgb = hexToRgb(color);
  const shades = generateShades(color, 12);
  const tints = generateTints(color, 12);
  const complementaryColor = getComplementaryColor(color);
  const triadicColors = getTriadicColors(color);
  const tetradicColors = getTetradicColors(color);
  const monochromaticColors = getMonochromaticColors(color, 6);

  return (
    <div className="mx-auto w-[90%] lg:w-[80%]">
      <nav className="flex items-center text-lg font-mono text-gray-500 mt-8 border-b border-gray-200 pb-1">
        <Link href="/" className="hover:text-blue-500">Home</Link>
        <ChevronRight className="" size={16} />
        <Link href={color} className="hover:text-blue-500"><h1>#{color}</h1></Link>
      </nav>
      <ColorShow color={color} />
      <div className="mt-8">
        <h2 className="text-2xl font-mono text-gray-700 font-bold border-b-2 text-start mb-4">#{color} Hex Color Code</h2>
        <p className="font-mono text-lg text-gray-700 dark:text-gray-300 mb-4">
          A Hex Color Code is a six-digit combination of numbers and letters used in web design and graphic design to represent colors. It begins with a hash symbol (#) followed by six characters.
          Each pair of characters represents the intensity of red, green, and blue (RGB) in a color, using values from 00 to FF (0 to 255 in decimal). The combination of these values is used to create a range of colors that can be used in a variety of applications.
        </p>
        <p className="font-mono text-lg text-gray-700 dark:text-gray-300 mb-4">
          The RGB code for the hexadecimal color code #{color} is {rgb}, in the RGB color model  is composed of {rgbPercentages[0]} red, {rgbPercentages[1]} green and {rgbPercentages[2]} blue.
          In the HSL color space #{color} has a hue of {hsl[0]}°(degrees), {hsl[1]} saturation and {hsl[2]} lightness.
        </p>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-mono text-gray-700 font-bold border-b-2 text-start mb-4">Shades of #{color}</h2>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-0">
          {shades.map((shade, index) => (
            <div key={index} className="flex flex-col">
              <Link href={shade.replace(/^#/, '')} key={index} >
                <div
                  className="h-24 w-full"
                  style={{ backgroundColor: shade }}
                />
              </Link>
              <div className="bg-white py-2 text-center">
                <Link href={shade.replace(/^#/, '')} key={index} >
                  <p className="font-mono text-base text-gray-600 hover:text-blue-500 hover:underline">{shade}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-mono text-gray-700 font-bold border-b-2 text-start mb-4">Tints of #{color}</h2>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-0">
          {tints.map((tint, index) => (
            <div key={index} className="flex flex-col">
              <Link href={tint.replace(/^#/, '')} key={index} >
                <div
                  className="h-24 w-full"
                  style={{ backgroundColor: tint }}
                />
              </Link>
              <div className="bg-white py-2 text-center">
                <Link href={tint.replace(/^#/, '')} key={index} >
                  <p className="font-mono text-base text-gray-600 hover:text-blue-500 hover:underline">{tint}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-mono text-gray-700 font-bold border-b-2 text-start mb-4">Color Harmony</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <h3 className="text-lg font-mono text-gray-700 font-bold border-b-2 text-center mb-4">Complementary colors</h3>
            <p className="font-mono mb-2 text-sm">Complementary colors are pairs of colors that sit directly opposite each other on the color wheel. When placed side by side, they create strong visual contrast and make each other appear more vibrant. Common complementary pairs include red and green, blue and orange, and yellow and purple.</p>
            <div className="grid grid-cols-2 gap-1">
              <div className="flex flex-col">
                <Link href={color.replace(/^#/, '')}>
                  <div className="h-24 w-full rounded-md"
                    style={{ backgroundColor: `#${color}` }}
                  />
                </Link>
                <div className="bg-white py-2 text-center w-full">
                  <Link href={color.replace(/^#/, '')} >
                    <p className="font-mono text-base text-gray-600 hover:text-blue-500 hover:underline">#{color}</p>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col">
                <Link href={complementaryColor.replace(/^#/, '')}>
                  <div className="h-24 w-full rounded-md"
                    style={{ backgroundColor: `${complementaryColor}` }}
                  />
                </Link>
                <div className="bg-white py-2 text-center w-full">
                  <Link href={complementaryColor.replace(/^#/, '')} >
                    <p className="font-mono text-base text-gray-600 hover:text-blue-500 hover:underline">{complementaryColor}</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-mono text-gray-700 font-bold border-b-2 text-center mb-4">Triadic colors</h3>
            <p className="font-mono mb-2 text-sm">Triadic colors are a group of three colors that are evenly spaced around the color wheel, forming a perfect triangle. This color scheme offers strong visual contrast while maintaining harmony and balance. Common triadic combinations include red, yellow, and blue or purple, green, and orange.</p>
            <div className="grid grid-cols-3 gap-1">
              {triadicColors.map((triadicColor, index) => (
                <div key={index} className="flex flex-col">
                  <Link href={triadicColor.replace(/^#/, '')} key={index} >
                    <div
                      className="h-24 w-full rounded-md"
                      style={{ backgroundColor: triadicColor }}
                    />
                  </Link>
                  <div className="bg-white py-2 text-center">
                    <Link href={triadicColor.replace(/^#/, '')} key={index} >
                      <p className="font-mono text-base text-gray-600 hover:text-blue-500 hover:underline">{triadicColor}</p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-mono text-gray-700 font-bold border-b-2 text-center mb-4">Tetradic Colors</h3>
            <p className="font-mono mb-2 text-sm">Tetradic colors, also known as double-complementary colors, are a group of four colors arranged into two complementary pairs on the color wheel. This color scheme forms a rectangle or square shape on the wheel, offering a rich and balanced palette with high contrast and variety. </p>
            <div className="grid grid-cols-4 gap-1">
              {tetradicColors.map((tetradicColor, index) => (
                <div key={index} className="flex flex-col">
                  <Link href={tetradicColor.replace(/^#/, '')} key={index} >
                    <div
                      className="h-24 w-full rounded-md"
                      style={{ backgroundColor: tetradicColor }}
                    />
                  </Link>
                  <div className="bg-white py-2 text-center">
                    <Link href={tetradicColor.replace(/^#/, '')} key={index} >
                      <p className="font-mono text-base text-gray-600 hover:text-blue-500 hover:underline">{tetradicColor}</p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-mono text-gray-700 font-bold border-b-2 text-center mb-4">Monochromatic colors</h3>
            <p className="font-mono mb-2 text-sm">Monochromatic colors are all the variations of a single hue, created by adjusting its shades (adding black), tints (adding white), and tones (adding gray). Because all the colors in a monochromatic palette come from the same base hue, they naturally work well together and provide a sense of unity.</p>
            <div className="grid grid-cols-6 gap-0">
              {monochromaticColors.map((monochromaticColor, index) => (
                <div key={index} className="flex flex-col">
                  <Link href={monochromaticColor.replace(/^#/, '')} key={index} >
                    <div
                      className="h-24 w-full"
                      style={{ backgroundColor: monochromaticColor }}
                    />
                  </Link>
                  <div className="bg-white py-2 text-center">
                    <Link href={monochromaticColor.replace(/^#/, '')} key={index} >
                      <p className="font-mono text-base text-gray-600 hover:text-blue-500 hover:underline">{monochromaticColor}</p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-mono text-gray-700 font-bold border-b-2 text-start mb-4">Preview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <h3 className="text-lg font-mono text-gray-700 font-bold text-center mb-4">White background</h3>
            <div className="bg-white h-48 rounded-md border-2 border-gray-300 flex items-center justify-center">
              <div className="h-36 w-36 rounded-md"
                style={{ backgroundColor: `#${color}` }}
              />
            </div>
            <p className="font-mono text-start text-sm text-gray-700 tracking-tighter">This visualization shows how the color #{color} looks on a white background.</p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-mono text-gray-700 font-bold text-center mb-4">Black background</h3>
            <div className="bg-white h-48 rounded-md border-2 border-gray-300 flex items-center justify-center">
              <div className="h-36 w-36 rounded-md"
                style={{ backgroundColor: `#${color}` }}
              />
            </div>
            <p className="font-mono text-start text-sm text-gray-700 tracking-tighter">This visualization shows how the color #{color} looks on a black background.</p>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-mono text-gray-700 font-bold text-center mb-4">Color background #{color}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <div className="h-48 rounded-md border-2 border-gray-300 flex items-center justify-center"
                style={{ backgroundColor: `#${color}` }}>
                <div className="h-36 w-36 bg-white rounded-md"
                />
              </div>
              <p className="font-mono text-start text-sm text-gray-700 tracking-tighter">This visualization shows how the color white looks on a #{color} background.</p>
            </div>
            <div className="flex flex-col">
              <div className="h-48 rounded-md border-2 border-gray-300 flex items-center justify-center"
                style={{ backgroundColor: `#${color}` }}>
                <div className="h-36 w-36 bg-black rounded-md"
                />
              </div>
              <p className="font-mono text-start text-sm text-gray-700 tracking-tighter">This visualization shows how the color black looks on a #{color} background.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-mono text-gray-700 font-bold border-b-2 text-start mb-4">CSS Code Examples</h2>
        <div className="mb-8">
          <h3 className="text-xl font-mono text-gray-500 font-bold text-start mb-2">Text with hex color #{color}</h3>
          <p className="font-mono text-lg" style={{ color: `#{color}` }}>
            This example shows what text with the color #{color} would look like.
          </p>
          <pre className="bg-gray-900 text-white p-2 rounded-lg overflow-x-auto">
            <code>{`<span style="color:#${color};">Here is the text with color: #${color}.</span>`}</code>
          </pre>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-mono text-gray-500 font-bold text-start mb-2">Border with hex color #{color}</h3>
          <div
            className="font-mono text-lg text-gray-700 p-2 mt-4 mb-2 border rounded"
            style={{ border: `1px solid #${color}` }}
          >
            The border color of this element is #{color}。
          </div>
          <pre className="bg-gray-900 text-white p-2 rounded-lg overflow-x-auto">
            <code>{`<div style="border:1px solid #${color};">Content stays here.</div>`}</code>
          </pre>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-mono text-gray-500 font-bold text-start mb-2">Background with hex color #{color}</h3>
          <div
            className="font-mono text-lg text-white p-2 rounded mt-4 mb-2 border"
            style={{ backgroundColor: `#${color}` }}
          >
            The background color of this paragraph is #{color}。
          </div>
          <pre className="bg-gray-900 text-white p-2 rounded-lg overflow-x-auto">
            <code>{`<div style="background-color:#${color};">The content stays here.</div>`}</code>
          </pre>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-mono text-gray-500 font-bold text-start mb-2">CSS codes</h3>
          <div className="bg-gray-900 text-white p-4 rounded-lg font-mono">
            <p className="mb-2">.text {'{'} color: #{color}; {'}'}</p>
            <p className="mb-2">.background {'{'} background-color: #{color}; {'}'}</p>
            <p>.border {'{'} border: 1px solid #{color}; {'}'}</p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-mono text-gray-700 font-bold text-center mt-8 mb-4">Random Color Variations Derived from #{color}</h2>
      </div>
      <SpecificColor color={color} />
    </div >
  );
}
