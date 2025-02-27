import { Badge } from '@/components/ui/badge';
import { Bookmark, Star } from 'lucide-react';
import { capitalize, formatDate } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { languages } from '../../constants/languages';
import { calculateTimePassed } from '@/lib/calculateTimePassed';
import { checkVolumeCompleteness } from '../../lib/checkVolumeCompleteness';
import Image from 'next/image';
import Link from 'next/link';
import MangaDexLayout from '../../components/server/MangaDexLayout';
import Markdown from 'react-markdown';

// Unfortunately, we can't use generateStaticParams as localhost only works during development.
// The only allowed domains by MangaDex in production are those owned by Mangadex, and localhost.
// import { featuredIds } from '../../constants/featured-ids';
// export async function generateStaticParams() {
//     return featuredIds.map((id) => ({
//         id: id,
//     }));
// }

// Dynamic metadata
export async function generateMetadata({ params }: MangaProps) {
    const { id } = await params;

    const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.jbmagx.com';

    const mangaResponse = await fetch(`${baseURL}/api/projects/mangadex/manga/${id}`);
    const manga: Manga = await mangaResponse.json();

    const originalLanguage = manga.data.attributes?.originalLanguage;
    const alternativeEnglishLanguage = manga.data.attributes?.altTitles?.find((title) => title.hasOwnProperty('en'))?.en;
    const englishLanguage = manga.data.attributes?.title?.en;
    const japaneseLanguage = manga.data.attributes?.title?.ja;
    const englishDescription = manga.data.attributes?.description?.en;
    const relationships = manga.data.relationships;
    const coverArtFileName = relationships?.find((relationship) => relationship.type === 'cover_art')?.attributes?.fileName;

    return {
        metadataBase: new URL(process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.jbmagx.com'),
        title: `jbmagx | MangaDex | ${originalLanguage === 'ja' && alternativeEnglishLanguage ? alternativeEnglishLanguage : englishLanguage || japaneseLanguage}`,
        description: englishDescription,
        openGraph: {
            images: [`https://mangadex.org/covers/${id}/${coverArtFileName}.512.jpg`],
        },
    };
}

type MangaProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function Manga({ params }: MangaProps) {
    const { id } = await params;

    const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.jbmagx.com';

    const mangaResponse = await fetch(`${baseURL}/api/projects/mangadex/manga/${id}`);
    const manga: Manga = await mangaResponse.json();

    const mangaAggregateResponse = await fetch(`${baseURL}/api/projects/mangadex/manga/${id}/aggregate`);
    const mangaAggregate: MangaAggregate = await mangaAggregateResponse.json();

    const mangaStatisticsResponse = await fetch(`${baseURL}/api/projects/mangadex/manga/${id}/statistics`);
    const mangaStatisticsData: MangaDexStatisticsData = await mangaStatisticsResponse.json();
    const mangaStatistics = mangaStatisticsData.statistics;

    if (!manga.data) throw new Error('Manga data not found.');

    const relationships = manga.data.relationships;
    const coverArtFileName = relationships?.find((relationship) => relationship.type === 'cover_art')?.attributes?.fileName;
    const title = manga.data.attributes?.title?.en;
    const status = manga.data.attributes?.status;
    const originalLanguage = manga.data.attributes?.originalLanguage;
    const alternativeEnglishLanguage = manga.data.attributes?.altTitles?.find((title) => title.hasOwnProperty('en'))?.en;
    const englishLanguage = manga.data.attributes?.title?.en;
    const japaneseLanguage = manga.data.attributes?.title?.ja;
    const bayesianRating = mangaStatistics[id]?.rating?.bayesian?.toFixed(2);
    const follows = mangaStatistics[id]?.follows;
    const updatedAt = manga.data.attributes?.updatedAt;
    const tags = manga.data.attributes?.tags;
    const englishDescription = manga.data.attributes?.description?.en;

    return (
        <MangaDexLayout>
            <div className="flex flex-col w-full">
                <div className="flex sm:flex-wrap xs:flex-wrap xxs:flex-wrap items-start sm:justify-center xs:justify-center xxs:justify-center w-full gap-x-6 sm:gap-y-4 xs:gap-y-3.5 xxs:gap-y-3.5">
                    <div className="relative flex items-center justify-center w-[224px] sm:w-48 xs:w-44 xxs:w-40 aspect-[7/10] rounded-xl shadow-sm hover:opacity-80 duration-300">
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
                        <Badge
                            className={`absolute bottom-2 right-2 rounded-lg text-xs select-none font-medium w-fit border-0 duration-300 py-0 h-6 ${
                                status === 'completed'
                                    ? 'bg-green-600 hover:bg-green-600/80'
                                    : status === 'ongoing'
                                    ? 'bg-blue-600 hover:bg-blue-600/80'
                                    : status === 'hiatus'
                                    ? 'bg-orange-600 hover:bg-orange-600/80'
                                    : 'bg-red-600 hover:bg-red-600/80'
                            }`}
                        >
                            {capitalize(status)}
                        </Badge>
                    </div>

                    <div className="flex flex-col items-start w-[calc(100%-224px-24px)] sm:w-full xs:w-full xxs:w-full">
                        <h1 className="font-semibold">
                            {originalLanguage === 'ja' && alternativeEnglishLanguage ? alternativeEnglishLanguage : englishLanguage || japaneseLanguage}
                        </h1>

                        <div className="flex items-center gap-x-2 sm:mt-1 mt-0.5">
                            {languages.find((language) => language.code === originalLanguage) && (
                                <span className="text-3xl md:text-2xl xs:text-2xl xxs:text-lg leading-[0] md:leading-[0] xs:leading-[0] xxs:leading-[0] mr-0.5">
                                    {languages.find((language) => language.code === originalLanguage)?.flag}
                                </span>
                            )}

                            <div className="flex items-center justify-center gap-x-1 text-orange-600 [&>svg]:size-4 xxs:[&>svg]:size-3">
                                <Star />
                                <span className="text-sm xxs:text-xs font-medium">{bayesianRating}</span>
                            </div>

                            <div className="flex items-center justify-center gap-x-1 text-orange-600 [&>svg]:size-4 xxs:[&>svg]:size-3">
                                <Bookmark />
                                {follows && <span className="text-sm xxs:text-xs font-medium">{(follows as number) > 9999 ? `${(follows / 1000).toFixed(1)}K` : follows}</span>}
                            </div>
                        </div>

                        <p className="text-xs text-muted-foreground mt-1 xxs:line-clamp-1">
                            Last update: {formatDate(updatedAt, { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })} &#8226;{' '}
                            {calculateTimePassed(updatedAt)}
                        </p>

                        <div className="flex flex-col w-full gap-y-1.5 mt-4 sm:mt-3 xs:mt-2.5 xxs:mt-2.5">
                            <div className="flex flex-col w-full">
                                <h2 className="font-semibold text-xs uppercase">Author:</h2>
                                <Badge variant="outline" className="w-fit bg-black text-white font-medium rounded-full text-nowrap">
                                    {relationships?.find((relationship) => relationship.type === 'author')?.attributes?.name as string}
                                </Badge>
                            </div>

                            <div className="flex flex-col w-full">
                                <h2 className="font-semibold text-xs uppercase">Artist:</h2>
                                <Badge variant="outline" className="w-fit bg-black text-white font-medium rounded-full text-nowrap">
                                    {relationships?.find((relationship) => relationship.type === 'artist')?.attributes?.name as string}
                                </Badge>
                            </div>

                            {tags && (
                                <>
                                    {tags.filter((tag) => tag.attributes.group === 'genre').length > 0 && (
                                        <div className="flex flex-col w-full">
                                            <h2 className="font-semibold text-xs uppercase">Genres</h2>
                                            <div className="flex flex-wrap sm:flex-nowrap xs:flex-nowrap xxs:flex-nowrap items-center w-full gap-0.5 sm:no-scrollbar sm:overflow-x-scroll xs:no-scrollbar xs:overflow-x-scroll xxs:no-scrollbar xxs:overflow-x-scroll">
                                                {tags
                                                    .filter((tag) => tag.attributes.group === 'genre')
                                                    .sort((a, b) => a.attributes.name.en.localeCompare(b.attributes.name.en))
                                                    .map((tag, index) => (
                                                        <Badge variant="outline" className="bg-black text-white font-medium rounded-full text-nowrap" key={index}>
                                                            {tag.attributes.name.en}
                                                        </Badge>
                                                    ))}
                                            </div>
                                        </div>
                                    )}

                                    {tags.filter((tag) => tag.attributes.group === 'theme').length > 0 && (
                                        <div className="flex flex-col w-full">
                                            <h2 className="font-semibold text-xs uppercase">Theme</h2>
                                            <div className="flex flex-wrap sm:flex-nowrap xs:flex-nowrap xxs:flex-nowrap items-center w-full gap-0.5 sm:no-scrollbar sm:overflow-x-scroll xs:no-scrollbar xs:overflow-x-scroll xxs:no-scrollbar xxs:overflow-x-scroll">
                                                {tags
                                                    .filter((tag) => tag.attributes.group === 'theme')
                                                    .sort((a, b) => a.attributes.name.en.localeCompare(b.attributes.name.en))
                                                    .map((tag, index) => (
                                                        <Badge variant="outline" className="bg-black text-white font-medium rounded-full text-nowrap" key={index}>
                                                            {tag.attributes.name.en}
                                                        </Badge>
                                                    ))}
                                            </div>
                                        </div>
                                    )}

                                    {tags.filter((tag) => tag.attributes.group === 'format').length > 0 && (
                                        <div className="flex flex-col w-full">
                                            <h2 className="font-semibold text-xs uppercase">Format</h2>
                                            <div className="flex flex-wrap sm:flex-nowrap xs:flex-nowrap xxs:flex-nowrap items-center w-full gap-0.5 sm:no-scrollbar sm:overflow-x-scroll xs:no-scrollbar xs:overflow-x-scroll xxs:no-scrollbar xxs:overflow-x-scroll">
                                                {tags
                                                    .filter((tag) => tag.attributes.group === 'format')
                                                    .sort((a, b) => a.attributes.name.en.localeCompare(b.attributes.name.en))
                                                    .map((tag, index) => (
                                                        <Badge variant="outline" className="bg-black text-white font-medium rounded-full text-nowrap" key={index}>
                                                            {tag.attributes.name.en}
                                                        </Badge>
                                                    ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {englishDescription && (
                    <Markdown className="mt-6 sm:mt-4 xs:mt-3.5 xxs:mt-3.5 [&>*]:text-sm [&>p]:mb-2 [&>hr]:my-4 [&>ul]:text-sm [&>ul]:pl-3.5 [&>ul>li]:list-disc [&_*_a]:text-orange-600">
                        {englishDescription}
                    </Markdown>
                )}

                <div className="flex flex-col w-full mt-6">
                    <h2 className="font-semibold uppercase mb-4 text-sm">Chapters</h2>

                    {Object.keys(mangaAggregate?.volumes).map((volumeKey, index) => {
                        const volume = mangaAggregate?.volumes[volumeKey];
                        const volumeFirstChapter = Object.keys(volume.chapters).sort((a, b) => parseFloat(a) - parseFloat(b))[0];
                        const volumeLastChapter = Object.keys(volume.chapters).sort((a, b) => parseFloat(a) - parseFloat(b))[
                            Object.keys(volume.chapters).sort((a, b) => parseFloat(a) - parseFloat(b)).length - 1
                        ];

                        const chaptersList: string[] = [];
                        Object.keys(volume.chapters)
                            .sort((a, b) => parseInt(a) - parseInt(b))
                            .map((chapter) => chaptersList.push(`Chapter ${chapter}`));

                        const { isComplete, chapterCount, expectedChapterCount, missingChapters } = checkVolumeCompleteness(chaptersList);

                        return (
                            <Accordion key={volumeKey} type="single" collapsible className="w-full space-y-2">
                                <AccordionItem value={volumeKey} className="rounded-lg border bg-background px-4 py-1 mb-2">
                                    <AccordionTrigger className="justify-start gap-3 py-2 text-[15px] leading-6 hover:no-underline hover:text-orange-600 [&>svg]:-order-1 [&>svg]:hover:text-orange-600">
                                        <div className="flex flex-wrap items-center w-full text-sm">
                                            <h3 className="min-w-[5.5rem] xs:w-full">{volume.volume === 'none' ? 'No Volume' : `Volume ${volume.volume}`}</h3>
                                            <p className="font-normal xs:w-full xxs:w-full">
                                                {isComplete ? 'Complete' : `Incomplete (${chapterCount} / ${expectedChapterCount} chapters)`}
                                            </p>
                                            <p className="grow xs:grow-0 xxs:grow-0 text-right xs:text-left xxs:text-left">
                                                Chapter {volumeFirstChapter} - {volumeLastChapter}
                                            </p>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-2 ps-7 text-muted-foreground">
                                        {missingChapters.length > 0 && (
                                            <p className="text-orange-600 mb-1">Missing: {missingChapters.map((chapter) => `Chapter ${chapter}`).join(', ')}</p>
                                        )}

                                        <ul className="flex flex-col w-full mb-2">
                                            {Object.keys(volume.chapters)
                                                .sort((a, b) => parseFloat(a) - parseFloat(b))
                                                .map((chapterKey) => {
                                                    const chapter = volume.chapters[chapterKey];

                                                    return (
                                                        <li key={chapterKey} className="flex items-center my-1.5">
                                                            <Link href={`/projects/mangadex/manga/${id}/chapter/${chapter.id}`} className="hover:text-orange-600">
                                                                Chapter {chapter.chapter}
                                                            </Link>
                                                        </li>
                                                    );
                                                })}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        );
                    })}
                </div>
            </div>
        </MangaDexLayout>
    );
}
