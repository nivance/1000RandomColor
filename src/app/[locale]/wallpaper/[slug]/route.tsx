import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    const { searchParams } = new URL(request.url);
    const color = params.slug;
    const width = parseInt(searchParams.get('width') || '1920');
    const height = parseInt(searchParams.get('height') || '1080');

    // 设置更积极的缓存策略
    const cacheHeaders = {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable, stale-while-revalidate=60',
        'CDN-Cache-Control': 'public, max-age=31536000',
    };

    try {
        return new ImageResponse(
            (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        backgroundColor: `#${color}`,
                    }}
                />
            ),
            {
                width,
                height,
                headers: cacheHeaders,
            }
        );
    } catch (error) {
        console.error('Error generating image:', error);
        return new Response('Failed to generate image', { status: 500 });
    }
}