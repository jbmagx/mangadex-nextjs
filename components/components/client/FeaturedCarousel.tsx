'use client';

import { capitalize, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { languages } from '../../constants/languages';
import { calculateTimePassed } from '@/lib/calculateTimePassed';
import { Bookmark, Star } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import Image from 'next/image';
import Markdown from 'react-markdown';

export default function RecentlyAddedCarousel({ featured, featuredStatistics }: { featured: MangaData[]; featuredStatistics: Record<string, Statistics>[] }) {
    return (
        <Carousel
            opts={{
                align: 'start',
                loop: true,
            }}
            plugins={[
                Autoplay({
                    delay: 10000,
                }),
            ]}
            className="w-full max-w-5xl"
        >
            <CarouselContent>
                {featured.length > 0 &&
                    featured.map((manga, index) => (
                        <CarouselItem key={index}>
                            <div className="flex items-start xs:flex-col xs:items-center xxs:flex-col xxs:items-center w-full gap-x-5 md:gap-x-4 sm:gap-x-4 xs:gap-y-3.5 xxs:gap-y-2.5">
                                <Link
                                    href={`/projects/mangadex/manga/${manga.id}`}
                                    className="relative flex items-center justify-center w-[16rem] md:w-60 sm:w-40 xs:w-40 xxs:w-40 aspect-[7/10] rounded-xl shadow-sm hover:opacity-80 duration-300"
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

                                <div className="flex flex-col justify-start w-[calc(100%-16rem-20px)] md:w-[calc(100%-15rem-16px)] sm:w-[calc(100%-10rem-16px)] xs:w-full xxs:w-full">
                                    <Link href={`/projects/mangadex/manga/${manga.id}`} className="hover:text-orange-600 duration-300" scroll={false}>
                                        <h1 className="font-medium text-lg xs:text-base xxs:text-base line-clamp-2 sm:line-clamp-1">
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

                                        {featuredStatistics.find((stat) => stat.hasOwnProperty(manga.id))?.[manga.id]?.rating?.bayesian && (
                                            <div className="flex items-center justify-center gap-x-1 text-orange-600 [&>svg]:size-4 xxs:[&>svg]:size-3">
                                                <Star />
                                                <span className="text-sm xxs:text-xs font-medium">
                                                    {featuredStatistics.find((stat) => stat.hasOwnProperty(manga.id))?.[manga.id].rating.bayesian.toFixed(2)}
                                                </span>
                                            </div>
                                        )}

                                        {featuredStatistics.find((stat) => stat.hasOwnProperty(manga.id))?.[manga.id]?.follows && (
                                            <div className="flex items-center justify-center gap-x-1 text-orange-600 [&>svg]:size-4 xxs:[&>svg]:size-3">
                                                <Bookmark />
                                                <span className="text-sm xxs:text-xs font-medium">
                                                    {(featuredStatistics.find((stat) => stat.hasOwnProperty(manga.id))?.[manga.id].follows as number) > 9999
                                                        ? `${((featuredStatistics.find((stat) => stat.hasOwnProperty(manga.id))?.[manga.id].follows as number) / 1000).toFixed(1)}K`
                                                        : featuredStatistics.find((stat) => stat.hasOwnProperty(manga.id))?.[manga.id].follows}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <p className="text-xs text-muted-foreground mt-1 sm:line-clamp-1 xs:line-clamp-1 xxs:line-clamp-1">
                                        Last update:{' '}
                                        {formatDate(manga.attributes.updatedAt, { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })} &#8226;{' '}
                                        {calculateTimePassed(manga.attributes.updatedAt)}
                                    </p>

                                    <div className="flex flex-wrap sm:flex-nowrap xs:flex-nowrap xxs:flex-nowrap items-center w-full gap-0.5 mt-2 sm:overflow-x-scroll sm:no-scrollbar xs:overflow-x-scroll xs:no-scrollbar xxs:overflow-x-scroll xxs:no-scrollbar">
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
                                        <Markdown className="line-clamp-[8] sm:line-clamp-5 mt-4 sm:mt-2 xs:mt-2 xxs:mt-2 [&>p]:text-sm [&>p]:text-muted-foreground [&>p]:mb-2 [&>hr]:my-2 [&>ul]:text-sm [&>ul]:pl-3.5 [&>ul>li]:list-disc [&_*_a]:text-orange-600">
                                            {manga?.attributes?.description?.en}
                                        </Markdown>
                                    )}
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
            </CarouselContent>
            <CarouselPrevious className="-top-[1.875rem] left-auto right-12" />
            <CarouselNext className="-top-[1.875rem] right-0" />
        </Carousel>
    );
}
