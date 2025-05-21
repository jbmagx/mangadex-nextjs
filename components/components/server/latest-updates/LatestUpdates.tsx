import { baseURL } from '@/app/projects/mangadex/constants/base-url';
import LatestUpdatesCard from './components/LatestUpdatesCard';

export default async function LatestUpdates() {
    const response = await fetch(`${baseURL}/api/projects/mangadex/latest-updates`, {
        next: {
            revalidate: 900,
        },
    });

    if (!response.ok)
        return (
            <div className="flex flex-col w-full gap-y-4">
                <h1 className="font-semibold text-xl tracking-tight">Latest Updates</h1>
                <p className="text-red-600 xxs:text-sm">
                    Couldn't load the list of latest updates. Please{' '}
                    <a href="" className="font-semibold">
                        refresh
                    </a>{' '}
                    the page and try again.
                </p>
            </div>
        );

    const latestUpdates: MangaDexGetMangaResponse = await response.json();

    return (
        latestUpdates.data.length > 0 && (
            <div className="flex flex-col w-full gap-y-4">
                <h1 className="font-semibold text-xl tracking-tight">Latest Updates</h1>

                <div className="flex flex-col md:flex-row md:flex-wrap justify-start xs:justify-between sm:justify-start md:justify-between w-full gap-y-3.5 xs:gap-y-4 md:gap-4">
                    {latestUpdates.data.map((mangaDexGetMangaDataItem, index) => (
                        <LatestUpdatesCard key={index} mangaDexGetMangaDataItem={mangaDexGetMangaDataItem} />
                    ))}
                </div>
            </div>
        )
    );
}
