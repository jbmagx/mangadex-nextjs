'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { capitalize } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { calculateTimePassed } from '@/lib/calculateTimePassed';

export default function RecentlyAddedCarousel({ recentlyAdded }: { recentlyAdded: MangaData[] }) {
    return (
        <Carousel
            opts={{
                align: 'start',
                loop: true,
            }}
            plugins={[
                Autoplay({
                    delay: 5000,
                }),
            ]}
            className="w-full max-w-5xl"
        >
            <CarouselContent>
                {recentlyAdded.length > 0 &&
                    recentlyAdded.map((manga, index) => (
                        <CarouselItem key={index} className="basis-1/6 md:basis-1/5 sm:basis-1/4 xs:basis-1/3 xxs:basis-1/2">
                            <div className="flex flex-col w-full xl:gap-x-4 lg:gap-x-4 md:gap-x-3.5 sm:gap-x-5 xs:gap-x-4 xxs:gap-x-2.5">
                                <Link
                                    href={`/projects/mangadex/manga/${manga.id}`}
                                    className="relative flex items-center justify-center w-full aspect-[7/10] rounded-xl shadow-sm hover:opacity-80 duration-300"
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

                                <Link href={`/projects/mangadex/manga/${manga.id}`} className="hover:text-orange-600 duration-300 mt-0.5" scroll={false}>
                                    <h1 className="font-medium text-[0.9375rem] xs:text-sm xxs:text-sm line-clamp-2">
                                        {manga.attributes.originalLanguage === 'ja' && manga.attributes.altTitles.find((title) => title.hasOwnProperty('en'))?.en
                                            ? manga.attributes.altTitles.find((title) => title.hasOwnProperty('en'))?.en
                                            : manga.attributes.title.en || manga.attributes.title.ja}
                                    </h1>
                                </Link>

                                <p className="text-xs xxs:text-[0.6875rem] text-muted-foreground mt-1 md:mt-0.5 xs:mt-0.5 xxs:mt-0.5">
                                    {calculateTimePassed(manga.attributes.createdAt)}
                                </p>
                            </div>
                        </CarouselItem>
                    ))}
            </CarouselContent>
            <CarouselPrevious className="-top-[1.95rem] left-auto right-12" />
            <CarouselNext className="-top-[1.95rem] right-0" />
        </Carousel>
    );
}
