import { userAgent, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const { ua } = userAgent(request);

        const query = searchParams.get('query');
        const limit = searchParams.get('limit');
        const offset = searchParams.get('offset');

        const manga = searchParams.get('manga') ? JSON.parse(searchParams.get('manga') as string) : false;
        const manhwa = searchParams.get('manhwa') ? JSON.parse(searchParams.get('manhwa') as string) : false;
        const manhua = searchParams.get('manhua') ? JSON.parse(searchParams.get('manhua') as string) : false;

        const response = await fetch(
            `https://api.mangadex.org/manga?limit=${limit}&offset=${offset}${query ? `&title=${query}` : ''}&includedTagsMode=AND&excludedTagsMode=OR${
                manhwa ? '&originalLanguage%5B%5D=ko' : ''
            }${manga ? '&originalLanguage%5B%5D=ja' : ''}${
                manhua ? '&originalLanguage%5B%5D=zh' : ''
            }&availableTranslatedLanguage%5B%5D=en&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&order%5BfollowedCount%5D=desc&order%5Brelevance%5D=desc&order%5BlatestUploadedChapter%5D=desc&order%5BupdatedAt%5D=desc&includes%5B%5D=manga&includes%5B%5D=cover_art&includes%5B%5D=author&includes%5B%5D=artist&includes%5B%5D=tag&includes%5B%5D=creator&hasAvailableChapters=true`,
            {
                method: 'GET',
                headers: {
                    'User-Agent': ua,
                    Accept: 'application/json',
                },
            }
        );

        if (!response.ok) throw new Error('Oops! Something went wrong while fetching the results. Please try again.');

        const searchResults = await response.json();

        return Response.json(searchResults);
    } catch (error) {
        if (error instanceof Error) {
            return Response.json({ error: error.message }, { status: 500 });
        } else {
            return Response.json({ error: `Unknown error: ${error}` }, { status: 500 });
        }
    }
}
