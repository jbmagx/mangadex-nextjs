import { baseURL } from '@/app/projects/mangadex/constants/base-url';
import FeaturedCarousel from '@/app/projects/mangadex/components/client/FeaturedCarousel';

export default async function Featured() {
    const response = await fetch(`${baseURL}/api/projects/mangadex/featured`);

    if (!response.ok)
        return (
            <div className="flex flex-col w-full">
                <h1 className="font-semibold text-xl tracking-tight mb-4">Featured</h1>
                <p className="text-red-600 text-sm xs:text-base">
                    Couldn't load featured manga, manhwa, and manhua. Please{' '}
                    <a href="" className="font-semibold">
                        refresh
                    </a>{' '}
                    the page and try again.
                </p>
            </div>
        );

    const featured: MangaDexGetMangaResponse = await response.json();

    return (
        featured.data.length > 0 && (
            <div className="flex flex-col w-full">
                <h1 className="font-semibold text-xl tracking-tight mb-4">Featured</h1>

                <div className="flex items-center justify-center">
                    <FeaturedCarousel featured={featured.data} />
                </div>
            </div>
        )
    );
}
