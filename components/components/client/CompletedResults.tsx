'use client';

import { useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { languages } from '@/app/projects/mangadex/constants/languages';
import { useEffect, useState } from 'react';
import { Bookmark, Loader2, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Markdown from 'react-markdown';
import CompletedPagination from './CompletedPagination';

export default function CompletedResults() {
    const searchParams = useSearchParams();

    const page = searchParams.get('page');

    if (!page) throw new Error('Missing required search params.');

    const limit = 10;

    const offset = (page ? parseInt(page) - 1 : 1 - 1) * limit;

    const [mangaFilter, setMangaFilter] = useState<boolean>();
    const [manhwaFilter, setManhwaFilter] = useState<boolean>();
    const [manhuaFilter, setManhuaFilter] = useState<boolean>();

    const [completedResultsList, setCompletedResultsList] = useState<MangaDexListData>();
    const [completedResultsListStatistics, setCompletedResultsListStatistics] = useState<Record<string, Statistics>[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [fetchError, setFetchError] = useState<string>('');

    useEffect(() => {
        const completedResultsFilterLocalStorage = localStorage.getItem('completedResultsFilter');
        const mangaFilter = completedResultsFilterLocalStorage ? JSON.parse(completedResultsFilterLocalStorage).manga : true;
        const manhwaFilter = completedResultsFilterLocalStorage ? JSON.parse(completedResultsFilterLocalStorage).manhwa : true;
        const manhuaFilter = completedResultsFilterLocalStorage ? JSON.parse(completedResultsFilterLocalStorage).manhua : true;

        if (completedResultsFilterLocalStorage) {
            setMangaFilter(mangaFilter);
            setManhwaFilter(manhwaFilter);
            setManhuaFilter(manhuaFilter);
        } else {
            setMangaFilter(true);
            setManhwaFilter(true);
            setManhuaFilter(true);
            localStorage.setItem(
                'completedResultsFilter',
                JSON.stringify({
                    manga: true,
                    manhwa: true,
                    manhua: true,
                })
            );
        }

        const loadMangaDexCompleted = async () => {
            try {
                setIsLoading(true);

                const completedResultsListResponse = await fetch(
                    `/api/projects/mangadex/completed?limit=${limit}&offset=${offset}&manga=${mangaFilter}&manhwa=${manhwaFilter}&manhua=${manhuaFilter}`
                );
                if (!completedResultsListResponse.ok) throw new Error('Oops! Something went wrong while fetching the results. Please try again.');
                const completedResultsList = await completedResultsListResponse.json();

                const completedResultsListStatistics = [];
                for (let loop = 0; loop < completedResultsList.data.length; loop++) {
                    const completedResultStatisticsResponse = await fetch(`/api/projects/mangadex/manga/${completedResultsList.data[loop].id}/statistics`);
                    if (!completedResultStatisticsResponse.ok) throw new Error('Oops! Something went wrong while fetching the results. Please try again.');
                    const completedResultStatistics = await completedResultStatisticsResponse.json();
                    completedResultsListStatistics.push(completedResultStatistics.statistics);
                }

                setCompletedResultsList(completedResultsList);
                setCompletedResultsListStatistics(completedResultsListStatistics);
            } catch (error) {
                console.error(error);
                setFetchError('Oops! Something went wrong while fetching the results. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        loadMangaDexCompleted();
    }, [page, limit, offset]);

    if (isLoading)
        return (
            <div className="relative flex items-center justify-center w-full my-28">
                <Loader2 width={160} height={160} strokeWidth="0.625" className="animate-loading-spin" />

                <div className="absolute self-center dark:invert">
                    <Image src="/images/svg/jbmagx.svg" alt="jbmagx logo" width={48} height={48} priority={true} />
                </div>
            </div>
        );

    return (
        <>
            {typeof mangaFilter === 'boolean' && (
                <div className="flex items-center gap-x-4 mb-6 overflow-x-scroll overflow-y-hidden no-scrollbar">
                    <h2 className="text-xs font-semibold uppercase">Filter</h2>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="manga-filter"
                            checked={mangaFilter}
                            onCheckedChange={(checked) => {
                                setMangaFilter(checked as boolean);
                                localStorage.setItem(
                                    'completedResultsFilter',
                                    JSON.stringify({
                                        manga: checked,
                                        manhwa: manhwaFilter,
                                        manhua: manhuaFilter,
                                    })
                                );
                                window.location.reload();
                            }}
                            className="data-[state=checked]:bg-black data-[state=checked]:text-white border-black"
                        />
                        <label htmlFor="manga-filter" className="text-nowrap text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Manga (Japan)
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="manhwa-filter"
                            checked={manhwaFilter}
                            onCheckedChange={(checked) => {
                                setManhwaFilter(checked as boolean);
                                localStorage.setItem(
                                    'completedResultsFilter',
                                    JSON.stringify({
                                        manga: mangaFilter,
                                        manhwa: checked,
                                        manhua: manhuaFilter,
                                    })
                                );
                                window.location.reload();
                            }}
                            className="data-[state=checked]:bg-black data-[state=checked]:text-white border-black"
                        />
                        <label htmlFor="manhwa-filter" className="text-nowrap text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Manhwa (Korea)
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="manhua-filter"
                            checked={manhuaFilter}
                            onCheckedChange={(checked) => {
                                setManhuaFilter(checked as boolean);
                                localStorage.setItem(
                                    'completedResultsFilter',
                                    JSON.stringify({
                                        manga: mangaFilter,
                                        manhwa: manhwaFilter,
                                        manhua: checked,
                                    })
                                );
                                window.location.reload();
                            }}
                            className="data-[state=checked]:bg-black data-[state=checked]:text-white border-black"
                        />
                        <label htmlFor="manhua-filter" className="text-nowrap text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Manhua (China)
                        </label>
                    </div>
                </div>
            )}

            <div className="flex flex-col w-full gap-y-6 sm:gap-y-4 xs:gap-y-4 xxs:gap-y-4">
                {fetchError && (
                    <div className="flex flex-col items-center w-full my-20">
                        <p className="text-medium text-muted-foreground">{fetchError}</p>
                    </div>
                )}

                {completedResultsList &&
                    (completedResultsList.data.length === 0 ? (
                        <div className="flex flex-col items-center w-full my-20">
                            <p className="text-medium text-muted-foreground">No results found.</p>
                        </div>
                    ) : (
                        <>
                            {completedResultsList.data.map((manga, index) => (
                                <div key={index} className="flex items-start w-full xl:gap-x-6 lg:gap-x-6 md:gap-x-6 sm:gap-x-4 xs:gap-x-4 xxs:gap-x-4">
                                    <Link
                                        href={`/projects/mangadex/manga/${manga.id}`}
                                        className="relative flex items-center justify-center w-56 sm:w-32 xs:w-28 xxs:w-24 aspect-[7/10] rounded-xl shadow-sm hover:opacity-80 duration-300"
                                    >
                                        <Image
                                            src={
                                                manga?.relationships?.find((relationship) => relationship.type === 'cover_art')?.attributes?.fileName
                                                    ? `https://mangadex.org/covers/${manga.id}/${
                                                          manga.relationships.find((relationship) => relationship.type === 'cover_art')?.attributes.fileName
                                                      }`
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

                                    <div className="flex flex-col w-[calc(100%-8rem-16px)] md:w-[calc(100%-8rem-16px)] sm:w-[calc(100%-8rem-16px)] xs:w-[calc(100%-7rem-16px)] xxs:w-[calc(100%-96px-16px)]">
                                        <Link href={`/projects/mangadex/manga/${manga.id}`} className="hover:text-orange-600 duration-300" scroll={false}>
                                            <h1 className="font-medium text-[0.9375rem] xs:text-sm xxs:text-sm line-clamp-2 xxs:line-clamp-1">
                                                {manga.attributes.originalLanguage === 'ja' && manga.attributes.altTitles.find((title) => title.hasOwnProperty('en'))?.en
                                                    ? manga.attributes.altTitles.find((title) => title.hasOwnProperty('en'))?.en
                                                    : manga.attributes.title.en || manga.attributes.title.ja}
                                            </h1>
                                        </Link>

                                        <div className="flex items-center gap-x-2 sm:mt-1 mt-0.5">
                                            {languages.find((language) => language.code === manga.attributes.originalLanguage) && (
                                                <span className="text-3xl md:text-2xl xs:text-2xl xxs:text-lg leading-[0] md:leading-[0] xs:leading-[0] xxs:leading-[0] mr-0.5">
                                                    {languages.find((language) => language.code === manga.attributes.originalLanguage)?.flag}
                                                </span>
                                            )}

                                            <div className="flex items-center justify-center gap-x-1 text-orange-600 [&>svg]:size-4 xxs:[&>svg]:size-3">
                                                <Star />
                                                <span className="text-sm xxs:text-xs font-medium">
                                                    {completedResultsListStatistics.find((stat) => stat.hasOwnProperty(manga.id))?.[manga.id]?.rating?.bayesian.toFixed(2)}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-center gap-x-1 text-orange-600 [&>svg]:size-4 xxs:[&>svg]:size-3">
                                                <Bookmark />
                                                {completedResultsListStatistics.find((stat) => stat.hasOwnProperty(manga.id))?.[manga.id]?.follows && (
                                                    <span className="text-sm xxs:text-xs font-medium">
                                                        {(completedResultsListStatistics.find((stat) => stat.hasOwnProperty(manga.id))?.[manga.id]?.follows as number) > 9999
                                                            ? `${(
                                                                  (completedResultsListStatistics.find((stat) => stat.hasOwnProperty(manga.id))?.[manga.id]?.follows as number) /
                                                                  1000
                                                              ).toFixed(1)}K`
                                                            : completedResultsListStatistics.find((stat) => stat.hasOwnProperty(manga.id))?.[manga.id]?.follows}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex sm:hidden xs:hidden xxs:hidden flex-wrap items-center w-full gap-0.5 mt-2">
                                            {manga?.attributes?.tags
                                                .filter((tag) => tag.attributes.group === 'genre' || tag.attributes.group === 'theme')
                                                .sort((a, b) => a.attributes.name.en.localeCompare(b.attributes.name.en))
                                                .map((tag, index) => (
                                                    <Badge variant="outline" className="bg-black text-white font-medium rounded-full text-nowrap" key={index}>
                                                        {tag.attributes.name.en}
                                                    </Badge>
                                                ))}
                                        </div>

                                        {manga?.attributes?.description?.en && (
                                            <Markdown className="xl:line-clamp-[7] lg:line-clamp-[7] md:line-clamp-[7] line-clamp-4 mt-2.5 sm:mt-2 xs:mt-2 xxs:mt-2 [&>*]:text-sm xs:[&>*]:text-xs xxs:[&>*]:text-xs [&>*]:text-muted-foreground [&>p]:mb-2 [&>hr]:my-2 [&>ul]:text-sm [&>ul]:pl-3.5 [&>ul>li]:list-disc [&_*_a]:text-orange-600">
                                                {manga?.attributes?.description?.en}
                                            </Markdown>
                                        )}
                                    </div>
                                </div>
                            ))}

                            <CompletedPagination
                                currentPage={page ? parseInt(page) : 1}
                                totalPages={Math.ceil(completedResultsList.total / limit) > 999 ? 999 : Math.ceil(completedResultsList.total / limit)}
                            />
                        </>
                    ))}
            </div>
        </>
    );
}
