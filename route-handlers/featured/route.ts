import { featuredIds } from '@/app/projects/mangadex/constants/featured-ids';
import { userAgent, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { ua } = userAgent(request);

        let idsQuery = '';

        featuredIds.forEach((id) => (idsQuery += `ids%5B%5D=${id}&`));

        const response = await fetch(
            `https://api.mangadex.org/manga?limit=100&includedTagsMode=AND&excludedTagsMode=OR&${idsQuery}contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&order%5BfollowedCount%5D=desc&includes%5B%5D=manga&includes%5B%5D=cover_art&includes%5B%5D=author&includes%5B%5D=artist&includes%5B%5D=tag&includes%5B%5D=creator`,
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
