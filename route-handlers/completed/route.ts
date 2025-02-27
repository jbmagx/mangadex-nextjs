import { userAgent, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const { ua } = userAgent(request);

        const limit = searchParams.get('limit');
        const offset = searchParams.get('offset');

        const manga = searchParams.get('manga') ? JSON.parse(searchParams.get('manga') as string) : false;
        const manhwa = searchParams.get('manhwa') ? JSON.parse(searchParams.get('manhwa') as string) : false;
        const manhua = searchParams.get('manhua') ? JSON.parse(searchParams.get('manhua') as string) : false;

        if (!limit || !offset) throw new Error('Missing required fields');

        const response = await fetch(
            `https://api.mangadex.org/manga?limit=${limit}&offset=${offset}&includedTagsMode=AND&excludedTagsMode=OR&status%5B%5D=completed${
                manhwa ? '&originalLanguage%5B%5D=ko' : ''
            }${manga ? '&originalLanguage%5B%5D=ja' : ''}${
                manhua ? '&originalLanguage%5B%5D=zh' : ''
            }&availableTranslatedLanguage%5B%5D=en&publicationDemographic%5B%5D=shounen&publicationDemographic%5B%5D=shoujo&publicationDemographic%5B%5D=josei&publicationDemographic%5B%5D=seinen&publicationDemographic%5B%5D=none&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&order%5BfollowedCount%5D=desc&includes%5B%5D=manga&includes%5B%5D=cover_art&includes%5B%5D=author&includes%5B%5D=artist&includes%5B%5D=tag&includes%5B%5D=creator&hasAvailableChapters=true`,
            {
                method: 'GET',
                headers: {
                    'User-Agent': ua,
                    Accept: 'application/json',
                },
            }
        );

        if (!response.ok) throw new Error('Failed to fetch completed manga, manhwa, and manhua.');

        const completed = await response.json();

        return Response.json(completed);
    } catch (error) {
        if (error instanceof Error) {
            return Response.json({ error: error.message }, { status: 500 });
        } else {
            return Response.json({ error: `Unknown error: ${error}` }, { status: 500 });
        }
    }
}
