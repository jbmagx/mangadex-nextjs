import { baseURL } from '@/app/projects/mangadex/constants/base-url';
import RecentlyAddedCarousel from '@/app/projects/mangadex/components/client/RecentlyAddedCarousel';

export default async function RecentlyAdded() {
    const response = await fetch(`${baseURL}/api/projects/mangadex/recently-added`, {
        next: {
            revalidate: 3600,
        },
    });

    if (!response.ok)
        return (
            <div className="flex flex-col w-full gap-y-4">
                <h1 className="font-semibold text-xl tracking-tight">Recently Added</h1>
                <p className="text-red-600 text-sm xs:text-base">
                    Couldn't load the list of recently added. Please{' '}
                    <a href="" className="font-semibold">
                        refresh
                    </a>{' '}
                    the page and try again.
                </p>
            </div>
        );

    const recentlyAdded: MangaDexGetMangaResponse = await response.json();

    return (
        recentlyAdded.data.length > 0 && (
            <div className="flex flex-col w-full gap-y-4">
                <h1 className="font-semibold text-xl tracking-tight">Recently Added</h1>

                <div className="flex items-center justify-center">
                    <RecentlyAddedCarousel recentlyAdded={recentlyAdded.data} />
                </div>
            </div>
        )
    );
}
