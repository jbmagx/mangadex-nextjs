'use client';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { calculateTimePassed } from '@/lib/calculateTimePassed';
import Autoplay from 'embla-carousel-autoplay';
import MangaDexCardImage from '@/app/projects/mangadex/components/server/mangadex-card/MangaDexCardImage';
import MangaDexCardTitle from '@/app/projects/mangadex/components/server/mangadex-card/MangaDexCardTitle';

export default function RecentlyAddedCarousel({ recentlyAdded }: { recentlyAdded: MangaDexGetMangaDataItem[] }) {
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
                    recentlyAdded.map((mangaDexGetMangaDataItem, index) => {
                        const id = mangaDexGetMangaDataItem.id;
                        const coverArtFileName = mangaDexGetMangaDataItem?.relationships?.find((relationship) => relationship.type === 'cover_art')?.attributes?.fileName as
                            | string
                            | undefined;
                        const originalLanguage = mangaDexGetMangaDataItem.attributes.originalLanguage;
                        const altTitles = mangaDexGetMangaDataItem.attributes.altTitles;
                        const englishTitle = mangaDexGetMangaDataItem.attributes.title.en;
                        const japaneseTitle = mangaDexGetMangaDataItem.attributes.title.ja;
                        const status = mangaDexGetMangaDataItem.attributes.status;

                        return (
                            <CarouselItem key={index} className="basis-1/6 md:basis-1/5 sm:basis-1/4 xs:basis-1/3 xxs:basis-1/2">
                                <div className="flex flex-col w-full xl:gap-x-4 lg:gap-x-4 md:gap-x-3.5 sm:gap-x-5 xs:gap-x-4 xxs:gap-x-2.5">
                                    <MangaDexCardImage
                                        id={id}
                                        coverArtFileName={coverArtFileName}
                                        originalLanguage={originalLanguage}
                                        altTitles={altTitles}
                                        englishTitle={englishTitle}
                                        japaneseTitle={japaneseTitle}
                                        status={status}
                                        className="w-full"
                                    />

                                    <MangaDexCardTitle
                                        id={id}
                                        originalLanguage={originalLanguage}
                                        altTitles={altTitles}
                                        englishTitle={englishTitle}
                                        japaneseTitle={japaneseTitle}
                                        linkClassName="mt-1"
                                        titleClassName="font-medium text-sm sm:text-[0.9375rem] line-clamp-2"
                                    />

                                    <p className="text-[0.6875rem] xs:text-xs text-muted-foreground mt-0.5 lg:mt-1">
                                        {calculateTimePassed(mangaDexGetMangaDataItem.attributes.createdAt)}
                                    </p>
                                </div>
                            </CarouselItem>
                        );
                    })}
            </CarouselContent>
            <CarouselPrevious className="-top-[1.95rem] left-auto right-12" />
            <CarouselNext className="-top-[1.95rem] right-0" />
        </Carousel>
    );
}
