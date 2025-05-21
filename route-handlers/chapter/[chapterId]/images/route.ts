import { userAgent, type NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ chapterId: string }> }) {
    try {
        const { chapterId } = await params;
        const { ua } = userAgent(request);

        const response = await fetch(`https://api.mangadex.org/at-home/server/${chapterId}?forcePort443=false`, {
            method: 'GET',
            headers: {
                'User-Agent': ua,
                Accept: 'application/json',
            },
        });

        if (!response.ok) throw new Error('Failed to fetch chapter images data.');

        const chapterImagesData = await response.json();

        return Response.json(chapterImagesData);
    } catch (error) {
        if (error instanceof Error) {
            return Response.json({ error: error.message }, { status: 500 });
        } else {
            return Response.json({ error: `Unknown error: ${error}` }, { status: 500 });
        }
    }
}
