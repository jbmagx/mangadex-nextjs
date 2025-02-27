import Link from 'next/link';
import Image from 'next/image';
import Markdown from 'react-markdown';
import { languages } from '../../constants/languages';
import { ArrowRight, Bookmark, Star } from 'lucide-react';

export default async function Completed() {
    const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.jbmagx.com';

    const response = await fetch(`${baseURL}/api/projects/mangadex/completed?limit=12&offset=0`, {
        next: {
            revalidate: 86400,
        },
    });

    if (!response.ok)
        return (
            <div className="flex flex-col w-full mt-8">
                <h1 className="font-semibold text-xl tracking-tight mb-4">Completed</h1>
                <p className="text-red-600 xxs:text-sm">
                    Couldn't load the list of completed manga, manhwa, and manhua. Please{' '}
                    <a href="" className="font-semibold">
                        refresh
                    </a>{' '}
                    the page and try again.
                </p>
            </div>
        );

    const completed: MangaDexListData = await response.json();

    const completedStatistics: Record<string, Statistics>[] = [];

    for (let loop = 0; loop < completed.data.length; loop++) {
        const statisticsResponse = await fetch(`${baseURL}/api/projects/mangadex/manga/${completed.data[loop].id}/statistics`);
        if (!statisticsResponse.ok) continue;
        const statistics: MangaDexStatisticsData = await statisticsResponse.json();
        completedStatistics.push(statistics.statistics);
    }

    return (
        <div className="flex flex-col w-full mt-8">
            <h1 className="font-semibold text-xl tracking-tight mb-4">Completed</h1>

            <div className="flex flex-wrap sm:flex-col xs:flex-col xxs:flex-col xs:justify-between lg:justify-between md:justify-between w-full gap-4 md:gap-4 sm:gap-y-4 xs:gap-y-4 xxs:gap-y-3.5">
                {completed.data.length > 0 &&
                    completed.data.map((manga, index) => (
                        <div
                            key={index}
                            className="flex items-start xl:w-[calc(50%-8px)] lg:w-[calc(50%-8px)] md:w-[calc(50%-8px)] w-full xl:gap-x-4 lg:gap-x-4 md:gap-x-4 sm:gap-x-4 xs:gap-x-4 xxs:gap-x-3.5"
                        >
                            <Link
                                href={`/projects/mangadex/manga/${manga.id}`}
                                className="relative flex items-center justify-center w-32 xs:w-28 xxs:w-24 aspect-[7/10] rounded-xl shadow-sm hover:opacity-80 duration-300"
                                scroll={false}
                            >
                                <Image
                                    src={
                                        manga?.relationships?.find((relationship) => relationship.type === 'cover_art')?.attributes?.fileName
                                            ? `https://mangadex.org/covers/${manga.id}/${
                                                  manga.relationships.find((relationship) => relationship.type === 'cover_art')?.attributes.fileName
                                              }.512.jpg`
                                            : '/images/png/fallback.png'
                                    }
                                    alt={`${manga.attributes.title} Cover`}
                                    fill={true}
                                    priority={true}
                                    sizes="33vw"
                                    style={{
                                        objectFit: 'cover',
                                        borderRadius: '12px',
                                        border: '1px solid hsl(var(--border))',
                                    }}
                                />
                            </Link>

                            <div className="flex flex-col w-[calc(100%-8rem-16px)] md:w-[calc(100%-8rem-16px)] sm:w-[calc(100%-8rem-16px)] xs:w-[calc(100%-7rem-16px)] xxs:w-[calc(100%-96px-14px)]">
                                <Link href={`/projects/mangadex/manga/${manga.id}`} className="hover:text-orange-600 duration-300" scroll={false}>
                                    <h1 className="font-medium text-[0.9375rem] xs:text-sm xxs:text-sm line-clamp-2 xxs:line-clamp-1">
                                        {manga.attributes.originalLanguage === 'ja' && manga.attributes.altTitles.find((title) => title.hasOwnProperty('en'))?.en
                                            ? manga.attributes.altTitles.find((title) => title.hasOwnProperty('en'))?.en
                                            : manga.attributes.title.en || manga.attributes.title.ja}
                                    </h1>
                                </Link>

                                <div className="flex items-center gap-x-2 sm:mt-1 mt-0.5 min-h-5">
                                    {languages.find((language) => language.code === manga.attributes.originalLanguage) && (
                                        <span className="text-3xl md:text-2xl xs:text-2xl xxs:text-lg leading-[0] md:leading-[0] xs:leading-[0] xxs:leading-[0] mr-0.5">
                                            {languages.find((language) => language.code === manga.attributes.originalLanguage)?.flag}
                                        </span>
                                    )}

                                    {completedStatistics.find((stat) => stat.hasOwnProperty(manga.id))?.[manga.id]?.rating?.bayesian && (
                                        <div className="flex items-center justify-center gap-x-1 text-orange-600 [&>svg]:size-4 xxs:[&>svg]:size-3">
                                            <Star />
                                            <span className="text-sm xxs:text-xs font-medium">
                                                {completedStatistics.find((stat) => stat.hasOwnProperty(manga.id))?.[manga.id]?.rating?.bayesian.toFixed(2)}
                                            </span>
                                        </div>
                                    )}

                                    {completedStatistics.find((stat) => stat.hasOwnProperty(manga.id))?.[manga.id]?.follows && (
                                        <div className="flex items-center justify-center gap-x-1 text-orange-600 [&>svg]:size-4 xxs:[&>svg]:size-3">
                                            <Bookmark />
                                            <span className="text-sm xxs:text-xs font-medium">
                                                {(completedStatistics.find((stat) => stat.hasOwnProperty(manga.id))?.[manga.id]?.follows as number) > 9999
                                                    ? `${((completedStatistics.find((stat) => stat.hasOwnProperty(manga.id))?.[manga.id]?.follows as number) / 1000).toFixed(1)}K`
                                                    : completedStatistics.find((stat) => stat.hasOwnProperty(manga.id))?.[manga.id]?.follows}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {manga?.attributes?.description?.en && (
                                    <Markdown className="line-clamp-4 mt-2.5 sm:mt-2 xs:mt-2 xxs:mt-2 [&>*]:text-sm xs:[&>*]:text-xs xxs:[&>*]:text-xs [&>*]:text-muted-foreground [&>p]:mb-2 [&>hr]:my-2 [&>ul]:text-sm [&>ul]:pl-3.5 [&>ul>li]:list-disc [&_*_a]:text-orange-600">
                                        {manga?.attributes?.description?.en}
                                    </Markdown>
                                )}
                            </div>
                        </div>
                    ))}
            </div>

            <Link
                href="/projects/mangadex/completed?page=1"
                className="flex items-center justify-center gap-x-2 mt-4 h-10 w-full bg-orange-600 text-white text-sm uppercase font-medium rounded-lg hover:opacity-80 duration-300"
                scroll={false}
            >
                <span>See All</span>
                <ArrowRight size={16} />
            </Link>
        </div>
    );
}
