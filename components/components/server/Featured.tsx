import FeaturedCarousel from '../client/FeaturedCarousel';

export default async function Featured() {
    const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.jbmagx.com';

    const response = await fetch(`${baseURL}/api/projects/mangadex/featured`);

    if (!response.ok)
        return (
            <div className="flex flex-col w-full mt-8">
                <h1 className="font-semibold text-xl tracking-tight mb-4">Featured</h1>
                <p className="text-red-600 xxs:text-sm">
                    Couldn't load featured manga, manhwa, and manhua. Please{' '}
                    <a href="" className="font-semibold">
                        refresh
                    </a>{' '}
                    the page and try again.
                </p>
            </div>
        );

    const featured: MangaDexListData = await response.json();

    const featuredStatistics: Record<string, Statistics>[] = [];

    for (let loop = 0; loop < featured.data.length; loop++) {
        const statisticsResponse = await fetch(`${baseURL}/api/projects/mangadex/manga/${featured.data[loop].id}/statistics`);
        if (!statisticsResponse.ok) continue;
        const statistics: MangaDexStatisticsData = await statisticsResponse.json();
        featuredStatistics.push(statistics.statistics);
    }

    return (
        <div className="flex flex-col w-full">
            <h1 className="font-semibold text-xl tracking-tight mb-4">Featured</h1>

            <div className="flex items-center justify-center">
                <FeaturedCarousel featured={featured.data} featuredStatistics={featuredStatistics} />
            </div>
        </div>
    );
}
