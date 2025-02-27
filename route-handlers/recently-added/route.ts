import { userAgent, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { ua } = userAgent(request);

        const response = await fetch(
            'https://api.mangadex.org/manga?limit=12&offset=0&includedTagsMode=AND&excludedTagsMode=OR&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&order%5BcreatedAt%5D=desc&includes%5B%5D=manga&includes%5B%5D=cover_art&includes%5B%5D=author&includes%5B%5D=artist&includes%5B%5D=tag&includes%5B%5D=creator&hasAvailableChapters=true',
            {
                method: 'GET',
                headers: {
                    'User-Agent': ua,
                    Accept: 'application/json',
                },
            }
        );

        if (!response.ok) throw new Error('Failed to fetch latest updates.');

        const latestUpdates = await response.json();

        return Response.json(latestUpdates);
    } catch (error) {
        if (error instanceof Error) {
            return Response.json({ error: error.message }, { status: 500 });
        } else {
            return Response.json({ error: `Unknown error: ${error}` }, { status: 500 });
        }
    }
}
