import { userAgent, type NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { ua } = userAgent(request);

        const response = await fetch(`https://api.mangadex.org/statistics/manga/${id}`, {
            method: 'GET',
            headers: {
                'User-Agent': ua,
                Accept: 'application/json',
            },
        });

        if (!response.ok) throw new Error('Failed to fetch manga statistics.');

        const mangaStatistics = await response.json();

        return Response.json(mangaStatistics);
    } catch (error) {
        if (error instanceof Error) {
            return Response.json({ error: error.message }, { status: 500 });
        } else {
            return Response.json({ error: `Unknown error: ${error}` }, { status: 500 });
        }
    }
}
