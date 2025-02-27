import { NextResponse, userAgent, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const { ua } = userAgent(request);

        const imageUrl = searchParams.get('url');

        if (!imageUrl) throw new Error('Missing image url');

        const response = await fetch(imageUrl, {
            method: 'GET',
            headers: {
                'User-Agent': ua,
                Accept: 'image/*',
            },
        });

        if (!response.ok) throw new Error('Failed to fetch image');

        const imageBuffer = await response.arrayBuffer();
        const contentType = response.headers.get('Content-Type') || 'image/jpeg';

        return new NextResponse(imageBuffer, {
            headers: { 'Content-Type': contentType },
        });
    } catch (error) {
        if (error instanceof Error) {
            return Response.json({ error: error.message }, { status: 500 });
        } else {
            return Response.json({ error: `Unknown error: ${error}` }, { status: 500 });
        }
    }
}
