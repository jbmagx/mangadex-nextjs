'use client';

import { createContext, PropsWithChildren, useContext, useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { capitalize } from '@/lib/utils';
import { languages } from '@/app/projects/mangadex/constants/languages';
import { Button } from '@/components/custom/Button';
import { Skeleton } from '@/components/ui/skeleton';
import { Bookmark, Star, RotateCw } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { calculateTimePassed } from '@/lib/calculateTimePassed';
import Link from 'next/link';
import Image from 'next/image';
import Markdown from 'react-markdown';

type MangaDexCardContext = {
    mangaDexGetMangaDataItem: MangaDexGetMangaDataItem;
};

const MangaDexCardContext = createContext<MangaDexCardContext | undefined>(undefined);

function useMangaDexCardContext() {
    const context = useContext(MangaDexCardContext);
    if (!context) throw new Error('useMangaDexCardContext must be used within a MangaDexCard');
    return context;
}

type MangaDexCardProps = PropsWithChildren & {
    mangaDexGetMangaDataItem: MangaDexGetMangaDataItem;
};

export default function MangaDexCard({ children, mangaDexGetMangaDataItem }: MangaDexCardProps) {
    return <MangaDexCardContext.Provider value={{ mangaDexGetMangaDataItem }}>{children}</MangaDexCardContext.Provider>;
}

MangaDexCard.Image = function MangaDexCardImage() {
    const { mangaDexGetMangaDataItem } = useMangaDexCardContext();

    const id = mangaDexGetMangaDataItem.id;

    const coverArtFileName = mangaDexGetMangaDataItem?.relationships?.find((relationship) => relationship.type === 'cover_art')?.attributes?.fileName;

    const originalLanguage = mangaDexGetMangaDataItem.attributes.originalLanguage;
    const altTitles = mangaDexGetMangaDataItem.attributes.altTitles;
    const englishTitle = mangaDexGetMangaDataItem.attributes.title.en;
    const japaneseTitle = mangaDexGetMangaDataItem.attributes.title.ja;

    const title =
        originalLanguage === 'ja' && altTitles.find((title) => title.hasOwnProperty('en'))?.en
            ? altTitles.find((title) => title.hasOwnProperty('en'))?.en
            : englishTitle || japaneseTitle;

    return (
        <Link
            href={`/projects/mangadex/manga/${id}`}
            className="relative flex items-center justify-center w-40 md:w-60 lg:w-64 aspect-[7/10] rounded-xl shadow-sm hover:opacity-80 duration-300"
            scroll={false}
        >
            <Image
                src={coverArtFileName ? `https://mangadex.org/covers/${id}/${coverArtFileName}.512.jpg` : '/images/png/fallback.png'}
                alt={`${title} Cover`}
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
    );
};

MangaDexCard.Status = function MangaDexCardStatus() {
    const { mangaDexGetMangaDataItem } = useMangaDexCardContext();

    return (
        <Badge
            className={`absolute bottom-2 right-2 rounded-lg select-none font-medium w-fit border-0 duration-300 py-0 text-[0.6875rem] xs:text-xs h-5 xs:h-6 px-1.5 md:px-1.5 ${
                mangaDexGetMangaDataItem.attributes.status === 'completed'
                    ? 'bg-green-600 hover:bg-green-600/80'
                    : mangaDexGetMangaDataItem.attributes.status === 'ongoing'
                    ? 'bg-blue-600 hover:bg-blue-600/80'
                    : mangaDexGetMangaDataItem.attributes.status === 'hiatus'
                    ? 'bg-orange-600 hover:bg-orange-600/80'
                    : 'bg-red-600 hover:bg-red-600/80'
            }`}
        >
            {capitalize(mangaDexGetMangaDataItem.attributes.status)}
        </Badge>
    );
};

MangaDexCard.Title = function MangaDexCardTitle() {
    const { mangaDexGetMangaDataItem } = useMangaDexCardContext();

    const id = mangaDexGetMangaDataItem.id;

    const originalLanguage = mangaDexGetMangaDataItem.attributes.originalLanguage;
    const altTitles = mangaDexGetMangaDataItem.attributes.altTitles;
    const englishTitle = mangaDexGetMangaDataItem.attributes.title.en;
    const japaneseTitle = mangaDexGetMangaDataItem.attributes.title.ja;

    const title =
        originalLanguage === 'ja' && altTitles.find((title) => title.hasOwnProperty('en'))?.en
            ? altTitles.find((title) => title.hasOwnProperty('en'))?.en
            : englishTitle || japaneseTitle;

    return (
        <Link href={`/projects/mangadex/manga/${id}`} className="hover:text-orange-600 duration-300 w-fit" scroll={false}>
            <h1 className="font-medium text-base sm:text-lg line-clamp-2 sm:line-clamp-1 md:line-clamp-2">{title}</h1>
        </Link>
    );
};

MangaDexCard.OriginalLanguage = function MangaDexCardOriginalLanguage() {
    const { mangaDexGetMangaDataItem } = useMangaDexCardContext();

    const originalLanguage = mangaDexGetMangaDataItem.attributes.originalLanguage;

    return (
        languages.find((language) => language.code === originalLanguage) && (
            <span className="text-xl xs:text-2xl lg:text-3xl leading-[0] mr-0.5">{languages.find((language) => language.code === originalLanguage)?.flag}</span>
        )
    );
};

MangaDexCard.Statistics = function MangaDexCardStatistics() {
    const { mangaDexGetMangaDataItem } = useMangaDexCardContext();

    const id = mangaDexGetMangaDataItem.id;

    const [bayesianRating, setBayesianRating] = useState<number | undefined>(undefined);
    const [follows, setFollows] = useState<number | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    const getStatistics = async () => {
        setIsLoading(true);
        setIsError(false);

        try {
            const response = await fetch(`/api/projects/mangadex/manga/${id}/statistics`);
            if (!response.ok) throw new Error('Failed to fetch data.');

            const mangaDexStatisticsResponse: MangaDexGetStatisticsMangaUUIDResponse = await response.json();
            const statistics = mangaDexStatisticsResponse.statistics;
            const bayesianRating = Object.values(statistics)[0].rating.bayesian;
            const follows = Object.values(statistics)[0].follows;

            setBayesianRating(bayesianRating);
            setFollows(follows);
        } catch (error) {
            console.error(error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getStatistics();
    }, []);

    if (isLoading)
        return (
            <>
                <Skeleton className="w-15 h-5 rounded-sm" />
                <Skeleton className="w-15 h-5 rounded-sm" />
            </>
        );

    return isError ? (
        <div className="flex items-center gap-x-0.5">
            <p className="font-semibold text-xs text-red-600">Failed to load.</p>
            <Button variant="light" color="danger" className="h-5 px-1.25 w-fit min-w-10 gap-x-1 rounded-[0.3125rem]" onClick={getStatistics}>
                <span className="font-semibold text-xs">Retry</span>
                <RotateCw size={13} strokeWidth={2.5} />
            </Button>
        </div>
    ) : (
        <>
            {bayesianRating && (
                <div className="flex items-center justify-center gap-x-1 text-orange-600 [&>svg]:size-3 xs:[&>svg]:size-4">
                    <Star />
                    <span className="font-medium text-xs xs:text-sm">{bayesianRating.toFixed(2)}</span>
                </div>
            )}

            {follows && (
                <div className="flex items-center justify-center gap-x-1 text-orange-600 [&>svg]:size-3 xs:[&>svg]:size-4">
                    <Bookmark />
                    <span className="font-medium text-xs xs:text-sm">{follows > 9999 ? `${(follows / 1000).toFixed(1)}K` : follows}</span>
                </div>
            )}
        </>
    );
};

MangaDexCard.LastUpdate = function MangaDexCardLastUpdate() {
    const { mangaDexGetMangaDataItem } = useMangaDexCardContext();

    const updatedAt = mangaDexGetMangaDataItem.attributes.updatedAt;

    const lastUpdate = formatDate(updatedAt, { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
    const timePassed = calculateTimePassed(updatedAt);

    return (
        <p className="text-xs text-muted-foreground mt-1 line-clamp-1 md:line-clamp-none">
            Last update: {lastUpdate} &#8226; {timePassed}
        </p>
    );
};

MangaDexCard.GenresOrThemes = function MangaDexCardGenresOrThemes() {
    const { mangaDexGetMangaDataItem } = useMangaDexCardContext();

    const tags = mangaDexGetMangaDataItem?.attributes?.tags;

    return (
        <div className="flex flex-nowrap md:flex-wrap items-center w-full gap-0.5 mt-2 overflow-x-scroll no-scrollbar">
            {tags
                .filter((tag) => tag.attributes.group === 'genre' || tag.attributes.group === 'theme')
                .sort((a, b) => a.attributes.name.en.localeCompare(b.attributes.name.en))
                .map((tag, index) => (
                    <Badge variant="outline" className="bg-black text-white font-medium rounded-full text-nowrap" key={index}>
                        {tag.attributes.name.en}
                    </Badge>
                ))}
        </div>
    );
};

MangaDexCard.Description = function MangaDexCardDescription() {
    const { mangaDexGetMangaDataItem } = useMangaDexCardContext();

    const description = mangaDexGetMangaDataItem?.attributes?.description?.en;

    return (
        description && (
            <Markdown className="line-clamp-[8] sm:line-clamp-5 md:line-clamp-[8] mt-2 md:mt-4 [&>p]:text-sm [&>p]:text-muted-foreground [&>p]:mb-2 [&>hr]:my-2 [&>ul]:text-sm [&>ul]:pl-3.5 [&>ul>li]:list-disc [&_*_a]:text-orange-600">
                {description}
            </Markdown>
        )
    );
};
