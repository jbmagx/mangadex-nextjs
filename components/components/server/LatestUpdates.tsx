import Link from 'next/link';
import Image from 'next/image';
import Markdown from 'react-markdown';
import { capitalize } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { languages } from '../../constants/languages';
import { calculateTimePassed } from '@/lib/calculateTimePassed';
import { Bookmark, Star } from 'lucide-react';

export default async function LatestUpdates() {
    const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.jbmagx.com';

    const response = await fetch(`${baseURL}/api/projects/mangadex/latest-updates`, {
        next: {
            revalidate: 900,
        },
    });

    if (!response.ok)
        return (
            <div className="flex flex-col w-full mt-8">
                <h1 className="font-semibold text-xl tracking-tight mb-4">Latest Updates</h1>
                <p className="text-red-600 xxs:text-sm">
                    Couldn't load the list of latest updates. Please{' '}
                    <a href="" className="font-semibold">
                        refresh
                    </a>{' '}
                    the page and try again.
                </p>
            </div>
        );

    const latestUpdates: MangaDexListData = await response.json();

    const latestUpdatesStatistics: Record<string, Statistics>[] = [];

    for (let loop = 0; loop < latestUpdates.data.length; loop++) {
        const statisticsResponse = await fetch(`${baseURL}/api/projects/mangadex/manga/${latestUpdates.data[loop].id}/statistics`);
        if (!statisticsResponse.ok) continue;
        const statistics: MangaDexStatisticsData = await statisticsResponse.json();
        latestUpdatesStatistics.push(statistics.statistics);
    }

    return (
        <div className="flex flex-col w-full mt-8">
            <h1 className="font-semibold text-xl tracking-tight mb-4">Latest Updates</h1>

            <div className="flex flex-wrap sm:flex-col xs:flex-col xxs:flex-col xs:justify-between lg:justify-between md:justify-between w-full gap-4 md:gap-4 sm:gap-y-4 xs:gap-y-4 xxs:gap-y-3.5">
                {latestUpdates.data.length > 0 &&
                    latestUpdates.data.map((manga, index) => (
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
                                <Badge
                                    className={`absolute bottom-2 right-2 rounded-lg text-xs select-none font-medium w-fit border-0 duration-300 py-0 h-6 xxs:text-[0.6875rem] xxs:h-5 md:px-1.5 xxs:px-1.5 ${
                                        manga.attributes.status === 'completed'
                                            ? 'bg-green-600 hover:bg-green-600/80'
                                            : manga.attributes.status === 'ongoing'
                                            ? 'bg-blue-600 hover:bg-blue-600/80'
                                            : manga.attributes.status === 'hiatus'
                                            ? 'bg-orange-600 hover:bg-orange-600/80'
                                            : 'bg-red-600 hover:bg-red-600/80'
                                    }`}
                                >
                                    {capitalize(manga.attributes.status)}
                                </Badge>
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

                                    {latestUpdatesStatistics.find((stat) => stat.hasOwnProperty(manga.id))?.[manga.id]?.rating?.bayesian && (
                                        <div className="flex items-center justify-center gap-x-1 text-orange-600 [&>svg]:size-4 xxs:[&>svg]:size-3">
                                            <Star />
                                            <span className="text-sm xxs:text-xs font-medium">
                                                {latestUpdatesStatistics.find((stat) => stat.hasOwnProperty(manga.id))?.[manga.id].rating.bayesian.toFixed(2)}
                                            </span>
                                        </div>
                                    )}

                                    {latestUpdatesStatistics.find((stat) => stat.hasOwnProperty(manga.id))?.[manga.id]?.follows && (
                                        <div className="flex items-center justify-center gap-x-1 text-orange-600 [&>svg]:size-4 xxs:[&>svg]:size-3">
                                            <Bookmark />
                                            <span className="text-sm xxs:text-xs font-medium">
                                                {(latestUpdatesStatistics.find((stat) => stat.hasOwnProperty(manga.id))?.[manga.id].follows as number) > 9999
                                                    ? `${((latestUpdatesStatistics.find((stat) => stat.hasOwnProperty(manga.id))?.[manga.id].follows as number) / 1000).toFixed(
                                                          1
                                                      )}K`
                                                    : latestUpdatesStatistics.find((stat) => stat.hasOwnProperty(manga.id))?.[manga.id].follows}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <p className="text-xs xxs:text-[0.6875rem] text-muted-foreground mt-1 md:mt-0.5 xs:mt-0.5 xxs:mt-0.5">
                                    {calculateTimePassed(manga.attributes.updatedAt)}
                                </p>

                                {manga?.attributes?.description?.en && (
                                    <Markdown className="line-clamp-4 mt-2.5 sm:mt-2 xs:mt-2 xxs:mt-2 [&>*]:text-sm xs:[&>*]:text-xs xxs:[&>*]:text-xs [&>*]:text-muted-foreground [&>p]:mb-2 [&>hr]:my-2 [&>ul]:text-sm [&>ul]:pl-3.5 [&>ul>li]:list-disc [&_*_a]:text-orange-600">
                                        {manga?.attributes?.description?.en}
                                    </Markdown>
                                )}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
