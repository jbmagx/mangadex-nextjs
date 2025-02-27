import RecentlyAddedCarousel from '../client/RecentlyAddedCarousel';

export default async function RecentlyAdded() {
    const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.jbmagx.com';

    const response = await fetch(`${baseURL}/api/projects/mangadex/recently-added`, {
        next: {
            revalidate: 3600,
        },
    });

    if (!response.ok)
        return (
            <div className="flex flex-col w-full mt-8">
                <h1 className="font-semibold text-xl tracking-tight mb-4">Recently Added</h1>
                <p className="text-red-600 xxs:text-sm">
                    Couldn't load the list of recently added. Please{' '}
                    <a href="" className="font-semibold">
                        refresh
                    </a>{' '}
                    the page and try again.
                </p>
            </div>
        );

    const recentlyAdded: MangaDexListData = await response.json();

    return (
        <div className="flex flex-col w-full mt-10">
            <h1 className="font-semibold text-xl tracking-tight mb-4">Recently Added</h1>

            <div className="flex items-center justify-center">
                <RecentlyAddedCarousel recentlyAdded={recentlyAdded.data} />
            </div>
        </div>
    );
}
