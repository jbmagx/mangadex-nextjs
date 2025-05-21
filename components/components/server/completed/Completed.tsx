import Link from 'next/link';
import CompletedCard from './components/CompletedCard';
import { ArrowRight } from 'lucide-react';
import { baseURL } from '@/app/projects/mangadex/constants/base-url';

export default async function Completed() {
    const response = await fetch(`${baseURL}/api/projects/mangadex/completed?limit=12&offset=0`, {
        next: {
            revalidate: 86400,
        },
    });

    if (!response.ok)
        return (
            <div className="flex flex-col w-full gap-y-4">
                <h1 className="font-semibold text-xl tracking-tight">Completed</h1>
                <p className="text-red-600 xxs:text-sm">
                    Couldn't load the list of completed manga, manhwa, and manhua. Please{' '}
                    <a href="" className="font-semibold">
                        refresh
                    </a>{' '}
                    the page and try again.
                </p>
            </div>
        );

    const completed: MangaDexGetMangaResponse = await response.json();

    return (
        completed.data.length > 0 && (
            <div className="flex flex-col w-full gap-y-4">
                <h1 className="font-semibold text-xl tracking-tight">Completed</h1>

                <div className="flex flex-col md:flex-row md:flex-wrap justify-start xs:justify-between sm:justify-start md:justify-between w-full gap-y-3.5 xs:gap-y-4 md:gap-4">
                    {completed.data.map((mangaDexGetMangaDataItem, index) => (
                        <CompletedCard key={index} mangaDexGetMangaDataItem={mangaDexGetMangaDataItem} />
                    ))}
                </div>

                <Link
                    href="/projects/mangadex/completed?page=1"
                    className="flex items-center justify-center gap-x-2 h-10 w-full bg-orange-600 text-white text-sm uppercase font-medium rounded-lg hover:opacity-80 duration-300"
                    scroll={false}
                >
                    <span>See All</span>
                    <ArrowRight size={16} />
                </Link>
            </div>
        )
    );
}
