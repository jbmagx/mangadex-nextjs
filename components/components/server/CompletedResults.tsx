import { Badge } from '@/components/ui/badge';
import { languages } from '@/app/projects/mangadex/constants/languages';
import { Bookmark, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Markdown from 'react-markdown';

type CompletedResultsProps = {
    completedResults: MangaDexListData;
    completedResultsStatistics: Record<string, Statistics>[];
};

export default function CompletedResults({ completedResults, completedResultsStatistics }: CompletedResultsProps) {
    return (
        <div className="flex flex-col w-full gap-y-6 sm:gap-y-4 xs:gap-y-4 xxs:gap-y-4">
            {completedResults &&
                (completedResults.data.length === 0 ? (
                    <div className="flex flex-col items-center w-full my-20">
                        <p className="text-medium text-muted-foreground">No results found.</p>
                    </div>
                ) : (
                    <>
                        {completedResults.data.map((manga, index) => (
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

                                <div className="flex flex-col w-[calc(100%-14rem-24px)] sm:w-[calc(100%-8rem-16px)] xs:w-[calc(100%-7rem-16px)] xxs:w-[calc(100%-96px-16px)]">
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
                                                {completedResultsStatistics.find((stat) => stat.hasOwnProperty(manga.id))?.[manga.id]?.rating?.bayesian.toFixed(2)}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-center gap-x-1 text-orange-600 [&>svg]:size-4 xxs:[&>svg]:size-3">
                                            <Bookmark />
                                            {completedResultsStatistics.find((stat) => stat.hasOwnProperty(manga.id))?.[manga.id]?.follows && (
                                                <span className="text-sm xxs:text-xs font-medium">
                                                    {(completedResultsStatistics.find((stat) => stat.hasOwnProperty(manga.id))?.[manga.id]?.follows as number) > 9999
                                                        ? `${(
                                                              (completedResultsStatistics.find((stat) => stat.hasOwnProperty(manga.id))?.[manga.id]?.follows as number) / 1000
                                                          ).toFixed(1)}K`
                                                        : completedResultsStatistics.find((stat) => stat.hasOwnProperty(manga.id))?.[manga.id]?.follows}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex sm:hidden xs:hidden xxs:hidden items-center w-full gap-0.5 mt-2 overflow-x-scroll no-scrollbar">
                                        {manga?.attributes?.tags
                                            .filter((tag) => tag.attributes.group === 'genre' || tag.attributes.group === 'theme')
                                            .sort((a, b) => a.attributes.name.en.localeCompare(b.attributes.name.en))
                                            .map((tag, index) => (
                                                <Badge variant="outline" className="bg-black text-white font-medium rounded-full text-nowrap select-none" key={index}>
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
                    </>
                ))}
        </div>
    );
}
